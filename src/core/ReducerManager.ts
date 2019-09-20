import { combineReducers, Reducer, Store, ReducersMapObject } from "redux";
import { Action, ActionType } from "./action";

interface DefaultReducers {
    root: Reducer<object, Action>;
    "@@default_key/loading": Reducer<object, Action>;
}

export const loadingKey = "@@default_key/loading";

export class ReducerManager {
    static store: Store | null;

    private readonly reducers: DefaultReducers;

    constructor() {
        this.reducers = {
            [loadingKey]: this.loadingReducer,
            root: this.coreReducer
        };
    }

    private coreReducer(state = {}, action: Action) {
        if (action.type === ActionType.SET_STATE) {
            return { ...state, [action.module!]: { ...state[action.module!], ...action.payload } };
        }
        return state;
    }

    private loadingReducer(state = {}, action: Action) {
        if (action.type === ActionType.LOADING_STATE) {
            return { ...state, ...action.payload };
        }
        return state;
    }

    private checkNoRepeatReducer(reducers: ReducersMapObject) {
        const reducersKeys = Object.keys(reducers);
        const extitKeys = Object.keys(this.reducers);
        const repeatKeys = reducersKeys.filter(_ => extitKeys.includes(_));
        if (repeatKeys.length > 0) {
            throw new Error(`reducer { ${repeatKeys.join(",")} } is already exists`);
        }
        return repeatKeys.length === 0;
    }

    public getReducers() {
        return combineReducers(this.reducers);
    }

    public injectReducers(reducers: ReducersMapObject) {
        if (this.checkNoRepeatReducer(reducers)) {
            Object.assign(this.reducers, reducers);
            ReducerManager.store!.replaceReducer(combineReducers(this.reducers));
        }
    }
}
