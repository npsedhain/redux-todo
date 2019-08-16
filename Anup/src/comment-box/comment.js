import { html, LitElement, css } from "lit-element";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-input/paper-textarea";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/iron-icons.js";
class CommentCard extends LitElement {
  static get properties() {
    return {
      comment: String,
      editor: String,
      iframe: String,
      bold: Boolean,
      italics: Boolean,
    };
  }
  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 350px;s
      }
      * {
        box-sizing: border-box;
      }
      header {
        background: #f5f7f9;
      }
      header span {
        float: left;
        margin: 10px 5px;
        font-size: 14px;
        padding: 10px;
        box-sizing: border-box;
      }
      header .saveButton {
        float: right;
        margin: 10px 0;
        font-size: 14px;
        text-transfor: none;
        background: lightgrey;
      }
      header .saveButton:hover {
        background: #4bc3da;
        color: #fff;
        transition: 0.3s;
      }
      .toolbar {
        position: relative;
        height: 30px;
        background: #f5f7f9;
      }
      .navButton {
        background-color: transparent;
        border: none;
        width: 30px;
        height: 30px;
        font-weight: bold;
        margin: 0;
        padding: 0;
        display: block;
        float: left;
        background-repeat: no-repeat;
        background-size: 18px 18px;
        background-position: 50% 50%;
        margin: 0 5px;
        outline: none;
      }

      .clearfix::after {
        content: "";
        clear: both;
        display: table;
      }

      .navButton:hover {
        background-color: #e6e7ea;
        cursor: pointer;
      }

      .orderedList {
        background-image: url("./orderedList.png");
      }

      .unorderedList {
        background-image: url("./unorderedList.png");
      }
      .hyperLink {
        background-image: url("./hyperLink.png");
      }
      .textBox {
        background: #fff;
        width: 100%;
        border: 1px solid rgba(211, 211, 211, 0.4);

        
      }

      .active {
        border-radius: 2px;
        box-shadow: 1px 1px 2px 1px rgba(75, 195, 218, 0.2);
        background: #e6e7ea;
      }
      .;
    `;
  }
  constructor() {
    super();
    this.comment = "";
    this.bold = false;
    this.italics = false;
  }
  firstUpdated() {
    this.iframe = this.shadowRoot.getElementById("theWYSIWYG");
    this.editor = this.iframe.contentDocument;
    this.editor.designMode = "on";
    this.editor.body.style.fontFamily = "Roboto, sans-serif";

    this.editor.addEventListener("keydown", e => {
      if (e.keyCode === 66 && e.ctrlKey) {
        this.bold = !this.bold;
      }
      if (e.keyCode === 73 && e.ctrlKey) {
        this.italics = !this.italics;
      }
    });
  }
  saveComment() {
    // Do something to save the comment.
  }

  onChange(e) {
    this.comment = e.target.value;
  }
  toggleWeight() {
    this.bold = !this.bold;
    this.editor.execCommand("Bold", false, null);
    this.editor.body.focus();
  }
  toggleItalics() {
    this.italics = !this.italics;
    this.editor.execCommand("Italic", false, null);
    this.editor.body.focus();
  }
  addOrderedList() {
    this.editor.execCommand(
      "insertOrderedList",
      false,
      "newOL" + Math.round(Math.random() * 1000)
    );
    this.editor.body.focus();
  }
  addUnorderedList() {
    this.editor.execCommand(
      "insertUnorderedList",
      false,
      "newUL" + Math.round(Math.random() * 1000)
    );
    this.editor.body.focus();
  }
  addHyperLink() {
    let linkURL = prompt("Enter a URL:", "http://");
    this.editor.execCommand("createLink", false, linkURL);
    this.editor.body.focus();
  }
  render() {
    return html`
      <header class="clearfix">
        <span>Comment</span>
        <paper-button @click="${this.saveComment}" class="saveButton"
          >Save</paper-button
        >
      </header>
      <div class="toolbar clearfix">
        <button
          @click="${this.toggleWeight}"
          class="navButton ${this.bold ? "active" : "disabled"}"
        >
          B
        </button>
        <button
          @click="${this.toggleItalics}"
          class="navButton ${this.italics ? "active" : "disabled"}"
        >
          I
        </button>
        <button
          @click="${this.addOrderedList}"
          class="navButton orderedList"
        ></button>
        <button
          @click="${this.addUnorderedList}"
          class="navButton unorderedList"
        ></button>
        <button
          @click="${this.addHyperLink}"
          class="navButton hyperLink"
        ></button>
      </div>
      <iframe
        id="theWYSIWYG"
        name="theWYSIWYG"
        frameborder="0"
        class="textBox"
        contenteditable="true"
        @keyup="${this.onChange}"
      ></iframe>
    `;
  }
}

customElements.define("comment-card", CommentCard);
