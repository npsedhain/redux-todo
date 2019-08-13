import {
  ADD_TODO,
  UPDATE_FILTER,
  UPDATE_TODO_STATUS,
  CLEAR_COMPLETED,
  DROP_TODO
} from "./actions.js";
import { createSelector } from "reselect";

export const Filters = {
  all: "All",
  active: "Active",
  completed: "Completed"
};

const initial_state = {
  todos: [],
  filter: Filters.all
};

export const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      };
    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.todo.id
            ? { ...action.todo, complete: action.complete }
            : todo
        )
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.complete)
      };
    case DROP_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id != action.todo.id)
      };
    default:
      return state;
  }
};

const getTodosSelector = state => state.todos;
const getFilterSelector = state => state.filter;

export const getVisibleTodosSelector = createSelector(
  getTodosSelector,
  getFilterSelector,
  (todos, filter) => {
    switch (filter) {
      case Filters.active:
        return todos.filter(todo => !todo.complete);
      case Filters.completed:
        return todos.filter(todo => todo.complete);
      default:
        return todos;
    }
  }
);
