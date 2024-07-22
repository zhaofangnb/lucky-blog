# HTML5 新特性
## 一、什么是 HTML5？

   ` HTML5 是最新的 HTML 标准。`

   ` HTML5 是专门为承载丰富的 web 内容而设计的，并且无需额外插件。`

   ` HTML5 拥有新的语义、图形以及多媒体元素。`

   ` HTML5 提供的新元素和新的 API 简化了 web 应用程序的搭建 `

   ` HTML5 是跨平台的，被设计为在不同类型的硬件（PC、平板、手机、电视机等等）之上运行。`

## 二、[HTML5 - 新特性](https://juejin.cn/post/6844903829679390728#heading-1)
    1. 新的语义/结构元素
    2. 增强型表单
    3. 视频和音频
    4. Cavas绘图
    5. SVG绘图
    6. 地理定位
    7. 拖放API
    8. WebWorker
    9. WebStroage
    10. WebSocket
### 2.1 新的语义/结构元素
    新的语义标签如<header>, <footer>, <main>, <section>, <article>, <aside>, <nav>等
    语义化标签使得页面的内容结构化，见名知义，有利于SEO。
### 2.2 增强型表单
    HTML5 增加了多个新的输入类型:

| 输入类型 | 描述              |
| ------- | ----------------- |
|  `color`  |    从一个颜色选择器选择一个颜色    |
|  `date`   |    从一个日期选择器一个选择日期    |
|  `datetime` |  允许用户选择日期和时间(有时区)  |
|  `datetime-local` | 允许用户选择日期和时间(无时区) |
|  `email`  |   一个包含e-mail地址的输入域 |
|  `month`  |   选择月份 | 
|  `time`   |   选择时间 |
|  `number` |   数值的输入域 |
|  `range`  |   包含一定范围内的值的输入字段,浏览器显示为滑块控件 |
|  `search` |   搜索域 |
|  `tel`    |   输入电话号码字段 |
|  `url`    |   url地址的输入域  |
|  `week`   |   选择周和年       |

    新增的输入限制(表单属性)有：

|  属性   |          描述    |
| ------- | --------------- |
|  `placeholder` | 输入框默认提示  |
|  `required `   | boolean值， 要求输入域不能为空 |
|  `pattern`    |  描述了一个正则表达式用于验证input元素的值 |
|  `min和max`   |  设置元素的最小值和最大值 |
|  `step`      |  规定输入字段的合法数字间隔 |
|  `autofocus`  |  boolean值， 表单域自动获得焦点  |
|  `multiple`   |  boolean值，input元素可选择多个值 |

