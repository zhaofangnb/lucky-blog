# 基础配置

## webpack的五个核心概念
+ `Entery(入口)`
+ `Output(输出)`
+ `Loader(转换器)`
+ `Plugins(插件)`
+ `Mode(模式)`

| 选项 |  描述  | 特点 |
| :---: | :---: | :---: |
| development |   | 代码本地调试运行的环境  |
| production |   | 代码优化上线运行的环境  |


## 基本使用
> `npm init -y`初始化一个包描述文件，生成package.json文件, 开发完后，,webpack编译文件： `npx webpack ./src/main.js --mode=development`, 就会输出打包好的文件

> 项目下新建配置文件:webpack.config.js

```js
const patn = require('path')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, "dist"), // 文件输出目录
        filename: "static/js/main.js" //  将 js 文件输出到 static/js 目录中
        // clean: true, // 自动将上次打包目录资源清空
    },
    module: {
     // loader加载器
        rules: [
            { 
                test: /\/,
                use: []
            }
        ]
    }，
    // 插件
    plugins: []
}
```

## 处理样式资源
**webpack本身是不能识别样式资源(css、less、sass、scss、styl),所以需要借助Loader来帮助webpack来解析样式资源**

### 处理css资源
```js
// 下载两个Loader
npm i css-loader style-loader -D
```

+ css-loader: 负责将css文件编译成webpack能识别的模块
+ style-loader: 会动态创建一个style标签，里面放置webpack中css模块的内容
 
用法： 在webpack.config.js文件里的rules加入:
```js
module: {
    rules: [
        {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: ['style-loader', 'css-loader']
        }
    ]
}
```

### 处理图片资源
> Webpack4通过 `file-loader` 和 `url-loader`处理图片资源，现在Webpack5 已经将两个 Loader 功能`内置`到 Webpack 里了，只需要简单配置即可处理图片资源。

```js
module: {
    rules: [
        {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: 'asset',
            parser: {
                //对图片资源进行优化
                dataUrlCondition: {
                    maxSize: 10 * 1024  // 小于10kb的图片会被base64处理
                }
            },
            // 修改输出资源的名称和路径
            generator: {
                // 将图片文件输出到 static/imgs 目录中
                // 将图片文件命名 [hash:8][ext][query]
                // [hash:8]: hash值取8位
                // [ext]: 使用之前的文件扩展名
                // [query]: 添加之前的query参数
                filename: "static/imgs/[hash:8][ext][query]",
            }
        }
    ]
}
```
+ 对图片资源进行优化：将小于某个大小的图片转化成 `data URI` 形式（`Base64格式，优点：减少请求数量；缺点：体积变得更大`），**图片以 data URI 形式`内置到 js 中了，不会输出到dist`**。 （注意：需要将上次打包生成的文件清空，再重新打包才有效果）
+ `type: “asset/resource”` 相当于file-loader, 将文件转化成 Webpack 能识别的资源，其他不做处理；
type: “asset” 相当于url-loader, 将文件转化成 Webpack 能识别的资源，同时小于某个大小的资源会处理成 data URI 形式。

### 处理js资源
Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以要做一些兼容性处理。其次开发中，团队对代码格式是有严格要求的，需要使用专业的工具来检测。针对 js 兼容性处理，使用 Babel 来完成；针对代码格式，使用 Eslint 来完成。


### Eslint
用来检测 js 和 jsx 语法的工具，在Eslint 配置文件里面写上各种 rules 规则，将来运行 Eslint 时就会以写的规则对代码进行检查。

1.下载包：`npm i eslint-webpack-plugin eslint -D`<br/>
2.定义 Eslint 配置文件.eslintrc.js：
```js
module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {// 解析选项
    ecmaVersion: 6, // ES 语法版本
    sourceType: "module", // ES 模块化
    ecmaFeatures: { // ES 其他特性
      jsx: true // 如果是 React 项目，就需要开启 jsx 语法
  	}
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
};
```
rules 具体规则：<br/>
“off” 或 0 - 关闭规则<br/>
“warn” 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)<br/>
“error” 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)<br/>

