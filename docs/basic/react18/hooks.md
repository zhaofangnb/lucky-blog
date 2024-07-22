# React Hooks 

## hooks 之数据更新驱动
 
 ### useState
 ``` sh
 const [ state, dispatchAction ] = useState(initData)
 ```
 + state: 提供给UI,作为视图渲染的数据源
 + dispatchAction: 函数组件渲染的渲染函数，改变state
 + initData: 一、非函数，作为state的初始值 二、函数， 函数的返回值作为state的初始值

 ### useRuducer
 react-hooks 提供的`能够在无状态组件中运行的类似redux的功能API`
 ```sh
 const [ state, dispatchAction ] = useReduce(reducer)
 ```
 + 更新之后的 state 值
 + 派发更新的 dispatchAction 函数, 本质上和 useState 的 dispatchAction 是一样的
 + 一个函数 reducer ，我们可以认为它就是一个 redux 中的 reducer , reducer的参数就是常规reducer里面的`state`和`action`, 返回改变后的state, **如果返回的 state 和之前的 state ，内存指向相同，那么组件将不会更新**

 ```sh
 const DemoRuducer = () => {
    const [ number, dispatchNumber ] = useReducer((state, action) => {
        const { type, payload }  = action
        switch(type) {
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
            case 'reset':
                return payload;
        }
        return state;
    },  0);

    return (
        <div>
            <button onClick= { () => dispatchNumber({ type: 'add' })}>增加</button>
            <button onClick= { () => dispatchNumber({ type: 'sub' })}>减少</button>
            <button onClick= { () => dispatchNumber({ type: 'reset', payload: 0 })}>重置</button>
        </div>
    )
 }
 ```

 ### useSyncExternalStore

 ```sh
 import { combineReducers, createStore } from 'redux';

 function numberReducer (state = 1, action) {
    switch (action.type) {
        case 'ADD':
          return state + 1;
        case 'SUB':
          return state - 1;
        default:
          return state;
    }
 }

 const rootReducer = combineReducers({
    number: numberReducer
 })

 const store = createStore(rootReducer, { number : 1} )

 function Index () {
    /**订阅外部数据源 */
    const state = useSyncExternalStore(store.subscribe, () => store.getState().number)
    console.log(state)

    return (
     <div>
            { state }
            <button onClick={  store.dispatch({type: 'ADD'}) }>点击</button> 
     </div>
    ）
 }
 ```

 语法:

useSyncExternalStore(`subscribe`, `getSnapShot`, getServerSnapshot)

+  subscribe: 订阅函数，当数据改变的时候，触发
+  getSnapShot: 当 store 变化的时候，会通过getSnapshot生成新的状态值，这个状态值可提供给组件作为数据源使用，getSnapshot可以检查订阅的值是否改变，改变的话那么会触发更新

### useTransition

```sh
// 模拟数据
const mockList1 = new Array(10000).fill('tab1').map((item,index) => item+ '--'+index)
const mockList2 = new Array(10000).fill('tab2').map((item,index) => item+ '--'+index)
const mockList3 = new Array(10000).fill('tab3').map((item,index) => item+ '--'+index)


const tab = {
    tab1: mockList1,
    tab2: mockList2,
    tab3: mockList3
}
export default function Index () {
    const [active, setActive] = React.useState('tab1') // 需要立即响应的任务，立即更新任务
    const [renderData, setRenderData] = React.useState(tab[active]) // 不需要立即响应的任务，过渡任务
    const [ isPending, startTransition ] = useTransition();
    const handleChangeTab = (activeItem) => {
        setActive(activeItem) // 立即更新
        startTransition(() => {
            setRenderData(tab[activeItem]) // startTransition里面的任务优先级低
        })
    }

    return (
        <div>
            <div className="tab">
               { Object.keys(tab).map(item => 
                    <span className={ active === item && 'active'} 
                          onClick={ () => handleChangeTab(item)}>
                         {item}
                    </span>
                )}
            </div>
            <div className="content">
              { isPending && <div>loading...</div>}
              { renderData.map(item => <li key={item}>{item}</li>)}
            </div>
        </div>
    )
}
```


