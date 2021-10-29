import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Test } from "./Demo/Module";
import { store } from "./store";

const App = () => {
    return (
        <Provider store={store}>
            <Test />
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
