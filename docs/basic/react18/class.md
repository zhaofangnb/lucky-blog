# 类组件

## 关于React re-render问题

不管是函数组件还是类组件， Parent组件的状态发生变化，都会引起子组件的重新渲染。

```jsx
const Child = () => <div>render something here</div>;

const Parent = () => {
  const [counter, setCounter] = useState(1);

  return (
    <>
      <button onClick={() => setCounter(counter + 1)}>Click me</button>
      <!-- child will re-render when "counter" changes-->
      <Child />
    </>
  )
}
```

```jsx
class Child extends React.Component {
  render() {
    return <div>render something here</div>
  }
}

class Parent extends React.Component {
  super() {
    this.state = { counter: 1 }
  }

  render() {
    return <>
      <button onClick={() => this.setState({ 
        counter: this.state.counter + 1 
        })}>Click me</button>
      <!-- child will re-render when state here changes -->
      <Child />
    </>
  }
}
```

***如果想要在Child组件中，阻止父组件诱发的重新渲染，只需在子组件的`shouldComponentUpdate`中返回`false`***

```jsx
class Child extends React.Componnet {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return <div>render something here</div>
    }
}
```

***如果传一些`props`给Child组件中，当props变化了，实际上需要Child组件中重新渲染，`shouldComponentUpdate`提供了`nextProps`参数***

```jsx
class Child extends React.Componnet {
    shouldComponentUpdate(nextProps) {
        if(nextProps.someProps !== this.props.someProps) return true;
        return false;
    }
    render() {
        return <div>render something here</div>
    }
}
```

***同样， shouldComponentUpdate 也会在 state 变化之前被调用,并提供了`nextState`***


```jsx
class Child extends React.Componnet {
     constructor(props) {
        super(props);
        this.state = { somestate: 'nothing' }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.someProps !== this.props.someProps) return true;
        if(nextState.somestate !== this.state.somestate) return true;
        return false;
    }
    render() {
        return <div>render something here</div>
    }
}
```


## PureComponent
以上，为每个组件的props和state编写shouldComponentUpdate太繁琐，**如果我们想要 Child 组件阻止那些非必要的重新渲染，只需要`继承 PureComponent `即可**

```jsx
// extend PureComponent rather than normal Component
// now child component won't re-render unnecessary
class PureChild extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { somestate: 'nothing' }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ somestate: 'updated' })}>Click me</button>
        {this.state.somestate}
        {this.props.someprop}
      </div>
    )
  }
}
```

## React.memo()

众所周知，`父组件引起的重新渲染一直都是存在的`，它们的行为和 class 组件完全一致：如果一个父组件发生了重新渲染，它的子组件也会发生重新渲染。但是`在函数组件中，我们不能使用 shouldComponentUpdate 或 PureComponent 去解决这些问题`。
----------------------------------------------------------------------------
在 props 方面，它的功能和 PureComponent 完全一致：当`某个子组件被 React.memo 包裹时，该子组件只在 props 发生变化时才进行重新渲染，而父组件的重新渲染并不会触发该子组件重新渲染`。-----------------基于props的浅比较。

```jsx
const Child = ({someProps}) => {
    const [something, setSomething] = useState('something');
    render() {
    return (
      <div>
        <button onClick={() => setSomething('updated')}>Click me</button>
        {somestate}
        {someprop}
      </div>
    )
  }
}
// Wrapping Child in React.memo - almost the same as extending PureComponent
export const PureChild = React.memo(Child);
```

## onClick会引起组件重新渲染

使用 React.memo 就会变得相对简单：我们只需将比较函数作为它的第二个参数：

```jsx
// exclude onClick from comparison
const areEqual = (prevProps, nextProps) => prevProps.someprop === nextProps.someprop;

export const PureChild = React.memo(Child, areEqual);
```
本质上，React.memo 集 PureComponent 和 shouldComponentUpdate 两者的能力为一体。使用起来特别方便。

另一个便利之处在于，我们不用像 shouldComponentUpdate 那样再做 state 对比。React.memo 和它的对比函数处理 props 即可，Child 组件的 state 不受影响。

## 记忆化

类组件可以将回调函数绑定到类的实例上， 且只创建一次回调函数，无论state如何变化，在父组件的所有重新渲染中，回调函数不变，也不会影响PureComponent 的 props 浅比较。

```jsx
class Parent extends React.Component {
  onChildClick = () => {
    // do something here
  }

  render() {
    return <PureChild someprop="something" onClick={this.onChildClick} />
  }
}
```

在函数组件中，不再有类的实例，一切都是函数，所以我们不能再给它绑定任何东西。但是，我们有其他方法去处理回调函数的引用，这取决于你的应用场景以及 Child 的不必要渲染引起的性能问题有多严重。

### useCallback
用 useCallback 包裹 onClick 函数，当 useCallback 的依赖不更新时，回调函数会被保持。


```jsx
const Parent = () => {
    const [counter, setCounter] = useState(1);
    const onChildClick = () => {
        if (counter > 100) return;
        //
    }
     // dependencies array is empty, so onChildClickMemo won't change during Parent re-renders
  const onChildClickMemo = useCallback(onChildClick, []);

   // depends on somestate now, function reference will change when state change
  const onChildClickMemo = useCallback(onChildClick, [counter]);

  return <PureChild someprop="something" onClick={onChildClickMemo} />
}
```

### setState
```jsx
const onChildClick = () => {
    if (counter > 100) return;
    setsetCounter(counter + 1);
}

=>>>>> 可改写为:

const onChildClick = () => {
    setsetCounter((counter) => {
        if (counter > 100) return;
        return counter + 1;
    });
}
```

这样，onChildClick 不需要依赖 counter， useCallback 也不需要依赖 state。

### 将state放在Ref中

Ref 对象只是一个在重新渲染之间保留的可变对象，非常类似于状态，但是：

+ 它是可变的
+ 它在更新时不触发重新渲染

```jsx
const Parent = () => {
  const [counter, setCounter] = useState(1);
  // creating a ref that will store our "mirrored" counter
  const mirrorStateRef = useRef(null);

  useEffect(() => {
    // updating ref value when the counter changes
    mirrorStateRef.current = counter;
  }, [counter])

  const onChildClick = () => {
    // accessing needed value through ref, not statej - only in callback! never during render!
    if (mirrorStateRef.current > 100) return;
    // do something here
  }

  // doesn't depend on state anymore, so the function will be preserved through the entire lifecycle
  const onChildClickMemo = useCallback(onChildClick, []);

  return <PureChild someprop="something" onClick={onChildClickMemo} />
}
```


