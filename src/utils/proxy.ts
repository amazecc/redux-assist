type ProxyHandler = <T extends object>(obj: T, callback: (value: any) => T[keyof T]) => T;

const proxyObjectHandler: ProxyHandler = (obj, callback) => {
    const proxyObj: typeof obj = new Proxy(obj, {
        get(target, key) {
            return callback.call(proxyObj, target[key as string]);
        }
    });
    return proxyObj;
};

const definePropertyHandler: ProxyHandler = (obj, callback) => {
    const o = {} as typeof obj;
    Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).forEach(key => {
        if (key !== "constructor") {
            o[key] = obj[key];
            Object.defineProperty(obj, key, {
                get() {
                    return callback.call(obj, o[key]);
                }
            });
        }
    });
    return obj;
};

export const proxy = Proxy ? proxyObjectHandler : definePropertyHandler;
