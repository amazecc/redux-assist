import { Action as ReduxAction } from "redux";

export enum ActionType {
    "SET_STATE" = "@@SET_STATE",
    "LOADING_STATE" = "@@LOADING_STATE"
}

export interface Action<A = ActionType> extends ReduxAction<A> {
    module?: string;
    payload: object;
}

export const setStateActionCreator = (module: string, payload: object) => ({
    type: ActionType.SET_STATE,
    module,
    payload
});

export const loadingActionCreator = (payload: object) => ({
    type: ActionType.LOADING_STATE,
    payload
});
