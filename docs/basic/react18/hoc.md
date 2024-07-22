# HOC高阶组件

## 高阶组件产生的初衷
组件是把`prop`渲染成`UI`。 而高阶组件是将组件经过包装转换成另一个组件。

**我们先来思考一下高阶组件究竟解决了什么问题？**
+ `逻辑复用` 根据业务需求定制化专属的HOC,这样可以解决复用逻辑
+ `强化props` 高阶组件返回的组件，可以劫持上一层传过来的props,然后混入新的props,来增强组件的功能。
+ `赋能组件` HOC可以给被包裹的组件，提供一些拓展功能，比如额外的生命周期，额外的事件
+ `控制渲染` 劫持渲染是HOC一个特性，在`wrapComponent`包装组件中，可以对原来的组件，进行`条件渲染`，`节流渲染`，`懒加载`等功能

## 几种包装组件的方式
 ### 在有状态组件class中听过原型链继承来实现mixin

 ```js
const customMixin =  = {
    componentDidMount () {
        console.log('------componentDidMount------')
    }
    say () {
        console.log(this.state.name)
    }
}

function componentClassMixins (Component, mixin) {
    /**型链继承 */
    for (let key in mixin) {
        Component.prototype[key] = mixin[key]
    }
}

class App extends React.Component {
    constructor () {
        super()
        this.state = {
            name: '张三'
        }
    }
    render () {
        return (
            <div> hello,world
                <button onClick={ this.say.bind(this) } > to say </button>
            </div>
        )
       
    }
}

componentClassMixins(App, customMixin)
export default App
 ```


 ### extends继承模式

 ```js
 class BaseComp extends React.Component {
    constructor () {
        super ()
        this.state = {
            name: '张三'
        }
    }
    say () {
        console.log('base component')
    }

    render () {
        return (
            <div> hello,world 
                <button onClick={ this.say.bind(this) } >点击</button> 
            </div>
        )
    }
 }


 class App extends BaseComp {
    componentDidMount () {
        console.log(this.state.name)
    }
    say () {
        /* 会覆盖基类中的say()  */
        console.log('extends component')
    }
 }

 export default App
 ```

### HOC模式

```js
function HOC (Component) {
    return class wrapComponent extends React.Component {
        constructor () {
            super()
            this.state = {
                name: '张三'
            }
        }
        render = () => <Component {...this.props} {...this.state} />
    }
}
/** 装饰器模式 */
@HOC
class App extends React.Component{
    say () {
        const { name } = this.props
        console.log('name', name)
    }
    render () {
         return (
            <div> hello,world 
                <button onClick={ this.say.bind(this) } >点击</button> 
            </div>
         ) 
    }
}

export default App
```

### 自定义hooks模式
hooks的诞生，一大部分原因是`解决无状态组件没有state和逻辑难以复用问题`。hooks可以将一段逻辑封装起来，做到开箱即用

## 高阶组件的使用的编写结构

### 使用：装饰器模式和函数包裹模式

1.对于`class`声明的有状态组件，可以使用装饰器模式，对类组件进行包装:
```js
@withStyles(styles)
@withRouter
@keepaliveLifeCycle
class App extends React.Component {
    /** */
}
```

**包装顺序，越靠近Index组件的，就是越内层的HOC,离组件Index也就越近**

2.对于无状态组件(函数组件)：
 ```js
 function App ()  {
    /** */
 }

 export default withStyles(styles)(withRouter(keepaliveLifeCycle(App)))
 ```


 ### 模型: 嵌套HOC

 1.对于`不需要传递参数的HOC`，我们编写模型我们只需要嵌套一层就可以，比如withRouter,

 ```js
 function withRouter () {
    return class wrapComponent extends React.Component{
        /* 编写逻辑 */
    }
 }
 ```

 2. 对于`需要参数的HOC，我们需要一层代理`，如下：

```js

function connect (mapStateToProps) {
     /* 接受第一个参数 */
     return function connectdvance(wrapCompoent) {
        /* 接受组件 */
        return class WrapComponent extends React.Component { 

        }
     }
}
```

我们看出两种hoc模型很简单，对于代理函数，可能有一层，可能有很多层，不过不要怕，无论多少层本质上都是一样的，我们只需要一层一层剥离开，分析结构，整个hoc结构和脉络就会清晰可见。吃透hoc也就易如反掌。

