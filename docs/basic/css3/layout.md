# 常见css布局

## 垂直居中
```vue
<div class= "bgc"></div>

<style>
.bgc{
    /*方法一：不知宽高 使用绝对定位 + transform */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);


    /*方法二：已知宽高 */
    background: red;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;


    /*方法三: flex布局 */
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
```

## 两栏布局
```html
<div class="box">
    <div class="left">左元素</div>
    <div class="right">右元素</div>
</div>
```
```css
<style lang="scss" scoped>
/* 方法一:  */
.box {
    display: flex;
    margin: 0 auto;
    .left {
        width: 100px;
        background-color: gray;
    }
    .right {
        flex: 1; // 当屏幕变化时，左侧始终保持100px，右侧自动伸缩
        background-color: yellow;
    }
}
/* 方法二： */
.box {
    overflow: auto;
    .left {
        float: left;
        width: 100px;
        background-color: gray;
    }
    .right {
        margin-left: 0;
        overflow: auto;
        background-color: yellow;
    }
}
/* 方法三： 有一定宽高 */
.box {
    overflow: hidden;
    .left {
        float:left;
        width: 200px;
        height: 400px;
        background-color: gray;
    }
    .right {
        height: 400px;
        margin-left: 200px;
        background-color: yellow;
    }
}
</style>
```

## 三栏布局
```html
<div class="box">
    <div class="left">左元素</div>
    <div class="right">右元素</div>
    <div class="center">主元素</div>
</div>
```
```css
.box {
    overflow: hidden;
    .left {
        float: left;
        width: 200px;
        background-color: gray;
    }
    .right {
        float: right;
        width: 200px;
        background-color: yellow;
    }
    .main {
        margin-left: 200px;
        margin-right: 200px;
        background-color: green;
    }
}
```

## 画一个三角形
```vue
<div class= "triangle"></div>
<style>
.triangle {
    /*宽高都设为0 用border 实现效果,画出一个三角形*/
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid #ccc;
}
</style>
```

利用`clip-path`巧妙实现多边形
```vue
<div class= "triangle"></div>
<style>
.triangle {
    width: 100px;
    height: 80px;
    background: #ccc;
    -webkit-clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
}
</style>
```

## hover 触发子菜单
```vue
<style>
.dropdown{
	display:inline-block;
	position:relative;
}
.dropdown-content{
	display:none;
	position:absolute;
	margin-top:0;
    list-style:none;
    /* 或  list-style-type:none; */
}

.dropdown:hover .dropdown-content{
	display:block;
}
</style>

<div class="dropdown">
	<div>父级菜单</div>
	<div class="dropdown-content">
		<div>子菜单1</div>
		<div>子菜单2</div>
		<div>子菜单3</div>
	</div>
</div>
```

## 圣杯布局

**圣杯布局有页头、页脚、左右宽度固定，中间内容（自适应）优先加载**
```html
<body>
    <div id="header">This is Header</div>

    <div id="container">
        <div id="center" class="column">This is Center</div>
        <div id="left" class="column">This is Left</div>
        <div id="right" class="column">This is Right</div>
    </div>

    <div id="footer">This is Footer</div>
</body>
```

```css
body {
    min-width: 550px;
}

#header {
    text-align: center;
    background-color: #f1f1f1;
}

#container {
    /* 容器设置两边 left 和 right 的宽度 */
    padding-left: 200px;
    padding-right: 150px;
}
#container .column {
    float:left; /*使用float布局 */
}

#center {
    background-color: #ccc;
    text-align: center;
    width: 100%;
}

#left {
    background-color: yellow;
    width:200px;
    /* left 是浮动的，左移最近块元素的 100% */
    margin-left: -100%;
    position: relative;
    right:200px; /*相对自身移动，相当于左移200px */
}

#right {
    background-color: red;
    width:150px;
    margin-right: -150px; /*right的margin被挤掉成0,就上去了 */
}

#footer {
    clear:both; /* footer 向下移动清除左右浮动 */
    text-align: center;
    background-color: #f1f1f1;
}
```
![](/css/grail.png)

