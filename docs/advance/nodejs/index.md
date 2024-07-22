# NodeJs

## 事件循环

```js
// 1. 引入events模块
var events = require('events')
// 2.创建EventEmitter
var eventEmitter = new events.EventEmitter()
// 3.创建事件处理程序
var connectHandler = function connected () {
    console.log('连接成功')
    // 触发事件
    eventEmitter.emit('data_received')
}
// 4.绑定connection 事件处理程序
eventEmitter.on('connection', connectHandler)

// 5.使用匿名函数绑定data_recevied事件
eventEmitter.on('data_received', function () {
    console.log('数据接收成功')
})
// 触发connection 事件
eventEmitter.emit('connection')
console.log('程序执行完毕')
```

在node中执行结果为:
```
连接成功
数据接收成功
程序执行完毕
```

Node中的异步API：
1. 定时器: `setTimeout`、`setInterval`
2. I/O操作： 文件读写、数据库操作、 网络请求...
3. Node独有的API:`process.nextTick`、 `setImmediate`

事件循环的流程：<br/>
Node的事件循环分为6个阶段，这6个阶段会按顺序反复运行<br/>
运行到某个阶段时，都会从该阶段对应的回调队列中取出函数执行<br/>
当队列为空或者执行的回调函数数量达到系统设定的阈值，就会进入到下一阶段

