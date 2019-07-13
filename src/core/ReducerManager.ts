import { combineReducers, Reducer, Store, ReducersMapObject } from "redux";
import { Action, ActionType } from "./action";

interface DefaultReducers {
    app: Reducer<object, Action>;
    "@@default_key/loading": Reducer<object, Action>;
}

export const loadingKey = "@@default_key/loading";

export class ReducerManager {
    static store: Store | null;

    private readonly defaultReducers: DefaultReducers;

    constructor() {
        this.defaultReducers = {
            [loadingKey]: this.loadingReducer,
            app: this.coreReducer
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
        const repeatKeys: string[] = [];
        const reducersKeys = Object.keys(reducers);
        const extitKeys = Object.keys(this.defaultReducers);
        reducersKeys.forEach(_ => extitKeys.indexOf(_) > -1 && repeatKeys.push(_));
        if (repeatKeys.length > 0) {
            throw new Error(`reducer ${repeatKeys.join(",")} 在 store 中已定义`);
        }
        return repeatKeys.length === 0;
    }

    getReducers() {
        return combineReducers(this.defaultReducers);
    }

    injectReducers(reducers: ReducersMapObject) {
        if (ReducerManager.store === null) {
            throw new Error("redux store 未初始化");
        }
        if (this.checkNoRepeatReducer(reducers)) {
            ReducerManager.store!.replaceReducer(
                combineReducers({
                    ...this.defaultReducers,
                    ...reducers
                })
            );
        }
    }
}
