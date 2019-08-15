import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `polymer-element`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PolymerElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'polymer-element',
      },
    };
  }
}

window.customElements.define('polymer-element', PolymerElement);
