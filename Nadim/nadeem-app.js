import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `nadeem-app`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class NadeemApp extends PolymerElement {
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
        value: 'nadeem-app',
      },
    };
  }
}

window.customElements.define('nadeem-app', NadeemApp);
