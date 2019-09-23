import * as React from "react";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";
import { Test } from "./component/Test";
import { createStore, reducerManager } from "../src";
import { AnyAction } from "redux";

const store = createStore({
    initialState: { root: { a: 321 } },
    middleware: [],
    onError(error: any) {
        console.error("[[捕获错误]]：", error);
    }
});

setTimeout(() => {
    reducerManager.injectReducers({
        injectTest(state = { number: 0 }, action: AnyAction) {
            if (action.type === "inject") {
                return { ...state, ...action.payload };
            }
            return state;
        }
    });

    reducerManager.injectReducers({
        injectTest2(state = { number: 2 }, action: AnyAction) {
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
                style={{ marginLeft: 20 }}
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
