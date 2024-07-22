# Vue3
 本文所用语法为`Vue3.2.41`版本

 ## 获取this
 vue3中没有this,使用有两种方法。一是获取`当前组件实例`，二是获取`全局实例`。
 ```vue
<script setup>
import { getCurrentInstance } from 'vue'
// proxy为当前组件实例
const { prxoy, appContext } = getCurrentInstance()
// global是全局实例
const gloabl = appContext.config.globalProperties
</script>
 ```

## 全局注册(属性/方法)
 vue3中需要在一个能被所有组件访问到的`全局对象`上添加全局属性或方法。

```js
// main.js
import { creatApp } from 'vue'
import App from './App.vue'
const app = creatApp(App)
import axios from './server/index'
// 添加全局属性name
app.config.globalProperties.name = '张三'
// 添加全局方法
app.config.globalProperties.$http = axios
```
在组件中使用。
```vue
<script setup>
import { getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance()

const global  = appContext.config.globalProperties
console.log(global.name)// 张三

// 调用网络请求global.$http
</script>
```

## template
Vue2中只能有一个根节点，而Vue3中支持多个根节点。
其实本质上Vue3每个组件还是一个根节点。因为DOM树只能是树状结构，
只是Vue3在`编译阶段`新增了判断:如果当前组件不只一个根元素，就添加一个`fragment`组件把这个多根组件给包裹起来，相当于这个组件还是只有一个根节点。
```html
<template>
    <div>根组件1</div>
    <div>根组件2</div>
</template>
```
## 获取DOM

```vue
<template>
    <Child ref="formRef" />
</template>
<script setup>
import Child from './Child.vue'
import { getCurrentInstance } from 'vue'

// 1.声明一个变量名和要获取的DOM上的ref属性同名，会自定形成绑定
const formRef = ref(null)
console.log(formRef.value) 

// 2.通过当前组件实例获取要获取的DOM
const { proxy } = getCurrentInstance()
console.log(proxy.$refs.formRef)
</script>
```

## Vue3生命周期及初始化

因为Vue3的生命周期中`setup`先执行，所以一些初始化操作或者请求接口可以直接放在`setup`里，或者放在`onMounted`/`onBeforeMount`里。
```vue
<script setup>
import { onMount } from 'vue'
// 请求接口函数
const getList = () => {

}
onMounted(() => {
    getList()
})
</script>
```

## 解除绑定

```vue
<script setup>
import { onBeforeUnmount, onDeactivated } from 'vue'

// 组件卸载前，对应 Vue2 的 beforeDestroy
onBeforeUnmount(() => {
    clearTimeout(timer)
    window.removeAddEventListener('...')
})

// 退出缓存组件，对应 Vue2 的 deactivated
onDeactivated(() => {
    clearTimeout(timer)
    window.removeAddEventListener('...')
})
</script>
```

## ref 和 reactive 
`ref`和`reactive`两者都是用于创建响应式对象.<br/>
`ref`用于创建基础类型,`reactive`通常用于创建响应式。<br/>

`ref` 如果传入的是引用类型，内部源码也是调用`reactive`来实现的<br/>
`ref` 返回的属性在template中使用，直接用就是了但是在JS中使用，需要通过`.value`获取，如下。因为 `ref 返回的是一个包装对象`

```vue
<template>
    <div>{{ count }}</div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const count = ref(1)

const list = ref([])
console.log(arr.value) // []


const data = reactive({
    name: '张三',
    age: 18,
    ...
})
console.log(data.name) // 张三

</script>
```
### 为什么`ref`要返回一个包装对象?

在Vue2中data都是返回一个对象，对于对象引用类型，可以用来做代理或者劫持。<br/>
如果只返回基础类型，它的值存储在栈中，执行栈执行完就回收了，没有办法添加代理或者劫持。<br/>
所以不得不返回一个对象，这样才能有响应式。


## toRef 和 toRefs

两者主要是用于`解构响应式对象`的,解构出来的属性值依然是响应式属性，否则会丢失响应式效果。
```vue
<script setup>
import { reactive, toRef, toRefs } from 'vue'
const data = reactive({
    name:'张三',
    age: '18'
})

// 这样虽然能拿到 name / age，但是会变成普通变量，没有响应式效果了
const { name, age } = data

// 取出一个响应式属性
const name = toRef(data, 'name') 

// 这样解构出来的所有属性都具有响应式
const { name, age } = toRefs(data)

// 不管是 toRef 还是 toRefs，这样修改是会把 data 里的 name 改掉的
// 就是会改变源对象属性，这才是响应式该有的样子
name.value = '罗翔老师'
</script>
```

## watch 
Vue3中`watch`是一个函数，接受三个参数：`监听的属性`、`接收新值和老值的回调函数`、`配置项`
```vue
<script setup>
import { watch, ref, reactive } from 'vue'
const name = ref('张三')
const data = reactive({
    age: '20',
    money: 10000000000000,
    children: []
})

// 监听ref属性
watch(name, (newName, oldName) => {

})

// 监听其他属性
watch(() =>data.age,(newAge, oldAge) => {

})

// 监听多个属性，数组放多个值，返回的新值和老值也是数组
watch([data.age, data.money], ([newAge, newMoney], [oldAge, oldMoney]) => {})

// 第三个参数是个对象，有五个可配置属性
watch(data.children, (newList, oldList) => {
    immediate: true,
    deep: true,
      // 回调函数的执行时机，默认在组件更新之前调用。更新后调用改成post
    flush: 'pre', // 默认值是 pre，可改成 post 或 sync
    // 下面两个是调试用的
    onTrack (e) { debugger }
    onTrigger (e) { debugger }
})
</script>
```

在`watch回调函数`中能接收第三个参数`onInvalidate`,为`清除副作用的函数`,首次触发监听的回调函数(handle)不会执行`onInvalidate`，之后每次触发`默认`会先执行`onInvalidate`。
```vue
<script setup>
import { watch , ref } from 'vue'
const key = ref('')
watch(key, (newKey, oldKey, onInvalidate) => {
    console.log('key')
     // 获取DOM默认获取到的是更新前的dom，如果是flush: post，可以获取到更新后的dom
    console.log('DOM节点：', dom.innterHTML)
    onInvalidate(() => {
        console.log('清除副作用函数先执行')
    })
})
</script>
```
就是说`onInvalidate`默认它的执行机制是在更新之前调用，比如上述代码,当key触发更新时会先打印`清除副作用函数先执行`再打印`key`。<br/>
如果需要在更新之后调用，可以在`watch`的第三个配置项中添加`flsuh:'post'`<br/>

## watchEffect

Vue3中`watch`和`watchEffect`的区别有:<br/>
`watch`是对传入的一个或者多个值进行监听， 触发时会返回新值和老值，且默认第一次不会执行。
`watchEffect`是传入一个立即执行函数，所以默认第一次就会执行，且不需要传入监听内容，会自动收集函数内的数据源作为依赖，当依赖发生变化时会重新执行函数(有点像`computed`的味道)，而且不会返回新值和老值。
清除副作用和副作用的刷新时机是一样的，区别是`watch`中会作为回调的第三个参数传入，`watchEffect`中是回调函数的第一个参数

