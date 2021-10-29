import type { Action as ReduxAction } from "redux";
import type { AnyPlainObject } from "../type";
import type { GlobalState } from "./store";

export type ActionType = "@@SET_LOADING" | `@@SET_STATE` | "@@INJECT_STATE" | "@@ASSIGN_STATE";

export interface Action extends ReduxAction<ActionType> {
    payload: AnyPlainObject;
    moduleName?: string;
}

/** 合并到全局状态 */
export const assignStateActionCreator = (payload: GlobalState): Action => ({
    type: "@@ASSIGN_STATE",
    payload,
});

/** 添加模块状态 */
export const injectStateActionCreator = (moduleName: string, payload: AnyPlainObject): Action => ({
    type: "@@INJECT_STATE",
    moduleName,
    payload,
});

/** 修改模块状态 */
export const setStateActionCreator = (moduleName: string, payload: AnyPlainObject): Action => ({
    type: "@@SET_STATE",
    moduleName,
    payload,
});

/** 内部使用的控制 loading 变量的 action */
export const loadingActionCreator = (payload: AnyPlainObject): Action => ({
    type: "@@SET_LOADING",
    payload,
});
