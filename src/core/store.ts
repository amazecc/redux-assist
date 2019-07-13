import { createStore } from "redux";
import { withDevtools } from "../utils/redux_devtools";
import { ReducerManager } from "./ReducerManager";

export const reducerManager = new ReducerManager();

export const store = createStore(reducerManager.getReducers(), withDevtools());

ReducerManager.store = store;
