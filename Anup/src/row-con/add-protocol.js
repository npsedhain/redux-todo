import { html, css, LitElement } from "lit-element";
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

class AddProtocol extends LitElement {
	static get styles() {
		return css`
			iron-icon {
				margin : 0px 0;
				position : absolute;
				right :120px;
				top : 55px; 
			}
		`;
	}

	render() {
		return html`
    	<iron-icon icon="add-circle"></iron-icon>
    `;
	}
}

customElements.define("add-protocol", AddProtocol);