```js
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
……
plugins: [
  new ESLintWebpackPlugin({
    // 指定检查文件的根目录
    context: path.resolve(__dirname, "src"),
  }),
],
```

### Babel
主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

1. 下载包: `npm i babel-loader @babel/core @babel/preset-env -D`<br/>
2.定义 Babel 配置文件babel.config.js：
```js
module.exports = {
  presets: ["@babel/preset-env"],
};
```

presets 预设：就是一组 Babel 插件, 扩展 Babel 功能。<br/>
`@babel/preset-env`: 一个智能预设，允许使用最新的 JavaScript。<br/>
`@babel/preset-react`：一个用来编译 React jsx 语法的预设。<br/>
`@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设。<br/>

```js
{
  test: /\.js$/,
  exclude: /node_modules/, // 排除node_modules代码不编译
  loader: "babel-loader",
},
```


### 处理HTML资源


1. 下载包: `npm i html-webpack-plugin -D`<br/>
2. 配置webpack.config.js：
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
……
plugins: [
  new HtmlWebpackPlugin({
    // 以 public/index.html 为模板创建文件
    // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
    template: path.resolve(__dirname, "public/index.html"),
  }),
],
```
修改 index.html：`去掉引入的 js 文件，因为 HtmlWebpackPlugin 会自动引入`。

### 生产模式
```js
├── webpack-test (项目根目录)
    ├── config (Webpack配置文件目录)
    │    ├── webpack.dev.js(开发模式配置文件)
    │    └── webpack.prod.js(生产模式配置文件)
    ├── node_modules (下载包存放目录)
    ├── src (项目源码目录，除了html其他都在src里面)
    │    └── 略
    ├── public (项目html文件)
    │    └── index.html
    ├── .eslintrc.js(Eslint配置文件)
    ├── babel.config.js(Babel配置文件)
    └── package.json (包的依赖管理配置文件)
```

### 单独处理css
CSS文件目前被打包到js文件中，当js文件加载时，会创建一个 style 标签来生成样式，这样对于网站来说，会出现闪屏现象，用户体验不好，应该是`单独的 CSS文件，通过 link 标签加载性能才好`。<br/>

 1.下载包：`npm i mini-css-extract-plugin -D` <br/>
 2.配置webpack.prod.js：<br/>
 ```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
rules: [
  {
    test: /\.css$/,
    // 将先前的"style-loader"替换成MiniCssExtractPlugin.loader
    use: [MiniCssExtractPlugin.loader, "css-loader"],
  },
],
plugins: [
  // 提取css成单独文件
  new MiniCssExtractPlugin({
    // 定义输出文件名和目录
    filename: "static/css/main.css",
  }),
],
 ```

### css兼容性处理

1.下载包：`npm i postcss-loader postcss postcss-preset-env   -D`<br/>
2.配置webpack.prod.js：<br/>
```js
rules:[
  {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [
              "postcss-preset-env", // 能解决大多数样式兼容性问题
            ],
          },
        },
      },
      "less-loader",
    ],
  },
]
```

当配置多了的情况下，上面的兼容性处理会略显冗余，所以可以抽象成个函数合并配置：<br/>
```js
// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};
……

rules:[
  {
   // 用来匹配 .css 结尾的文件
    test: /\.css$/,
    // use 数组里面 Loader 执行顺序是从右到左
    use: getStyleLoaders(),
  },
  {
    test: /\.less$/,
    use: getStyleLoaders("less-loader"),
  },
  {
    test: /\.s[ac]ss$/,
    use: getStyleLoaders("sass-loader"),
  },
]
```

3.控制兼容性：可以在 package.json 文件中添加 browserslist 来控制样式的兼容性做到什么程度。
```js
{
  // 其他省略
  "browserslist": ["last 2 version", "> 1%", "not dead"]
}
```

### css压缩
1.下载包：`npm i css-minimizer-webpack-plugin -D`<br/>
2.配置webpack.prod.js：<br/>
```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
plugins: [
  // css压缩
    new CssMinimizerPlugin(),
],
```