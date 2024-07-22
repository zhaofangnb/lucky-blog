# Vite3

## 搭建第一个Vite项目

兼容性注意: Vite 需要 Node.js 版本 `14.18+`，`16+`。
```
// 使用npm
npm create vite@latest

// 使用yarn
yarn create vite

// 使用pnpm
pnpm create vite
```

还可以通过`附加的命令行选项`直接`指定项目名称和你想要使用的模板`:

```
npm create vite@latest my-app --template vue
```
更多模板细节: `vue`、`vue-ts`、`react`、`react-ts`、`react-swc`、`react-swc-ts` ...

## 仅含类型的导入和导出
```ts
import type { T } from 'only/types'
export type { T }
```

## Vite 为 Vue 提供第一优先级支持


+ Vue 3 单文件组件支持：@vitejs/plugin-vue
+ Vue 3 JSX 支持：@vitejs/plugin-vue-jsx
+ Vue 2.7 支持：vitejs/vite-plugin-vue2
+ Vue <2.7 的支持：underfin/vite-plugin-vue2