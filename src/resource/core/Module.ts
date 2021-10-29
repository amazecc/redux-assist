import produce from "immer";
import { injectStateActionCreator, setStateActionCreator } from "./action";
import type { Store } from "./store";
import type { AnyPlainObject } from "../type";

export abstract class Module<S extends AnyPlainObject = AnyPlainObject> {
    /**
     * 以上下文为 store 实例化 Module 子类
     * @description 在子类中实现
     */
    static instance?: (store: Store) => Module<any>;

    /** 模块名称，即 redux reducer 的名称 */
    readonly moduleName;

    /** 当前模块 reducer 的初始值 */
    private readonly initialState;

    /** 上下文 store */
    readonly store;

    constructor(moduleName: string, initialState: S, store: Store) {
        this.moduleName = moduleName;
        this.initialState = initialState;
        this.store = store;
        this.store.dispatch(injectStateActionCreator(this.moduleName, initialState));
    }

    protected get state() {
        return this.store.getState()[this.moduleName] as Readonly<S>;
    }

    protected get globalState() {
        return this.store.getState();
    }

    protected setState<K extends keyof S>(state: Pick<S, K> | ((draft: S) => void)) {
        const newState =
            state instanceof Function
                ? produce(this.state, state)
                : produce(this.state, draft => {
                      Object.assign(draft, state);
                  });
        this.store.dispatch(setStateActionCreator(this.moduleName, newState));
    }

    public resetState(skipFields?: Array<keyof S>) {
        const state = this.state;
        let finalState: S;
        if (skipFields && skipFields.length > 0) {
            const skipFieldsState = skipFields.reduce((prev, next) => {
                prev[next] = state[next];
                return prev;
            }, {} as Partial<S>);
            finalState = { ...this.initialState, ...skipFieldsState };
        } else {
            finalState = this.initialState;
        }
        this.setState(finalState);
    }
}
