import { html, LitElement } from "lit-element";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-radio-button/paper-radio-button.js";

const Filters = {
  all: "All",
  active: "Active",
  completed: "Completed"
};

class TodoApp extends LitElement {
  static get properties() {
    return {
      todos: { Array },
      filter: { String },
      task: { String }
    };
  }

  constructor() {
    super();

    this.todos = [];
    this.filter = Filters.all;
    this.task = "";
  }

  render() {
    return html`
      <h2>Todo app</h2>
      <div class="input-layout" @keyup="${this.enterListener}">
        <paper-input
          always-float-label
          label="Add Todo"
          placeholder="task"
          value="${this.task}"
          @change="${this.updateTask}"
        ></paper-input>
        <paper-button raised class="indigo" @click="${this.addTodo}"
          >Add</paper-button
        >
      </div>
      <paper-radio-button>Unchecked</paper-radio-button>
      <paper-checkbox>Unchecked</paper-checkbox>
    `;
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  enterListener(e) {
    if (e.key === "Enter") {
      this.addTodo();
    }
  }

  addTodo() {
    if (this.task) {
      this.todos = [
        ...this.todos,
        {
          task: this.task,
          complete: false
        }
      ];
      this.task = "";
    }
  }
}

customElements.define("todo-app", TodoApp);
