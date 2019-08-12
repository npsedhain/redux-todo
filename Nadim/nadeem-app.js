import { html, LitElement, css } from "lit-element";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-radio-group/paper-radio-group.js";
import "@polymer/paper-radio-button/paper-radio-button.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/iron-icons.js";

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
    this.todos = [
      {
        task: "Meet friends",
        completed: true,
      },
      {
        task: "Make penguines fly",
        completed: false,
      },
    ];
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

  handleStatusChange(targetTodo) {
    this.todos = this.todos.map(todo =>
      todo === targetTodo ? { ...todo, completed: !todo.completed } : todo
    );
  }
  changeFilter(e) {
    this.filter = e.target.name;
  }

  applyFilter(todos) {
    switch (this.filter) {
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.completed);
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }
  static get styles() {
    return css`
      :host {
        display: block;
        background: #ffffff;
        width: 90%;
        margin: 10% auto;
      }
      .todo-layout {
        padding: 10px 30px;
      }

      h1.topic {
        text-align: center;
        color: #555;
      }
      .input-layout {
        background: grey;
      }

      .input-layout .paperInput {
        width: 80%;
        display: inline-block;
        float: left;
        padding: 0 10px;
        margin: 0;
        box-sizing: border-box;
        height: 35px;
        color: #555;
        outline: none;
      }
      paper-button.green {
        background-color: var(--paper-green-500);
        color: white;
        float: left;
        margin: 0;
        padding: 0px;
        height: 35px;
        min-width: 20%;
        box-sizing: border-box;
        border-radius: 0;
        box-shadow: none;
        font-size: 13px;
      }

      paper-checkbox.green {
        align-self: center;
        --paper-checkbox-checked-color: var(--paper-green-500);
        --paper-checkbox-checked-ink-color: var(--paper-green-500);
        --paper-checkbox-unchecked-color: var(--paper-green-900);
        --paper-checkbox-unchecked-ink-color: var(--paper-green-900);
        --paper-checkbox-label-color: var(--paper-green-700);
      }

      .todo-list {
        padding: 20px 0;
      }
      .todoItem {
        padding: 10px 0;
        font-size: 14px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      span.completed {
        color: #02b875;
        text-decoration: line-through;
      }
      span.remaining {
        color: #800000;
      }
      .clearfix::after {
        content: "";
        clear: both;
        display: table;
      }

      paper-radio-button {
        padding: 10px 0;
        font-size: 12px;
        width: 100%;
        --paper-radio-button-checked-color: #02b875;
        --paper-radio-button-label-color: #555;
        color: #555;
      }

      paper-button.indigo {
        display: block;
        width: 150px;
        font-size: 12px;
        text-align: center;
        margin: 10px auto;
        background: #800000;
        color: #fff;
      }
    `;
  }

  render() {
    return html`
      <div class="todo-layout">
        <h1 class="topic">Todo App</h1>
        <div class="input-layout clearfix">
         <input .value="${this.task}"
          @click="${this.addTodo}"
          @keyup="${this.handleChange}"
          class="paperInput"
          placeholder = "Add your task here"
          ></input>
         

          <paper-button
            raised
            class="green"
            value="Nadim"
            @click="${this.addTodo}"
            class="paperButton"
            >ADD</paper-button
          >
        </div>

        <div class="todo-list">
          ${this.applyFilter(this.todos).map(todo => {
            return html`
              <div class="todoItem">
                <paper-checkbox
                  ?checked="${todo.completed}"
                  @click="${() => this.handleStatusChange(todo)}"
                  class="green"
                ></paper-checkbox>
                <span class="${todo.completed ? "completed" : "remaining"}"
                  >${todo.task}</span
                >
                <br />
              </div>
            `;
          })}
        </div>

        <paper-radio-group selected="All">
          ${Object.values(VisibilityFilters).map(filter => {
            return html`
              <paper-radio-button
                name="${filter}"
                @click="${this.changeFilter}"
              >
                ${filter}</paper-radio-button
              >
            `;
          })}
        </paper-radio-group>

        <paper-button raised class="indigo" @click="${this.clearCompleted}"
          >Clear Completed</paper-button
        >
      </div>
    `;
  }
}

window.customElements.define("nadeem-app", NadeemApp);
