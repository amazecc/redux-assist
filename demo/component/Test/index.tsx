import { Test } from "./component";
// import { register, Module, helper } from "@src";
// import { State } from "./type";
// import { RootState } from "demo/type";

// const { loading } = helper;

// const initialState: State = {
//     num: 0,
//     arr: []
// };

// class TestMain extends Module<State, RootState> {
//     // @loading("loading +1")
//     *add() {
//         const { num } = this.state;
//         // yield delay(1000);
//         this.setState({ num: num + 1 });
//     }

//     // @loading("loading -1")
//     *minus() {
//         const { num } = this.state;
//         // yield delay(1000);
//         this.setState({ num: num - 1 });
//     }

//     // @loading("loading reset")
//     *reset() {
//         // yield delay(1000);
//         this.resetState();
//     }

//     // @loading("push random number")
//     *pushList() {
//         const { arr } = this.state;
//         // yield delay(1000);
//         this.setState({ arr: [...arr, Math.floor(Math.random() * 100)] });
//     }

//     *getRootState() {
//         yield console.log(this.rootState);
//     }

//     @loading("trigger error")
//     *error() {
//         // yield delay(1000);
//         throw new Error("发生异常");
//     }
// }

// const sagas = register(new TestMain("TestMain", initialState));

export { Test };
