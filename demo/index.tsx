import * as React from "react";
import * as ReactDOM from "react-dom";
import { Test } from "./component/Test";
import { store, Provider, reducerManager, config } from "../src";
import { AnyAction } from "redux";

config.errorHandler = (error: any) => {
    console.error("[[捕获错误]]：", error);
};

setTimeout(() => {
    const initialState = {
        number: 0
    };

    reducerManager.injectReducers({
        injectTest(state: object = initialState, action: AnyAction) {
            if (action.type === "inject") {
                return { ...state, ...action.payload };
            }
            return state;
        }
    });
}, 1000);

const App = () => {
    return (
        <Provider store={store}>
            <button
                style={{marginLeft: 20}}
                onClick={() => {
                    store.dispatch({
                        type: "inject",
                        payload: {
                            number: ((store.getState() as any).injectTest.number as number) + 1
                        }
                    });
                }}
            >
                test inject reducer
            </button>
            <Test />
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
