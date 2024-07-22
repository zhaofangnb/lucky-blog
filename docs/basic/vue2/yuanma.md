#　Vue2技术揭秘
vue的源码都在src目录下:
```
src
|-- compiler       #　编译相关
|-- core           #  核心代码
|-- platforms      #　不同平台的支持
|-- server         #  服务端渲染
|-- sfc            #　.vue文件解析
|-- shared         #  共享代码
```

## 构建过程

构建的入口文件,在`scripts/build.js`文件中:

```js
// 先从配置文件读取配置
let builds = require('./config').getAllBuilds()

// 通过命令行参数构建过滤器
if (process.argv[2]) {
    const filters = process.argv[2].split(',')
    builds = builds.filter(b => {
        return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
    })
} else {
    builds = builds.filter(b => {
        return b.output.file.indexOf('weex') === -1
    })
}
build(builds)
```

在来看一下配置文件，`scripts/config.js`

```js
const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.js'),
    format: 'cjs',
    banner
  },
  // Runtime+compiler CommonJS build (CommonJS)
  'web-full-cjs': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.js'),
    format: 'cjs',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime only (ES Modules). Used by bundlers that support ES Modules,
  // e.g. Rollup & Webpack 2
  'web-runtime-esm': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.esm.js'),
    format: 'es',
    banner
  },
  // Runtime+compiler CommonJS build (ES Modules)
  'web-full-esm': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.js'),
    format: 'es',
    alias: { he: './entity-decoder' },
    banner
  },
  // runtime-only build (Browser)
  'web-runtime-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.js'),
    format: 'umd',
    env: 'development',
    banner
  },
  // runtime-only production build (Browser)
  'web-runtime-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.min.js'),
    format: 'umd',
    env: 'production',
    banner
  },
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler production build  (Browser)
  'web-full-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.min.js'),
    format: 'umd',
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  },
  // ...
}
```

上述列举了一些Vue.js构建的配置，对于单个配置它是遵循Rollup的构建规则的。`entry`属性表示构建的入口文件地址,`dest`表示构建后的js文件地址,`format`表示构建的格式,`cjs`表示构建的文件遵循CommonJs规范,`es`表示构建出来的文件遵循`ES Module`规范,`umd`表示构建出来的文件遵循`UMD`规范。

以`web-runtime-cjs`配置为例，它的`entry`是`resolve(web/entry-runtime.js)`,先来看一下配置文件中`resolve`函数的定义
```js
const aliases = require('./alias')
const resolve = p => {
    const base = p.split('/')[0]
    if (aliases[base]) {
        return path.resolve(aliases[base], p.slice(base.length + 1))
    } else {
        return path.resolve(__dirname, '../', p)
    }
}
```

resolve函数先将传入的参数`p`通过`/`分割成了数组，然后取数组第一个元素为`base`,在这个例子中，参数p是`web/entry-runtime.js`,那么base就是`web`，base并不是实际的路径，让借助了别名的配置: 在`scripts/alias.js`中

```js

const path = require('path')
module.exports = {
  vue: path.resolve(__dirname, '../src/platforms/web/entry-runtime-with-compiler'),
  compiler: path.resolve(__dirname, '../src/compiler'),
  core: path.resolve(__dirname, '../src/core'),
  shared: path.resolve(__dirname, '../src/shared'),
  web: path.resolve(__dirname, '../src/platforms/web'),
  weex: path.resolve(__dirname, '../src/platforms/weex'),
  server: path.resolve(__dirname, '../src/server'),
  entries: path.resolve(__dirname, '../src/entries'),
  sfc: path.resolve(__dirname, '../src/sfc')
}
```
找到最终路径后，配置文件对应的入口文件就找到了,经过Roollup的打包，最终会在`dist`目录下生成`vue.runtime.js`

## Runtime Only 和 Runtime + Compiler

- Runtime Only 通常使用该版本的Vue.js时，需要借助如webpack的vue-loader工具把.vue文件编译成javascript,因为是在编译阶段做的，所以它只包含运行时的Vue.js代码，因此代码体积也会更轻量。
- Runtime + Compiler 如果没有对代码做预编译，但又使用了Vue的template属性传入了一个字符串，则需要在客户端编译模板，编译成render函数这个编译过程发生在运行时，显然，这个编译过程会对性能有一定的损耗。

##　Vue的入口
真正初始化Vue的地方在`src/core/index,js`：

```js
import Vue from './instance.index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'
// 初始化全局Vue API
initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
```

Vue的定义在`src/instance/index.js`:
```js

import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

Vue实际上就是一个用Function实现的类，只能通过`new Vue`去实例化它,`为何 Vue 不用 ES6 的 Class 去实现呢？`我们往后看这里有很多 `xxxMixin` 的函数调用，并把` Vue 当参数传入`，它们的功能都是给 Vue 的 `prototype` 上扩展一些方法, `Vue按功能把这些扩展分散到多个模块中去实现，而不是在一个模块中实现所有`，这种方式用Class难以实现，这么做的好处时非常方便代码的维护和管理。


在`src/core/global-api/index.js`中给Vue这个对象本身扩展全局的静态方法


## 数据驱动

Vue.js 一个核心思想是数据驱动。所谓`数据驱动`，是指视图是由数据驱动生成的，`我们对视图的修改，不会直接操作 DOM，而是通过修改数据`。它相比我们传统的前端开发，如使用 jQuery 等前端库直接修改 DOM，大大简化了代码量。特别是当交互复杂的时候，只关心数据的修改会让代码的逻辑变的非常清晰，因为 `DOM 变成了数据的映射`，我们所有的逻辑都是对数据的修改，而不用碰触 DOM，这样的代码非常利于维护。

在 Vue.js 中我们可以采用简洁的模板语法来声明式的将数据渲染为 DOM：
```vue
<div id="app">
  {{ message }}
</div>
```
```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

###　new Vue发生了什么
上面我们可以从源码中看到，Vue只能通过`new关键字初始化`，然后会调用`this._init()`方法,在`src/core/instance/init.js`中定义:
```js
Vue。prototype._init = function (options ?: Object) {
    const vm: Component = this
    vm._uid = uid++

    let startTg, endTag
    if (process.env.NODE_ENV !== 'production' &&　config.performance &&　mark)  {
        startTag = `vue-perf-start:${vm._uid}`
        endTag = `vue-perf-end:${vm._uid}`
        mark(startTag)
    }
    // a flag to avoid this being observed(避免被观察到的标志)
  vm._isVue = true

  // merge options(合并配置)
   if (options && options._isComponent) {
    // optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }

   if (process.env.NODE_ENV !== 'production') {
    initProxy(vm)
  } else {
    vm._renderProxy = vm
  }

  // expose real self
  vm._self = vm
  initLifecycle(vm) //初始化生命周期
  initEvents(vm)  // 初始化事件中心
  initRender(vm)  // 初始化渲染
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm) // 初始化data
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')

   if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    vm._name = formatComponentName(vm, false)
    mark(endTag)
    measure(`vue ${vm._name} init`, startTag, endTag)
  }
  // 检测到如果有 el 属性，则调用 vm.$mount 方法挂载 vm
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}
```

### Vue挂载的实现
compiler版本的$mount在`src/platform/web/entry-runtime-with-compiler.js`中定义:
