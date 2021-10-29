import { compose } from "redux";
import type { StoreEnhancer } from "redux";

/** 有中间件的情况下使用 */
export const withDevtools = (enhancer: StoreEnhancer) => {
    const composeEnhancers = (globalThis as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return composeEnhancers(enhancer);
};
