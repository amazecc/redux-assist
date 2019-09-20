import { createStore as reduxCreateStore, applyMiddleware, Store, Middleware } from "redux";
import { withMiddlewareDevtools, withDevtools } from "../utils/redux_devtools";
import { ReducerManager } from "./ReducerManager";
import { registeredAllModule } from "./register";
import { config } from "../utils/config";
import { Action } from "./action";

export const reducerManager = new ReducerManager();

export let store!: Store<any, Action<any>>;

interface Options {
    initialState?: { root: object };
    middleware?: Middleware[];
    onError?: (error: any) => void;
}

export const createStore = (options: Options = {}) => {
    const withMiddleware = options.middleware && options.middleware.length > 0 ? withMiddlewareDevtools(applyMiddleware(...options.middleware)) : withDevtools();
    const storeInstance = reduxCreateStore(reducerManager.getReducers(), options.initialState, withMiddleware);
    ReducerManager.store = storeInstance;
    store = storeInstance;
    // initial state for all module
    registeredAllModule.forEach(_ => _.resetState());
    // set global error handler function
    if (options.onError) {
        config.errorHandler = options.onError;
    }
    return store;
};
