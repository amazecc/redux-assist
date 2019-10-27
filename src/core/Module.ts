import { store } from "./store";
import { setStateActionCreator } from "./action";

export class Module<S extends object, R extends object = {}> {
    constructor(protected readonly moduleName: string, protected readonly initialState: S) {
        if (store) {
            this.setState(initialState);
        }
    }

    public resetState(skipFields?: Array<keyof S>) {
        const state = this.state;
        let finalState: S;
        if (skipFields && skipFields.length > 0) {
            const skipFieldsState = skipFields.reduce(
                (prev, next) => {
                    prev[next] = state[next];
                    return prev;
                },
                {} as Partial<S>
            );
            finalState = { ...this.initialState, ...skipFieldsState };
        } else {
            finalState = this.initialState;
        }
        this.setState(finalState);
    }

    protected setState<K extends keyof S>(state: Pick<S, K>) {
        store!.dispatch(setStateActionCreator(this.moduleName, state));
    }

    protected get state() {
        return store!.getState().root[this.moduleName] as Readonly<S>;
    }

    protected get rootState() {
        return (store!.getState() as unknown) as Readonly<R>;
    }
}
