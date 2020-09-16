/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {ProjectManifest, SampleFile} from '../shared/worker-api';

export class FileNode {
  private children = new Map<string, FileNode>();
  private content_ = '';

  get editableFiles() {
    if (this.children.size) {
      return [...this.children.values()];
    }

    return [this];
  }

  get content() {
    if (this.parent) {
      return this.content_;
    }

    return this.render();
  }

  set content(content: string) {
    this.content_ = content;
  }

  constructor(
    public readonly name: string,
    content: string,
    private readonly parent: FileNode | null = null,
    public readonly contentType: string | undefined
  ) {
    this.content_ = content;
  }

  private render() {
    let renderedContent = this.content_;
    for (const [insertionPoint, child] of this.children.entries()) {
      renderedContent = renderedContent.replace(insertionPoint, child.content);
    }

    return renderedContent;
  }

  addInsertionPoint(
    insertionPoint: string,
    fileName: string,
    content: string,
    contentType: string | undefined
  ) {
    const child = new FileNode(fileName, content, this, contentType);
    this.children.set(insertionPoint, child);
    return child;
  }
}

export class CodeSampleEditorProject {
  private compilableNodes_: FileNode[] = [];
  readonly ready: Promise<unknown>;

  constructor(manifest?: ProjectManifest, projectUrl?: URL) {
    if (!manifest || !projectUrl) {
      this.ready = Promise.resolve();
      return;
    }

    this.ready = this.parseManifest(manifest, projectUrl);
  }

  private async parseManifest(manifest: ProjectManifest, projectUrl: URL) {
    const filenames = Object.keys(manifest.files || []);

    this.compilableNodes_ = await Promise.all(
      filenames.map(async (filename) => {
        const file = await this.fetchFile(filename, projectUrl);

        const rootNode = new FileNode(
          filename,
          file.content,
          null,
          file.contentType
        );

        const replacements = manifest.files![filename].replacements;
        if (replacements) {
          const insertionPoints = Object.keys(replacements || []);

          for (const insertionPoint of insertionPoints) {
            const templateName = replacements[insertionPoint];
            const insertionFile = await this.fetchFile(
              templateName,
              projectUrl
            );

            rootNode.addInsertionPoint(
              insertionPoint,
              templateName,
              insertionFile.content,
              insertionFile.contentType
            );
          }
        }

        return rootNode;
      })
    );
  }

  private async fetchFile(filename: string, projectUrl: URL) {
    const fileUrl = new URL(filename, projectUrl);
    const response = await fetch(fileUrl.href);
    if (response.status === 404) {
      throw new Error(`Could not find file ${filename}`);
    }

    const content = await response.text();

    // Remember the mime type so that the service worker can set it
    const contentType = response.headers.get('Content-Type') || undefined;

    return {content, contentType};
  }

  get editableNodes() {
    const editableFiles: FileNode[] = [];

    for (const rootFile of this.compilableNodes_) {
      editableFiles.push(...rootFile.editableFiles);
    }

    return editableFiles;
  }

  serialize(): SampleFile[] {
    return this.compilableNodes_.map<SampleFile>((compilableNode) => {
      return {
        name: compilableNode.name,
        content: compilableNode.content,
        contentType: compilableNode.contentType,
      };
    });
  }

  addFile(name: string, content: string, contentType: string | undefined) {
    const newFileNode = new FileNode(name, content, null, contentType);
    this.compilableNodes_.push(newFileNode);
  }

  getFile(name: string): SampleFile | undefined {
    const fileNode = this.compilableNodes_.find((f) => f.name === name);
    if (!fileNode) {
      return undefined;
    }

    return {
      name: fileNode.name,
      content: fileNode.content,
      contentType: fileNode.contentType,
    };
  }
}
