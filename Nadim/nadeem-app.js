import { html, LitElement } from "lit-element";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-radio-button/paper-radio-button.js";

const VisibilityFilters = {
  SHOW_ALL: "All",
  SHOW_ACTIVE: "Active",
  SHOW_COMPLETED: "Completed",
};

class NadeemApp extends LitElement {
  static get properties() {
    return {
      todos: Array,
      filter: String,
      task: String,
    };
  }

  constructor() {
    super();
    this.todos = [];
    this.filter = VisibilityFilters.SHOW_ALL;
    this.task = "";
  }

  addTodo(e) {
    if (this.task) {
      this.todos = [
        ...this.todos,
        {
          task: this.task,
          completed: false,
        },
      ];
      this.task = "";
      console.log(this.todos);
    }
  }

  handleChange(e) {
    if (e.keyCode === 13) {
      return this.addTodo();
    }
    this.task = e.target.value;
  }
  render() {
    return html`
      <div class="input-layout">
        <paper-input
          always-float-label
          label="Floating label"
          .value="${this.task}"
          @click="${this.addTodo}"
          @keyup="${this.handleChange}"
        ></paper-input>

        <paper-button
          raised
          class="indigo"
          value="Nadim"
          @click="${this.addTodo}"
          >raised</paper-button
        >
      </div>
    `;
  }
}

window.customElements.define("nadeem-app", NadeemApp);