## 双飞翼布局
```html
<div class="header">头部</div>
<div class="container">
  <div class="warpper">
    <div class="center">主区域</div>
  </div>
  <div class="left">左区域</div>
  <div class="right">右区域</div>
</div>
<div class="footer">底部</div>
```

```css
.header {
    text-align: center;
}
.footer {
    clear: both;
    text-align: center;
}
.warpper {
    width: 100%;
    float:left;
}
.center {
    text-align: center;
    margin: 0 100px; 
}
.left {
    width: 100px;
    float:left;
    margin-left:-100%;
    background-color: yellow;
}
.right {
    width: 100px;
    float: left;
    margin-left: -100px;
    background-color: red;
}
```


## 瀑布流

实现瀑布流的三种方式:
+ column实现
+ flex实现
+ js实现

### column
```css
    body{
        margin: 0;
        list-style: none;
    }
    #box{
        margin: 40px;
        column-count: 5; /*定义屏幕分为多少列*/
        column-gap: 20px; /*定义列与列之间的间距 */
    }
    #box > li > img{
        width: 100%;
        height: 100%;
    }
```

### flex
```css
body{
    margin: 0;
    list-style: none;
}
#box{
    display: flex;
    flex-flow: column wrap; /**flex-deirection 和 flex-wrap的简写 */
    height: 2000px; /**需要固定高度 */
}
#box > li{
    margin: 10px;
    width: calc(100% / 4 - 20px);
}
#box > li > img{
    width: 100%;
    height: 100%;
}
```

### js实现
```js
export default class Waterfall {
    /**
     * $el 父容器
     * width 每张图片宽度
     * items 所有子元素
     * H 存储每一列的高度
     * flag 虚拟DOM节点集合
     */

    constructor(options) {
        this.$el = null
        this.count = 4
        this.gap = 10
        Object.assign(this, options)
        this.width = 0
        this.items = []
        this.H = []
        this.flag = null
        this.init()
    }
    init () {
        this.items = Array.from(this.$el.children)
        this.reset()
        this.render()
    }

    reset () {
        this.flag = document.createDocumentFragment() //创建一个空白文档
        this.width = this.$el.clientWidth / this.count
        this.H = new Array(this.count).fill(0)
        this.$el.innerHtml= ""
    }

    render () {
        const { width, items, flag, H ,gap } = this
        items.forEach(item => {
            item.style.width = width + 'px'
            item.style.position = 'absolute'
            let img = item.querySelector('img')
            /*图片是否加载完成 */
            if (img.complete) {
                /**获取每一列的最小高度 */
                let tag = H.indexOf(Math.min(...H))
                item.style.left = tag * (width + gap) + 'px'
                item.style.top = H[tag] + 'px'
                item.style.width = '100%'
                item.style.height = '100%'
                H[tag] += img.height * width / img.width + gap
                flag.appendChild(item)
            } else {
                img.addEventListener('load', () => {
                    let tag = H.indexOf(Math.min(...H))
                     item.style.left = tag * (width + gap) + 'px'
                     item.style.top = H[tag] + 'px'
                     item.style.width = '100%'
                     item.style.height = '100%'
                     H[tag] += img.height * width / img.width + gap
                     flag.appendChild(item)
                     this.$el.append(flag)
                })
            }
        })

        this.$el.append(flag)
    }
}
```

+ 初始化，计算出列宽来，将H作为列高存储器。然后计算子元素，清除父容器内容。
+ 遍历子元素，设置其都为绝对定位，设置其列宽，然后监听其下的图片是否加载完毕。
+ 如果加载完毕，那么计算应该所在的位置，瀑布流的核心就是哪一列高度最小就在那一列上设置新的图片。当然他的相对高度和间距也要计算出来，同时在当前的H上把高度存起来。
+ 每次图片加载完就更新虚拟节点到父容器中。

