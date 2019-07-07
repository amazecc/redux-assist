import { clientRunSaga } from "./store";
import { config } from "./main";
import { proxy } from "../utils/proxy";

export function register<T extends object>(methodObj: T): T {
    return proxy(methodObj, value => {
        if (value instanceof Function) {
            return (...args: any[]) => {
                clientRunSaga(function*() {
                    try {
                        yield* value.apply(methodObj, args);
                    } catch (error) {
                        config.sagaErrorHandler!(error);
                    }
                });
            };
        } else {
            return value;
        }
    });
}
