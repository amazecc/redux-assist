import { compose, StoreEnhancer } from "redux";

export const withMiddlewareDevtools = <T>(middleware: StoreEnhancer<T>) => {
    try {
        const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        return composeEnhancers ? composeEnhancers(middleware) : middleware;
    } catch (error) {
        return middleware;
    }
};

export const withDevtools = () => {
    const tools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    return tools ? tools() : undefined;
};
