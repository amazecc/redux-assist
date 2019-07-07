import * as React from "react";
import { Provider } from "react-redux";
import { clientStore } from "./store";
import { getInitialAction } from "./action";

export const config = {
    set initialState(state: { [k: string]: any }) {
        clientStore.dispatch(getInitialAction(state));
    },
    sagaErrorHandler(error: any) {
        if (process.env.NODE_ENV === "development") {
            console.error(`[[ saga-assist caught exception ]]:\n`, error);
        } else {
            throw error;
        }
    }
};

// HOC component for connect to store
export const withStore = <T extends any>(option?: Partial<typeof config>) => (C: React.ComponentType<T>) => {
    if (option) {
        Object.assign(config, option);
    }
    return (props: T) => (
        <Provider store={clientStore}>
            <C {...props} />
        </Provider>
    );
};
