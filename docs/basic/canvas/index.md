# canvas

## 前言

`canvas(画布)`是HTML5特性中最重要的内容之一，支持2D、3D图像效果，可以使用脚本如JavaScript来绘制图形。

### 简单使用:(默认大小为300像素×150像素的HTML元素)
```html
<canvas style="background:purple;"></canvas>
```

或:
```js
{/* html 部分 <canvas id="canvas"></canvas> */}

const canvas = document.getElementById('canvas')
const ctx = canvas.getContent('2d')
ctx.fillStyle= 'purple'
ctx.fillRect(0,0,300,150)
```

### 绘制图形
- canvas 只支持一种基本形状――`矩形`，所以其它形状都是有一个或多个路径组合而成，还好，有一组`路径绘制函数`让我们可以绘制相当复杂的形状。
- `原点`: canvas左上角(0,0)
- `fillRect(x, y, width, height)`, 绘制一个实心矩阵，默认背景色为黑色，没有边框。fillStyle= '颜色值'。
- `strokeRect(x, y, width, height)`, 空心矩阵, 默认黑色边框1px。 strokeStyle = '颜色值'。
- `clearRect(x, y, width, height)`, 以矩形方式清除指定区域，类似橡皮擦。
- `全局设置透明度（0~1`,在颜色后设置透明度,globalAlpha = "透明值"。

### 绘制渐变

1.线性渐变
+ createLinearGradient(x1,y1,x2,y2);
+ 两点一线（渐变的基准线）
```js
const canv = document.getElementById('canvas');
if (canv.getContext) {
  const context = canv.getContext('2d');
  // 创建渐变的基准线（水平）
  // const grad = context.createLinearGradient(0, 0, canv.width, 0);
  // 垂直
  // const grad = context.createLinearGradient(0, 0, 0, canv.height);
  // 斜着来
  const grad = context.createLinearGradient(0, 0, canv.width, canv.height);

  // 添加颜色
  grad.addColorStop(0, 'yellow');
  grad.addColorStop(0.5, 'red');
  grad.addColorStop(1, 'blue');

  // 画矩形
  context.fillStyle = grad; //将渐变加入到矩形中
  context.fillRect(0, 0, canv.width, canv.height);
}
```

2.圆形渐变
+ createRadialGradient(x1, y1, r1, x2, y2, r2);
+ x1，y1:表示渐变开始的圆心位置，r1:开始圆的半径，圆柱体或圆锥体基准线
+ x2，y3:表示渐变结束的圆心位置，r2:结束圆的半径，圆柱体或圆锥体基准线
```js
const canv = document.getElementById('canvas');
if (canv.getContext) {
  const context = canv.getContext('2d');
  const g = context.createRadialGradient(50, 100, 0, 100, 100, 100);
  g.addColorStop(0.0, '#fff');
  g.addColorStop(1.0, '#000');
  context.translate(20, 20);
  context.scale(2, 2);

  context.fillStyle = g;
  context.arc(100, 100, 100, 0, 2 * Math.PI);
  context.fill();
}
```

### 绘制路径  
+ 用`beginPath()`创建一个路径。在内存里，路径是以一组子路径（直线，弧线等）的形式储存的，它们共同构成一个图形。每次调用 beginPath，子路径组都会被重置，然后可以绘制新的图形。
+ 调用`closePath`方法，它会尝试用直线连接当前端点与起始端点来关闭路径，但如果图形已经关闭或者只有一个点，它会什么都不做。这一步不是必须的
+ `beginPath()` 和 `closePath` 可以`避免不同的路径之前相互干扰`
+ 只有在调用`stroke 或 fill`方法时，图形才会真实的绘制到 canvas 上
+ `stroke()`绘制路径的轮廓（描边）
+ `fill()`绘制路径的填充
+ `clip()`在上下文中设置裁剪区域（注意:再绘制图像，只能在该区域中）
注意：当调用 fill 时，开放的路径会自动闭合，而无需再调用 closePath

```js
function draw(id) {
  var canvas = document.getElementById(id);
  if (canvas) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#eeeeef';
    ctx.fillRect(0, 0, 600, 700);
    for (var i = 0; i <= 10; i++) {
      ctx.beginPath();
      ctx.arc(i * 25, i * 25, i * 10, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,0,0,0.25)';
      ctx.fill();
    }
  }
}
```

### 创建形状

> 矩形 rect(x, y, width, height)

> 圆形 arc(x, y, radius, startAngle, endAngle, [direction])
+ 以(x,y)为圆心绘制一条弧线，弧线半径为radius，起始角度和结束角度(用弧度表示 [角度 * Math.PI/2])
+ direction: startAngle和endAngle是否按逆时针方向计算（false表示顺时针） 默认是顺时针

