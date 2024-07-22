# canvas应用案例

+ 动画
+ 游戏
+ 视频（因为生产环境还不成熟，略）
+ 截图
+ 合成图
+ 分享网页截图
+ 滤镜
+ 抠图
+ 旋转、缩放、位移、形变
+ 粒子

## 动画

### API介绍

#### requestAnimationFrame
该方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。 该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。 
+ 1. 避免掉帧，依赖浏览器的绘制频率
+ 2. 提升性能
```vue
<cavans id="canvas" width="600" height="600"></cavans>
<script>
 const canvas = document.getElementById('canvas')
 const ctx = canvas.getContent('2d')
 ctx.fillStyle = 'purple' // 填充颜色
 const step = 1 // 步长
 let xPos = 0  // x坐标
 move()
 function move () {
    ctx.clearRect(0,0,600,600) // 橡皮擦
    ctx.fillRect(xPos, 0, 300, 150) // 绘制
    xPos += step
    if (xPos <= 300) {
        requestAnimationFrame(() => {
             move()
        })
    }
 }
</script>
```

## 游戏

### 三要素
+ `对象抽象`  即对游戏中角色的抽象
+ `requestAnimationFrame` 游戏动起来的原理
+ `缓动函数` 匀速运动的动画会显得非常不自然，要变得自然就得时而加速，时而减速，那样动画就会变得更加灵活，不再生硬

## 截图

### 绘制图像方法 
#### drawImage
+ `drawImage(image, dx, dy)` 在画布指定位置绘制原图
+ `drawImage(image, dx, dy, dw, dh)` 在画布指定位置上`按原图大小`绘制指定大小的图
+ `drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)` 剪切图像，并在画布上定位`被剪切`的部分

| 参数 | 描述|
| :----: | :----: |
| image | 规定要使用的图像、画布或视频 |
| sx    | 可选。开始剪切图片的 x 坐标位置 |
| sy    | 可选。开始剪切图片的 y 坐标位置 |
| sw    | 可选。被剪切图像的宽度, 若小于图片原宽，则图片多余部分被剪掉, 若大于， 则以空白填充 |
| sh    | 可选。被剪切图像的高度 |
| dx    | 在画布上放置图像的 x 坐标位置 |
| dy    | 在画布上放置图像的 y 坐标位置|
| dw    | 可选。要使用的图像的宽度（就是裁剪之后的图片高度，放大或者缩放）|
| dh    | 可选。要使用的图像的高度（就是裁剪之后的图片高度，放大或者缩放）|


####  toDataURL(type, encodeOptions) 

+ `type` 指定转换为base64编码后图片的格式,默认为image/png, 可以是其他格式 image/jpg
+ `encodeOptions` 0~1的取值，用来选定图片的质量，超出范围也会选择默认值0.92
+ `返回值是一个数据url`，是base64组成的图片的源数据、可以直接赋值给图片的src属性。
+  若原图为jpeg格式，使用png会使最终生成的文件大小扩大十倍，这边最好也使用jpeg格式，使用jpeg图像大小会变大6%左右，webp虽然会使得生成的文件大小缩小，但有兼容性问题。

将图片转换为base64位编码有什么好处？

+ 将图片转换为base64位编码后，图片会跟随代码（html、css、js）一起请求加载，不会再单独进行请求加载；

+ 可以防止由于图片路径错误导致图片加载失败的问题；


#### canvas.style.width 和 canvas.width的区别

把canvas元素比作画框： 
 + `canvas.style.width` 则是控制在`画框中的画尺寸`的方式。
 + `canvas.width` 则是控制`画框尺寸`的方式。

下同： canvas在标签上设置宽高 和在style中设置宽高有什么区别

+ 在标签上设置宽高，画布尺寸大小会改变，画布里面元素尺寸不会随着画布改变
+ 在style上设置宽高，相当于放大缩小，画布里的元素尺寸会随着画布大小改变

