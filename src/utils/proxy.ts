type ProxyHandler = <T extends object>(obj: T, callback: (value: any) => T[keyof T]) => T;

const proxyObjectHandler: ProxyHandler = (obj, callback) =>
    new Proxy(obj, {
        get(target, key) {
            return callback.call(obj, target[key as string]);
        }
    });

const definePropertyHandler: ProxyHandler = (obj, callback) => {
    const o = { ...obj } as typeof obj;
    Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).forEach(key => {
        if (key !== "constructor") {
            o[key] = obj[key];
            Object.defineProperty(obj, key, {
                get() {
                    return callback.call(o, o[key]);
                }
            });
        }
    });
    return obj;
};

export const proxy = Proxy ? proxyObjectHandler : definePropertyHandler;
