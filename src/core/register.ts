import { config } from "./config";
import { proxy } from "../utils/proxy";
import { Module } from "./Module";

export const registerAllModule: Array<Module<any>> = [];

// TODO: Modal Class 内部通过 this.xxx 调用方法时，错误捕获处理
export function register<T extends Module<any>>(methodObj: T): T {
    registerAllModule.push(methodObj);
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
