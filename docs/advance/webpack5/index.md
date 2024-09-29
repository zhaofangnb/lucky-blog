# Webpack5
 ## webpack 和 vite的异同
 >基础概念不同
  + webpack是一个模块打包器，可以把不同类型的模块和资源文件打包为静态资源，具有高度的可配置性，通过插件和loader扩展其功能
  + vite是一个基于浏览器原生ES的开发服务器，提供了如：快速冷启动、即时热更新和真正的按需编译。
 >编译方式不同
 + webpack会将所有的模块打包成一个bundle.js文件然后运行
 + vite在开发模式下，没有打包的步骤，利用浏览器ES Module Imports的特性，只有在真正需要时编译文件； 生产模式下，vite使用Rollup打包，提供了更好的tree-shaking，代码压缩和性能优化。
 >开发效率不同
 + webpack是全量更新，即使修改一个小文件，也会重新编译整个应用，在大型应用中可能导致编译速度变慢。
 + vite是增量更新，只更新修改的文件
 >扩展性不同
 + vite的生态相比webpack的成熟的插件生态还是有一些距离
 >应用场景不同
 + webpack由于其丰富的功能和扩展性，适合于大型、复杂的项目。

 + vite凭借其轻量和速度，更适合于中小型项目和快速原型开发。
 ## 如何开发webpack插件

### 1.[官方文档](https://webpack.docschina.org/contribute/writing-a-plugin/#creating-a-plugin)

### 2.webpack 插件组成
 + 一个`JavaScript命名函数`或`JavaScript类`
 + 在插件函数的`prototype`上定义一个`apply`方法
 + 指定一个绑定到webpack自身的`事件钩子`
 + 处理webpack内部实例的特定数据
 + 功能`完成时处理`webpack提供的`回调`

 `Compiler`它扩展自`Tapable`类，设置了一系列的事件钩子和各种配置参数，并定义了webpack诸如`启动编译`、`观测文件变动`、`将编译结果文件写入本地`等一系列核心方法。

 常见事件钩子介绍:
 - beforeRun: 在编译器开始读取 records 之前执行
 - run: 在读取 records之 前
 - thisCompilation： 在 compilation 初始化时执行
 - compilation：在 compilation 创建之后执行
 - make：在 complication 完成之前执行
 - afterCompilation：在 compilation 完成后执行
 - emit：在生成文件到 output 目录之前执行
 - afterEmit：在生成文件到 output 目录之后执行
 - done：在 compilation 完成之后执行;

`Compilation` 类扩展(extend)自 Tapable，并提供了以下生命周期钩子:

+ addChunk
+ addEntry
+ deleteAsset
+ buildModule
+ optimize

```js
1.创建一个JS文件，定义插件类(需要实现apply方法，该方法在webpack构建过程中被调用)
class MyPlugin {
    apply(compiler) {
        //
    }
}

2.在apply方法中编写插件的逻辑，可以监听wepack不同的生命周期事件，并执行相应操作
class MyPlugin {
    apply(compiler) {
        // 在compiler对象上注册事件监听器
        compiler.hooks.someHook.tap('MyPlugin', (params) => {
            //
        })
    }
}

3.在插件逻辑中，可以利用Webpack提供的API来获取构建过程中的相关信息，并进行相应的处理。可以修改Webpack的配置、添加新的资源、处理构建结果等。
class MyPlugin {
    apply(compiler) {
        // 在compiler对象上注册事件监听器
        compiler.hooks.someHook.tap('MyPlugin', (params) => {
            //
        })
        compiler.hooks.done.tap('MyPlugin', (stats) => {
            // 构建完成后完成操作
            console.log('Build completed!')
        })
    }
}

4.将插件导出，以便在webpack配置文件中使用
module.exports = MyPlugin

5.在Webpack配置文件中引入插件，并将其作为插件配置项添加到plugins数组中

const MyPlugin = require('./path/to/MyPlugin');
module.exports = {
  // 配置其他Webpack选项
  plugins: [
    new MyPlugin()
  ]
};
```

```js
// 一个JavaScript命名函数
function MyExampleWebpackPlugin () {

}
// 在插件函数的prototype上定义一个apply方法
MyExampleWebpackPlugin.prototype.apply = function (compiler) {
    // 指定一个挂载到webpack自身的事件钩子。
   compiler.plugin('webpacksEventHook', function(compilation, callback) {
    console.log('这是一个插件demo');

    // 功能完成后调用 webpack 提供的回调
    callback();
   })
}
```

