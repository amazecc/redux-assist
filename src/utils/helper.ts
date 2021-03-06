import { store } from "../core/store";
import { loadingKey } from "../core/ReducerManager";
import { loadingActionCreator } from "../core/action";
import { asyncDecoratorCreator } from "./decorator";

export const helper = {
    getLoading(field: string): boolean | undefined {
        return store!.getState()[loadingKey][field];
    },
    setLoading(loadings: { [k: string]: boolean }) {
        store!.dispatch(loadingActionCreator(loadings));
    },
    loading(field: string) {
        return asyncDecoratorCreator(async fn => {
            try {
                store!.dispatch(loadingActionCreator({ [field]: true }));
                return await fn();
            } finally {
                await store!.dispatch(loadingActionCreator({ [field]: false }));
            }
        });
    }
};
