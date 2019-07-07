import * as React from "react";
import * as ReactDOM from "react-dom";
import { Test } from "./component/Test";
import { store, Provider } from "../src";

const App = () => {
    return (
        <Provider store={store}>
            <Test />
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
