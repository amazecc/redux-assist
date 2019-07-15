import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { withMiddlewareDevtools } from "../utils/redux_devtools";
import { ReducerManager } from "./ReducerManager";

export const reducerManager = new ReducerManager();

export const store = createStore(reducerManager.getReducers(), withMiddlewareDevtools(applyMiddleware(thunk)));

ReducerManager.store = store;
