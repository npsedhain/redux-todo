export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO_STATUS = "UPDATE_TODO_STATUS";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";
export const DELETE_TODO = "DELETE_TODO";

export const addTodo = task => {
  return {
    type: ADD_TODO,
    todo: {
      id: new Date().valueOf(),
      task,
      completed: false,
    },
  };
};

export const updateTodoStatus = todo => {
  return {
    type: UPDATE_TODO_STATUS,
    todo,
    completed: !todo.completed,
  };
};

export const updateFilter = filter => {
  return {
    type: UPDATE_FILTER,
    filter,
  };
};

export const clearCompleted = () => {
  return {
    type: CLEAR_COMPLETED,
  };
};

export const deleteTodo = todo => {
  return {
    type: DELETE_TODO,
    todo,
  };
};
