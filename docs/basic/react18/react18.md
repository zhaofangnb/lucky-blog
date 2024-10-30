
## 注意
`React 18`已经放弃了对`ie 11`的支持，如需兼容，需要回退到`React 17`版本

##　升级
新项目：直接用`npm` 或者 `yarn` 安装最新版依赖

React 18 中引入的新特性是使用现代浏览器的特性构建的，在IE中无法充分polyfill，比如micro-tasks

```js
npm i react react-dom --save
npm i @types/react @types/react-dom -D
```

旧项目: 先把依赖中的版本号改成最新，然后删掉node_modules文件夹，重新安装
```js
npm i
```

## 新特性

### Render API
为了更好的管理`root节点`，React 18 引入了一个新的 `root API`，新的 root API 还支持` new concurrent renderer（并发模式的渲染）`，它允许你进入`concurrent mode（并发模式）`。

```ts
// React 17
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const root = document.getElementById('root')!;
ReactDOM.render(<App />, root);

// React 18
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(<App />);
```

卸载组件:
```ts
// React 17
ReactDom.unmountComponentAtNode(root)
// React 18
root.unmount()
```

如果需要在`render`方法中使用回调函数:
```ts
// React 17
const root = document.getElementById('root')!
ReactDOM.render(<App />, root, () => {
  console.log('渲染完成');
});

// React 18
const AppWithCallback: React.FC = () => {
    useEffect(() => {
        console.log('渲染完成');
    }, [])
    return <App />
}
const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(<AppWithCallback />);
```

如果你的项目使用了`ssr服务端渲染`，需要把hydration升级为hydrateRoot
```ts
// React 17
import ReactDOM from 'react-dom';
const root = document.getElementById('root');
ReactDOM.hydrate(<App />, root);

// React 18
import ReactDOM from 'react-dom/client';
const root = document.getElementById('root')!;
ReactDOM.hydrateRoot(root, <App />);
```

如果你的项目使用了`TypeScript`，最值得注意的变化是，现在在`定义props类型`时，如果需要`获取子组件children`，那么你需要`显式的定义它`:
```ts
// React 17
interface MyButtonProps {
    color: string;
}
const MyButton: React.FC<MyButtonProps> = ({ children }) => {
    // 在 React 17 的 FC 中，默认携带了 children 属性
    return <div>{children}</div>;
}

export default MyButton

// React 18
interface MyButtonProps {
    color: string;
    children?: React.ReactNode;
}
const MyButton: React.FC<MyButtonProps> = ({ children }) => {
  // 在 React 18 的 FC 中，不存在 children 属性，需要手动申明
  return <div>{children}</div>;
};

export default MyButton;
```

### setState自动批处理
批处理是指为了获得更好的性能，在数据层，`将多个状态更新批量处理，合并成一次更新`（在视图层，将多个渲染合并成一次渲染）

> setState更新状态的2种写法

(1). setState(stateChange, [callback])                ------`对象式的`setState
 1.stateChange为状态改变对象(该对象可以体现出状态的更改)
 2.callback是```可选```的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
 ```js
 this.setState({
  count: count++；
 })
 ```
					
(2). setState(updater, [callback])                  ------`函数式的`setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到`state`和`props`。
            4.callback是`可选`的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
```js
this.setState((state, props) => {
  return {
    count: state.count++;
  }
})
```
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
				(1).如果新状态不依赖于原状态 ===> 使用对象方式
				(2).如果新状态依赖于原状态 ===> 使用函数方式
				(3).如果需要在setState()执行后获取最新的状态数据, 
					要在第二个callback函数中读取
```js
import React, { Component } from 'react';
export default class Demo extends Component {
  state = {
    count: 0
  }
  add = () => {
    // 对象式
    const { count }  = this.state；
    this.setState({
      count: count++
    });

    // 函数式
    this.setState((state, props) => {
      return {
        count: state.count++;
      }
    })
  }
  render () {
    return (
      <div>
        <h2>当前总和为: { this.state.count }</h2>
        <button onClick={ this.add }> 点击+1 </button>
      </div>
    )
  }
}
```


#### 在React 18 之前
在React 18 之前，我们`只在 React 事件处理函数 中进行批处理更新`。默认情况下，在promise、setTimeout、原生事件处理函数中、或任何其它事件内的更新都不会进行批处理：
```ts
// 1. React 事件处理函数
import React, { useState } from 'react'
const App: React.FC = () => {
    console.log('App组件被渲染了')
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)
    return (
        <button onClick= {() => {
            setCount1(count => count +1);
            setCount2(count => count +1);
            // 在React事件中被批处理
        }>
        {`count1 is ${count1}, count2 is ${count2}`}
        </button>
    )
}
export default App

// 2. setTimeout
import React, { useState } from 'react'
const App: React.FC = () => {
  console.log('App组件渲染了！');
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <div
      onClick={() => {
        setTimeout(() => {
          setCount1(count => count + 1);
          setCount2(count => count + 1);
        });
        // 在 setTimeout 中不会进行批处理
      }}
    >
      <div>count1： {count1}</div>
      <div>count2： {count2}</div>
    </div>
  );
};

export default App;

// 3. 原生js
import React, { useState } from 'react'
const App: React.FC = () => {
  console.log('App组件渲染了！');
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  useEffect(() => {
    document.body.addEventListener('click', () => {
      setCount1(count => count + 1);
      setCount2(count => count + 1);
    });
    // 在原生js事件中不会进行批处理
  }, []);
  return (
    <>
      <div>count1： {count1}</div>
      <div>count2： {count2}</div>
    </>
  );
};

export default App;
```

