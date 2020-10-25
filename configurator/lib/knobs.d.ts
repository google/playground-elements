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
/**
 * This kinda turned into something like storybook.js and similar. Maybe we
 * should just use another library.
 */
interface BaseKnob<Id extends string, T> {
    id: Id;
    label: string;
    section: string;
    default: T;
    cssProperty?: string;
    formatCss?: (value: T) => string;
    htmlAttribute?: string;
}
interface CheckboxKnob<Id extends string> extends BaseKnob<Id, boolean> {
    type: 'checkbox';
}
interface SliderKnob<Id extends string> extends BaseKnob<Id, number> {
    type: 'slider';
    min: number;
    max: number;
}
interface ColorKnob<Id extends string> extends BaseKnob<Id, string> {
    type: 'color';
    unsetLabel?: string;
}
interface SelectKnob<Id extends string, T extends string> extends BaseKnob<Id, T> {
    type: 'select';
    options: ReadonlyArray<T>;
}
export declare const knobs: readonly [SelectKnob<"theme", "default" | "monokai">, SelectKnob<"fontFamily", "monospace" | "Roboto Mono" | "Source Code Pro" | "Ubuntu Mono">, SliderKnob<"fontSize">, CheckboxKnob<"lineNumbers">, ColorKnob<"editorBackground">, ColorKnob<"filePickerBackground">, ColorKnob<"filePickerForeground">, ColorKnob<"previewToolbarBackground">, ColorKnob<"previewToolbarForeground">, CheckboxKnob<"borders">, ColorKnob<"highlight">, SliderKnob<"radius">, SliderKnob<"barHeight">, ColorKnob<"pageBackground">];
export declare type Knob = typeof knobs[number];
export declare type KnobId = Knob['id'];
declare type KnobsById = {
    [K in Knob as K['id']]: K;
};
export declare const knobsById: KnobsById;
export declare const knobsBySection: {
    [section: string]: (SelectKnob<"theme", "default" | "monokai"> | SelectKnob<"fontFamily", "monospace" | "Roboto Mono" | "Source Code Pro" | "Ubuntu Mono"> | SliderKnob<"fontSize"> | CheckboxKnob<"lineNumbers"> | ColorKnob<"editorBackground"> | ColorKnob<"filePickerBackground"> | ColorKnob<"filePickerForeground"> | ColorKnob<"previewToolbarBackground"> | ColorKnob<"previewToolbarForeground"> | CheckboxKnob<"borders"> | ColorKnob<"highlight"> | SliderKnob<"radius"> | SliderKnob<"barHeight"> | ColorKnob<"pageBackground">)[];
};
export declare const knobIds: ("theme" | "fontFamily" | "fontSize" | "lineNumbers" | "editorBackground" | "filePickerBackground" | "filePickerForeground" | "previewToolbarBackground" | "previewToolbarForeground" | "borders" | "highlight" | "radius" | "barHeight" | "pageBackground")[];
export declare const knobSectionNames: string[];
export declare type KnobsOfType<T extends Knob['type']> = Exclude<{
    [K in Knob as K['id']]: K extends {
        type: T;
    } ? K : never;
}[KnobId], never>;
export declare type KnobValueType<T extends KnobId> = KnobsById[T]['default'];
export declare class KnobValues {
    private values;
    getValue<T extends KnobId>(id: T): KnobValueType<T>;
    setValue<T extends KnobId>(id: T, value: KnobValueType<T>): void;
}
export {};
//# sourceMappingURL=knobs.d.ts.map