在开发Plugin时我们最常用的两个对象就是 Compiler 和 Compilation, 他们是Plugin和webpack之间的桥梁。

#### `compiler`对象
Compiler 对象包含了Webpack环境所有的配置信息，包含options，loaders, plugins这些项，这个对象在webpack启动时候被实例化，它是全局唯一的。我们可以把它理解为webpack的实列。

#### `compilation`对象

### 3.webpack打包过程
+ 1.`解析入口文件`：Webpack从配置文件中读取入口文件的路径，然后开始解析入口文件及其依赖的模块
+ 2.`构建模块依赖关系`：Webpack根据入口文件和其依赖的模块，递归地构建模块之间的依赖关系图，形成一个依赖树
+ 3.`解析模块`： Webpack根据模块的文件类型，使用相应的Loader对模块进行解析和转换。例如，对于JavaScript模块，使用Babel Loader进行转换，对于CSS模块，使用CSS Loader进行解析。
+ 4.`模块打包`：Webpack将经过解析和转换的模块打包成一个或多个输出文件。可以通过配置文件指定输出文件的名称、路径和格式等。
+ 5.`优化与处理`： Webpack对打包后的文件进行优化和处理。这包括代码压缩、文件合并、资源提取等操作，以减小文件体积、提升加载速度和优化用户体验。
+ 6.`输出结果`: Webpack将打包处理后的文件输出到指定的目录中，供浏览器或服务器使用

在整个打包过程中，Webpack通过配置文件中的各种配置选项，如入口文件、输出路径、Loader和插件等，来控制打包的行为和处理方式。通过灵活配置，可以满足不同项目的需求，并实现代码的模块化、优化和可维护性。

### 4. Vite依赖预构建

在 Vite 项目中，`依赖预构建（Dependency Pre-bundling）`是一个重要的功能，用于优化依赖的加载速度和提高开发效率。Vite 使用 ES 模块（ESM）原生支持的能力来快速提供模块服务，但并非所有依赖都支持 ESM。因此，Vite 会对不支持 ESM 的依赖进行预构建，将它们转换成 ESM 格式，以便可以更快地加载和使用。

V**ite 依赖预构建的工作原理:**
+ `识别非ESM依赖`：Vite 在启动时会分析 `node_modules` 中的依赖，识别出哪些依赖不是以 `ESM`格式提供的。

+ `预构建依赖`：对于非ESM的依赖，Vite 会使用 `esbuild`（或其他配置的打包工具）来预构建这些依赖。预构建过程包括将依赖转换成 ESM 格式，并可能进行一些优化（如代码压缩、tree shaking等）。

+ `缓存预构建结果`：预构建完成后，Vite 会将`结果缓存`起来，以便在`下次启动`时可以快速使用，无需再次预构建。

+ `服务ESM依赖`：在开发过程中，Vite 会直接从缓存中提供预构建的 ESM 依赖，从而加快模块加载速度。

如何在 Vite 中配置依赖预构建
虽然 Vite 通常会自动处理依赖预构建，但在某些情况下，你可能需要手动配置它。以下是一些常见的配置选项：

`optimizeDeps` 配置：在 Vite 配置文件中（通常是 `vite.config.js 或 vite.config.ts`），你可以通过 optimizeDeps 配置来`控制依赖预构建的行为`。例如，你可以`指定哪些依赖应该被预构建，或者修改预构建的配置选项`。

```js
// vite.config.js
export default {
  optimizeDeps: {
    // 自定义预构建行为
    include: ['some-package'], // 指定需要预构建的依赖
    exclude: ['another-package'], // 指定不需要预构建的依赖
    // 其他配置...
  },
  // 其他 Vite 配置...
};
```
环境变量：Vite 支持通过环境变量来控制依赖预构建的行为，但通常这不需要手动设置，除非你正在开发一个特殊的插件或工具。

**注意事项**
+ `缓存问题`：由于 Vite 会缓存预构建的结果，因此在添加新依赖或更新现有依赖后，可能需要重启 Vite 开发服务器或使用 vite --force 来强制重新预构建依赖。

+ `插件和工具`：如果你正在使用 Vite 插件或第三方工具，请确保它们与你的 Vite 版本兼容，并了解它们如何影响依赖预构建过程。

总之，Vite 的依赖预构建功能是一个强大的特性，可以显著提高开发效率和项目性能。通过合理配置和使用，你可以充分利用这一特性来优化你的项目。