![](https://i.hd-r.cn/c32301dd4d081158fe50b62aa5a91919.png)

1. timer阶段： 处理`setTimeout`、`setInterval`的回调， 由poll阶段控制
2. I/O callbacks阶段: 处理系统级别的回调 如TCP连接失败的回调
3. idle, prepare 阶段： 仅Node内部使用
4. poll阶段： 处理I/O操作的回调；事件循环空闲时， 会在此阶段暂停，以等待新的回调假如
5. check阶段 ：执行`setImmediate`的回调
6. close callbacks阶段： 执行关闭请求的回调

## Buffer

```js
// 创建一个长度为10， 且用0填充的Buffer
const buf1 = Buffer.alloc(10)
// 创建一个长度为10，且用0x1填充的Buffer
const buf2 = Buffer.alloc(10, 2)
// 创建一个包含[0x1,0x2,0x3]的Buffer
const buf3 = Buffer.from([1,2,3])
// 写入缓冲区
let buf4 = Buffer.alloc(256)
len = buf4.write('www.baidu.com')
console.log('写入字节数', +len) // 13
// 从缓冲区读取数据
buf5 = Buffer.alloc(26)
for (let i =0; i< 26; i++) {
    buf5[i] = i + 97
}
console.log(buf5.toString('ascii')) //编码方式ascii   
console.log(buf5.toString('ascii'，0，5))
console.log(buf5.toString('utf-8'));
console.log(buf5.toString('utf-8',0,5));
console.log(buf5.toString(undefined,0,5)); //使用默认的utf-8编码
```

打印结果:
```
abcdefghijklmnopqrstuvwxyz
abcde
abcdefghijklmnopqrstuvwxyz
abcde
abcde
```

```js
//4.将Buffer转换为JSON对象
const buf6 = Buffer.from([0x1,0x2,0x3,0x4,0x5]);
const json = JSON.stringify(buf6);
console.log(json);
//{"type":"Buffer","data":[1,2,3,4,5]}

const copy = JSON.parse(json, (key,value) => {
    return value && value.type === 'Buffer' ? Buffer.from(value.data) : value;
})
console.log(copy);
{/* <Buffer 01 02 03 04 05> */}
```

```js
// 缓冲区合并
const buf7 = Buffer.from('菜鸟就是菜鸟');
const buf8 = Buffer.from('大神就是大神');
const buf9 = Buffer.concat([buf7,buf8]);
console.log('buf9的内容: ' + buf9.toString());
//buf9的内容: 菜鸟就是菜鸟大神就是大神
```

```js
// 缓冲区比较
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}
//ABC在ABCD之前
```

```js
// 拷贝缓冲
var buf10 = Buffer.from('abcdefghijkl');
var buf11 = Buffer.from('RUNOOB');

//将 buf11 插入到 buf10 指定位置上
buf11.copy(buf10, 2);
console.log(buf10.toString());
//abRUNOOBijkl
```


```js
var buffer3 = Buffer.from('runoob');
// 剪切缓冲区
var buffer4 = buffer3.slice(0,2);
console.log("buffer4 content: " + buffer4.toString());
// run
```



## HTTP请求
```js
const http = require('http')
const url = require('url')
const util = require('util')
const querystring = require('querysstring')

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end(util.inspect(url.parse(req.url, true)))
    //转换为字符串 --->  url.parse()方法将路径解析为一个方便操作的对象。
    //第二个参数为 true 表示直接将查询字符串转为一个对象（通过query属性来访问），默认第二个参数为false
    //https://blog.csdn.net/qq_45830543/article/details/113035212
}).listen(3000)
console.log('本服务启动在：http://localhost:3000')

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    // 解析url参数
    var params = url.parse(req.url, true).query
    res.write('网站名:' + params.name)
    res.write('\n')
    res.write('网站Url:' + params.url)
    res.end()
}).listen(3001)

http.createServer(function(req,res) {
    // 定义了一个post变量，用于暂存请求体的信息
    var post = ''
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk) {
        post += chunk
    })
    // 在end 事件触发后，通过querystring 将post解析成真正的Post请求格式
    req.on('end', function () {
        post = querystring.parse(post)
        res.end(util.inspect(post))
    })
}).listen(3002)
```

## 文件系统

```js
const fs = require('fs')
// 首先创建input.txt文件，设置内容

// 异步读取 readFile
fs.readFile('input.txt', function (err, data) {
    if (err) {
        return console.error(err)
    }
    console.log('异步读取:', +data.toString())
})

// 同步读取readFileSync
const data = fs.readFileSync('input.txt')
console.log('同步读取', +data.toString())
console.log('程序执行完毕')

// 异步打开文件
const fs = require('fs')
console.log('准备打开文件')
fs.open('input.txt','r+', function(err, fd) {
    if (err) {
        return console.error(err)
    }
    console.log('文件打开成功')
})
//获取文件信息
var fs = require('fs')
fs.stat(path,callback)

// 写入文件
fs.writeFile(file,data[options], callback)

// 读取文件
fs.read(fd,buffer,offset,length,position,callback)

// 关闭文件
fs.close(fd,callback)

// 截取文件
fs.ftruncate(fd, len, callback)

// 删除文件
fs.unlink(path, callback)

// 创建目录
fs.mkdir(path, [options], callback)

// 读取目录
fs.readdir(path,callback)
// 删除目录
fs.rmdir(path,callback)
```

## 函数

```js
function say (word) {
    console.log(word)
}
function execute(someFun, value) {
    someFun(value)
}
// 把say函数本身作为execute函数的第一个变量进行了传递
execute(say,'hello, world')

// 匿名函数
function execute (someFun, value) {
    someFun(value)
}
execute(function(word) {console.log(word)}, 'hello. world')
```

## 全局对象Global
在Node.js中的全局对象是global
```js
console.log(__filename)// 表示当前执行脚本的文件名，它将输出文件所在的绝对路径
console.log(__dirname) // 表示当前执行脚本所在的目录

process是global对象的属性，用来描述当前进程状态的对象，提供了一个与操作系统的简单接口
1. exit
2. beforeExit
3. uncaughtException
4. signal事件
```

console提供了控制台标准输出流(stdout)或标准错误流(stderr)
```
console.log()
console.info()
console.error()
console.warn()
console.dir()
console.time()
console.timeEnd()
console.trace()//当前代码在堆栈中的调用路径
console.assert() // 用于判断某个表达式或者变量是否为真，若不为真，才输出第二个参数
```

## 写入流
```js
var fs = require('fs')
var data = '增加的数据'
// 创建一个可以写入的流，写入到文件output.txt中
var writeSteam = fs.createWriteSream('output.txt') // 如果存在output文件，则会覆盖原内容
// 设置编码
writeSteam.write(data, 'UTF8')
// 标记文件末尾
writeSteam.end()
// 处理流事件
writerStream.on('finish', function () {
    console.log('写入完成')
})
writerStream.on('error', function(err) {
    console.log(err.stack)
})
console.log('写入流程序执行完毕')
```

## 从流中读取数据
```js
var fs = require('fs')
var data = ''

// 创建可读流
var readerStream = fs.createReadStream('input.txt')
//设置编码
readerStream.setEncoding('UTF8')
// 处理事件
readerStream.on('data', function(chunk) {
    data += chunk
})
readerStream.on('end', function () {
    console.log(data)
})
readerStream.on('error', function(err) {
    console.log(err.chunk)
})
console.log('读取流数据程序执行完毕')
```
