import { html, css, LitElement } from "lit-element";
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

class CloneProtocol extends LitElement {
	static get styles() {
		return css`
			iron-icon {
				margin : 0px 0;
				position : absolute;
				right :70px;
				top : 55px; 
			}
		`;
	}

	render() {
		return html`
    	<iron-icon icon="content-copy"></iron-icon>
    `;
	}
}

customElements.define("clone-protocol", CloneProtocol);