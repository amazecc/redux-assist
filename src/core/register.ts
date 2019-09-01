import { config } from "./config";
import { proxy } from "../utils/proxy";

export function register<T extends object>(methodObj: T): T {
    return proxy(methodObj, function(this: T, value) {
        if (value instanceof Function) {
            return async (...args: any[]) => {
                try {
                    return await value.apply(this, args);
                } catch (error) {
                    config.errorHandler(error);
                }
            };
        } else {
            return value;
        }
    });
}
