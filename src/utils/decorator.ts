import { SagaIterator } from "redux-saga";

type IterableIteratorFunction = (...args: any[]) => IterableIterator<any>;

type NormalFunction<T = void> = (...args: any[]) => T;

// typescript decorator for generator function
export const generatorDecoratorCreator = (intercept: (f: IterableIteratorFunction) => SagaIterator) => {
    return (target: object, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<IterableIteratorFunction>) => {
        const fn = descriptor.value;
        descriptor.value = function*(...args: any[]) {
            yield* intercept(fn!.bind(this, ...args));
        };
        return descriptor;
    };
};

// typescript decorator for normal function
export const decoratorCreator = (intercept: (f: NormalFunction) => SagaIterator) => {
    return (target: object, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<NormalFunction>) => {
        const fn = descriptor.value;
        descriptor.value = function(...args: any[]) {
            intercept(fn!.bind(this, ...args));
        };
        return descriptor;
    };
};

// TODO: TC39 new decorator
