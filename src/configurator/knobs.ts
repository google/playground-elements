/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * This kinda turned into something like storybook.js and similar. Maybe we
 * should just use another library.
 */

import {themeNames} from './themes.js';

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

interface SelectKnob<Id extends string, T extends string>
  extends BaseKnob<Id, T> {
  type: 'select';
  options: ReadonlyArray<T>;
}

function checkbox<Id extends string>(
  def: Omit<CheckboxKnob<Id>, 'type'>
): CheckboxKnob<Id> {
  return {type: 'checkbox', ...def};
}

function slider<Id extends string>(
  def: Omit<SliderKnob<Id>, 'type'>
): SliderKnob<Id> {
  return {type: 'slider', ...def};
}

function color<Id extends string>(
  def: Omit<ColorKnob<Id>, 'type'>
): ColorKnob<Id> {
  return {type: 'color', ...def};
}

function select<Id extends string, T extends string>(
  def: Omit<SelectKnob<Id, T>, 'type'>
): SelectKnob<Id, T> {
  return {type: 'select', ...def};
}

const pixels = (value: number) => value + 'px';

export const knobs = [
  // code editor
  select({
    id: 'theme',
    label: 'Theme',
    section: 'code editor',
    options: ['default', ...themeNames],
    default: 'default',
  }),
  select({
    id: 'fontFamily',
    label: 'Font',
    section: 'code editor',
    cssProperty: '--playground-code-font-family',
    options: ['monospace', 'Roboto Mono', 'Source Code Pro', 'Ubuntu Mono'],
    formatCss: (value: string | number | boolean) => {
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
    cssProperty: '--playground-code-background',
    formatCss: (val) => `${val} !important`,
    default: '',
    unsetLabel: 'From theme',
  }),

  // tab bar
  color({
    id: 'tabBarBackground',
    label: 'Background',
    cssProperty: '--playground-tab-bar-background',
    default: '#eaeaea',
    section: 'tab bar',
  }),
  color({
    id: 'tabBarForeground',
    label: 'Foreground',
    cssProperty: '--playground-tab-bar-foreground-color',
    default: '#000000',
    section: 'tab bar',
  }),

  // preview toolbar
  color({
    id: 'previewToolbarBackground',
    label: 'Background',
    cssProperty: '--playground-preview-toolbar-background',
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
    formatCss: (value: string | number | boolean) =>
      value ? '1px solid #ddd' : 'none',
    default: true,
    section: 'general',
  }),
  checkbox({
    id: 'resizable',
    label: 'Resizable',
    section: 'general',
    default: false,
    htmlAttribute: 'resizable',
  }),
  checkbox({
    id: 'editableFileSystem',
    label: 'Editable filesystem',
    section: 'general',
    default: false,
    htmlAttribute: 'editable-file-system',
  }),
  color({
    id: 'highlight',
    label: 'Highlight',
    cssProperty: '--playground-highlight-color',
    default: '#6200ee',
    section: 'general',
  }),
  slider({
    id: 'previewWidth',
    label: 'Preview width',
    cssProperty: '--playground-preview-width',
    formatCss: (val) => `${val}%`,
    min: 0,
    max: 100,
    default: 30,
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
] as const;

export type Knob = typeof knobs[number];
export type KnobId = Knob['id'];

type KnobsById = {[K in Knob as K['id']]: K};
export const knobsById = {} as KnobsById;
export const knobsBySection = {} as {[section: string]: Knob[]};
for (const knob of knobs) {
  // Cast to an arbitrary specific Knob type here because TypeScript isn't quite
  // clever enough to know that the id will match the type.
  knobsById[(knob as typeof knobs[0]).id] = knob as typeof knobs[0];
  let catArr = knobsBySection[knob.section];
  if (catArr === undefined) {
    catArr = knobsBySection[knob.section] = [];
  }
  catArr.push(knob);
}
export const knobIds = Object.keys(knobsById) as KnobId[];
export const knobSectionNames = Object.keys(knobsBySection);

export type KnobsOfType<T extends Knob['type']> = Exclude<
  {
    [K in Knob as K['id']]: K extends {type: T} ? K : never;
  }[KnobId],
  never
>;

export type KnobValueType<T extends KnobId> = KnobsById[T]['default'];

export class KnobValues {
  private values = new Map<KnobId, Knob['default']>();

  getValue<T extends KnobId>(id: T): KnobValueType<T> {
    if (this.values.has(id)) {
      return this.values.get(id) as any;
    }
    return knobsById[id].default as any;
  }

  setValue<T extends KnobId>(id: T, value: KnobValueType<T>) {
    this.values.set(id, value);
  }
}
