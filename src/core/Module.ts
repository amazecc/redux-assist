import { clientStore } from "./store";
import { getSetStateAction } from "./action";

export class Module<S extends object, R extends object = {}> {
    constructor(protected readonly moduleName: string, protected readonly initialState: S) {
        this.setState.call(this, initialState);
    }

    protected setState(state: Partial<S>) {
        clientStore.dispatch(getSetStateAction(this.moduleName, state));
    }

    protected resetState() {
        clientStore.dispatch(getSetStateAction(this.moduleName, this.initialState));
    }

    protected get state(): Readonly<S> {
        return clientStore.getState()[this.moduleName] as S;
    }

    protected get rootState(): Readonly<R> {
        return clientStore.getState() as R;
    }
}
