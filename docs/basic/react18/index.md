# React

##　React的事件和普通HTML事件有什么不同?

区别：
 对于事件命名方式，原生事件全小写，React事件采用小驼峰。<br/>

 对于事件处理函数，React事件为函数，不能采用`return false`的方式来阻止浏览器的默认行为，必须明确的调用`preventDefault()`

 `合成事件`是React模拟原生DOM事件所有能力的一个事件对象，优点如下:
 
 `兼容所有浏览器，更好的跨平台`

 `将事件统一存放在一个数组，避免频繁的新增与删除(垃圾回收)`

 `方便 React 统一管理和事务机制`

 `事件的执行顺序是原生事件先执行，合成事件后执行，合成事件回冒泡绑定到document上`

## React组件中事件代理及原理

React基于`虚拟DOM` 实现了一个`合成事件层`,定义的事件处理器回接收到一个合成事件对象的实例，它符合W3C标准，且与原生的浏览器事件拥有相同的接口，支持冒泡机制，所有的事件都绑定在最外层上。<br/>

在React最底层，主要对合成事件做了两件事：
 
`事件委派`: React会把所有的事件绑定到结构的最外层，使用统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部事件监听和处理函数
`自动绑定`: React组件中，每个方法的上下文都会指向该组件的实例，及自动绑定this为当前组件

##　React高阶组件、Render props、hooks 有什么区别，为什么要不断迭代？

这三者是目前React解决代码复用的主要方式：

`高阶组件(HOC)`是React中用于复用组件逻辑的一种高级技巧。高阶组件是参数为组件，返回值为新组件的函数,HOC是纯函数，没有副作用。



`reder props` 是指一种在React组件之间使用一个值为函数的props共享代码的简单技术。用于告知组件需要渲染什么内容的函数prop.

## React心智模型

每当应用状态发生变化时，React就会重新渲染。然而，有时React可能会`过于“反应灵敏`，导致不必要的重新渲染，从而降低应用的性能。

### 重新渲染的困境
React 对应用状态变化的快速响应能力是一把双刃剑。一方面，由于其声明式方法，它简化了前端开发。另一方面，它可能导致 UI 中组件对状态变化的过度重新渲染。

当处理如`对象和数组`这样的 JavaScript 数据结构时，重新渲染问题尤为常见。问题在于，JavaScript中没有一种计算效率高的方法来比较两个对象或数组是否相等（即具有相同的键和值）。

考虑以下场景：有一个React组件，它在每次渲染时都会生成一个新的对象或数组，如下所示：

```js
import React from "react";
const AlphabetList = () => {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); 
  // A-Z
  return (
    <div>
      <h2>Alphabet List</h2>
      <ul>
        {
            alphabet.map((letter, index) => (
                <li key={letter + index}>{letter}</li>
            ))
        }
      </ul>
    </div>
  );
};
export default AlphabetList;
```

为了优化这种情况并减少不必要的重新渲染，React 开发人员可以利用`记忆化技术`。记忆化`允许缓存基于特定输入的计算结果或组件输出，并在输入未变时直接复用这些结果`。这种方法`能够显著减少组件的重新渲染次数，提高 React 应用的整体性能和效率`。

React18提供了一下记忆工具来帮助我们实现这一目标:
+ `React.memo()`：一个`高阶组件`，允许`基于props的浅比较`来避免组件的重新渲染，`只要props没有发生变化`。
+ `useMemo(`)：用于在`组件重新渲染之间缓存计算的结果`。只有`当依赖项之一发生变化,时`，useMemo()才会重新计算并返回新的结果。 **可用于记忆化数组的引用，重新渲染时不会重新被创建**
+ `useCallback()`：用于缓存函数的定义，确保在`依赖项未变时不会重新创建函数`。

```js
import React from "react";
const AlphabetList = () => {
  const alphabet = useMemo(() => {
    return  Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); 
  }, [])
  // A-Z
  return (
    <div>
      <h2>Alphabet List</h2>
      <ul>
        {
            alphabet.map((letter, index) => (
                <li key={letter + index}>{letter}</li>
            ))
        }
      </ul>
    </div>
  );
};
export default AlphabetList;
```

## React的规则

+ `幂等性原则`: React组件在接收到`相同的输入（包括props、state和context）`时，应始终产生`一致的输出`。
+ `副作用外部化`: 副作用操作（如数据获取、订阅或DOM更新）`不应嵌入在组件的渲染流程中`。它们应被放置在如`useEffect`等生命周期 Hook 中执行。
+ `不可变props与state`： React组件中的`props和state应被视为不可变`。直接修改它们可能导致错误和不可预测的行为。
+ `Hooks参数与返回值的不变性`: 一旦值被传递给 React Hooks，它们应保持不变。Hooks依赖其参数和返回值的稳定性来确保组件行为的一致性和可预测性。
+ `不可变JSX值`: 在 JSX 渲染后，不应修改其中使用的值。任何必要的修改应在JSX创建之前进行，以确保渲染结果的稳定性。
+ `组件函数的使用限制`：React组件应通过JSX使用，而非直接作为普通函数调用。
+ `Hooks的正确使用`：`React Hooks（如useState和useEffect）应仅在函数组件内部使用`。将它们作为普通值传递可能会导致不符合预期的行为并违反Hooks的使用规则。
+ `只在顶层调用hooks`：React hooks 应该始终在函数组件的顶层调用，即在任何条件语句或循环之前。这确保了hooks在每次渲染时都以相同的顺序被调用，并保持其预期的行为。