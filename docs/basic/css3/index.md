# CSS3 新特性

> 循环动画
```css
@keyframes mymove {
    0%   {top:0px;}
    25%  {top:200px;}
    50%  {top:100px;}
    75%  {top:200px;}
    100% {top:0px;}
}
@-webkit-keyframes gif /* Safari and Chrome */ {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
.img {
    width: 120px;
    height: 120px;
    -webkit-animation: gif 1.4s infinite linear;
    animation: mymove 1s infinite linear;
}
```
## css3边框
+ `border-radius` css3圆角边框
+ `border-shadow`: css3边框阴影 用于向方框添加阴影，如: `border-shadow: 10px 10px 5px #888888;`
+ `border-image`: css3边框图片 可以使用图片来创建边框，如: `border-image: url(border.png) 30 30 round`

## css3背景
+ `background-size` 规定背景图片的尺寸
+ `background-origin` 规定背景图片的定位区域 背景图片可放置于`content-box、padding-box、border-box` 区域。

## css3文字效果
+ `text-shadow` 向文本添加阴影，如：`text-shadow:5px 5px 5px #FFFFFF;`
+ `word-wrap`: 单词太长，允许对长单词进行拆分，并换到下一行，如: `p { word-wrap: break-word;}`
 
## css3 2D转换(transform)
+ `translate(x,y)` 元素根据给定位置坐标移动
+ `rotate(30deg)` 元素顺时针旋转给定的角度。允许负值，元素将逆时针旋转。
+ `scale(2,4)`   元素的尺寸会增加或减少，根据给定的宽度（X 轴）和高度（Y 轴）参数
+ `skew(30deg, 20deg)`  元素转动给定的角度，根据给定的水平线（X 轴）和垂直线（Y 轴）参数
+ `martrix(a,b,c,d,e,f)` 用来对元素进行各种形式的变换 `a和d表示水平和垂直缩放的比例，b和c表示水平和垂直的倾斜程度，e和f表示元素在水平和垂直方向上的位移量`

## css3 3D
+ `rotateX(120deg)` 元素围绕其 X 轴以给定的度数进行旋转
+ `rotateY(120deg)` 元素围绕其 Y 轴以给定的度数进行旋转
## CSS3 过渡
当元素从一种样式变换为另一种样式时为元素添加效果。

## css3 多列
+ `column-cout` 规定元素应该被分隔的列数 
+ `column-gap` 规定列之间的间隔
+ `column-rule` 设置列之间的宽度、样式和颜色规则