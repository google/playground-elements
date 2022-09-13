import {html, css, LitElement} from 'lit';
import {animate} from '@lit-labs/motion';
import '../playground-project.js';
import '../playground-file-editor.js';
import '../playground-preview.js';
import '../playground-tab-bar.js';
import {themeNames, themeStyles} from '../configurator/themes.js';

class ExplodingPlayground extends LitElement {
  static styles = [
    ...themeStyles,
    css`
      div {
        display: grid;
        grid-template-rows: 40px 300px;
        grid-template-columns: 300px 200px;
        transform-origin: center;
      }
      :host([state='exploded']) > div {
        grid-gap: 50px;
      }
      :host([state='flipped']) > div {
        transform: rotateY(180deg);
      }
      :host > div > * {
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
          rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
      }
      :host([state='vertical']) > div {
        grid-template-rows: 40px 200px 50px;
        grid-template-columns: 300px;
      }
      playground-tab-bar {
        grid-column-start: 1;
        grid-column-end: 3;
        border-radius: 5px 5px 0 0;
      }
      :host([state='vertical']) > div > playground-tab-bar {
        grid-column-end: 1;
      }
      playground-file-editor {
        border: 1px solid #ccc;
      }
      playground-preview {
        border: 1px solid #ccc;
      }
      :host([state='vertical']) > div > playground-tab-bar {
        opacity: 0;
      }
      :host {
        font-family: Arial, sans-serif;
        --playground-highlight-color: blue;
      }
      :host([state='themes']) > div {
        grid-template-columns: 600px 0;
      }
      :host([state='themes']) > div > playground-tab-bar,
      :host([state='themes']) > div > playground-preview {
        opacity: 0;
      }
    `,
  ];

  static properties = {
    state: {type: String, reflect: true},
    theme: {type: String, reflect: true},
  };

  constructor() {
    super();
    this.state = 'initial';
    this.theme = '';
  }

  update(changed) {
    super.update(changed);
    if (changed.has('state')) {
      if (this.state === 'themes') {
        this.startRotatingThemes();
      } else {
        this.stopRotatingThemes();
      }
    }
  }

  startRotatingThemes() {
    this.stopRotatingThemes();
    let i = 0;
    this.rotateThemesTimer = setInterval(() => {
      this.theme = themeNames[i++ % themeNames.length];
    }, 500);
  }

  stopRotatingThemes() {
    if (this.rotateThemesTimer !== undefined) {
      clearInterval(this.rotateThemesTimer);
      this.rotateThemesTimer = undefined;
    }
    this.theme = '';
  }

  render() {
    return html`
      <playground-project id="project">
        <script type="sample/html" filename="index.html">
          <!doctype html>
          <body>
            Hello
            <script type="module" src="./index.js">&lt;/script>
          </body>
        </script>

        <script type="sample/ts" filename="index.ts">
          document.body.appendChild(document.createTextNode("World!"))
        </script>
      </playground-project>
      <div
        class="playground-theme-${this.theme}"
        ${animate({
          onFrames: (a) =>
            a.frames &&
            a.frames.map((f) => ({...f, transformOrigin: 'center center'})),
          properties: [
            'left',
            'top',
            'width',
            'height',
            'opacity',
            'color',
            'background',
            'transform',
          ],
        })}
      >
        <playground-tab-bar project="project" editor="editor" ${animate()}>
        </playground-tab-bar>

        <playground-file-editor
          id="editor"
          project="project"
          filename="index.html"
        ></playground-file-editor>

        <playground-preview ${animate()} project="project"></playground-preview>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    const ratios = {};
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios[entry.target.id] = entry.intersectionRatio;
        }
        this.state = Object.keys(ratios).reduce((a, b) =>
          ratios[a] > ratios[b] ? a : b
        );
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );
    for (const section of document.querySelectorAll('section')) {
      observer.observe(section);
    }
  }
}
customElements.define('exploding-playground', ExplodingPlayground);
