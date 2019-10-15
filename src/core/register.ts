import { config } from "../utils/config";
import { store } from "./store";
import { proxy } from "../utils/proxy";
import { Module } from "./Module";
import { PickType } from "../type";

interface PureActions<T> {
    /**
     * Used in other modules, does not contain exception catchers
     */
    _pure_: PickType<T, (...args: any[]) => void>;
}

export const modulesCreatedBeforeStore: Array<() => void> = [];

export function register<T extends Module<any>>(methodObj: T): T & PureActions<T> {
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
