import { createStore } from "redux";
import { reducer } from "./reducer.js";
import { loadState, saveState } from "./localStorage.js";

const persistedState = loadState();

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSIONS__ && window.__REDUX_DEVTOOLS_EXTENSIONS()
);

store.subscribe(() => {
  saveState(store.getState());
});
