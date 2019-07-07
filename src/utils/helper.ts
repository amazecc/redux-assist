import { clientStore, loadingKey } from "../core/store";
import { getLoadingAction } from "../core/action";
import { generatorDecoratorCreator } from "./decorator";
import { put } from "redux-saga/effects";

export const helper = {
    getLoading(field: string): boolean | undefined {
        return clientStore.getState()[loadingKey][field];
    },
    updateLoading(loadings: object) {
        return clientStore.dispatch(getLoadingAction(loadings));
    },

    loading(field: string) {
        return generatorDecoratorCreator(function*(fn) {
            try {
                yield put(getLoadingAction({ [field]: true }));
                yield* fn();
            } finally {
                yield put(getLoadingAction({ [field]: false }));
            }
        });
    }
};
