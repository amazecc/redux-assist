import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "src/resource";
import { actions } from "./Module";

interface StateProps {
    state: GlobalState;
    loading: boolean | undefined;
}

interface Props extends StateProps {}

export class DemoBase extends React.PureComponent<Props> {
    override render() {
        const { loading } = this.props;
        return (
            <div style={{ padding: 20 }}>
                <button style={{ marginRight: 10 }} onClick={() => actions.add()}>
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
                <div style={{ marginTop: 20 }}>
                    <pre>{JSON.stringify(this.props.state, null, 4)}</pre>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: GlobalState): StateProps => {
    return { state, loading: state["@@LOADING"]["loading +1"] };
};

export const Demo = connect(mapStateToProps)(DemoBase);
