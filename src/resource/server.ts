import React from "react";
import { createStore } from "./core/store";
import { assignStateActionCreator } from "./core/action";
import type { GlobalState, Store } from "./core/store";

/** 合成 store，传入客户端 store 和初始值，返回不同端的不同 store */
export function useCreateStore(clientStore: Store, initialGlobalState: GlobalState) {
    return React.useMemo(() => {
        // 如果是 browser 环境
        if (typeof window === "object") {
            clientStore.dispatch(assignStateActionCreator(initialGlobalState));
            return clientStore;
        }
        // 服务端每次都生成一个新的 store
        return createStore({ initialGlobalState });
    }, [clientStore, initialGlobalState]);
}
