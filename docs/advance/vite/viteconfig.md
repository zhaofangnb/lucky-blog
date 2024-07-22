# vite.config.ts 最全配置

## base 、resolve
```ts
import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig( ({ command, mode }: ConfigEnv): UserConfig => {
    //  是否是构建模式
    const isBuild = command === "build";
    console.log(
        "Terminal input:",
        "isBuild:" + `${isBuild}` + "-----mode:" + `${mode}`
    );
    // const env = loadEnv(mode, process.cwd(), "");
    // 在最外层与vite.config.ts同级目录新建.env文件夹
    const env = loadEnv(mode, fileURLToPath(new URL("./env", import.meta.url)));

    return {
        base : env.VITE_BASE, //公共基础路径(根据环境变量来配置)
        envDir: fileURLToPath(new URL("./env", import.meta.url)), // 加载 .env 文件的目录
        resolve: {
            // 别名
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
            // 扩展
            extensions: ['.mjs', '.js', '.ts', 'jsx', '.tsx', '.json', '.vue']
        },
        esbuild: {
            drop: env.VITE_SHOW_VCONSOLE === "false" ? ['console', 'debugger'] : []
        }
    }
})
```
## plugin 插件
使用插件: `vite-plugin-remove-console`
```ts
import removeConsole from 'vite-plugun-remove-console'
export default defineConfig({
    plugin: [
        vue(),
        removeConsole(),
        // 另一种使用方式
        {
            ...removeConsole(),
            enforce: 'pre | post', // pre表示在vite核心插件之前调用该插件, post表示在vite核心插件之后
            apply: 'serve | build' // 插件在那个mode中调用
        }
    ]
})
```
## css
```ts
import autoprefixer from 'autoprefixer';
import postCssToRem from 'postcss-pxtorem';

css: {
    preprocessorOptions: {
        scss: {
            additionalData: '@import "@/assets/css/main.scss";'
        }
    },
    postcss: {
        plugins: [
            // px转rem
             // 自适应，px>rem转换
          rootValue: 75, // 75表示750设计稿，37.5表示375设计稿
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: [".van", ".el"], // 过滤掉van-开头的class，不进行rem转换
          exclude: "/node_modules", // 忽略包文件转换rem
        ]
    }
}
```

## serve开发服务器
```ts
server: {
    port: Number(env.VITE_PORT),
    host: env.VITE_HOST,
    open: false,
    proxy: {
        
    }
}
```
## build构建选项
```ts
build: {
    // 输出目录
    outDir: 'dist',
    // 指定生成静态资源的存放路径
    assetsDir: 'asserts', 
    // 小于此值的导入或引用资源将内联为base64编码
    assetsInlineLimit: 4096,
     //设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'，这是指 支持原生 ES 模块、原生 ESM 动态导入 和 import.meta 的浏览器。
      //  另一个特殊值是 “esnext” —— 即假设有原生动态导入支持，并且将会转译得尽可能小,一般会搭配esbuild使用
      target: 'modules'
},
//  ESBuildOptions 继承自 esbuild 转换选项。
esbuild: {
      //  最常见的用例是自定义 JSX
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
}
```



