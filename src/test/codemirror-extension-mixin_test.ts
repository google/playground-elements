import {html, render, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {expect} from '@open-wc/testing';
import {spy} from 'sinon';

import {
  codemirrorExtensionMixin,
  RegisterCodemirrorExtensionEvent,
  CodemirrorExtensionRegisteredEvent,
  PlaygroundEditorReadyEvent,
  CodemirrorExtension,
} from '../codemirror-extension-mixin.js';

@customElement('test-extension')
class TestExtension
  extends codemirrorExtensionMixin(LitElement)
  implements CodemirrorExtension
{
  override getExtensions() {
    return [];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'test-extension': TestExtension;
  }
}

suite('CodemirrorExtensionMixin', () => {
  let container: HTMLElement;

  setup(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  teardown(() => {
    container.remove();
  });

  test('fires register event on connect', async () => {
    const registrationSpy = spy();
    container.addEventListener(
      RegisterCodemirrorExtensionEvent.eventName,
      registrationSpy
    );

    const newEl = document.createElement('test-extension') as TestExtension;
    container.appendChild(newEl);
    await newEl.updateComplete;

    expect(registrationSpy.calledOnce).to.be.true;
    const event = registrationSpy.args[0][0];
    expect(event).to.be.an.instanceOf(RegisterCodemirrorExtensionEvent);
  });

  test('becomes registered and stores unregister callback', async () => {
    render(html`<test-extension></test-extension>`, container);
    const el = container.querySelector('test-extension')!;
    const unregisterSpy = spy();
    expect(el.isRegistered).to.be.false;

    el.dispatchEvent(new CodemirrorExtensionRegisteredEvent(unregisterSpy));

    expect(el.isRegistered).to.be.true;
    expect(el._unregister).to.equal(unregisterSpy);
  });

  test('calls unregister on disconnect', async () => {
    const unregisterSpy = spy();
    render(html`<test-extension></test-extension>`, container);
    const el = container.querySelector('test-extension')!;
    el.dispatchEvent(new CodemirrorExtensionRegisteredEvent(unregisterSpy));
    expect(unregisterSpy.called).to.be.false;

    el.remove(); // This triggers disconnectedCallback

    expect(unregisterSpy.calledOnce).to.be.true;
  });

  test('retries registration on editor-ready event if not registered', async () => {
    const registrationSpy = spy();
    render(html`<test-extension></test-extension>`, container);
    const el = container.querySelector('test-extension')!;
    container.addEventListener(
      RegisterCodemirrorExtensionEvent.eventName,
      registrationSpy
    );

    el.isRegistered = false;
    // The first registration happens on connect, so we reset the spy.
    registrationSpy.resetHistory();

    el.dispatchEvent(new PlaygroundEditorReadyEvent());

    expect(registrationSpy.calledOnce, 'fired on ready event').to.be.true;
  });

  test('does not retry registration on editor-ready event if already registered', async () => {
    const registrationSpy = spy();
    container.addEventListener(
      RegisterCodemirrorExtensionEvent.eventName,
      registrationSpy
    );

    const unregisterSpy = spy();
    render(html`<test-extension></test-extension>`, container);
    const el = container.querySelector('test-extension')!;
    el.dispatchEvent(new CodemirrorExtensionRegisteredEvent(unregisterSpy));
    expect(el.isRegistered).to.be.true;

    // The first registration happens on connect, so we reset the spy.
    registrationSpy.resetHistory();

    el.dispatchEvent(new PlaygroundEditorReadyEvent());

    expect(registrationSpy.notCalled).to.be.true;
  });
});
