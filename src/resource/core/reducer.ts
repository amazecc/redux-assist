import type { Reducer } from "redux";
import type { GlobalState } from "./store";
import type { Action } from "./action";

/**
 * 全局 reducer
 * @description 此处不能使用 combineReducer 来组合，否则在创建 store 时，无法使用初始值初始化：
 * @see https://redux.js.org/api/createstore
 */
export const reducer: Reducer<GlobalState, Action> = (state = { "@@LOADING": {} } as GlobalState, action) => {
    if (action.type === "@@SET_LOADING") {
        return { ...state, "@@LOADING": { ...state["@@LOADING"], ...action.payload } };
    }
    if (action.type === "@@INJECT_STATE") {
        // 模块数据初始化不需要复制
        return { ...state, [action.moduleName!]: action.payload };
    }
    if (action.type === "@@SET_STATE") {
        // 没有做扩展覆盖操作是因为 payload 在 Module 中使用 immer 处理，发送的就是当前模块完整的数据，并且是新的引用
        return { ...state, [action.moduleName!]: action.payload };
    }
    // NOTE: 专门为 nextjs 服务端设计的 action，在 client 端，合并新页面的状态
    if (action.type === "@@ASSIGN_STATE") {
        return { ...state, ...action.payload };
    }
    return state;
};
