import { Action as ReduxAction } from "redux";

export enum ActionType {
    "SET_STATE" = "SET_STATE",
    "LOADING_STATE" = "LOADING_STATE",
    "INITIAL_STATE" = "INITIAL_STATE"
}

export interface Action extends ReduxAction<ActionType> {
    module?: string;
    payload: object;
}

export const setStateActionCreator = <T extends object>(module: string, payload: Partial<T>) => ({
    type: ActionType.SET_STATE,
    module,
    payload
});

export const loadingActionCreator = (payload: object) => ({
    type: ActionType.LOADING_STATE,
    payload
});

export const initialActionCreator = (payload: { [k: string]: any }) => ({
    type: ActionType.INITIAL_STATE,
    payload
});