```vue
<script setup>
import { watchEffect, reactive } from 'vue'
const userInfo = reactive({
    name: '张三',
    age: '18'
})
watchEffect(() => {
    // 会自动收集这个函数使用到的属性作为依赖，进行监听
    // 监听的是 userInfo.name 属性，不会监听 userInfo
    console.log(userInfo.name)
})

// 有两个参数
watchEffect(()=> {}, {
    // 可配置项
    fluh:'pre',
    onTrack (e) { debugger }
    onTrigger (e) { debugger }
})

// 回调函数接受一个参数，为清除副作用的函数
watchEffect(onInvalidate => {
    console.log('张三'),
    onInvalidate(() => {
        console.log('清除副作用函数执行')
    })
})

watchEffect(() => {...}, {
    flush: 'post',
})
// 和下面这个是一样的
watchPostEffect(() => {})
-----------------------------
watchEffect(() => {...}, {
    flush: 'sync',
})
// 和下面这个是一样的
watchSyncEffect(() => {})
</script>
```

## computed

```vue
<script setup>
import { computed } from 'vue'
const props = defineProps(['visible', 'type'])
const emit = defineEmits(['myClick'])

// 函数写法
const isFirst = computed(() => props.type === 1) 

// 对象写法
const status = computed({
    get() {
        return props.visible
    },
    set(val) {
        emit('myClick', val)
    }
})

// computed 第二个参数也是一个对象，调试用的
const hehe = computed(参数一上面两种都可， {
    onTrack (e) { debugger }
    onTrigger (e) { debugger }
})
</script>
```

## nextTick

`nextTick`是将回调推迟到下一个 DOM 更新周期之后执行。在更改了一些数据以等待 DOM 更新后立即使用它
```vue
<script setup>
import { nextTick } from 'vue'

// 方式 一
const handleClick = async () => {
  await nextTick()
  console.log('张三')
}

// 方式二
nextTick(() => {
    console.log('张三')
})

// 方式三
nextTick().then(() => {
    console.log('张三')
  })
</script>
```


## 多个v-model
```vue
 <!-- 父组件 -->
<template>
    <child v-model:name="name" v-model:age="age" />
</template>
<script setup>
import { ref } from "vue"
const name = ref('沐华')
const age = ref(18)
</script>

 <!-- 子组件 -->
<script setup>
const emit = defineEmits(['update:name', 'update:age'])

const handleClick = () => {
    console.log('点击了')
    emit('update:name', '这是新的名字')
}
</script>
```

## css样式穿透
Vue2 中在 scoped 中修改子组件或者组件库中的组件样式，改不了的情况下，就可以用样式穿透，不管是 Less 还是 SASS 都是用 `/deep/ .class {}` 来做样式穿透<br/>
Vue3 中就不支持 /deep/ 的写法了，换成 `:deep(.class)`
```css
<style lang="scss" scoped>

 /* Vue2 中这样写 */
/deep/ .el-form {
    .el-form-item { ... }
}
/* Vue3 中这样写 */
:deep(.el-form) {
    .el-form-item { ... }
}
</style>
```

##　css绑定js变量
```vue
<template>
    <div class="name">张三</div>
</template>
<script setup>
import { ref } from "vue"
const str = ref('#f00') // 红色
</script>
<style scoped lang="scss">
.name {
    background-color: v-bind(str); // JS 中的色值变量 #f00 就赋值到这来了
}
</style>
```

## 响应式API
```ts
setup (props, context) {
    // props是响应式的，当传入新的props时，它将被更新
    console.log(props.title)
    // reactive 用于创建响应式对象
    const book = reactive({
        title: '留言本'
    })
    // Attribute属于非响应式对象
    console.log(context.attrs)
    // 插槽slots属于非响应式对象
    console.log(context.slots)
    // 触发事件(方法)
    console.log(context.emit)
    

    // setup如果返回的是一个对象，那么该对象返回的property和props参数中的property都会被模板访问到
    return {
        book
     }

     // 生命周期钩子: 接收一个回调函数，当钩子被组件调用时会被执行
     // 1.beforeMount
     onBeforeMount(() => {
        console.log('Component is beforeMount')
     })
     // 2.mounted
     onMounted(() => {
        console.log('Component is mounted')
     })
     // 3.beforeUpdate
     onBeforeUpdate(() => {
        console.log('Component is beforeUpdate!')
      })
     // 4.updated
     onUpdated(() => {
       console.log('Component is updated!')
     })
    // 5.beforeUnmount
    onBeforeUnmount(() => {
       console.log('Component is beforeUnmount!')
    })
    //  6.unmounted
    onUnmounted(() => {
       console.log('Component is unmounted')
    })

    provide('abc', 'efg')
    // setup 还可以返回一个渲染函数，该函数可以直接使用 在同一作用域中 声明的响应式 状态(数据)
    return () => h('div', [msg.value, book.title])
}
```

