# Vite2

## 缓存

### 文件系统缓存
Vite 会将预购建的依赖缓存到`node_modules/.vite`

### 浏览器缓存
解析后的依赖请求会以 HTTP 头 `max-age=31536000,immutable` 强缓存，以提高在开发时的页面重载性能。

## 客户端类型
Vite 默认的类型定义是写给它的 Node.js API 的。要将其补充到一个 Vite 应用的客户端代码环境中，请添加一个 d.ts 声明文件：

```ts
/// <reference types="vite/client" />
```
同时，你也可以将 vite/client 添加到 tsconfig 中的 compilerOptions.types 下：
```json
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```
## Vite为Vue提供第一优先级支持:
- Vue 3 单文件组件支持：@vitejs/plugin-vue
- Vue 3 JSX 支持：@vitejs/plugin-vue-jsx
- Vue 2 支持：underfin/vite-plugin-vue2

## JSX
你可以使用 jsxInject（这是一个仅在 Vite 中使用的选项）为 JSX 注入 helper，以避免手动导入：
```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`
  }
})
```

## 公共基础路径
`base`配置项

## 自定义构建
你可以通过`build.rollupOptions`直接调整底层的 `Rollup 选项`：
```js
// vite.config.js 
import { defineConfig } from 'vite'

export default defineConfig({
  // js、css、img打包单独拆成不同的文件
  build: {
    assetsDir: 'static/',
    rollupOptions: {
        output: {
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: 'static/js/[name]-[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
    }
  }
})
```

打包后文件目录如下:
```
├─dist                              
│  ├─static
│  │  ├─js
│  │  │  └─js文件
│  │  ├─css
│  │  │  └─css文件
│  │  └─img
│  │     └─img文件
│  ├─index.html
│  └─favicon.ico
```


## 多页面模式
假设你有下面这样的项目文件结构:
```
├── package.json
├── vite.config.js
├── index.html
├── main.js
└── nested
    ├── index.html
    └── nested.js
```

在构建过程中，你只需指定多个 .html 文件作为入口点即可：

```js
// vite.config.js
const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html')
      }
    }
  }
})
```

## 库模式

当这个库要进行发布构建时，请使用 `build.lib 配置项`

```js
// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      // 打包入口 
      entry: path.resolve(__dirname, 'lib/main.js'),
      // 暴露的犬奴变量
      name: 'MyLib',
      // formats: ['es'， 'umd', 'cjs', 'life']
      // 输出的包文件名
      fileName: (format) => `my-lib.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
```

使用如上配置运行 vite build 时，将会使用一套面向库的 Rollup 预设，并且将为该库提供两种构建格式：es 和 umd (可在 build.lib 中配置)：

```
$ vite build
building for production...
[write] my-lib.es.js 0.08kb, brotli: 0.07kb
[write] my-lib.umd.js 0.30kb, brotli: 0.16kb
```

推荐在你库的 package.json 中使用如下格式：
```json
{
  "name": "my-lib",
  "files": ["dist"],
  "main": "./dist/my-lib.umd.js",
  "module": "./dist/my-lib.es.js",
  "exports": {
    ".": {
      "import": "./dist/my-lib.es.js",
      "require": "./dist/my-lib.umd.js"
    }
  }
}
```

## 环境变量和模式
Vite 在一个特殊的 `import.meta.env` 对象上暴露环境变量。

Vite 使用 [`dotenv`](https://github.com/motdotla/dotenv) 从你的 环境目录 中的下列文件加载额外的环境变量：
```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

为了防止意外地将一些环境变量泄漏到客户端，只有以`VITE_`为前缀的变量才会暴露给经过 vite 处理的代码。

## TypeScript智能提示
默认情况下，Vite 在 `vite/client.d.ts` 中为 `import.meta.env` 提供了类型定义。随着在 `.env[mode]` 文件中自定义了越来越多的环境变量，你可能想要在代码中获取这些以 `VITE_`为前缀的用户自定义环境变量的 TypeScript 智能提示。

要想做到这一点，你可以在 src 目录下创建一个 `env.d.ts` 文件，接着按下面这样增加 ImportMetaEnv 的定义：
```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```