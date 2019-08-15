import { html, css, LitElement } from "lit-element";
import Sortable from "sortablejs";
import "../card-element/card-element";
import "./add-protocol";
import "./clone-protocol";
import "../comment-box/comment";

class RowCon extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      deprotection: { type: Boolean },
      index: { type: Number },
      inputFlag: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      .container {
        position: relative;
      }

      .title {
        position: absolute;
        left: 10px;
        top: 45px;
      }

      .sub-title {
        position: absolute;
        left: 10px;
        top: 65px;
      }

      .clearfix::after {
        content: "";
        clear: both;
        display: table;
      }

      ul {
        padding-inline-start: 140px;
        display: inline-block;
        width: auto;
        list-style-type: none;
      }

      li {
        float: left;
        margin: 0 10px;
      }

      .name {
        display: block;
        width: 100px;
      }
      .amount {
        width: 30px;
        display: inline-block;
      }
    `;
  }

  addProtocol() {
    this.inputField = false;
    this.addedCard = true;
    this.currentTitle = "New";
    this.currentAmount = 3;
  }

  firstUpdated() {
    Sortable.create(this.shadowRoot.getElementById("list"), {
      delay: 50,
      sort: true
    });

    this.addEventListener("addInput", () => {
      this.inputFlag = true;
    })
  }

  willBeUsedLater() {
    this.dispatchEvent(new CustomEvent("addInput", {
      detail: {
        index: this.index
      },
      bubbles: true,
      composed: true
    }))
  };

  handleAdd() {
    this.dispatchEvent(new CustomEvent("addInput", {
      bubbles: true,
      composed: true
    }))
  }

  render() {
    return html`
    <div class="container">
      <span class="title">${this.title}</span>
      <span class="sub-title"
        >${this.deprotection ? "Deprotection" : ""}</span
      >
      <ul id="list" class="clearfix">   
        <slot></slot>
      </ul>
      ${this.inputFlag ? html`<comment-card></comment-card>` : ""}
      <add-protocol @click="${this.handleAdd}"></add-protocol>
      <clone-protocol></clone-protocol>
    </div>
    `;
  }
}

customElements.define("row-con", RowCon);
