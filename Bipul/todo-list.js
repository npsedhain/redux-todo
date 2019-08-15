import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import {connect} from 'pwa-helpers';

import {VisibilityFilters} from './redux/reducer';
import {store} from './redux/store.js';

import {
  addTodo,
  updateFilter,
  updateTodoStatus,
  clearCompleted
} from "./redux/actions";


class TodoList extends connect(store)(LitElement) {
  static get properties() {
    return {
      todos: { type: Array },
      filter: { type: String },
      task: { type: String }
    }
  }

  stateChanged(state){
    this.todos = state.todos;
    this.filter = state.filter;
  }

  render() {
    return html`
    <div class="input-layout"
  @keyup="${this.shortcutListener}"> 

  <vaadin-text-field
    placeholder="Task"
    value="${this.task || ''}" 
    @change="${this.updateTask}"> 
  </vaadin-text-field>

  <vaadin-button
    theme="primary"
    @click="${this.addTodo}"> 
      Add Todo
  </vaadin-button>
</div>

<div class="todos-list">
    ${
      this.applyFilter(this.todos).map(todo => html`
        <div class="todo-item">
        <vaadin-checkbox ?checked="${todo.complete}" @change="${
        e => this.updateTodoStatus(todo, e.target.checked)
        }">${todo.task}</vaadin-chekbox>
        </div>
      `)
      }
</div>

<vaadin-radio-group
  class="visibility-filters"
  value="${this.filter}"
  @value-changed="${this.filterChanged}"> 

  ${Object.values(VisibilityFilters).map(
        filter => html`
      <vaadin-radio-button value="${filter}">
        ${filter}
      </vaadin-radio-button>`
      )}
</vaadin-radio-group>
<vaadin-button @click="${this.clearCompleted}">
    Clear Completed
</vaadin-button>
    `;
  }

  clearCompleted() {
    store.dispatch(clearCompleted);
  }

  filterChanged(e) {
    store.dispatch(updateFilter(e.detail.value));
  }

  applyFilter(todos) {
    switch (this.filter) {
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.complete);
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.complete);
      default:
        return todos;
    }
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  updateTodoStatus(updateTodo, complete) {
    store.dispatch(updateTodoStatus(updateTodo,complete));
  }

  shortcutListener(e) {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  }

  addTodo() {
    if (this.task) {
      store.dispatch(addTodo(this.task))
      this.task = '';
    }
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('todo-list', TodoList);