import { config } from "./config";

type ProxyHandler = <T extends object>(obj: T, callback: (value: any) => T[keyof T]) => { before: T; after: T };

const createError = (errorInfo: { target: any; key: string; value: any }) => {
    return {
        errorMessage: "Prohibit update Module variables outside",
        ...errorInfo
    };
};

const proxyObjectHandler: ProxyHandler = (obj, callback) => {
    const after = new Proxy(obj, {
        get(target, key) {
            return callback.call(target, target[key as string]);
        },
        set(target, key, value, receiver) {
            // _pure_ created in file register.ts
            if (key !== "_pure_" && key in target) {
                config.errorHandler(createError({ target, key: key as string, value }));
            }
            return Reflect.set(target, key, value, receiver);
        }
    });
    return {
        before: obj,
        after
    };
};

const definePropertyHandler: ProxyHandler = (obj, callback) => {
    const after = { ...obj } as typeof obj;
    const prototype = Object.getPrototypeOf(obj);
    Object.setPrototypeOf(after, prototype);
    // property settings on the prototype
    Object.getOwnPropertyNames(prototype).forEach(key => {
        if (key !== "constructor") {
            Object.defineProperty(after, key, {
                get() {
                    return callback.call(obj, obj[key]);
                },
                set(value) {
                    config.errorHandler(createError({ target: obj, key: key as string, value }));
                }
            });
        }
    });
    // Its own property settings, make the behavior is the same as the Proxy
    Object.keys(after).forEach(key => {
        Object.defineProperty(after, key, {
            set(value) {
                config.errorHandler(createError({ target: obj, key: key as string, value }));
            }
        });
    });
    return {
        before: obj,
        after
    };
};

export const proxy = Proxy ? proxyObjectHandler : definePropertyHandler;