## 两种不同的高阶组件

### 正向属性代理
 `用组件包裹一层代理组件`，在代理组件上，我们可以做一些，对源组件的代理操作。在`fiber tree` 上，先`mounted`代理组件，然后才是我们的业务组件。我们可以理解为`父子组件关系，父组件对子组件进行一系列强化操作`。

 ```js
 function HOC (Component) {
    return class wrapComponent extends React.Component {
        constructor () {
            super()
            this.state = {
                name: '张三'
            }
        }

        render(){
           return <Component  { ...this.props } { ...this.state }  />
       }
    }
 }
 ```

 优点: <br/>

+  ① 正常属性代理可以和业务组件低耦合，零耦合，对于`条件渲染`和`props属性增强`,只负责控制子组件渲染和传递额外的props就可以，所以无须知道，业务组件做了些什么。所以正向属性代理，更适合做一些开源项目的hoc，目前开源的HOC基本都是通过这个模式实现的。

+ ② 同样适用于`class`声明组件，和`function`声明的组件。

+ ③ 可以完全`隔离业务组件的渲染`,相比反向继承，属性代理这种模式。可以完全控制业务组件渲染与否，可以`避免反向继承带来一些副作用，比如生命周期的执行`。

+ ④ 可以嵌套使用，`多个hoc是可以嵌套使用的`，而且一般不会限制包装HOC的先后顺序。

缺点: <br/>

+ ① 一般无法直接获取业务组件的状态，如果想要获取，需要`ref获取组件实例`。

+ ② 无法直接继承静态属性。如果需要继承需要手动处理，或者引入第三方库。

```js
function HOC(Component) {
  return class wrapComponent extends React.Component{
     render(){
       return <Component { ...this.props } { ...this.state } />
     }
  }
}

class App extends  React.Component {
    render () {
        return <div> hello,world </div>
    }
}
App.say = function {
    console.log('my name is zhangsan')
}

const newApp = HOC(App)
console.log(newApp.say) //无法继承静态属性， 打印为undefind
```

### 反向继承
向继承和属性代理有一定的区别，在于`包装后的组件继承了业务组件本身`，所以我们我无须在去实例化我们的业务组件。当前高阶组件就是继承后，加强型的业务组件。这种方式类似于`组件的强化`。

```js
class App extends React.Component{
  render(){
    return <div> hello,world  </div>
  }
} 

function HOC(Component){
    return class wrapComponent extends Component{
         /* 直接继承需要包装的组件 */

    }
}

export default HOC(App) 
```

优点：<br/>
+ ① `方便获取组件内部状态`，比如`state`，`props` ,`生命周期`,`绑定的事件函数`等
+ ② es6继承可以良好`继承静态属性`。我们无须对静态属性和方法进行额外的处理。

```js
function HOC(Component) {
  return class wrapComponent extends Component{
     /* 直接继承需要包装的组件 */
  }
}

class App extends  React.Component {
    render () {
        return <div> hello,world </div>
    }
}
App.say = function {
    console.log('my name is zhangsan')
}

const newApp =  HOC(App) 
console.log(newApp.say)
/**
 * f () {
 *  my name is zhangsan
 * }
 */
```

缺点：
+ ① `无状态组件无法使用`。
+ ② `和被包装的组件强耦合`，需要知道被包装的组件的内部状态，具体是做什么？
+ ③ `如果多个反向继承hoc嵌套在一起，当前状态会覆盖上一个状态`。这样带来的隐患是非常大的，比如说有多个componentDidMount，当前componentDidMount会覆盖上一个componentDidMount。这样副作用串联起来，影响很大。

## 如何编写高阶组件
### 1.强化props
 + 混入props: 承接上层的`props`,再混入自己的`props`,来强化组件。

 [有状态组件（属性代理）]
 ```js
function classHOC(WrapComponent) {
     return class Index extends React.Component {
        state = {
            name: '张三'
        }
        componentDidMount() {
            console.log('HOC')
        }
        render () {
            return <WrapComponent {...this.props} {...this.state} />
        }
     }
}

function Index (props) {
    const { name } = props
    useEffect(() => {
        console.log('Index Component')
    }, [])

    return (
        <div>hi, my name is { name }</div>
    )
}

export default classHOC(Index)
 ```

 [同样也适用于无状态组件]

 ```js
function functionHOC (WrapComponent) {
    return function Index (props) {
        const [state, setState] = useState({ name: '张三'})
        return <WrapComponent {...props} {...state} /> 
    }
}
 ```
