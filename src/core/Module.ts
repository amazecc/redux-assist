import { store } from "./store";
import { setStateActionCreator } from "./action";

export class Module<S extends object, R extends object = {}> {
    constructor(protected readonly moduleName: string, protected readonly initialState: S) {}

    public resetState() {
        store!.dispatch(setStateActionCreator(this.moduleName, this.initialState));
    }

    protected setState(state: Partial<S>) {
        store!.dispatch(setStateActionCreator(this.moduleName, state));
    }

    protected get state() {
        return store!.getState().root[this.moduleName] as Readonly<S>;
    }

    protected get rootState() {
        return (store!.getState() as unknown) as Readonly<R>;
    }
}