> 椭圆 ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, [direction])
+ `x、y`：椭圆的圆心位置
+ `radiusX、radiusY`：x轴和y轴的半径
+ `rotation`：椭圆的旋转角度，以弧度表示
+ `startAngl`e：开始绘制点
+ `endAngle`：结束绘制点
+ `direction`：绘制的方向（默认顺时针），可选参数。

> 贝塞尔曲线一般用来绘制复杂有规律的图形
`二次贝塞尔曲线`: `quadraticCurveTo(cp1x, cp1y, x, y)`，其中cp1x和cp1y为一个控制点，x和y为结束点

```js
 // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    if(canvas.getContext) {
      var ctx = canvas.getContext('2d');
      // 绘制一段二次贝塞尔曲线 
      ctx.moveTo(50, 50); // 起点(50,50)
      ctx.quadraticCurveTo(200, 200, 350, 50);  //控制点(200, 200) 结束点(350, 50)
      ctx.stroke();
    }
```

`二次贝塞尔曲线`: `bezierCurveTo(cp1x,cp1y, cp2x,cp2y, x, y)`，其中cp1x和cp1y为一个控制点，cp2x和cp2y为第二个控制点，x和y为结束点



### 设置路径
+ moveTo(x,y)： 将当前坐标移动到指定坐标（就是起点）
+ lineTo(x,y): 将当前坐标到指定坐标绘制一条新线（就是终点）

```js
const canvas = documnet.getElementById('canvas')
if (canvas.getContent('2d')) {
    const ctx = canvas.getContext('2d')
}
  //画一个宽高100的正方形 
  ctx.moveTo(0, 0); //状态，设置笔尖设置位置
  ctx.lineTo(100, 0); //状态，要从笔尖位置连接到当前位置
  ctx.lineTo(100, 100); //状态
  ctx.lineTo(0, 100); //状态
  ctx.lineTo(0, 0); //状态,与笔尖开始的坐标首尾相接，就形成了一个多边形
  ctx.lineWidth = 5; //状态，设置线的宽度
  ctx.strokeStyle = '#e8393c'; //状态，设置绘制的颜色
  ctx.stroke(); //这才是真正的绘制
  ctx.fillStyle = 'rgba(0,0,0,.6)'; // 填充颜色
  ctx.fill();
```


### 设置线形
+ `lineWidth` 设置线的宽度，默认为1
+ `lineCap` 设置线端点的形状 【butt】默认与边平行、 【round】圆、 【square】正方形，与butt效果一致
+ `lineJoin`: 设置两条线连接点的形状 【round】圆角、 【bevel】斜角、 【miter】默认，尖角
+ `miterLimit`: 设置线条交接点的延伸范围（0~5:5最大，尖角；0平角）与lineJoin配合使用，仅当lineJoin="miter"时有效
+ `setLineDash` 设置当前虚线的样式
+ `getLineDash` 返回当前虚线设置的样式，长度为非负偶数的数组

### 绘制文字
+ `font`: 与css使用相同
+ `textAlign`: 设置水平位置 - left、right、center
+ `star`t: 效果与left相同
+ `end`: 效果与right相同
+ `textBaseline`: 设置垂直位置 - top、bottom、middle
+ `hanging`： 悬挂基线
+ `alphabetic`: 字母基线
+ `strokeText(text,x,y)`; 绘制指定文字的轮廓
+ `fillText(text,x,y)`; 绘制指定文字的填充

```js
var canv = document.querySelector('#drawing');
if (canv.getContext) {
  var context = canv.getContext('2d');
  context.font = 'bold 40px Arial';
  // 绘制文字颜色线性渐变
  var g = context.createLinearGradient(200, 0, 400, 0);
  g.addColorStop(0.0, 'red');
  g.addColorStop(1.0, 'green');
  context.fillStyle = g;
  context.fillText('We are family', 200, 200);
  // 绘制蓝色轮廓文字
  context.strokeStyle = 'blue';
  context.strokeText('We are family', 200, 400);
```

### 绘制阴影
+ `shadowColor`： 设置阴影颜色，默认为黑色
+ `shadowOffsetX`： 表示当前阴影为水平效果，值为数字（ +阴影在右，-阴影在左边）
+ `shadowOffsetY`： 表示当前阴影为垂直效果，值为数字 (+阴影在下，-阴影在上边）
+ `shadowBlur`： 设置当前阴影效果，值为数字（值越大，越模糊 ,最小值为0）

