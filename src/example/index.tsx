import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { Test } from "./Demo/Module";
import { store } from "./store";
// import { AnyAction } from "redux";

// TODO: 完成 reducer 的动态插入

const App = () => {
    React.useEffect(() => {
        // setTimeout(() => {
        //     reducerManager.injectReducers({
        //         injectTest(state = { number: 0 }, action: AnyAction) {
        //             if (action.type === "inject") {
        //                 return { ...state, ...action.payload };
        //             }
        //             return state;
        //         },
        //     });
        //     reducerManager.injectReducers({
        //         injectTest2(state = { number: 2 }, action: AnyAction) {
        //             if (action.type === "inject") {
        //                 return { ...state, ...action.payload };
        //             }
        //             return state;
        //         },
        //     });
        // }, 1000);
    }, []);

    return (
        <Provider store={store}>
            <button
                style={{ marginLeft: 20 }}
                onClick={() => {
                    // store.dispatch({
                    //     type: "inject",
                    //     payload: {
                    //         number: ((store.getState() as any).injectTest.number as number) + 1,
                    //     },
                    // });
                }}
            >
                test inject reducer
            </button>
            <Test />
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
