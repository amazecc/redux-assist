import * as React from "react";
// import { connect } from "react-redux";

// interface Props {
//     state: RootState;
// }

export class Test extends React.PureComponent {
    render() {
        return (
            <div style={{ padding: 20 }}>
                <button style={{ marginRight: 10 }}>add 1</button>
                <button style={{ marginRight: 10 }}>minus 1</button>
                <button style={{ marginRight: 10 }}>push random number</button>
                <button style={{ marginRight: 10 }}>reset module data</button>
                <button style={{ marginRight: 10 }}>get root state</button>
                <button style={{ marginRight: 10 }}>trigger error</button>
                <div style={{ marginTop: 20 }}>
                    <pre>{JSON.stringify({}, null, 4)}</pre>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = (state: RootState) => {
//     return { state };
// };

// export const Test = connect(mapStateToProps)(TestBase);