## setup语法糖
- Vue3在早期版本(`3.0.0-beta.21之前`)对 `composition API`的支持，只能在组件选项`setup`函数中使用
```vue
<template>
    <h1>{{ msg }}</h1>
    <button type="button" @click="add">count is : {{count}}</button>
    <ComponentA />
    <ComponentB />
</template>

<script>
import { defineComponent, ref } from 'vue'
import ComponentA from '@/components/ComponentA'
import ComponentB from '@/componnets/ComponentB'
export default defineComponent({
    name: 'HelloWorld',
    components: {
        ComponentA,
        ComponentB
    },
    props: {
        msg: String
    },
    setup(props, ctx) {
        const count = ref(0)
        function add () {
            count.value++
        }
        return {
            count,
            add
        }
    }
})
</script>
```


* 在`3.0.0-beta.21`版本中增加了`<script setup>`的实验特性。
+ 在`3.2.0`版本中移除了`<script setup>`的实验状态，正式转正使用，成为框架稳定的特性之一。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import ComponentA from '@/components/ComponentA'
import ComponentB from '@/componnets/ComponentB'

defineProps<{msg: string}>()

const count = ref(0)
const add = () => {
    count.value++
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="add">count is: {{ count }}</button>
  <ComponentA />
  <ComponentB />
</template>
```

#### 优势
与组件选项`setup函数`对比，`<script setup>`的优点:
- 更少、更简洁的代码，不需要`return{}`暴露变量和方法给template了
- 更好的`TypeScript`支持
- 更好的运行时性能
- `<script setup>` 块中的脚本会被`编译成组件选项 setup 函数的内容，也就是说它会在每次组件实例被创建的时候执行`。
- 在`<script setup>` 声明的`顶层绑定（变量、函数、import引入的内容）`，都会自动暴露给模板，在模板中直接使用。

```vue
<script setup>
import { ref } from 'vue'
// 外部引入的方法，不需要通过 methods 选项来暴露它，模板可以直接使用
import { getToken } from './utils'
// 外部引入的组件，不需要通过 components 选项来暴露它，模板可以直接使用
import ComponentA from '@/components/ComponentA'

defineProps({
  msg: String
})
// 变量声明，模板可以直接使用
const count = ref(0)
// 函数声明，模板可以直接使用
function add() {
  count.value++
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ getToken() }}</h1>
  <button type="button" @click="add">count is: {{ count }}</button>
  <ComponentA />
</template>
```

注意:
1. 每个*.vue 文件最多可同时包含一个`<script> 块 `(不包括`<script setup>`)；
2. 每个*.vue 文件最多可同时包含一个`<script setup> `块 (不包括常规的 `<script>`)；

### 编译器宏
1. defineProps
```vue
<script setup lang="ts">
interface ListItem {
  name: string
  age: number
}
const props = defineProps<{
  msg: string
  title: string
  list: ListItem[]
}>()

// 在 ts 中使用 props 中的属性，具有很好的类型推断能力
console.log(props.list[0].age)
</script>

<template>
  <h1>{{ msg }}</h1>
  <div>{{ title }}</div>
