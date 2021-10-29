import type { Module } from "../core/Module";

export const bindThis = <M extends Module<any>>(moduleInstance: M) =>
    new Proxy(moduleInstance, {
        get(target, p: string | symbol, receiver: any) {
            if (target[p] instanceof Function) {
                return target[p].bind(target);
            }
            return Reflect.get(target, p, receiver);
        },
    });