```js
// 截图功能
const captureResultBox = document.getElementById('captureResultBox') // 截图后的结果
const captureRect = document.getElementById('captureRect') // 被截图的矩形
const style = window.getComputedStyle(captureRect)
const img = new Image()
// 设置canvas画布大小
canvas.width = parseInt(style.width)
canvas.height = parseInt(style.height)
// 画图
const x = parseInt(style.left)
const y = parseInt(style.top)
const w = parseInt(img.width)
const h = parseInt(img.height)
ctx.drawImage(img, x, y, w, h, 0, 0, w, h) // 剪切图片

// 将图片append到html中
const resultImg = document.createElement('img')
resultImg.crossOrigin = '' // anonymous 设置元素的跨域资源请求不需要凭证标志设置。
// toDataURL必须在http服务中
resultImg.src = canvas.toDataURL('image/png', 0.92)
// 插入图片界定啊
captureResultBox.appendChild(resultImg)

// 另一种
// const img = new Image()
// img.onload = function () {
//     const x = parseInt(style.left)
//     const y = parseInt(style.top)
//     const w = parseInt(this.width)
//     const h = parseInt(this.height)
//     ctx.drawImage(this, x, y, w, h, 0, 0, w, h) // 剪切图片
// }
// img.crossOrigin = ''
// img.src =  canvas.toDataURL('image/png', 0.92)
```

## 合成图

合成的思路其实就是把多张图片都画在同一个画布(cavans)里。

```js
const bg = new Image() // 背景图片
canvas.width = bg.width
canvas.height = bg.height
ctx.dragImage(bg, 0, 0)

// 画第一个角色
ctx.drawImage(character1, 100, 200, character1.width/2, character1.height/2)
// 画第二个角色
ctx.drawImage(character2, 100, 200, character2.width/2, character2.height/2)
```

## 分享网页截图
拿比较出名的`html2canvas`为例，实现方式就是`遍历整个dom，然后挨个拉取样式`，在canvas上一个个地画出来。

## 滤镜
### API
#### getImageData(sx,sy,sw,sh) 可复制画布上指定的矩形的像素数据
返回一个ImageData对象，用来描述`canvas区域隐含的像素数据`，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。
```js
const img = document.createElement('img')
img.src = './filter.jpg'
img.addEventListener('load', () => {
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    // 捕获截图区域的像素数据
    console.log(ctx.getImageDate(0, 0, canvas.width, canvas.height))
    // 打印如下数据:
    // ImageData: {
    //     data:Uint8ClampedArray(924160) [82, 111, 115,255, 123, 150, 157,255 ...],
    //     height: 361,
    //     width: 640
    // }
})
```
+ 已知 924160 = 640 * 361 * 4
+ `Uint8ClampedArray`为8位无符号整型固定数组， 类型化数组表示一个由`值固定在0~255`(2^0-2^8)区间的8位无符号组成的数组。
+ 打印结果中的 `data里其实就是像素`, 4个数据为一组，表示一个像素，即为rgba。 
+ 图片的width * 图片的height * 4 就是所有像素的总和,即data数组的`length`
+ 如果将这个一维数组想象成二维数组，一个格子代表一个像素，w代表图像宽度，h代表图像高度,则某个像素点(x,y)对应的下标 `index = [(y- 1) * w + (x - 1)] * 4`

#### createImageData(width, height) 创建新的空白ImageData对象

