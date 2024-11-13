# css相关

## link和@import的区别

+ 1. links属于`HTML标签`; @import是CSS提供的在一个css文件中`引入外部css文件`的方式
+ 2. link可以引入`css样式表、JavaScript文件、图片、视频`等; @import只能引入css样式表
+ 3. link引入的css会`在页面加载同时加载`; @import引入的css会`等到页面加载完之后再加载`
+ 4. link所有浏览器都支持; @import需要IE5以上
+ 5. link支持通过js改变link标签的`href属性`动态地引入样式; @import不支持后期动态引入，只能在页面初始化之前进行引入


## css选择器及优先级
!important >> 行内样式 >> id选择器 >> 类选择器 >> 标签选择器 >> 通配符选择器 >> 继承 >> 浏览器默认属性

css选择器
+ 1.id选择器 #id {}
+ 2.类选择器  .classname {}
+ 3.标签选择器 div {}
+ 4.属性选择器 input[type="text"] {}
+ 5.伪类选择器 a:hover {}
+ 6.伪元素选择器 ::before {}
+ 7.组合选择器 div, p {}

css3选择器
1. 属性选择器
+ [attribute] 选择具有 attribute 的元素,无论属性值是什么

```css
div[class] { color: red;}
```

+ [attribute=value] 选择具有 attribute 且属性值等于 value 的元素

```css
input[type="text"] {
  background-color: yellow;
}
```

+ [attribute~=value] 选择具有 attribute 且属性值包含单词 value 的元素,词之间由空格隔开

```css
div[class~="content"] {
  border: 1px solid black;
}
```

+ [attribute|=value] 选择具有 attribute 且属性值等于 value 或者以 value- 开头的元素

```css
div[class|="top"] {
    background: red;
}
```

+ [attribute^=value] 选择具有 attribute 且属性值以 value 开头的元素

```css
div[data-custom^="section-"] {
  font-weight: bold;
}
```

+ [attribute$=value] 选择具有 attribute 且属性值以 value 结尾的元素

```css
a[href$=".pdf"] {
  display: none;
}
```

+ [attribute*=value] 选择具有 attribute 且属性值包含 value 的元素

```css
div[data-custom*="section"] {
    font-weight: bold;
}
```

2. 伪类选择器

+ :root 选择文档的根元素
+ :nth-child(n) 选择父元素中的第 n 个子元素
+ :nth-last-child(n) 选择父元素中的倒数第 n 个子元素
+ :nth-of-type(n) 选择父元素中同类型的第 n 个子元素
+ :nth-last-of-type(n) 选择父元素中同类型的倒数第 n 个子元素
+ :last-child 选择父元素中的最后一个子元素
+ :first-of-type 选择父元素中同类型的第一个子元素
+ :last-of-type 选择父元素中同类型的最后一个子元素
+ :only-child 选择父元素中只有一个子元素的元素
+ :only-of-type 选择父元素中没有其他同类型的子元素的元素
+ :empty 选择没有子元素的元素
+ :link 选择未被点击的链接
+ :visited 选择已被点击的链接
+ :active 选择当前活动的链接
+ :hover 选择鼠标悬停的元素
+ :focus 选择当前获得焦点的元素
+ :enabled 选择未被禁用的表单元素
+ :disabled 选择被禁用的表单元素
+ :checked 选择被选中的 input 元素
+ :target 选择当前活动的元素
+ ：not(selector) 选择除指定元素的所有元素
+ :in-range 选择在指定范围内的 input 元素
+ :out-of-range 选择在指定范围外的 input 元素

3. 伪元素选择器
+ ::before 在元素内容前面插入内容
+ ::after 在元素内容后面插入内容
+ ::first-letter 元素首字母
+ ::first-line 元素首行
+ ::selection 元素被选中时的样式


+ 1.后代选择器 div p {}  选择所有在div中的p标签，无论嵌套多深
+ 2.子代选择器 div > p {} 选择所有div的直接子元素p标签,嵌套层级元素不算
+ 3.相邻兄弟选择器 div + p {} 选择div紧接着的下一个兄弟p标签
+ 4.通用兄弟选择器 div ~ p {} 选择div的同级元素中所有兄弟p标签


## css伪类和伪元素

+ (:)伪类是出于特定状态的元素
+ (::)伪元素用于创建一些不在DOM树中的元素，并为其添加样式。它们允许你对元素的特定部分进行样式化，这些部分通常无法通过常规选择器直接访问。


## css隐藏元素的方法
+ 1. display:none; 元素将消失，在文档流中不再占据空间, 会触发回流
+ 2. visibility:hidden; 元素将消失，在文档流中继续占据空间，不会触发回流
+ 3. opacity:0; 元素变得完全透明，在文档流中继续占据空间，不会触发回流
+ 4. 通过过将元素移动到视口之外（例如使用position: absolute;和transform: translate(负坐标)、z-index）或使用clip-path属性来隐藏元素,会触发回流

```vue
<template>
    <div class="none" @click="setNone">
        待隐藏元素
    </div>
</template>

<script>

export default {
    methods: {
        setNone() {
            // 元素彻底消失，不会触发点击事件
            console.log('display:none'); 
        }       
    }
}
</script>

<style>
.none {
    display: none; /*会触发回流。*/
    /* 再次显示时设置 display: block; 会再次触发回流。*/
}
</style>
```

```vue
<template>
    <div class="hidden" @click="setHidden">
        待隐藏元素
    </div>
</template>

<script>

export default {
    methods: {
        setHidden() {
            // 元素彻底消失，只是占据空间，不会触发点击事件
            console.log('visibility: hidden'); 
        }       
    }
}
</script>

<style>
.hidden {
    visibility: hidden; /*不会触发回流,可能会发生重绘。*/
    /* 再次显示时设置 visibility: visible; 不会触发回流,可能会发生重绘*/
}
</style>
```

```vue
<template>
    <div class="opacity" @click="setOpacity">
        待隐藏元素
    </div>
</template>

<script>
export default {
    methods: {
        setOpacity () {
            console.log('opacity: 0'); // opacity: 0  点击事件有效
        }
    }
}
</script>

<style>
.opacity {
    opacity: 0; /*不会触发回流,可能会发生重绘。*/
    /* 再次显示时设置 opacity: 1; 不会触发回流,可能会发生重绘*/
}
</style>
```

## BFC

+ 1. 独立的布局环境
+ 2. 防止元素溢出
+ 3. 防止元素重叠
+ 4. 控制元素的边距折叠

```vue
<template>
<div class="container">
        <div class="child"></div>
        <div class="child"></div>
    </div>
</template>
<style>
 .container {
        border: 5px solid #fcc;
        width: 300px;
        .child {
            border: 5px solid #f66;
            width:100px;
            height: 100px;
            float: left;  /* 子元素浮动，脱离文档流(溢出)，父元素高度塌陷 */
        }
}
.container {
    overflow: hidden;  /* 触发container生成BFC,BFC计算高度时，浮动元素也参与,子元素高度撑开父元素 */
}
</style>
```

```vue
<!-- 自适应两列布局 -->
<template>
    <div class="container">
            <div class="aside"></div>
            <div class="main"></div>
    </div>
</template>

<style>
.container {
    position: relative;
    width: 200px;
}
.aside {
    width: 100px;
    height: 150px;
    float: left; /*aside浮动会遮挡main*/
    background: #f66;
}
.main {
    height: 200px;
    background: #fcc;
}
.main {
    overflow: hidden; /*触发main生成BFC BFC区域不会与float重叠 */
}
</style>
```


```vue
<!-- 块级标签之间竖直方向的margin会重叠，这就是margin的塌陷现象 -->
<template>
        <p>hahaha</p>
        <p>hehehe</p>
</template>

<style>
.p {
    color: #f55;
    background: #fcc;
    width: 200px;
    line-height: 100px;
    text-align:center;
    margin: 100px;
  }
</style>
```

改为:

```vue
<template>
        <p>hahaha</p>
        <div class="wrap">
            <p>hehehe</p>
        </div>
</template>

<style>
.p {
    color: #f55;
    background: #fcc;
    width: 200px;
    line-height: 100px;
    text-align:center;
    margin: 100px;
}
.wrap {
    overflow: hidden; /*触发wrap生成BFC，解决margin重叠问题 */
}
</style>
```




