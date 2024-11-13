# 设计模式

## 组合模式

```tsx
<Tab>
    <TabItem label="react" name="react">React</TabItem>
    <TabItem label="vue" name="vue">Vue</TabItem>
    <TabItem label="agular" name="agular">Agular</TabItem>
</Tab>
```

```tsx
<Group onChange={(type)=> console.log(type)}>
        <GroupItem label="react" name="react" isShow>React</GroupItem>
        <GroupItem label="vue" name="vue" isShow>Vue</GroupItem>
        <GroupItem label="agular" name="agular" isShow= {false}>Agular</GroupItem>
</Group>

function Group (props) {
    console.log(props.children);
    const newChildren = [];
    React.Children.forEach(props.children, (child) => {
        console.log(child.props);
        const { type, props } = child;
        if ( isValidElement(child) && type === GroupItem && props.isShow)
        // 通过 React.cloneElement 向 child 中混入其他props
        // return React.cloneElement(child, { author: '张三' });
        newChildren.push(React.cloneElement(child, { author: '张三' }));
    });
    // return props.children;
    return newChildren;
}
function GroupItem (props) {
    return  ... 
}
```

`内外层通信`
```tsx
function Group (props) {
const handleCallBack = (val) => {
        console.log('GroupItem', val);
    };
    return (
        <div>
            { React.cloneElement(props.childern, callback: handleCallBack)}
        </div>
    )
}

function GroupItem (props) {
    return (
        <div>
            名称：{ props.name}
            <button onClick={ () => { props.callback() }}>隐式回调内外层通信按钮</button>
        </div>
    )
}
```

`验证children`
```tsx
// 判断子组件是否可以挂在到父组件上
function Group (props) {
    const newChildren = [];
    React.Children.forEach(props.children, (child) => {
        if (React.isValidElement(child) && child.type === GroupItem ) {
            newChildren.push(React.cloneElement(child));
        } else {
            console.log('子组件类型错误');
        }
    });
    return newChildren;
}
```

**组合模式实现Tab和TabItem**
```tsx
// Tab组件
const Tab = ({ children, onChange}) => {
    const activeIndex = useRef(null);
    const [, forceUpdate] = useState({});
    const tabList = [];
    let renderChildren = null;
    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type.displayName === 'tabItem') {
            const { props } = child;
            const { name, label } = props;
            const tabItem = {
                name,
                label,
                active: name === activeIndex.current,
                component: child
            } 
            if (name === activeIndex.current) renderChildren = child;
            tabList.push(tabItem);
        }
    });
     /* 第一次加载，或者 prop chuldren 改变的情况 */
    if (!renderChildren && tabList.length > 0) {
        const fisrtChildren = tabList[0];
        renderChildren = fisrtChildren.component;
        activeIndex.current = fisrtChildren.component.props.name;
        fisrtChildren.active = true;
    }

    const onChangeTab = (name) => {
        activeIndex.current = name;
        forceUpdate({});        
        onChange && onChange(name);
    }

    return (
        <div>
            <div className="header">
                {
                    tabList.map((tab, index) => (
                        <div className="header_item"
                            key={index}
                            onClick={() => onChangeTab(tab.name)}>
                            <div className='text'>{ tab.label }</div>
                            { tab.active && <div className="active_bored"></div> }
                        </div>
                    ))
                }
            </div>
            <div>{ renderChildren }</div>
        </div>
    )
}
Tab.displayName = 'tab';

// TabItem组件
const TabItem = ({ children }) => {
    // 展示TabItem的内容
    return <div>{ children }</div>
}
// 添加displayName静态属性
TabItem.displayName = 'tabItem';
```


## render props模式
+ `render props 模式和组合模式类似。`
+ 区别不同的是，用`函数的形式代替 children`。函数的参数，由容器组件提供，这样的好处，`将容器组件的状态，提升到当前外层组件中`，这个是一个巧妙之处，也是和组合模式相比最大的区别。

+ 容器组件作用是传递状态，执行 children 函数。
+ 外层组件可以根据容器组件回传 props ，进行 props 组合传递给子组件。
+ 外层组件可以使用容器组件回传状态。

```tsx
export default function App (){
    const aProps = {
        name:'《React进阶实践指南》'
    }
    return (
        <Container>
            {(cProps) => <Children {...cProps} { ...aProps }  />}
        </Container>
    )
}
```

## hoc高阶组件模式

## 提供者-消费者模式
```tsx
// 1.创建一个 context 上下文 ,主题颜色Context
const ThemeContext = React.createContext(null);

function ConsumerDemo() {
    return (
        <div>
            <ThemeContext.Consumer>
                {
                    (theme) => 
                        <div style={{ ...theme}}>我是消费者</div>
                }
            </ThemeContext.Consumer>
        </div>
    )     
}

class Index extends React.PureComponent{
    render() {
        return (
            <div>
                <ConsumerDemo />
            </div>
        )
    }
}

export default function ProviderDemo () {
    const [theme, setTheme]= useState({ 
        color: 'pink', 
        background: '#ccc' 
    });
    return (
            <div>
                <ThemeContext.Provider value={ theme }>
                    <Index  />
                </ThemeContext.Provider>
                <button onClick={ 
                    ()=> setTheme({ color:'blue' , background:'orange'})
                 }>改变颜色</button>
            </div>
    )
}
```

## 类组件继承模式
```tsx
// 当页面有权限，那么直接展示页面内容。
// 当页面没有权限，那么展示无权限页面。
import { Route } from 'react-router'

const RouterPermission = React.createContext();

class PRoute extends Route{
    static contextType = RouterPermission  /* 使用 context */
    constructor(...arg){
        super(...arg);
        const { path } = this.props;
        /* 如果有权限 */
        console.log(this.context);
        const isPermiss = this.context.indexOf(path) >= 0 /* 判断是否有权限 */
        if(!isPermiss) {
            /* 修改 render 函数，如果没有权限，重新渲染一个 Route ，ui 是无权限展示的内容  */
            this.render = () =>  <Route  {...this.props} >
                <div>暂无权限</div>
            </Route>
        }
    }
}
export default (props)=>{
    /* 模拟的有权限的路由列表 */
    const permissionList = ['/extends/a' , '/extends/b'];
    return (
         <RouterPermission.Provider value={ permissionList } >
            <Index {...props} />
        </RouterPermission.Provider>
    )
}

// 使用
function Test1 (){
    return <div>权限路由测试一</div>
}

function Test2 (){
    return <div>权限路由测试二</div>
}

function Test3(){
    return <div>权限路由测试三</div>
}

function Index({ history }){
    const routerlist=[
        { name:'测试一' ,path:'/extends/a' },
        { name:'测试二' ,path:'/extends/b' },
        { name:'测试三' ,path:'/extends/c' }
    ]
    return <div>
        {
            routerlist.map(item=> (
                    <button 
                            key={item.path}
                            onClick={()=> history.push(item.path)}>
                        {item.path}
                    </button> 
            ))
        }
        <PRoute component={Test1}
            path="/extends/a"
        />
        <PRoute component={Test2}
            path="/extends/b"
        />
        <PRoute component={Test3}
            path="/extends/c"
        />
    </div>
}


```

