import { Demo } from ".";
import { Module, Loading, bindThis } from "../../resource";
import { State } from "./state";
import { store } from "../store";

const initialState: State = {
    num: 0,
    arr: [],
};

const delay = (d: number) => new Promise(resolve => setTimeout(resolve, d));

class DemoModule extends Module<State> {
    @Loading("loading +1")
    async add() {
        const { num } = this.state;
        await delay(1000);
        this.setState({ num: num + 1 });
    }

    @Loading("loading -1")
    async minus() {
        const { num } = this.state;
        await delay(1000);
        this.setState({ num: num - 1 });
    }

    @Loading("loading reset")
    async reset() {
        await delay(1000);
        this.resetState();
    }

    @Loading("push random number")
    async pushList() {
        const { arr } = this.state;
        await delay(1000);
        this.setState({ arr: [...arr, Math.floor(Math.random() * 100)] });
    }

    async getRootState() {
        console.log(this.globalState);
    }

    @Loading("trigger error")
    async error() {
        await delay(1000);
        throw new Error("发生异常");
    }
}

const actions = bindThis(new DemoModule("demoModule", initialState, store));

export { Demo as Test, actions };
