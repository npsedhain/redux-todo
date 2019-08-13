import { html, LitElement } from "lit-element";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-radio-button/paper-radio-button.js";
import "@polymer/paper-radio-group/paper-radio-group.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import { VisibilityFilters } from "./../../redux/reducer";
import { connect } from "pwa-helpers";
import { store } from "./../../redux/store.js";
import {
  updateFilter,
  addTodo,
  updateTodoStatus,
  clearCompleted
} from "../../redux/action.js";

class TodoView extends connect(store)(LitElement) {
  static get properties() {
    return {
      todos: { type: Array },
      filter: { type: String },
      task: { type: String }
    };
  }

  stateChanged(state) {
    this.todos = state.todos;
    this.filter = state.filter;
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  addTodo() {
    if (this.task) {
      store.dispatch(addTodo(this.task));
    }
    this.task = "";
    console.log(this.todos);
  }

  shortcutListener(e) {
    if (e.key === "Enter") {
      this.addTodo();
    }
  }
  updateTodoStatus(updatedTodo, completed) {
    store.dispatch(updateTodoStatus(updatedTodo, completed));
  }

  filterChanged(e) {
    store.dispatch(updateFilter(e.target.value));
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
    store.dispatch(clearCompleted());
  }

  render() {
    //console.log(this.prop1);
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <paper-input
          always-float-label
          placeholder="task"
          value="${this.task || ""}"
          @change="${this.updateTask}"
          label="Adding Todo"
        ></paper-input>
        <paper-button raised @click="${this.addTodo}" class="indigo"
          >Submit</paper-button
        >
      </div>
      <div clas="todos-list">
        ${this.applyFilter(this.todos).map(
          todo => html`<div class="todo-item">
      <paper-checkbox ?checked="${todo.completed}" @change="${e =>
            this.updateTodoStatus(todo, e.target.checked)}"></input><span>${
            todo.task
          }</span>
      </div>`
        )}
      </div>
      <paper-radio-group
        value="${this.filter}"
        selected="${this.filter}"
        @change="${this.filterChanged}"
      >
        ${Object.values(VisibilityFilters).map(
          filter =>
            html`
              <paper-radio-button value="${filter}" name="${filter}"
                >${filter}</paper-radio-button
              >
            `
        )}
      </paper-radio-group>
      <paper-button raised @click="${this.clearCompleted}" class="indigo"
        >Clear Completed</paper-button
      >
    `;
  }
}

customElements.define("todo-view", TodoView);
