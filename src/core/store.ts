import { createStore as reduxCreateStore, applyMiddleware, Store, Middleware } from "redux";
import { withMiddlewareDevtools, withDevtools } from "../utils/redux_devtools";
import { ReducerManager } from "./ReducerManager";
import { registerAllModule } from "./register";
import { config } from "./config";

export const reducerManager = new ReducerManager();

export let store!: Store;

interface Options {
    initialState?: object;
    middleware?: Middleware[];
    errorHandler?: (error: any) => void;
}

export const createStore = (options: Options = {}) => {
    const withMiddleware = options.middleware && options.middleware.length > 0 ? withMiddlewareDevtools(applyMiddleware(...options.middleware)) : withDevtools();
    const storeInstance = reduxCreateStore(reducerManager.getReducers(), options.initialState, withMiddleware);
    ReducerManager.store = storeInstance;
    store = storeInstance;
    // initial state for all module
    registerAllModule.forEach(_ => _.resetState());
    // set global error handler function
    if (options.errorHandler) {
        config.errorHandler = options.errorHandler;
    }
    return store;
};