+ 抽离state控制更新
```js
 function classHOC (WrapComponent) {
    return class Index extends React.Compoennt {
        constructor () {
            super()
            this.state = {
                name: '张三'
            }
        }
        changeName(name) {
            this.setState({ name})
        }

        render() {
            return <WrapComponent {...this.props} {...this.state} changeName= {this.changeName.bind(this)} />
        }
    }
 }

 function Index (props) {
    const [ value, setValue ] = useState(null)
    const { name, changeName } = props

    return (
        <div>
            <div> hi, my name is { name } </div>
            修改name <input onChange= {(e) => setValue(e.target.value)} />
            <button onClick= {() => changeName(value)} >确定</button>
        </div>
    )
 }
 export default classHOC(Index)
```

### 2.控制渲染

+ 2.1 条件渲染

**`1.基础: 动态渲染`**
对于属性代理的HOC，虽然不能在内部操控渲染状态，但是可以在外层控制当前组件是否渲染，常应用于`权限隔离`,`懒加载`,`延时加载`

实现一个动态挂载组件的HOC:
```js
 function renderHOC (WrapComponent) {
    return class Index extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                visible: true
            }
        }
        setVisible () {
            this.setState({ visible: !this.state.visible})
        }
        render () {
            const { vivisble } = this.state
            return (
                <div className="box">
                    <button onClick={ this.setVisible.bind(this) }>挂载组件</button>
                    { 
                        visible 
                        ? 
                        <WrapComponent 
                            {...this.props} 
                            setVisible= { this.setVisible.bind(this)} 
                        /> 
                        :
                        <div className="icon"><SyncOutlined spin  className="theicon" /></div>
                    }
                </div>
            )
        }
    }
 }

 class Index extends React.Component {
    render () {
        const { setVisible } = this.props
        return (
            <div>
                <img src="" / >
                 <button onClick={() => setVisible()} > 卸载当前组件 </button>
            </div>
        )
    }
 }
```

**`2.进阶: 分片渲染`**

实现一个懒加载的HOC,可以实现组件的分片渲染,不至于一次渲染大量组件造成白屏：
```js
const renderQueue = []
let isFirstRender = false

const tryRender = () => {
    const render = renderQueue.shift() // 取第一个
    if (!render) return
    setTimeout(() => {
        render() // 执行
    }, 300)
}

function renderHOC (WrapComponent) {
    return function Index (props) {
        const [isRender, setRender] = useState(false)
        useEffect(()= > {
            renderQueue.push(() => {
                 /* 放入待渲染队列中 */
                 setRender(true)
            })
            if (!isFirstRender) {
                tryRender()
                isFirstRender = true
            }
        }, [])
         return
            isRender
            ?
            <WrapComponent tryRender={tryRender}  { ...props }  />
            : 
            <div className='box'><div className="icon" ><SyncOutlined   spin /></div></div>
    }
}

class Index extends React.Component {
    componentDidMount(){
        const { name , tryRender} = this.props
        /* 上一部分渲染完毕，进行下一部分渲染 */
        tryRender()
        console.log( name+'渲染')
    }

    render() {
        return <div>渲染的组件</div>
    }
}

const Item = renderHOC(Index)

export default () => {
    return <React.Fragment>
                <Item name="组件一" />
                <Item name="组件二" />
                <Item name="组件三" />
            </React.Fragment>
}
```

大致流程，初始化的时候，HOC中将渲染真正组件的渲染函数，放入renderQueue队列中，然后`初始化渲染一次`，接下来，`每一个项目组件，完成 componentDidMounted 状态后，会从队列中取出下一个渲染函数`，渲染下一个组件, 一直到所有的渲染任务全部执行完毕，渲染队列清空，有效的进行分片的渲染，这种方式对海量数据展示，很奏效。

用HOC实现了条件渲染-分片渲染的功能，实际条件渲染理解起来很容易，就是`通过变量，控制是否挂载组件，从而满足项目本身需求`，条件渲染可以演变成很多模式，我这里介绍了条件渲染的二种方式，希望大家能够理解精髓所在。


