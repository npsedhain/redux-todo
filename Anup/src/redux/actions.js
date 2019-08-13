export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO_STATUS = "UPDATE_TODO_STATUS";
export const UPDATE_FILTER = "UPDATE_FILTER";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";
export const DROP_TODO = "DROP_TODO";

const createId = () => {
  return parseInt(Math.random() * 1000);
};

export const addTodo = task => {
  return {
    type: ADD_TODO,
    todo: {
      id: createId(),
      task,
      complete: false
    }
  };
};

export const dropTodo = todo => {
  return {
    type: DROP_TODO,
    todo
  };
};

export const updateTodoStatus = (todo, complete) => {
  return {
    type: UPDATE_TODO_STATUS,
    todo,
    complete
  };
};

export const updateFilter = filter => {
  return {
    type: UPDATE_FILTER,
    filter
  };
};

export const clearCompleted = () => {
  return {
    type: CLEAR_COMPLETED
  };
};
