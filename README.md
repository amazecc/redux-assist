# Redux-assist

对 redux 的一次封装，主要简化 redux 的使用，除去 action 与 reducer 的编写，可兼容原始用法，可动态注入 reducer，使用 Typescript 编写。

# 安装

```
npm i redux-assist

```

或

```
yarn add redux-assist

```

# 例子

根目录执行 `yarn start` 即可运行 demo。

# 简单使用

> `Typescript` 的使用请看 `demo`

以模块为管理单元，一个模块使用一个 Module 类来管理 `store` 中的值，`Module` 类中提供了获取，修改，重置该模块数据的方法，如下：

```js
const initialState = {
    num: 0,
    list: []
};

class TestMain extends Module {
    async getState(numm: number) {
        conso.log(this.state);
    }

    async getRootState() {
        console.log(this.rootState);
    }

    async setCurrentState() {
        // 异步请求数据后，可存入 store 中
        this.setState({ num: 1 });
    }

    async reset() {
        this.resetState();
    }

    // 异步案例
    async getList() {
        const list = await API.getlist();
        this.setState({ list });
    }
}

export const actions = register(new TestMain("TestMain", initialState));
```

每创建一个 `Module` 子类的实例，就会在 `store` 中创建一个命名空间，所有的模块全部放在 `app` 命名空间中，以上在 `store` 中的结构为：

```js
{
	app: {
		TestMain: {
			num: 0,
			list: []
		},
		// ... 其他模块
	}
}

```

该模块下的组件中使用异步方法：

```jsx
import { actions } from "path...";

class TestBase extends React.PureComponent {
    render() {
        return <button onClick={() => actions.getList()}>获取列表</button>;
    }
}

const mapStateToProps = state => {
    return { num: state.app.TestMain.num };
};

export const Test = connect(mapStateToProps)(TestBase);
```

# API

### Module (Class)

该类为数据与 `redux` 之间的桥梁，主要提供了以下功能：

- 	**setState**: Function

	更新模块中的数据，里面直接使用了 `store.dispatch`，所以是同步的
    
-   **resetState**: Function

    以初始值重置该模块内的数据

-   **state**: Getter

  	获取当前模块中的数据

-   **rootState**: Getter

    获取 `store` 中的所有数据

### register (Function)

主要作用为代理 `Modal` 子类方法的执行，实现了获取所有类方法的异常，易于统一处理异常信息

### store

`redux` `store`的实例

### reducerManager

通过 `reducerManager.injectReducers(reducers)` 可动态插入 `reducer`，实现模块数据的按需加载

### config

可以使用以下方式统一捕获 `Module` 子类方法的异常

```js
config.errorHandler = error => {
    console.error("[[捕获错误]]：", error);
};
```

### helper

辅助方法集合，主要有一下方法：

-   **getLoading**

    获取 `loading` 参数的值

-   **setLoading**

    设置 `loading` 参数的值

-   **loading**

    该方法为装饰器，使用在 Module 子类类方法，用于异步请求时，设置一个加载中的变量，组件可根据该变量的值，显示加载中的UI

---

关于 **helper** ，主要解决实际项目中的痛点，比如一个获取列表的例子，一般实现为，以下为伪代码：

```js
dispatch({
    type: "SET_LOADING",
    payload: {
        loading: true
    }
});

API.getList()
    .then(res => {
        dispatch({
            type: "SET_LOADING",
            payload: {
                loading: false
            }
        });
        // 将数据存入数据等其他操作...
    })
    .catch(error => {
        dispatch({
            type: "SET_LOADING",
            payload: {
                loading: false
            }
        });
        // ...其他错误处理
    });
```

以上的处理方式，很好的解决了根据 `API` 请求情况，显示不同的 UI，但是冗余代码比较多，代码编写比较杂乱，使用 **helper** 后可写成以下形式：

```js
const initialState = {
    list: []
};

class TestMain extends Module {
    // 异步案例
    @helper.loading("loading")
    async getList() {
        const list = await API.getlist();
        this.setState({ list });
    }
}
```

组件中获取 `loading` 参数：

```js

import { helper } from "redux-assist";

class TestBase extends React.PureComponent {
    render() {
        return this.props.loading ? "加载中..." : "内容"
    }
}

const mapStateToProps = state => {
    return { loading: helper.getLoading("loading) };
};

export const Test = connect(mapStateToProps)(TestBase);

```

`loading` 参数的值无论异步请求成功还是失败，都会经过以下值的变换：`undefined` -> `true` -> `false`
