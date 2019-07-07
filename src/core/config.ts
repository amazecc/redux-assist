import { store } from "./store";
import { initialActionCreator } from "./action";

export const config = {
    set initialState(state: { [k: string]: any }) {
        store.dispatch(initialActionCreator(state));
    },
    sagaErrorHandler(error: any) {
        if (process.env.NODE_ENV === "development") {
            console.error(`[[ saga-assist caught exception ]]:\n`, error);
        } else {
            throw error;
        }
    }
};
