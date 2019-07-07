import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../type";
import { sagas } from "../index";

interface Props {
    state: RootState;
}

export class TestBase extends React.PureComponent<Props> {
    render() {
        return (
            <div style={{ padding: 20 }}>
                <button style={{ marginRight: 10 }} onClick={() => sagas.add(22)}>
                    add 1
                </button>
                <button style={{ marginRight: 10 }} onClick={sagas.minus}>
                    minus 1
                </button>
                <button style={{ marginRight: 10 }} onClick={sagas.pushList}>
                    push random number
                </button>
                <button style={{ marginRight: 10 }} onClick={sagas.reset}>
                    reset module data
                </button>
                <button style={{ marginRight: 10 }} onClick={sagas.getRootState}>
                    get root state
                </button>
                <button style={{ marginRight: 10 }} onClick={sagas.error}>
                    trigger error
                </button>
                <div style={{ marginTop: 20 }}>
                    <pre>{JSON.stringify(this.props.state, null, 4)}</pre>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { state };
};

export const Test = connect(mapStateToProps)(TestBase);
