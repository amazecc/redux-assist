import { StoreEnhancer } from "redux";
import { isDevelopment } from "./utils";

export const withDevtools = () => {
    const tools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    return tools && isDevelopment() ? tools() : undefined;
};

export const withMiddlewareDevtools = (enhancer: StoreEnhancer) => {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    return composeEnhancers && isDevelopment() ? composeEnhancers(enhancer) : enhancer;
};
