import { createStore } from "redux";
import { reducer } from "./reducer.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);

persistStore(store);
