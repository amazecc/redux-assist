import { State as TestMainState } from "./component/Test/type";

export interface RootState {
    root: {
        TestMain: TestMainState;
    };
}
