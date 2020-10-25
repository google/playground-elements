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
import { LitElement } from 'lit-element';
import '../../lib/code-sample.js';
import '../../lib/codemirror-editor.js';
/**
 * A configurator for the playground-* elements.
 */
export declare class PlaygroundConfigurator extends LitElement {
    static styles: import("lit-element").CSSResult;
    private values;
    connectedCallback(): void;
    private setValue;
    private readUrlParams;
    private setUrlParams;
    render(): import("lit-element").TemplateResult;
    private get knobs();
    private get htmlText();
    private get htmlTextAttributes();
    private get cssText();
    private knob;
    private selectKnob;
    private sliderKnob;
    private colorKnob;
    private checkboxKnob;
}
declare global {
    interface HTMLElementTagNameMap {
        'playground-configurator': PlaygroundConfigurator;
    }
}
//# sourceMappingURL=playground-configurator.d.ts.map