import { config } from "../utils/config";
import { proxy } from "../utils/proxy";
import { Module } from "./Module";

export const registeredAllModule: Array<Module<any>> = [];

export function register<T extends Module<any>>(methodObj: T): T {
    registeredAllModule.push(methodObj);
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
