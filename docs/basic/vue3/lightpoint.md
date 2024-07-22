# Vue3七大亮点

## 性能比2.x快1.2 ~ 2 倍

### diff算法的优化

- 在`Vue2`中，虚拟DOM是`全量比较`的。
- 在`Vue3`中，增加了`静态标记PatchFlag`。在创建vnode的时候，会根据vnode的内容是否可以变化为其添加静态标记(其作用是为了会发生变化的地方添加一个`PatchFlag`标记，下次发生变化的时候直接找该地方进行比较)。diff的时候，只会比较有PatchFlag的节点。`PatchFlag是有类型的`，比如一个可变化文本节点，会将其添加PatchFlag枚举值为TEXT的静态标记，这样在diff的时候，只需要对比文本内容，需要对比的内容更少了。`PatchFlag还有动态class、动态style、动态属性\动态key属性等枚举值`。

关于静态类型枚举如下:

```js

export const enum PatchFlags {
  TEXT = 1,// 动态的文本节点
  CLASS = 1 << 1,  // 2 动态的 class
  STYLE = 1 << 2,  // 4 动态的 style
  PROPS = 1 << 3,  // 8 动态属性，不包括类名和样式
  FULL_PROPS = 1 << 4,  // 16 动态 key，当 key 变化时需要完整的 diff 算法做比较
  HYDRATE_EVENTS = 1 << 5,  // 32 表示带有事件监听器的节点
  STABLE_FRAGMENT = 1 << 6,   // 64 一个不会改变子节点顺序的 Fragment
  KEYED_FRAGMENT = 1 << 7, // 128 带有 key 属性的 Fragment
  UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 Fragment
  NEED_PATCH = 1 << 9,   // 512
  DYNAMIC_SLOTS = 1 << 10,  // 动态 solt
  HOISTED = -1,  // 特殊标志是负整数表示永远不会用作 diff
  BAIL = -2 // 一个特殊的标志，指代差异算法
}
```

### render阶段(生成虚拟dom树的阶段)的静态提升

- 在`Vue2`中，一旦检查到数据变化，就会re-render组件，所有的vnode就会重新创建一遍，形成新的vdom树
- 在`Vue3`中，对于不参与更新的vnode，会做`静态提升`，只会被创建一次，在re-render的时候`复用`。
- 静态提升可以理解为第一次render不参与更新的vnode节点的时候，保存他们的引用，re-render的时候直接拿的这个引用，无需重新创建。

没有做静态提升之前:

```js
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock(_Fragment, null, [
    _createVNode("span", null, "你好"),
    _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
```

做了静态提升之后:

```js
const _hoisted_1 = /*#__PURE__*/_createVNode("span", null, "你好", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock(_Fragment, null, [
    _hoisted_1,
    _createVNode("div", null, _toDisplayString(_ctx.message), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
```
静态内容`_hoisted_1`被放置在`render` 函数外，每次渲染的时候只要取 `_hoisted_1` 即可

同时 `_hoisted_1` 被打上了 `PatchFlag` ，静态标记值为 -1 ，特殊标志是负整数表示永远不会用于 Diff

### 事件侦听器缓存
- vue2中，写`@click="onClick"`也是被当作动态属性，diff的时候也要对比。但其他我们知道它不会变化。
- 在vue3中，如果事件是不会变化的，会将onClick`缓存起来`,该节点也不会被标记上patchFlag,这样在render和diff两个阶段，事件侦听属性都节约了不必要的性能消耗。

### 减少创建组件实例的开销

- Vue2.x中没创建一个实例，在this上药暴露data、props、computed这些，都是靠Object.defineProperty去定义的。
- Vue3中基于Proxy，减少了创建组件实例的性能开销。

##　按需编译，体积比vue2.x更小(Tree shaking)


`Tree shaking` 是一种通过清除多余代码方式来优化项目打包体积的技术，专业术语叫 `Dead code elimination`

```vue
import { ref, reactive, watch } from 'vue'
```
在Vue3中，如果没有用到watch,那编译时就会把tree shaking掉。

任何一个函数,仅仅在用到的时候才打包，没用到的模块都摇掉，打包的整体体积变小

在`Vue2`中，无论我们使用什么功能，它们最终都会出现在生产代码中。主要原因是`Vue`实例在项目中是单例的，捆绑程序无法检测到该对象的哪些属性在代码中被使用到

```js
import Vue from 'vue'
 
Vue.nextTick(() => {})
```

