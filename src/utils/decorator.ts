type AsyncFunction = (...args: any[]) => Promise<any>;

type NormalFunction<T = void> = (...args: any[]) => T;

// typescript decorator for async function
export const asyncDecoratorCreator = (intercept: (f: AsyncFunction) => Promise<any>) => {
    return (target: object, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<AsyncFunction>) => {
        const fn = descriptor.value;
        descriptor.value = async function(...args: any[]) {
            await intercept(fn!.bind(this, ...args));
        };
        return descriptor;
    };
};

// typescript decorator for normal function
export const decoratorCreator = (intercept: (f: NormalFunction) => void) => {
    return (target: object, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<NormalFunction>) => {
        const fn = descriptor.value;
        descriptor.value = function(...args: any[]) {
            intercept(fn!.bind(this, ...args));
        };
        return descriptor;
    };
};

// TODO: TC39 new decorator
