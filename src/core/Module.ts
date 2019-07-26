import { store } from "./store";
import { setStateActionCreator } from "./action";

export class Module<S extends object, R extends object = {}> {
    constructor(protected readonly moduleName: string, protected readonly initialState: S) {
        this.setState(initialState);
    }

    public resetState() {
        store.dispatch(setStateActionCreator(this.moduleName, this.initialState));
    }

    protected setState(state: Partial<S>) {
        store.dispatch(setStateActionCreator(this.moduleName, state));
    }

    protected get state(): Readonly<S> {
        return store.getState().root[this.moduleName] as S;
    }

    protected get rootState(): Readonly<R> {
        return store.getState() as R;
    }
}
