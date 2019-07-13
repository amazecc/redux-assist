import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../type";
import { actions } from "../index";
import { helper } from "../../../../src";

interface StateProps {
    state: RootState;
    loading: boolean | undefined;
}

interface Props extends StateProps {}

export class TestBase extends React.PureComponent<Props> {
    render() {
        const { loading } = this.props;
        return (
            <div style={{ padding: 20 }}>
                <button style={{ marginRight: 10 }} onClick={() => actions.add(22)}>
                    add 1 {loading ? "加载中..." : ""}
                </button>
                <button style={{ marginRight: 10 }} onClick={actions.minus}>
                    minus 1
                </button>
                <button style={{ marginRight: 10 }} onClick={actions.pushList}>
                    push random number
                </button>
                <button style={{ marginRight: 10 }} onClick={actions.reset}>
                    reset module data
                </button>
                <button style={{ marginRight: 10 }} onClick={actions.getRootState}>
                    get root state
                </button>
                <button style={{ marginRight: 10 }} onClick={actions.error}>
                    trigger error
                </button>
                <div style={{ marginTop: 20 }}>
                    <pre>{JSON.stringify(this.props.state, null, 4)}</pre>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return { state, loading: helper.getLoading("loading +1") };
};

export const Test = connect(mapStateToProps)(TestBase);
