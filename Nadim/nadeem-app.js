import { html, LitElement, css } from "lit-element";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-radio-group/paper-radio-group.js";
import "@polymer/paper-radio-button/paper-radio-button.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/iron-icons.js";
import { VisibilityFilters } from "./redux/reducer";
import { connect } from "pwa-helpers";
import { store } from "./redux/store";
import {
  addTodo,
  updateFilter,
  updateTodoStatus,
  clearCompleted,
  deleteTodo
} from "./redux/actions";

class NadeemApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      todos: Array,
      filter: String,
      task: String,
    };
  }
  // callback function from connect
  stateChanged(state) {
    this.todos = state.todos;
    this.filter = state.filter;
  }
  constructor() {
    super();
  }

  addTodo(e) {
    if (this.task) {
      // this.todos = [
      //   ...this.todos,
      //   {
      //     task: this.task,
      //     completed: false,
      //   },
      // ];

      store.dispatch(addTodo(this.task));
      this.task = "";
    }
  }

  handleChange(e) {
    if (e.keyCode === 13) {
      return this.addTodo();
    }
    this.task = e.target.value;
  }

  handleStatusChange(targetTodo) {
    // this.todos = this.todos.map(todo =>
    //   todo === targetTodo ? { ...todo, completed: !todo.completed } : todo
    // );
    store.dispatch(updateTodoStatus(targetTodo));
  }
  changeFilter(e) {
    // this.filter = e.target.name;
    store.dispatch(updateFilter(e.target.name));
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
    // this.todos = this.todos.filter(todo => !todo.completed);
    store.dispatch(clearCompleted());
  }

  deleteTodoItem(targetTodo) {
    store.dispatch(deleteTodo(targetTodo));
  }
  static get styles() {
    return css`
      :host {
        display: block;
        background: #ffffff;
        width: 90%;
        margin: 10% auto;
        box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3); 
      }
      .todo-layout {
        padding: 10px 30px;
        border-radius: 3px;
      }

      h1.topic {
        text-align: center;
        color: #555;
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
        border-radius: 3px 0 0 3px;
        border: 1px solid rgba(0, 0, 0, 0.3);
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
        border-radius: 0px 3px 3px 0;
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
      iron-icon.delete {
        float: right;
        width: 18px;
        color: #555;
      }
      iron-icon.delete:hover {
        color: #800000;
        cursor: pointer;
        transition: .3s;
      }
      @media only screen and (min-width: 768px) {
        :host {
          width: 60%;
          margin: 5% auto;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="todo-layout">
        <h1 class="topic">Todo App</h1>
        <div class="input-layout clearfix">
         <input .value="${this.task || ""}"
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
                <iron-icon icon = "delete" @click = "${() => this.deleteTodoItem(todo)}" class = "delete"></iron-icon>
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
