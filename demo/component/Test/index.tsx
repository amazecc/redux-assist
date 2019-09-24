import { Test } from "./component";
import { register, Module, helper } from "../../../src";
import { State } from "./type";
import { RootState } from "../../type";

const { loading } = helper;

const initialState: State = {
    num: 0,
    arr: []
};

const delay = (d: number) => new Promise(resolve => setTimeout(resolve, d));

class TestMain extends Module<State, RootState> {
    a=0

    @loading("loading +1")
    async add(numm: number) {
        console.log("==> jiashu", numm);
        const { num } = this.state;
        await delay(1000);
        this.setState({ num: num + 1 });
    }

    @loading("loading -1")
    async minus() {
        const { num } = this.state;
        await delay(1000);
        this.setState({ num: num - 1 });
    }

    @loading("loading reset")
    async reset() {
        await delay(1000);
        this.resetState();
    }

    @loading("push random number")
    async pushList() {
        const { arr } = this.state;
        await delay(1000);
        this.setState({ arr: [...arr, Math.floor(Math.random() * 100)] });
    }

    async getRootState() {
        await console.log(this.rootState);
    }

    @loading("trigger error")
    async error() {
        await delay(1000);
        throw new Error("发生异常");
    }
}

const actions = register(new TestMain("TestMain", initialState));

console.log("==> a", actions);

actions.a = 1;

export { Test, actions };
