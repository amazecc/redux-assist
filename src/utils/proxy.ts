type ProxyHandler = <T extends object>(obj: T, callback: (value: any) => T[keyof T]) => { before: T; after: T };

const createError = () => new Error("[[ redux-assist caught exception]]: It is forbidden to set the variable of Module");

const proxyObjectHandler: ProxyHandler = (obj, callback) => {
    const after = new Proxy(obj, {
        get(target, key) {
            return callback.call(target, target[key as string]);
        },
        set() {
            throw createError();
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
                set() {
                    throw createError();
                }
            });
        }
    });
    // Its own property settings, the behavior is the same as the Proxy
    Object.keys(after).forEach(key => {
        Object.defineProperty(after, key, {
            set() {
                throw createError();
            }
        });
    });
    return {
        before: obj,
        after
    };
};

export const proxy = Proxy ? proxyObjectHandler : definePropertyHandler;
