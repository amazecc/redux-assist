import { createStore as createStoreRedux } from "redux";
import { withDevtools } from "../utils/redux_devtools";
import { Action, ActionType } from "./action";

export const loadingKey = "@@default_key/loading";

export const rootState: object = {
    [loadingKey]: {}
};

function reducer(state = rootState, action: Action) {
    switch (action.type) {
        case ActionType.INITIAL_STATE:
            return { ...state, ...action.payload };
        case ActionType.SET_STATE:
            return { ...state, [action.module!]: { ...state[action.module!], ...action.payload } };
        case ActionType.LOADING_STATE:
            return { ...state, [loadingKey]: { ...state[loadingKey], ...action.payload } };
        default:
            return state;
    }
}

export function createStore() {
    return createStoreRedux(reducer, withDevtools);
}

export const store = createStore();
