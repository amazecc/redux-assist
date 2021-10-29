import { createStore as reduxCreateStore, applyMiddleware } from "redux";
import type { Reducer, Store as ReduxStore, Middleware, AnyAction } from "redux";
import type { Action } from "./action";
import { reducer } from "./reducer";
import { withDevtools } from "../utils/redux-devtools";

export const loadingReducerKey = "@@LOADING";

export type Reducers<S> = Reducer<S, Action>;

export type LoadingState = Record<string, boolean>;

export interface GlobalState {
    "@@LOADING": LoadingState;
}

export type Store = ReduxStore<GlobalState, AnyAction>;

interface Options {
    initialGlobalState?: GlobalState;
    middleware?: Middleware[];
    enableDevTools?: boolean;
}

export const createStore = (options?: Options): Store => {
    const enhancer = applyMiddleware(...(options?.middleware ?? []));
    const withMiddleware = options?.enableDevTools ? withDevtools(enhancer) : enhancer;
    return reduxCreateStore(reducer, options?.initialGlobalState, withMiddleware);
};