而`Vue3`源码引入`tree shaking`特性，将全局 API 进行分块。如果您不使用其某些功能，它们将不会包含在您的基础包中

```js
import { nextTick, observable } from 'vue'
 
nextTick(() => {})
```

`Tree shaking`是基于`ES6`模板语法（`import`与`exports`），主要是借助`ES6`模块的静态编译思想，在编译时就能确定模块的依赖关系，以及输入和输出的变量

`Tree shaking`无非就是做了两件事：

- 编译阶段利用`ES6 Module`判断哪些模块已经加载
- 判断那些模块和变量未被使用或者引用，进而删除对应代码


## composition Api 
- vue2的组件内，使用的Options Api风格(data/methods/mounted)，会使逻辑分散。
- Vue3中以功能为单位的代码组织方式，同时可以让代码更易用，比mixin更好用，可以清楚的看到组件使用的数据和方法来自那个模块。

```js
import useCounter from './counter'
import useTodo from './todos'

setup () {
    let { val, todos, addTodo } = useTodo()
    let { count, add } = useCounter()
    return {
        val,
        todos,
        addTodo,
        count,
        add
    }
}
```

## 更好的TS支持
在vue3中，量身打造了defineComponent函数，使组件在ts下，更好的利用参数类型推断 。Composition API 代码风格中，比较有代表性的api就是 ref 和 reactive，也很好的支持了类型声明。

```ts
import { defineComponent, ref, PropType } from 'vue'
export default defineComponent({
    interface MenuRoute {
        path: string;
        [key:string]: string;
    }
    props: {
        success: {
            type:String
        },
        student: {
            type: Object as PropType<{ stuNo: number, age: number, name: string}>,
            required: true
        },
        navData: {
            type: Array as PropType<MenuRoute[]>
        }
    },
    setup() {
        const year = ref(2023)
        const month = ref('5')
        month.value = 9
        const res = year.value.split('') // => Property 'split' does not exist on type 'number
    } 
})
```

接收prop + 类型限制+ 默认值
```ts
interface Persons {
    id: number;
    name: string;
    age: number;
}
defineProps<{ list: Persons}>()
// 
withDefaults(defineProps<{list?: Persons}>(), {
    list: () => [
        {
            id: 001,
            name: '张三',
            age: 18
        }
    ]
})
```

## 源码管理
`vue3`整个源码是通过`monorepo`的方式维护的,根据功能将不同的模块拆分到`packages`目录下面不同的子目录中
 ![](https://static.vue-js.com/d7c32520-5c58-11eb-ab90-d9ae814b240d.png)

 这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确，开发人员也更容易阅读、理解和更改所有模块源码，提高代码的可维护性。

另外一些`package（比如reactive响应式库）`是可以独立于`vue`使用的，如果用户只想使用`vue3`的响应式能力，可以单独依赖这个响应式库而不是整个`vue`

## 响应式系统

`vue2`中采用 `defineProperty`来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加`getter`和`setter`，实现响应式,但有一些缺陷，并不能检测`对象属性的添加和删除`y以及`数组下标的变化`
```js
function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
function defineReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${key}:${val}`);
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                val = newVal
                update()
            }
        }
    })
}
```
尽管` Vue`为了解决这个问题提供了 `set `和`delete `实例方法，但是对于用户来说，还是增加了一定的心智负担

同时在面对嵌套层级比较深的情况下，就存在性能问题
```js
default {
  data: {
    a: {
      b: {
          c: {
          d: 1
        }
      }
    }
  }
}
```

相比之下，`vue3`是通过`proxy`监听整个对象，那么对于删除还是监听当然也能监听到

同时`Proxy ` 并不能监听到内部深层次的对象变化，而 `Vue3` 的处理方式是在` getter` 中去递归响应式，这样的好处是真正访问到的内部对象才会变成响应式，而不是无脑递归

```js
function ProxyReactive(obj) {
    if (typeof obj !== 'object' &&　obj　!= null) {
        return obj
    }
    // proxy相当于在对象外层加拦截
    const observed = new Proxy(obj, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            return isObject(res) ? ProxyReactive(res) : res
        },
        set (target, key, value, receiver) {
            const res = Reflect.set(target, key, value, receiver)
            return res
        },
        deleteProperty(target, key) {
            const res = Reflect.deleteProperty(target, key)
            return res
        }
    })

     // Proxy劫持整个对象并返回一个新对象
    return observed
}
```


