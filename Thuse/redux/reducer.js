import {
  ADD_TODO,
  UPDATE_TODO_STATUS,
  UPDATE_FILTER,
  CLEAR_COMPLETED
} from "./action.js";

export const VisibilityFilters = {
  SHOW_ALL: "ALL",
  SHOW_ACTIVE: "Active",
  SHOW_COMPLETED: "Completed"
};

const stateValue = JSON.parse(localStorage.getItem("state"));

const INITIAL_STATE =
  localStorage.getItem("state") != undefined
    ? {
        todos: stateValue.todos,
        filter: stateValue.filter
      }
    : {
        todos: [],
        filter: VisibilityFilters.SHOW_ALL
      };

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.todo] };
    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo =>
          action.todo === todo
            ? { ...action.todo, completed: action.completed }
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
        todos: state.todos.filter(filter => !filter.completed)
      };

    default:
      return state;
  }
};