+ 在canvas在取渲染上下文为2D（即canvas.getContext(‘2d')）的时候提供的接口。
+ 作用是创建一个新的、空的、特定尺寸的ImageData对象。其中所有的像素点初始都为`黑色透明`。并返回该ImageData对象。

####  putImageData  将图像数据（从指定的ImageData对象）放回画布上
`putImageData(imgData,x,y, dirtyX,dirtyY,dirtyWidth,dirtyHeight)`

```js
// 添加滤镜
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const img = new Image()
img.addEventListener('load', () => {
    const w = img.width
    const h = img.height
    ctx..drawImage(img, 0, 0)

    // 保存原始数据
    const originImageData = ctx.getImageData(0, 0, w, h).data

    // 清空所有色彩，并将像素设置为 黑色透明
    const outputImage = ctx.createImageData(w, h)
    const outputImageData = outputImage.data

    // 复古
    retroBtn.addEventListener('click', () => {
        // 滤镜处理方法处理图像数据
        retro(originImageData, outputImageData, w, h)
        // 绘制滤镜效果到画布上
        ctx.putImageData(outputImageData, 0, 0)

        // 加入html
        filterName.textContent = '复古'
        appendToresultBox()
    })
})

function retro(originImageData, outputImageData, w, h) {
    // 滤镜处理方法
    let index
    let r, g, b
    // 按行扫描
    for (let y = 1; y <= h; y++) {
        // 按列扫描
        for (let x = 1; x <= w: x++) {
            // rgb处理
            index = ((y - 1) * w + (x - 1)) * 4
            r = originImageData[index]
            g = originImageData[index + 1]
            b = originImageData[index + 2]

            // r
            outputImageData[index] = ( r * 0.393) + (g * 0.769) + (b * 0.189)
            // g
            outputImageData[index + 1] = ( r * 0.349) + (g * 0.686) + (b * 0.168)
            // b
            outputImageData[index + 2] = ( r * 0.272) + (g * 0.534) + (b * 0.131)
            // alpha 透明度
            outputImageData[index + 3] = 255
        }
    }
}
```

## 抠图
### 属性介绍
`globalCompositeOperation` 控制drawImage的绘制图层先后顺序。

> 用于设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上。

| 属性值 |  描述 |
| :----: | :----:|
|   source-over     |   默认。在`目标图像上`显示源图像。     |
|   source-atop     |   在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。   |
|   source-in   |    在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。    |
|   source-out  |   在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。     |
|   destination-over  |    在源图像上方显示目标图像。    |
|   destination-atop    |    在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。    |
|   destination-in | 在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。    |
|   destination-out|在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。     |
|   lighter     |   显示源图像 + 目标图像。     |
|   copy     |   显示源图像。忽略目标图像。     |
|    xor    |    使用异或操作对源图像与目标图像进行组合|

>抠图我们使用` source-in` 这个属性的作用是，两图叠加，只取叠加的部分。
>为了人像抠图适应更多的场景，算法大佬们只会把人物图像处理成一个蒙版图并返给前端，之后让前端自己处理。
>得到后端返回的蒙版图以后，先把黑色轮廓部分处理成透明； 先在canvas上draw原图； 再把globalCompositeOperation 设置为 'source-in'； 然后再draw处理后的蒙版图； 得到的就是最后的抠图啦


##  旋转、缩放、位移、形变 [Canvas 参考手册](https://www.w3school.com.cn/tags/html_ref_canvas.asp)
`canvas的上下文ctx有对应的API`可以调用，也可以用`martrix方式`做更高级的变化。<br/>

## 粒子

### 粒子抽象

我们可以获取canvas上的每个像素点。 所谓的粒子，其实算是对一个像素的抽象。它具有自己坐标，自己的色值，可以通过改变自身的属性“动”起来。 因此我们不妨将粒子作为一个对象来看待，它有坐标和色值，如：
```js
let particle = {
    x: 0,
    y: 0,
    rgba: '(1, 1, 1, 1)'
}
```
```js
// 将一张网易支付的logo图，用散落的粒子重新画出来

function blur (ctx, w, h) {
    // 获取像素颜色数据
    const originImageData = ctx.getImageData(0, 0,  w, h).data

    let colors = []
    let index = 0
    for( let y = 1; y <= h; y++) {
        for (let x = 1; x<= w; x++) {
            r = originImageData[index]
            g = originImageData[index + 1]
            b = originImageData[index + 2]
            a = originImageData[index + 3]
            index += 4
            // 将像素位置打乱，保存进返回数据中
            colors.push({
                x: x + getRandomArbitrara(-OFFSET, OFFSET),
                y: y + getRandomArbitrara(-OFFSET, OFFSET),
                color: `rgba(${r}, ${g}, ${b}, ${a})`
            })
            return colors
        }
    }
}
```

### 粒子动画
为了性能，粒子动画往往采用选择性的选取像素用来绘制。比如，只绘制原图x坐标为偶数，或能被4等整除的像素。比如，只绘制原图对应像素r色值为155以上的像素。