</template>
```

2. withDefaults，给 props 提供默认值
```vue
<script setup lang="ts">
interface ListItem {
  name: string
  age: number
}
interface Props {
  msg: string
  // title可选
  title?: string
  list: ListItem[]
}
// withDefaults 的第二个参数便是默认参数设置，会被编译为运行时 props 的 default 选项
const props = withDefaults(defineProps<Props>(), {
  title: '我是标题',
  // 对于array、object需要使用函数，和以前的写法一样
  list: () => []
})
// 在 ts 中使用 props 中的属性，具有很好的类型推断能力
console.log(props.list[0].age)
</script>

<template>
  <h1>{{ msg }}</h1>
  <div>{{ title }}</div>
</template>
```

3. defineEmits
```vue

<script setup lang="ts">

defineProps<{
  msg: string
}>()

const emits = defineEmits<{
  (e: 'changeMsg', value: string): void
}>()

const handleChangeMsg = () => {
  emits('changeMsg', 'Hello TS')
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="handleChangeMsg">handleChangeMsg</button>
</template>
```

4. defineExpose可以显式的暴露需要暴露的组件中声明的变量和方法

```vue
<script setup>
import { ref } from 'vue'
const msg = ref('Hello Vue3')

const handleChangeMsg = (v) => {
  msg.value = v
}
// 对外暴露的属性
defineExpose({
  msg,
  handleChangeMsg,
})
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
```

### 辅助函数

1. useAttrs

Vue3 的 $attrs 还包含了 class 和 style 属性。
```vue
// 父组件
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld class="hello-word" title="我是标题" />

// 子组件
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
// js中使用
console.log(attrs.class)  // hello-word
console.log(attrs.title)  // 我是标题
</script>

<template>
  <!-- 在模板中使用 $attrs 访问属性 -->
  <div>{{ $attrs.title }}</div>
</template>
</template>
```

2. useSlots
```vue
// 父组件

<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld>
    <div>默认插槽</div>
    <template v-slot:footer>
      <div>具名插槽footer</div>
    </template>
  </HelloWorld>
</template>

// 子组件
<script setup>
import { useSlots } from 'vue'

const slots = useSlots()
// 在js中访问插槽默认插槽default、具名插槽footer
console.log(slots.default)
console.log(slots.footer)
</script>

<template>
  <div>
    <!-- 在模板中使用插槽 -->
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
```

3. useCssModule

```vue

<script setup lang="ts">
import { useCssModule } from 'vue'

// 不传递参数，获取<style module>代码块编译后的css类对象
const style = useCssModule()
console.log(style.success)  // 获取到的是success类名经过 hash 计算后的类名
    
// 传递参数content，获取<style module="content">代码块编译后的css类对象
const contentStyle = useCssModule('content')
</script>

<template>
  <div class="success">普通style red</div>

  <div :class="$style.success">默认CssModule pink</div>
  <div :class="style.success">默认CssModule pink</div>

  <div :class="contentStyle.success">具名CssModule blue</div>
  <div :class="content.success">具名CssModule blue</div>
</template>

<!-- 普通style -->
<style>
.success {
  color: red;
}
</style>

<!-- 无值的css module -->
<style module lang="less">
.success {
  color: pink;
}
</style>

<!-- 具名的css module -->
<style module="content" lang="less">
.success {
  color: blue;
}
</style>
```

### inheritAttrs 

- inheritAttrs 表示`是否禁用属性继承`，默认值是 true。

- `<script setup>` 是没有组件配置项 inheritAttrs 的，可以再使用一个普通的 `<script>`。

### Composition Api 类型约束

```vue
<script setup lang="ts">
import {ref , reactive, computed } from 'vue'
type User = {
    name: string
    age: number
}

// ref
const msg1 = ref('') // 会默认约束成string类型,因为ts类型推导
const msg2 = ref<string>('') // 通过范型约束类型
const user1 = ref<User>({ name: 'tang', age: 20 }) // 范型约束
const user2 = ref({} as User) // 类型断言

// reactive
const obj = reactive({})
const user3 = reactive<User>({ name: '张三', age: 20 })
const user4 = reactive({} as User)
</script>
```
