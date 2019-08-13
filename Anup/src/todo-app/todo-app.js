import { html, css, LitElement } from "lit-element";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-radio-button/paper-radio-button.js";
import "@polymer/paper-radio-group/paper-radio-group.js";

import { store } from "../redux/store.js";
import { Filters, getVisibleTodosSelector } from "../redux/reducer.js";
import { connect } from "pwa-helpers";
import {
  addTodo,
  updateTodoStatus,
  updateFilter,
  clearCompleted,
  dropTodo
} from "../redux/actions.js";

class TodoApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      todos: { Array },
      filter: { String },
      task: { String }
    };
  }

  stateChanged(state) {
    this.todos = getVisibleTodosSelector(state);
    this.filter = state.filter;
  }

  render() {
    return html`
      <style>
        paper-input {
          width: 500px;
          display: inline-block;
        }

        .active {
          text-decoration: line-through;
        }

        .todo-item {
          margin: 5px 0;
        }

        paper-checkbox {
          width: 500px;
          margin: 15px 0;
        }

        paper-radio-group {
          margin-top: 20px;
        }
      </style>
      <div class="todo-app">
        <h2>Todo app</h2>
        <div class="input-layout" @keyup="${this.enterListener}">
          <paper-input
            always-float-label
            label="Add Todo"
            placeholder="task"
            value="${this.task || ""}"
            @change="${this.updateTask}"
          ></paper-input>
          <paper-button raised class="indigo" @click="${this.addTodo}"
            >Add</paper-button
          >
        </div>

        <div class="todos-list">
          ${this.todos.map(
            todo => html`
              <div class="todo-item">
                <paper-checkbox
                  ?checked="${todo.complete}"
                  @change="${e =>
                    this.updateTodoStatus(todo, e.target.checked)}"
                  ><span class="${todo.complete ? "active" : "inactive"}"
                    >${todo.task}</span
                  ></paper-checkbox
                >
                <paper-button @click="${() => this.dropTodo(todo)}"
                  >X</paper-button
                >
              </div>
            `
          )}
        </div>

        <paper-radio-group
          selected="${this.filter}"
          class="filters"
          value="${this.filter}"
          @change="${this.filterChanged}"
        >
          ${Object.values(Filters).map(
            filter => html`
              <paper-radio-button name="${filter}" value="${filter}"
                >${filter}</paper-radio-button
              >
            `
          )}
        </paper-radio-group>

        <paper-button raised class="indigo" @click="${this.clearCompleted}">
          Clear Completed
        </paper-button>
      </div>
    `;
  }

  clearCompleted() {
    store.dispatch(clearCompleted());
  }

  dropTodo(todo) {
    store.dispatch(dropTodo(todo));
  }

  filterChanged(e) {
    store.dispatch(updateFilter(e.target.value));
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
      store.dispatch(addTodo(this.task));
      this.task = "";
    }
  }

  updateTodoStatus(updatedTodo, complete) {
    store.dispatch(updateTodoStatus(updatedTodo, complete));
  }
}

customElements.define("todo-app", TodoApp);
