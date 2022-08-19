/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement} from 'lit';
import {property, state} from 'lit/decorators.js';
import {PlaygroundProject} from './playground-project.js';

/**
 * Base class that connects an element to a <playground-project>.
 */
export class PlaygroundConnectedElement extends LitElement {
  /**
   * The project that this element is associated with. Either the
   * `<playground-project>` node itself, or its `id` in the host scope.
   */
  @property()
  set project(elementOrId: PlaygroundProject | string | undefined) {
    if (typeof elementOrId === 'string') {
      // Defer querying the host to a rAF because if the host renders this
      // element before the one we're querying for, it might not quite exist
      // yet.
      requestAnimationFrame(() => {
        const root = this.getRootNode() as ShadowRoot | Document;
        this._project =
          (root.getElementById(elementOrId) as PlaygroundProject | null) ??
          undefined;
      });
    } else {
      this._project = elementOrId;
    }
  }

  /**
   * The actual `<playground-project>` node, determined by the `project`
   * property.
   */
  @state()
  protected _project?: PlaygroundProject;
}
