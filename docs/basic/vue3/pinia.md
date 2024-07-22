# pinia

## pinia是什么?
> pinia是Vue的存储库，它允许您跨组件/页面共享状态

## 为什么要使用pinia?

**优点:**

- Vue2和Vue3都支持，这让我们同时使用Vue2和Vue3的小伙伴都能很快上手。
- pinia中只有`state`、`getter`、`action`，抛弃了Vuex中的`mutation`。
- pinia中`action`支持同步和异步，Vuex不支持。
- 良好的TypeScript支持。
- 无需创建各个模块嵌套了，Vuex中如果数据过多，通常会分模块来进行管理，而pinia中每个store都是独立的，互相不影响。
- 体积非常小，只有1KB左右。
- pinia支持插件来扩展自身功能。
- 支持SSR。

## pinia应用

搭建一个最新的Vue3 + TS + Vite 的项目:
```
npm create vite@latest my-vite-app --template vue-ts
```

**安装pinia:**
```
// 使用yarn
yarn add pinia

// 使用npm
npm install pinia
```

**创建根存储，将pinia挂载到应用中:**
```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia(App)
app.use(pinia)
app.mount('#app')
```

**创建store:首先在src目录下新建store文件夹，用来存放我们创建的各种store.**
```ts
//  src/store/user.ts
import { defineStore } from 'pinia'
export const useUserStore = defineStore('users', {
    // 其他配置项
})
```
创建store很简单，调用pinia中的defineStore()函数即可，并接收两个参数:
- name: 一个字符串，必传项，该store的唯一id
- options： 一个对象,store的配置项，比如配置store内的数据，修改数据的方法等。

我们可以定义任意数量的store，因为一个store就是一个函数，这也是pinia的好处之一，让我们的代码扁平化了。


**使用store**

```vue
// App.vue
<script setup lang="ts">
import { useUserStore } from '../src/store/user'
const store = useUserStore()
console.log(store)
</script>
```



**添加state**
```ts
//  src/store/user.ts
import { defineStore } from 'pinia'
export const useUserStore = defineStore('users', {
    state: () => {
        return {
            name: '张三',
            age: 25,
            sex: '男'
        }
    },
    getters: {
        getSex: (state) => state.sex
    },
    actions: {
        increment: (state) => state.age++
    }
})
```
上述我们给配置项添加了state属性,该属性就是用来存储数据的。

- `state接收一个箭头函数返回的值，不能直接接收一个对象。`
- getters： 用来监听或者计算状态变化的，有缓存功能
- actions： 修改全局state数据的

上面是Option store的定义方式，下面来介绍一下Setup store 的定义
```ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useUserStore = defineStore('users', () => {
    const name = ref('张三')
    const age = ref(20)
    const sex = ref('男')
    const getSex = computed(() => sex.value)
    const increment = () => {
        age.value++
    }
    return {
        name,
        age,
        sex,
        getSex,
        increment
    }
})
```

**操作state**

读取state数据：
```vue
<template>
    <div>
        <p>姓名: {{ name }}</p>
        <p>年龄: {{ age }}</p>
        <p>性别: {{ sex }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../src/store/user'
const store = useUserStore()
// const name = ref<string>(store.name)
// const age = ref<string>(store.age)
// const sex = ref<string>(store.sex)
// 解构
const { name, age, sex } = store
</script>
```

修改state数据：
```vue
<template>
    <div>
        <p>姓名: {{ name }}</p>
        <p>年龄: {{ age }}</p>
        <p>性别: {{ sex }}</p>
        <button @click="changeName">更改姓名</button>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../src/store/user'
const store = useUserStore()
const { name, age, sex } = store
const changeName = () => {
    store.name ='小仙女'
}
</script>
```

我们会发现点击按钮后，store中的name确实被修改了，但页面没有变化，说明我们使用的name不是响应式的。<br/>

其实pinia提供了让我们获取的属性变为响应式的方法`storeToRefs()`。
```ts
import { storeToRefs } from 'pinia'
const store = useUserStore()
const { name, age, sex } = storeToRefs(store)
```


重置state：
如果有时候修改了数据，想要将它还原，重置为最初始的状态,直接调用store的`$reset()`方法.
```vue
<button @click="resetState">重置store</button>
<script setup lang="ts">
const resetState = () => {
    store.$reset()
} 
</script>
```

批量修改数据: 使用store的`$patch()`方法

```vue
<button @click="patchStore">批量修改数据</button>
<script setup lang="ts">
const patchStore = () => {
  store.$patch({
    name: "小仙女",
    age: 18,
    sex: "女",
  });
}
</script>
```
上述写法代价有点大，必须将state中所有字段列举出，解决该问题，pinia提供的`$patch`方法还可以接收一个回调函数

```vue
<script setup lang="ts">
store.$patch((state) => {
    state.name = '小仙女'
})
</script>
```

直接替换整个state：使用store的`$state()`方法
```ts
store.$state = { name: 'xxx', age: 18, sex：'女'}
```

**定义getter和使用getter**
```vue
<template>
    <div>
        <p>性别: {{ store.getSex }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../src/store/user'
const store = useUserStore()

</script>
```
getter传参使用
```vue 
<script setup lang="ts">
export const useUserStore = defineStore('users', {
    state: () => {
        return {
            name: '张三',
            age: 25,
            sex: '男'
        }
    },
    getters: {
        getAddAge : (state) => {
            return (num:number) => state.age + num
        }
    }
})
</script>

<p>新年龄: {{ store.getAddAge(10)}}</p> 
```

**actions属性和使用**

```ts
<script setup lang="ts">
export const useUserStore = defineStore('users', {
    state: () => {
        return {
            name: '张三',
            age: 25,
            sex: '男'
        }
    },
    getters: {}，
    actions: {
        saveName: (name:string) => {
            state.name = name
        }
    }
})
</script>

// 使用
const saveNmae = () => {
    store.changeName('小仙女')
}
```

## pinia持久化存储
安装
```
npm install pinia-plugin-persistedstate
```

```ts
// src/store/index.ts
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
// 创建pinia实例并使用持久化插件
const store = createPinia()
store.use(piniaPluginPersistedState)

export default store
```

```ts
// main.ts
import { creatApp } from 'vue'
import App from './App.vue'
import store from './store/index'

const app = createApp(App)
app.use(store)
app.mount('#app')
```

```ts
// pinia持久化参数配置
// config/piniaPersit.ts
import { PersistedStateOptions, StorageLike } from 'pinia-plugin-persistedstate'
const piniaPersistConfig = (key: string, stroage: StorageLike, paths?: string[]) => {
    const persist: PersistedStateOptions = {
        key,
        storage,
        paths
    }
    return persist
}
export default piniaPersistConfig
```

```ts
// user.ts
import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { ref } from 'vue' 
// 类似于hooks写法(返回状态和操作状态的方法)
export const useUserStore = defineStore('userStore', () => {
    const name = ref('张三')
    const age = ref(20)
    const sex = ref('男')
    const getSex = () => {
        return sex.value
    }
    const changeName = (val:string) => {
        name.value = val
    }
    return {
        name,
        age,
        sex,
        getSex,
        changeName
    }
},
// 持久化配置
{
    persist: piniaPersistConfig('userStore', localStorage, ['name', 'age', 'sex'])
}
) 

```