**`3.进阶: 异步组件(懒加载)`**
```js
/**路由懒加载HOC */
 export default function AsyncRouter (loadRouter) {
    return class Content extends React.Component {
        state = { Component: null }
        componentDidMount () {
            if (!this.state.Component) return 
            loadRouter()
            .then(module => module.default)
            .then(Component => this.setState({ Component }))
        }
        render () {
            const { Component } = this.state
            return Component ? <Component {...this.props} /> : null
        }
    }
 }

 const Index = Async(() => import('../pages/index'))
```


**`4.反向继承: 渲染劫持`**
HOC反向继承模式，可以实现颗粒化的渲染劫持，也就是可以`控制基类组件的render函数`，还可以`篡改props，或者是children`
```js
const HOC = (WrapComponent) => {
    class Index extends WrapComponent {
        /**反向继承要包裹的组件 */
        render () {
            if (this.props.visible) {
                return  super.render()
            } else {
                return <div>暂无数据</div>
            }
        }

    }
}
```

**`5.反向继承: 修改渲染树`**
```js
// 修改渲染状态(劫持render替换子节点)
class Index extends React.Component {
    render () {
        return (
            <div>
                 <ul>
                    <li>Vue</li>
                    <li>React</li>
                    <li>Augular</li>
                </ul>
            </div>
        )
    }
}

function HOC (Component) {
    // 继承传入的组件
    return class Advance extends Component {
        const element = super.render() // 拿到父组件渲染 vdom
        const otherProps = {
            name: '张三'
        }
        /**替换元素节点 */
        const appendElement = React.createElement(
            'li',  // 元素名称
            {},    // 传入组件的属性 
            `hi, my name is ${otherProps.name}` // children 表示子组件
        );
        const newChild = React.Children.map(
            element.props.children.props.children, // 拿到li元素节点
            (child,index) => {
                if(index === 2) return appendElement
                return  child
            }
        );

        return  React.cloneElement(
            element,  // react元素，可以是真实的DOM结构也可以是自定义的组件
            element.props, // 返回旧元素的props。可以添加新的 props 进行拓展
            newchild  // 默认展示调用时添加的子元素。如果指定会覆盖我们调用克隆组件时里面包含的元素
        )
    }
}

export  default HOC(Index)
```

```js
class Button extends Ract.Component {
   state = {
     name: 'Alan'
   }
   componentDidMount () {
     console.log('Button componentDidMount')
   }
   render () {
    console.log('Button render')
    return <button><span>按钮</span></button>  // 里面的会被覆盖,按钮内容变成0
   }
}

const wrapper = OldComponent => {
    return class extends OldComponent {
        constructor(props) {
            super(props)
            this.state = {
                num: 0
            }
        }
        componentDidMount () {
            console.log('wrapper componentDidMount')
            super.componentDidMount()
        }
        handleClick = () => {
            this.setState({
                num: this.state.num++
            })
        }

        render () {
            console.log('wrapper render')
            let renderElement = super.render()
            let newProps = {
                ...renderElement.props,
                ...this.state,
                onClick: this.handleClick
            }

            return React.cloneElement(renderElement, newProps, this.state.num)
        }
    }
} 
export default wrapper(Button)
```
+ 2.2 节流渲染

**`1.节流原理`**
```js
class Index extends React.Component  {
    render () {
        console.log(`当前组件是否渲染`,this.props)
        return <div>hello,world, my name is  zhangsan</div>
    }
}

function HOC (Component) {
    return function renderWrapComponent(props) {
        const {  num, // num1,// num2 } = props
        // 期望当且仅当num改变的时候，渲染组件，但是不影响接收的props
        const RenderElement = useMemo(() => <Component {...props} />, [num])
        return RenderElement
    }
}

const IndexHoc = HOC(Index)

export default () => {
    const [num, setNum] = useState(0)
    const [num1, setNum1] = useState(0)
    const [num2, setNum2] = useState(0)

    return (
        <div>
            <IndexHoc num={num} num1={num1} num2={num2} />
            <button onClick={() =>setNum(num+1) }>num++</div>
            <button onClick={() =>setNum1(num1+1) }>num1++</div>
            <button onClick={() =>setNum2(num2+1) }>num2++</div>
        </div>
    )
}
```