#### 在React 18 之中
在 `React 18 `上面的三个例子`只会有一次 render`，因为所有的更新都将自动批处理,多次更新始终合并为依次。

### flushSync

批处理是一个破坏性改动，如果你想`退出批量更新`，你可以使用 `flushSync`：
```ts
import React, { useState } from 'react';
import { flushSync } from 'react-dom';

const App: React.FC = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <div
      onClick={() => {
        flushSync(() => {
          setCount1(count => count + 1);
        });// 第一次更新
        flushSync(() => {
          setCount2(count => count + 1);
        });// 第二次更新
      }}
    >
      <div>count1： {count1}</div>
      <div>count2： {count2}</div>
    </div>
  );
};

export default App;
```

## 关于React组件的返回值
在 React 17 中，如果你需要`返回一个空组件，React只允许返回null`。如果你显式的返回了 undefined，控制台则会在运行时抛出一个错误。

在 React 18 中，不再检查因返回 undefined 而导致崩溃。`既能返回 null，也能返回 undefined`（但是 React 18 的dts文件还是会检查，只允许返回 null，你可以忽略这个类型错误）。

## 严格模式Strict Mode
当你`使用严格模式时，React 会对每个组件进行两次渲染，以便你观察一些意想不到的结果`。在 React 17 中，取消了其中一次渲染的控制台日志，以便让日志更容易阅读。
在 React 18 中，官方取消了这个限制。如果你安装了React DevTools，第二次渲染的日志信息将显示为灰色，以柔和的方式显式在控制台。
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7c1a0da9d824e2ba2ef7b9af32fbc91~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

##　Supense 不再需要 fallback 来捕获
```ts
// React 17
const App = () => {
  return (
    <Suspense fallback={<Loading />}> // <--- 这个边界被使用，显示 Loading 组件
      <Suspense>                      // <--- 这个边界被跳过，没有 fallback 属性
        <Page />
      </Suspense>
    </Suspense>
  );
};

export default App;
```

```ts
// React 18
const App = () => {
  return (
    <Suspense fallback={<Loading />}> // <--- 不使用
      <Suspense>                      // <--- 这个边界被使用，将 fallback 渲染为 null
        <Page />
      </Suspense>
    </Suspense>
  );
};

export default App;
```

## 新的API

###　useId
因为我们的服务器渲染时提供的 HTML 是无序的，useId 的原理就是每个 id 代表该组件在组件树中的层级结构
```ts
const id = useId()
```

### useSyncExternalStore

## 并发特性

### startTransition

```ts
import React, { useState, useEffect, useTransition } from 'react'

const App: React.FC = () => {
    const [list, setList] = useState<any[]>[];
    const [isPending, startTransition] = useTransition();
    useEffect(() => {
        //使用了并发特性，开启并发更新
        startTransition(() => {
            setList(new Array(10000).fill(null));
        });
    }, []);

    return (
        <>
        {
            list.map((_, i) => (
                <div key={i}>{i}</div>
            ))
        }
        </>
    );
};
export default App;
```

startTransition，主要为了能在大量的任务下也能保持 UI 响应。<br/>
`被startTransition 回调包裹的 setState 触发的渲染被标记为不紧急渲染，这些渲染可能被其他紧急渲染所抢占`。

### useDeferredValue
返回一个延迟响应的值，可以让一个state 延迟生效，只有当前没有紧急更新时，该值才会变为最新值。useDeferredValue 和 startTransition 一样，都是标记了一次非紧急更新。

相同：`useDeferredValue` 本质上和内部实现与 `useTransition` 一样，都是标记成了延迟更新任务。
不同：`useTransition` 是把更新任务变成了延迟更新任务，而 `useDeferredValue` 是产生一个新的值，这个值作为延时状态。（一个用来包装方法，一个用来包装值）

```ts
import React, { useState, useEffect, useDefferedValue } from 'react'
const App: React.FC = () => {
    const [list, setList] = useState<any[]>[];
    useEffect(() => {
        setList(new Array(10000).fill(null))
    }, [])
    // 使用了并发特性，开启并发更新
    const deferredList = useDeferredValue(list);
    return (
    <>
      {deferredList.map((_, i) => (
        <div key={i}>{i}</div>
      ))}
    </>
  );
}
export default App;
```

### 结论

并发更新的意义就是`交替执行`不同的任务，当预留的时间不够用时，`React `将线程控制权交还给浏览器，等待下一帧时间到来，然后继续被中断的工作

`并发模式`是实现`并发更新`的基本前提

`时间切片`是实现`并发更新`的具体手段

上面所有的东西都是基于 `fiber` 架构实现的，fiber为状态更新提供了可中断的能力

### 关于fiber
作为`架构`来说，在旧的架构中，Reconciler（协调器）采用递归的方式执行，无法中断，节点数据保存在递归的调用栈中，被称为` Stack Reconciler`，stack 就是调用栈；在新的架构中，`Reconciler（协调器）`是基于fiber实现的，节点数据保存在fiber中，所以被称为` fiber Reconciler`。


作为`静态数据结构`来说，每个fiber对应一个组件，保存了这个组件的类型对应的dom节点信息，这个时候，fiber节点就是我们所说的虚拟DOM。


作为`动态工作单元`来说，fiber节点保存了该节点需要更新的状态，以及需要执行的副作用。

