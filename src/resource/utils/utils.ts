import type { Module } from "../core/Module";

/** Module 类方法的安全 this 绑定 */
export const bindThis = <M extends Module<any>>(moduleInstance: M) =>
    new Proxy(moduleInstance, {
        get(target, p: string | symbol, receiver: any) {
            if (target[p] instanceof Function) {
                return target[p].bind(target);
            }
            return Reflect.get(target, p, receiver);
        },
    });
