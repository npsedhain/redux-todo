import {
  ADD_TODO,
  UPDATE_FILTER,
  CLEAR_COMPLETED,
  UPDATE_TODO_STATUS,
  DELETE_TODO,
} from "./actions";

export const VisibilityFilters = {
  SHOW_ALL: "All",
  SHOW_ACTIVE: "Active",
  SHOW_COMPLETED: "Completed",
};

// defining the initial state of the app.
const INITIAL_STATE = {
  todos: [],
  filter: VisibilityFilters.SHOW_ALL,
};

// defining a reducer .

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo =>
          action.todo === todo ? { ...todo, completed: action.completed } : todo
        ),
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo !== action.todo),
      };
    default:
      return state;
  }
};
