import { compose, StoreEnhancer } from "redux";

// TODO: 开发环境 redux 调试
export const withDevtools = <T>(middleware: StoreEnhancer<T>) => {
    try {
        const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        return process.env.NODE_ENV === "development" && composeEnhancers ? composeEnhancers(middleware) : middleware;
    } catch (error) {
        return middleware;
    }
};
