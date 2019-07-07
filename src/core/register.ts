import { config } from "./config";
import { proxy } from "../utils/proxy";

export function register<T extends object>(methodObj: T): T {
    return proxy(methodObj, value => {
        if (value instanceof Function) {
            return async (...args: any[]) => {
                try {
                    return await value.apply(methodObj, args);
                } catch (error) {
                    config.sagaErrorHandler!(error);
                }
            };
        } else {
            return value;
        }
    });
}
