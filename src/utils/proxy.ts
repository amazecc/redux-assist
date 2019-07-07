type ProxyHandler = <T extends object>(obj: T, callback: (value: any) => T[keyof T]) => T;

const proxyObjectHandler: ProxyHandler = (obj, callback) =>
    new Proxy(obj, {
        get(target, key) {
            return callback(target[key as string]);
        }
    });

const definePropertyHandler: ProxyHandler = (obj, callback) => {
    const o = {} as typeof obj;
    // Object.getPrototypeOf support IE9 and higher: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf
    Object.keys(Object.getPrototypeOf(obj)).forEach(key => {
        if (obj[key] instanceof Function && key !== "constructor") {
            o[key] = obj[key];
            Object.defineProperty(obj, key, {
                get() {
                    return callback(o[key]);
                }
            });
        }
    });
    return obj;
};

export const proxy = Proxy ? proxyObjectHandler : definePropertyHandler;
