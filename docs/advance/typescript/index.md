# TypeScript

## 什么是TypeScript
TypeScript是一门由微软推出的开源的、跨平台的编程语言。它是JavaScript的`超集`，扩展了 JavaScript 的语法，`最终会被编译为JavaScript代码`。<br/>

## 使用TypeScript的优势(特性)
### 静态类型检查
在`编译阶段`就可以发现大部分错误，避免了很多线上bug，省时省力。
### 良好的代码提示
增加了编辑器和`IDE`的功能， 包括`代码补全`,`接口提示`,`跳转到定义`等，大大提升了开发效率.


## TypeScript环境搭建

### 全局安装

```js
npm install -g typescript
```

全局安装完就可以使用`tsc`命令将`ts`文件编译为`js`文件了

```js
tsc index.ts
```
上面会把`index.ts`文件编译成`index.js`,并放到当前目录下


### 局部安装

首先创建`package.json`文件

```js
npm init -y
```

然后在当前目录下安装`typescript`

```js
npm install typescript
```

然后我们生成`typescript`的配置文件

```js
./node_modules/.bin/tsc --init
```

使用上面的命令后会在当前目录下生成`tsconfig.json`文件。

我们先在里面配置`rootDir`和`outDir`。

```js
{
  "compilerOptions": {
    "rootDir": "./dist", // 需要编译的ts文件目录
    "outDir": "./src" // 编译后js存放的目录
  }
}
```

然后我们在`package.json`文件配置脚本。

```js
"scripts": {
  "build": "tsc",
  "build:w": "tsc -w"
}
```
build是`全部编译`，build:w是`实时编译`，也就是我们ts文件有改动就会自动编译，在学习阶段推荐使用这个命令。<br/>

这样我们在命令行执行npm run build:w就能实时编译我们src目录下的ts文件啦。


### 使用ts-node

如果觉得编译麻烦想直接运行ts文件的话可以使用ts-node。

全局安装
```js
npm i -g ts-node
```

```js
ts-node index.ts
```

局部安装
```js
npm i -g ts-node
```

直接运行index.ts文件
```js
ts-node index.ts
```

局部安装
```js
npm i ts-node
```

在当前目录下运行index.ts文件
```js
./node_modules/.bin/ts-node ts-node index.ts
```

### 使用babel