拓展：
+ [el-input限制输入整数分析](https://blog.csdn.net/Bruce__taotao/article/details/134554829)
+ [你不知道的HTML属性](https://blog.csdn.net/Shids_/article/details/131193306)
+ [24 个鲜为人知的 HTML 属性](https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==&mid=2649121937&idx=3&sn=919b62282444fbb6add5bca32849c64d&chksm=be58433c892fca2a90788fbc215b8c80d04169405317e0d3c1ba5aff17c6b532777140e74b41&scene=27)
+ [HTML input](https://www.w3school.com.cn/tags/tag_input.asp)

### 2.3 视频和音频

新的媒介元素：

|  属性   |          描述    |
| ------- | --------------- |
|  `<audio>` |   定义声音或音乐内容 |
|  `<video>` |   定义视频或影片内容 |
|  `<embed>` |   定义外部应用程序的容器(比如插件) |
|  `<source>`|   定义`<audio>`和`<video>`的来源 |
|  `<track>` |   定义`<audio>`和`<video>`的轨道 |

`<audio>`元素允许使用多个`<source>`元素。<br/>
`<source>`元素可以链接不同的音频文件，浏览器将使用第一个支持的音频文件。<br/>
`<audio>`元素目前支持三种音频格式文件：mp3、wav、ogg<br/>
`controls`属性供添加播放、暂停和音量控件<br/><br/>

`<video>`元素支持多个`<source>`元素。<br/>
`<source>`元素可以链接不同的视频文件，浏览器将使用第一个支持的视频文件。<br/>
`<video>`元素目前支持三种视频格式文件：mp4、webm、ogg<br/>
`controls` 提供了播放、暂停和音量控件来控制视频。也可以使用dom操作来控制视频的播放暂停，如`play()`和`pause()`方法。


### 2.4 Canvas绘图
#### Canvas图形
1. 创建一个画布，一个画布在网页中是一个矩阵，默认没有边框和内容。
```html
<canvas id="myCanvas" width="200" height="100" style="border: 1px solid #000000;"></canvas>
```

2. 使用js来绘制图像
```js
    var c = document.getElementById("myCanvas")
    var ctx = c.getContext("2d")  // 内建的HTML对象
    ctx.fillStyle = "#ff0000"  // 设置填充色
    ctx.fillRect(0,0,150,75) // 绘制矩形
```
#### Canvas路径
```js
var c = document.getElementById("myCanvas")
var ctx = c.getContent("2d")
ctx.moveTo(0,0)  // 定义线条开始坐标
ctx.lineTo(200,100) // 定义线条结束坐标
ctx.stroke()   // 绘制线条
```

#### Canvas文本
fillText(text, x, y) 在 canvas 上绘制`实心`的文本<br/>
strokeText(text, x, y) 在 canvas 上绘制`空心`的文本

```js
var c = document.getElementById("myCanvas")
var ctx = c.getContent("2d")
// 使用 "Arial" 字体在画布上绘制一个高 30px 的文字（实心）
// ctx.font = "30px Arial" 
ctx.fillText("Hello World", 10, 50)  // text, x, y
```

#### Canvas渐变
渐变可以填充在矩形、圆形、线条、文本等，设置渐变的两种方式：<br/>
1. createLinearGradient(x,y,x1,y1) - 创建线条渐变
2. createRadialGradient(x,y,r,x1,y1,r1) - 创建一个径向/圆渐变

```js
// 使用渐变填充矩形
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
// Create gradient
var grd = ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red"); // 指定颜色停止，参数使用坐标来描述，可以是0至1
grd.addColorStop(1,"white");
ctx.fillRect(10,10,150,80);
```

#### Canvas图像
```js
// 把一幅画像放置到画布上， 使用drawImage(image, x, y) 
var c = document.getElementById('muCanvas')
var ctx = c.getContent('2d')
var img = document.getElementById("image") 
ctx.drawImage(img, 10, 10)
```

### 2.5 SVG绘图
SVG是指可伸缩的矢量图形
#### SVG与Canvas的区别
SVG是一种使用XML描述2D图形的语言<br/>
Canvas是通过JS来绘制2D图形

SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。

在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。


### 2.6 地理定位

```js
window.navigator.geolocation  {
    getCurrentPosition: fn // 用于获取当前的位置数据
    watchPosition: fn  // 监视用户位置的改变
    clearWatch: fn  // 清除定位监视
}
```

获取用户定位信息:
```js
navigator.geolocation {
    function (pos) {
        console.log('用户定位数据获取成功')　　　　
        console.log(arguments);　　　　
        console.log('定位时间：', pos.timestamp)　　　　
        console.log('经度：', pos.coords.longitude)　　　　
        console.log('纬度：', pos.coords.latitude)　　　　
        console.log('海拔：', pos.coords.altitude)　　　　
        console.log('速度：', pos.coords.speed)
    }
}
```

### 2.7 拖放API
在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。

拖放的过程分为源对象和目标对象。源对象是指你即将拖动元素，而目标对象则是指拖动之后要放置的目标位置。

#### 拖放的源对象（可能发生移动）可以触发的事件-3个
dragstart: 拖动开始

drag : 拖动中

dragend: 拖动结束

#### 拖放的目标对象（不会发生移动）可以触发的事件 -4个

dragenter : 拖动着进入

dragover: 拖动着悬停

dragleave: 拖动着离开

drop: 释放


#### dataTransfer：用于数据传递的“拖拉机”对象

在`拖动源对象事件`中使用`e.dataTransfer`属性保存数据

```js
e.dataTransfer.setData( k, v )
```

在`拖动目标对象事件`中使用`e.dataTransfer`属性读取数据
```js
var value = e.dataTransfer.getData( k )
```

### 2.8 WebWorker
当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。

`web worker` 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

首先检测浏览器是否支持 Web Worker
```html
<!DOCTYPE html>
<html>
<body>
    <p>Count numbers: <output id="result"></output></p>
    <button onclick="startWorker()">Start Worker</button> 
    <button onclick="stopWorker()">Stop Worker</button>
    <br><br>
</body>
</html>
```
```js
var w;
function startWorker () {
    if (typeof(Worker)!== "undefined") {
        if (typeof(w) === "undefined") {
            w = new Worker("demo_workers.js")
            w.onmessage = function (event) {
                document.getElementById("result").innerHTML = event.data
            }
        }
    } else {
        document.getElementById("result").innerHTML="Sorry, your browser does not support Web Workers..."
    }
}

function stopWorker () {
    w.terminate()
}

// demo_workers.js
var  i = 0
function timeCount () {
    i = i++
    postMessage(i)
    setTimeout(() => timeCount() , 500)
}
timeCount()
```
### 2.9 WebStorage
浏览器缓存 `cookie` `sessionStorage` `localStorage` 的区别：

1. 数据存储位置

三者都是存储在浏览器本地

2. 生命周期

cookie的过期时间是服务端在写入的时候就设置好的

localStorage是写入就一直存在，除非手动清除

sessionStorage是页面关闭的时候就清除

3. 存储大小

cookie 大小一般是4K

sessionStorage 和 localStorage 存储空间比较大， 约为5M

4. 写入方式

cookie 由服务端写入

sessionStorage 和 localStorage 由前端写入

5. 数据共享

三者数据共享都遵循同源策略, sessionStorage还必须限制是同一个页面

6. 发送请求时是否携带

前端给后端发送请求时会自动携带cookie

sessionStorage 和 localStorage 不会

7. 应用场景

cookie一般存储登录验证信息或者token

localStorage常用于存储不易变动的数据，减轻服务器压力

sessionStorage可以用来监测用户是否是刷新进入页面，如音乐播放器恢复进度条功能

### 2.10 WebSocket
WebSocket是HTML5开始提供的一种在`单个TCP 连接`上进行`全双工通讯`的协议。

在WebSocket API中，浏览器和服务器只需要做`一个握手`的动作，然后，浏览器和服务器之间就形成了`一条快速通道`。两者之间就直接可以数据互相传送。

浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，连接建立以后，客户端和服务器端就可以通过 TCP 连接直接交换数据。

当你获取 Web Socket 连接后，你可以通过 `send()` 方法来向服务器发送数据，并通过 `onmessage` 事件来接收服务器返回的数据。

```js
function WebSocket () {
    if ("WebSocket" in window) {
        var ws = new WebSocket("ws://localhost:9988/echo")
        ws.open = function () {
            ws.send("发送数据")
        }
        ws.onmessage = function (evt) {
            var receive_msg = evt.data
            alert('数据已接受')
        }
        ws.onclose = function {
            alert('连接已关闭')
        }
    } else {
        alert('您的浏览器不支持WebSocket!')
    }
}
```

