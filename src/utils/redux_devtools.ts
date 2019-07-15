import { StoreEnhancer } from "redux";

export const withDevtools = () => {
    const tools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    return tools && process.env.NODE_ENV === "development" ? tools() : undefined;
};

export const withMiddlewareDevtools = (enhancer: StoreEnhancer) => {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    return composeEnhancers && process.env.NODE_ENV === "development" ? composeEnhancers(enhancer) : enhancer;
};
