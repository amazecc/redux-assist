import React from "react";
import { createStore } from "./core/store";
import { assignStateActionCreator } from "./core/action";
import type { GlobalState, Store } from "./core/store";

export function useCreateStore(clientStore: Store, globalState: GlobalState) {
    return React.useMemo(() => {
        // 如果是 browser 环境
        if (typeof window === "object") {
            clientStore.dispatch(assignStateActionCreator(globalState));
            return clientStore;
        }
        // 服务端每次都生成一个新的 store
        return createStore({ initialGlobalState: globalState });
    }, [clientStore, globalState]);
}
