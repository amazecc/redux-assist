import { useSelector, shallowEqual } from "react-redux";
import { loadingReducerKey } from "./store";
import type { GlobalState } from "./store";
import type { AnyPlainObject } from "../type";

/** 获取 loading 字段值 */
export function useLoading(fieldName: string): boolean | undefined {
    return useSelector(globalState => globalState[loadingReducerKey][fieldName]);
}

export function useAppSelector<TSelected = unknown>(selector: (state: GlobalState) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean) {
    return useSelector<GlobalState, TSelected>(selector, equalityFn);
}

export function usePureAppSelector<TSelected extends AnyPlainObject>(selector: (state: GlobalState) => TSelected) {
    return useSelector<GlobalState, TSelected>(selector, shallowEqual);
}
