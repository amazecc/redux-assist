import { config } from "../utils/config";
import { store } from "./store";
import { proxy } from "../utils/proxy";
import { Module } from "./Module";

export const modulesCreatedBeforeStore: Array<() => void> = [];

export function register<T extends Module<any>>(methodObj: T): T & { _pure_: T } {
    // Store the module initialization method created before the store, execute after the store is created
    if (!store) {
        modulesCreatedBeforeStore.push(methodObj.resetState.bind(methodObj));
    }
    // Set proxy capture exception
    const { before: pureActions, after: actions } = proxy(methodObj, function(this: T, value) {
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
    return Object.assign(actions, { _pure_: pureActions });
}
