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

以模块为管理单元，一个模块使用一个 Module 类来管理 `store` 中的值，`Module` 类中提供了获取，修改，重置该模块数据的方法，如下：

```js
const initialState: State = {
    num: 0,
    list: []
};

class TestMain extends Module<State, RootState> {
    async getState(numm: number) {
    	//	获取当前模块的数据
        conso.log(this.state);
    }

    async getRootState() {
    	// 获取 store 中所有的数据
        console.log(this.rootState);
    }

    async setCurrentState() {
        // 异步请求数据后，可存入 store 中
        this.setState({ num: 1 });
    }

    async reset() {
  		// 重置当前模块的数据
        this.resetState();
    }

    // 异步案例
    async getList() {
        const list = await API.getlist();
        this.setState({ list });
    }
}

export const actions = register(new TestMain("TestMain" /* 模块名 */, initialState /* 模块初始值 */));
```

每创建一个 `Module` 子类的实例，就会在 `store` 中创建一个命名空间，所有的模块全部放在 `root` 命名空间中，以上在 `store` 中的结构为：

```js
{
	root: {
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

interface StateProps {
	number: number
}

interface Props extends StateProps {}

class TestComponent extends React.PureComponent<Props> {
    render() {
        return <button onClick={() => actions.getList()}>获取列表</button>;
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return { num: state.root.TestMain.num };
};

export const Test = connect(mapStateToProps)(TestComponent);
```

# API

### Module (Class)

该类提供操作 `store` 的方法，主要提供了以下功能：

- 	**setState**: Function

	更新模块中的数据，里面直接使用了 `store.dispatch`，所以是同步的
    
-   **resetState**: Function

    以初始值重置该模块内的数据；可传入字段数组，代表跳过这些字段值的重置，例：`this.resetState(["num"])`，表示除去 `num` 字段，其他字段都重置为初始值

-   **state**: Getter

  	获取当前模块中的数据

-   **rootState**: Getter

    获取 `store` 中的所有数据

### register (Function)

主要作用为代理 `Modulel` 子类方法的执行，实现了获取所有类方法的异常，易于统一处理异常信息

```js
const actions = register(new TestMain("TestMain", initialState));

actions.getList(); // 为包含全局错误捕获程序的方法，这种用法用在 Module 子类外部

actions._pure_.getList(); // 不包含全局错误捕获程序的方法，这种方法用在 Module 子类内部，比如在其他模块内调用该方法
```

### reducerManager

通过 `reducerManager.injectReducers(reducers)` 可动态插入 `reducer`，实现模块数据的按需加载，一般用于兼容 `redux` 原始写法

当前使用 ` register(new TestMain("TestMain" /* 模块名 */, initialState /* 模块初始值 */));` 的方式本就实现了动态注入模块数据，`reducerManager` 可理解为动态注入其他 `reducer`

### createStore

创建 `store` 实例

- **initialState**: object

	`store` 初始值，必须为 `{ root: {...} }`, 因为所有的模块数据都在 `root` 命名空间内
	
- **middleware**: Array

	`redux` 中间件
	
- **onError**: Function

	所有 `Module` 子类方法的全局错误捕获函数

```js
const store = createStore({
    initialState: { root: { a: 321 } },
    middleware: [middleware1, middleware2],
    onError(error: any) {
        console.error("[[捕获错误]]：", error);
    }
})
```

### 

### helper

辅助方法集合，主要有一下方法：

-   **getLoading**: Function

    获取 `loading` 参数的值
    
    ```js
    helper.getLoading("loading") // "loading" 字符串 为 helper.loading 设置的值
    ```

-   **setLoading**: Function

    设置 `loading` 参数的值
    
    ```js
    helper.setLoading("loading") // 设置 "loading" 字段的值
    ```

-   **loading**: Decorator

    该方法为装饰器，使用在 Module 子类类方法，用于异步请求时，设置一个加载中的变量，组件可根据该变量的值，显示加载中的UI，用法如下：

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
