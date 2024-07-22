# 原理

## bin文件夹([vite源码分析之dev](https://blog.csdn.net/qq_44859233/article/details/130904277))
当执行`npm run dev`这条命令时，`package.json`中对应的脚本为```"dev": "vite"```
<br/>

这里的dev对应的的vite，就会去`/node_modules/.bin`文件夹中去找名为`vite`的二进制文件
<br/>

在该文件夹下，有两个同名的可执行文件，没有后缀名的对应的时unix系统的shell脚本，.cmd后缀对应windows下的bat脚本，实质都是用node执行一个js文件。
<br/>

每当执行`npm run`，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。
<br/>

执行脚本就可以用脚本名调用，像正常执行一个 js 文件要 node 在加上执行文件的路径。

在npm install 时， npm读到该配置，就会将该文件连接到`/node_modules/.bin`目录下，npm还会将当前目录的`node_modules/.bin加入PATH变量`，执行结束后，再将PATH变量恢复原样，这样就可以直接作为命令运行依赖程序和开发依赖程序，不用全局安装了。
<br/>

当使用`npm install -g xxx`来安装，那么会将其中的 bin 文件加入到全局，比如 create-react-app 和 vue-cli ，在全局安装后，就可以直接使用如`vue-cli projectName`这样的命令来创建项目了

![alt text](/vite/image.png)

参考:
+ [npm CLI bin](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#bin)
+ [npm scripts 使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
+ [执行npm run dev的时候发生了什么](https://www.jianshu.com/p/53feedd72bcb)
+ [node_modules目录中的bin文件夹](https://zhuanlan.zhihu.com/p/616539774?utm_id=0)

拓展:
+ [npm link 用法个人总结](https://www.cnblogs.com/lijinxiao/articles/17333543.html)
+ [npm link的用法](https://www.cnblogs.com/zhangzl419/p/15210835.html)


执行顺序:
![alt text](/vite/image-1.png)

## 请求时编译 && 依赖预构建
### vite包

```/node_modules/vite/dist/node/cli.js```

```js
const cac = (name = "") => new CAC(name);
...

const cli = cac('vite') // cac（Command And Conquer） 是一个用于构建 CLI 应用程序的 JavaScript 库。
// 有如下命令
// cli.command('[root]', 'start dev serve')   运行
// cli.command('[build root]')  打包
// cli.command('optimize [root]', 'pre-bundle dependencies') 用于对Vite项目进行生产环境构建与优化
// cli.command('preview [root]', 'locally preview production build')  预览生产环境构建结果
// cli.help();  查看Vite CLI提供的所有命令与选项的帮助信息
// cli.version(require('../../package.json').version);   查看当前项目中使用的Vite版本
// cli.parse();   解析Vite项目中的import语句与别名,获得其最终解析结果
```

**\node_modules\vite\dist\node\chunks\dep-bb8a8339.js:**

+ resolveHttpServer： 直接使用`node`自带的`http`模块创建一个http服务
+ createWebSocketServer:  在`node`端`封装websocket`,返回`listen`、`on`、`off`、`send`、`close`、`clients`属性
+ handleHMRUpdate: 判断`配置文件发生改变`、`.env环境变量改变`、 `依赖发生改变`等情况就要重启服务server.restart();  判断`仅客户端`、`html文件发生变化`等情况不能热更新，发送send('full-reload'),让客户端重新加载页面。
+ updateModules: 当有监听到有模块更新，`moduleGraph`就有发生改变,去除无效的模块, 找到需要更新的模块,最后当发出send类型为update类型, 就是一个文件发生变化啦

**\node_modules\vite\dist\client**
node端发送socket,在客户端就要监听socket处理文件

<br/>

客户端处理socket的文件:

createServer --> _createServer --> resolveConfig --> resolvePlugins --> importAnalysisPlugin

importAnalysisPlugin里面通过字符串导入方式把`createHotContext`导入到了客户端

通过外部的npm包:`magic-string`

在createHotContent中, 就存在`setupWebSocket`啦

![alt text](/vite/image-2.png)

### vite在开发环境下，起了一个做编译的服务器，根据请求的URL找到对应的模块做编译之后返回。
<br/>
简单的步骤:

+ vite会使用`createServer()`起一个开发服务器
+ 这个开发服务器是基于connect实现的，vite给它加了很多中间件来处理请求  `viteIndexHtmlMiddleware`  `viteHtmlFallbackMiddleware` `viteServeStaticMiddleware` `viteServeRawFsMiddleware` `viteTransformMiddleware`  当请求`index.html`时，它会通过`ast`遍历，找到其中所有的`script`,然后提前对这些文件做编译，编译是通过不同的插件完成的，每个插件都会判断处理对应的资源，比如有`css`插件来编译css,`esbuild`插件来编译`ts/js`，然后返回编译后的`code`和`sourcemap`, `import-analysis`插件，在`esbuild`插件完成编译后，分析模块依赖，继续处理其他模块的transform.
+ 只要浏览器访问`index.html`，所有依赖的js模块，都会经过编译，所以成vite为`no bundle`方案，它只是基于浏览器的`module import`,在请求时对模块做下编译。

###  浏览器支持ES Module的import请求时编译的两个问题
+ 问题一： 如果node_modules下的依赖有用 commonjs 模块规范的代码呢?
+ 问题二:  如果每个模块都是请求时编译，那向 lodash-es 这种包，它可是有几百个模块的 import 呢?


就要提前做一些转换，把 commonjs 转成 es module， 还有提前对这些包做一次打包，变成一个 es module 模块；
在启动完开发服务器的时候，就马上对 node_modules 下的代码做打包，这个也叫 `deps optimize，依赖优化`

首先，扫描出所有的依赖来，这一步由esbuild做的，对入口 index.html 开始做打包，输出格式为 esm，但是 write 为 false，不写入磁盘, 输出到`node_modules/.vite` 下，并生成了一个 `metadata.jso`n 来记录 `hash`。

浏览器里用 `max-age 强缓存`这些预打包的模块，但是带了 `hash 的query`。这样当重新 build 的时候，可以`通过修改 query 来触发更新`。

在开发时通过 connect 起了一个服务器，调用 vite 插件来做 transform，并且对 node_modules 下的模块做了预构建，用 esbuild 打包。

在生产环境用 rollup 来打包，因为 vite 插件兼容了 rollup 插件，所以也是用同样的插件来处理，这样能保证开发和生产环境代码一致。

此外，vite 还基于 chokidar 和 websocket 来实现了模块热更新。

vite 插件时兼容 rollup 插件的，这样在开发的时候，在生产环境打包的时候，都可以用同样的插件对代码做 transform 等处理。

处理用的插件都一样，又怎么会开发和生产不一致呢？