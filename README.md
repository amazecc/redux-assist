# saga-assist

`redux` + `redux-saga` 的集成，提高 `redux` 和 `redux-saga` 的使用体验，丢弃 `redux` 丑陋的模板代码，使得您更专注于项目本身。

`saga-assist` 只管理数据，只适用于 `React` 项目。

# 安装

     npm install --save saga-assist

或

     yarn add saga-assist

# 示例

```sh
git clone https://github.com/amazecc/saga-assist.git
cd saga-assign
yarn install
yarn start
```

# 管理 Store

`saga-assist` 以模块的方式管理 `Store`，每一个模块即为一个 `Module` 类，在该类中编写 `saga` 函数，处理当前模块的数据（`state`），如下：

### index.ts

```typescript
import { register, Module } from "saga-assist";
import { State } from "./type";
import { delay } from "redux-saga";
import { RootState } from "demo/type";

// 初始数据
const initialState: State = {
    num: 0,
    arr: []
};

class TestMain extends Module<State, RootState> {
    *pushList() {
        const { arr } = this.state;
        yield delay(1000);
        this.setState({ arr: [...arr, Math.floor(Math.random() * 100)] });
    }
}

const actions = register(new TestMain("TestMain", initialState));

export { actions };
```

在类中可通过 `this.state` 获取当前模块的数据，`this.rootState` 获取 `Store` 中所有数据，`this.setState` 可更新当前模块数据。

`register` 方法将初始数据按照模块名为 `TestMain` 存入到 `Store` 中，另外将 `saga` 函数自动绑定 `sagaMiddleware.run` 方法，使用时直接 `actions. pushList()` 就好，如下

### Test.tsx

```jsx
import * as React from "react";
import { sagas } from "../index";

class TestBase extends React.PureComponent<Props> {
    render() {
        return <button onClick={() => sagas.pushList()}>PushList</button>;
    }
}
```

# 接口

### withStore(options)(component)

> 将组件和 `redux` `Store` 链接起来。

-   **options**

    -   **initialState**: object

        -   设置 `Store` 初始值，常被用子服务端渲染

    -   **sagaErrorHandler**: () => void

        -   异常捕获，只捕获所有 `saga` 函数中的异常

-   **component**: React 组件

例子：

```jsx
const App = withStore({
    initialState: {
        TestMain: {
            num: 2,
            arr: [26]
        }
    },
    sagaErrorHandler(error) {
        console.error("[[ 异常 ]]", error);
    }
})(Test);

ReactDOM.render(<App />, document.getElementById("root"));
```

### register(new newModule("moduleName", initialState)): sagas

-   **newModule(moduleName, initialState)**
    -   **moduleName**: string - 模块名称
    -   **initialState**: object - 当前模块的初始数据

例子：

```js
const sagas = register(new TestMain("TestMain", initialState));
```

将会在 `store` 中产生以下数据:

```js
{
    ...,
    TestMain: initialState
}
```

### Module

用来编写 `saga` 函数，以处理异步请求，新模块继承该类以获得处理当前模块数据的能力，在 `typescript` 中，若想在类中获取当前模块和 `Store` 的类型，那么需要传入泛型变量：

```typescript
class TestMain extends Module<State, RootState> {
    *pushList() {
        const rootState = this.rootState; // 获取 Store 的值
        const { arr } = this.state; // 获取当前模块数据
        yield this.setState({ arr: [] }); // 更新等钱模块数据
        yield this.resetState(); // 以 initialState 重置当前模块数据
    }
}
```

### helper

该接口主要为辅助作用，主要是为了处理项目中 `loading` 加载中的效果，

-   **loading(key: string)**

    -   装饰器：传入 `key` 值，无论 `saga` 执行成功或者失败，该 `key` 的值都会经过下面的变化：`undefined -> true -> false`，通常在异步请求时，添加 `加载中` 效果很有用。
    -   该装饰器使用旧语法编写，尚未对 `TC39` 新规范进行测试。`babel` 中支持旧语法需要以下配置：

        ```sh
        {
            "plugins": [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
            ]
        }
        ```

        若想用 `TC39` 新规范，可自定义 `loading` 装饰器

        ```ts
            import {getLoadingAction} from "saga-assist";

            ...
            try {
                yield put(getLoadingAction({ [field]: true }));
                yield* fn(); // 类方法
            } finally {
                yield put(getLoadingAction({ [field]: false }));
            }
            ...
        ```

*   **getLoading(key: string): boolean | undefined** - 函数：获取 `key` 的值，通常可在 `mapStateToProps` 中可通过该该函数将该值传给组件。

*   **updateLoading({[key]: boolean})** - 函数：更新 `key` 的值。

    ```typescript
    import { helper } from "saga-assist";

    const { loading, getLoading, updateLoading } = helper;

    class TestMain extends Module<State, RootState> {
        @loading("push random number")
        *pushList() {
            const key = getLoading("push random number");
            yield delay(1000);
            const key = updateLoading({ "push random number": false });
        }
    }
    ```
