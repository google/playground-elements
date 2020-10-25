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
function checkbox(def) {
    return { type: 'checkbox', ...def };
}
function slider(def) {
    return { type: 'slider', ...def };
}
function color(def) {
    return { type: 'color', ...def };
}
function select(def) {
    return { type: 'select', ...def };
}
const pixels = (value) => value + 'px';
export const knobs = [
    // code editor
    select({
        id: 'theme',
        label: 'Theme',
        section: 'code editor',
        htmlAttribute: 'theme',
        options: ['default', 'monokai'],
        default: 'default',
    }),
    select({
        id: 'fontFamily',
        label: 'Font',
        section: 'code editor',
        cssProperty: '--playground-code-font-family',
        options: ['monospace', 'Roboto Mono', 'Source Code Pro', 'Ubuntu Mono'],
        formatCss: (value) => {
            if (value !== 'monospace') {
                return `${value}, monospace`;
            }
            return value;
        },
        default: 'monospace',
    }),
    slider({
        id: 'fontSize',
        label: 'Font size',
        section: 'code editor',
        cssProperty: '--playground-code-font-size',
        formatCss: pixels,
        min: 1,
        max: 30,
        default: 14,
    }),
    checkbox({
        id: 'lineNumbers',
        label: 'Line numbers',
        section: 'code editor',
        default: false,
        htmlAttribute: 'line-numbers',
    }),
    color({
        id: 'editorBackground',
        label: 'Background',
        section: 'code editor',
        cssProperty: '--playground-editor-background-color',
        default: '',
        unsetLabel: 'From theme',
    }),
    // file picker
    color({
        id: 'filePickerBackground',
        label: 'Background',
        cssProperty: '--playground-file-picker-background-color',
        default: '#ffffff',
        section: 'file picker',
    }),
    color({
        id: 'filePickerForeground',
        label: 'Foreground',
        cssProperty: '--playground-file-picker-foreground-color',
        default: '#000000',
        section: 'file picker',
    }),
    // preview toolbar
    color({
        id: 'previewToolbarBackground',
        label: 'Background',
        cssProperty: '--playground-preview-toolbar-background-color',
        default: '#ffffff',
        section: 'preview toolbar',
    }),
    color({
        id: 'previewToolbarForeground',
        label: 'Foreground',
        cssProperty: '--playground-preview-toolbar-foreground-color',
        default: '#444444',
        section: 'preview toolbar',
    }),
    // general
    checkbox({
        id: 'borders',
        label: 'Borders',
        cssProperty: '--playground-border',
        formatCss: (value) => value ? '1px solid #ddd' : 'none',
        default: true,
        section: 'general',
    }),
    color({
        id: 'highlight',
        label: 'Highlight',
        cssProperty: '--playground-highlight-color',
        default: '#6200ee',
        section: 'general',
    }),
    slider({
        id: 'radius',
        label: 'Radius',
        cssProperty: 'border-radius',
        formatCss: pixels,
        min: 0,
        max: 30,
        default: 0,
        section: 'general',
    }),
    slider({
        id: 'barHeight',
        label: 'Bar height',
        cssProperty: '--playground-bar-height',
        formatCss: pixels,
        min: 10,
        max: 100,
        default: 35,
        section: 'general',
    }),
    color({
        id: 'pageBackground',
        label: 'Page background',
        default: '#cccccc',
        section: 'general',
    }),
];
export const knobsById = {};
export const knobsBySection = {};
for (const knob of knobs) {
    // Cast to an arbitrary specific Knob type here because TypeScript isn't quite
    // clever enough to know that the id will match the type.
    knobsById[knob.id] = knob;
    let catArr = knobsBySection[knob.section];
    if (catArr === undefined) {
        catArr = knobsBySection[knob.section] = [];
    }
    catArr.push(knob);
}
export const knobIds = Object.keys(knobsById);
export const knobSectionNames = Object.keys(knobsBySection);
export class KnobValues {
    constructor() {
        this.values = new Map();
    }
    getValue(id) {
        if (this.values.has(id)) {
            return this.values.get(id);
        }
        return knobsById[id].default;
    }
    setValue(id, value) {
        this.values.set(id, value);
    }
}
