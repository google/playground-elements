import type {Extension} from '@codemirror/state';

/**
 * An interface for declarative CodeMirror extension elements.
 */
export interface CodemirrorExtension {
  /**
   * Whether the extension has been successfully registered with an editor.
   */
  isRegistered: boolean;
  /**
   * The function to call to unregister this extension, provided by the editor.
   * @internal
   */
  _unregister?: () => void;
  /**
   * Return the CodeMirror extension provided by this element.
   */
  getExtensions(): Extension | Extension[];
}

/**
 * Fired by a declarative CodeMirror extension element to announce its extension.
 *
 * Bubbles and is composed.
 */
export class RegisterCodemirrorExtensionEvent extends Event {
  static readonly eventName = 'register-codemirror-extension';
  /**
   * A function that returns the extension, or an array of extensions, to
   * register.
   */
  getExtensions: () => Extension | Extension[];

  constructor(getExtensions: () => Extension | Extension[]) {
    super(RegisterCodemirrorExtensionEvent.eventName, {
      bubbles: true,
      composed: true,
    });
    this.getExtensions = getExtensions;
  }
}

/**
 * Fired by a playground editor in response to a
 * `RegisterCodemirrorExtensionEvent`.
 *
 * Does not bubble.
 */
export class CodemirrorExtensionRegisteredEvent extends Event {
  static readonly eventName = 'codemirror-extension-registered';
  /**
   * A function that the extension element can call to unregister its
   * extension.
   */
  unregister: () => void;

  constructor(unregister: () => void) {
    super(CodemirrorExtensionRegisteredEvent.eventName, {
      bubbles: false,
      composed: false,
    });
    this.unregister = unregister;
  }
}

/**
 * Fired by a playground editor on its extension elements when it is ready to
 * receive extensions. This is used to handle the race condition where an
 * extension is defined and connected before the editor is.
 *
 * Does not bubble.
 */
export class PlaygroundEditorReadyEvent extends Event {
  static readonly eventName = 'playground-editor-ready';
  constructor() {
    super(PlaygroundEditorReadyEvent.eventName, {
      bubbles: false,
      composed: false,
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

interface WithWcCallbacks extends HTMLElement {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
}

/**
 * A mixin for creating a declarative CodeMirror extension.
 *
 * A declarative CodeMirror extension is a custom element that provides a
 * CodeMirror extension to any parent playground element that contains a
 * CodeMirror editor.
 *
 * This mixin handles the event-based communication with the editor, so that a
 * consuming class only needs to implement the `getExtensions()` method.
 */
export const codemirrorExtensionMixin = <
  T extends Constructor<WithWcCallbacks>
>(
  superClass: T
) => {
  return class CodemirrorExtensionElement
    extends superClass
    implements CodemirrorExtension
  {
    isRegistered = false;
    _unregister?: () => void;

    /**
     * This method must be implemented by the consuming class.
     * @returns A CodeMirror `Extension` or array of `Extension`s.
     */
    getExtensions(): Extension | Extension[] {
      throw new Error('getExtensions() must be implemented');
    }

    override connectedCallback() {
      super.connectedCallback?.();
      this.addEventListener(
        CodemirrorExtensionRegisteredEvent.eventName,
        (e: Event) => {
          const event = e as CodemirrorExtensionRegisteredEvent;
          this.isRegistered = true;
          this._unregister = event.unregister;
          event.stopPropagation();
        }
      );
      this.addEventListener(PlaygroundEditorReadyEvent.eventName, () => {
        if (!this.isRegistered) {
          this.dispatchEvent(
            new RegisterCodemirrorExtensionEvent(() => this.getExtensions())
          );
        }
      });
      this.dispatchEvent(
        new RegisterCodemirrorExtensionEvent(() => this.getExtensions())
      );
    }

    override disconnectedCallback(): void {
      super.disconnectedCallback?.();
      this._unregister?.();
      this.isRegistered = false;
    }
  };
};
