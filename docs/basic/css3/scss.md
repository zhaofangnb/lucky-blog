# scss语法

## 变量声明与引用
```vue
<style lang="scss" scoped>
$hignlight-color: #f90;
$fontSize-small: 12px;
$highlight-border: 1px solid $hignlight-color;

body {
    font-size:$fontSize-small;
    color: $hignlight-color;
    border: $highlight-border;
}
</style>
```
**变量有作用域，当变量定义在css规则块内，则该变量只能在此规则块内使用。**
**变量中的-和_没有区别，可以互通互相使用**


## 循环
### for 循环
常见代码如下:
```vue
<template>
    <div :class="`card${item}`" v-for="item in 4" :key="item">
        卡片{{item}}
    </div>
</template>
<style lang="scss" scoped>
 .card1 {
    background-color: #f00; // 红
 }
 .card2 {
    background-color: #ff0; // 黄
 }
 .card3 {
    background-color: #f0f; // 深粉红
 }
 .card4 {
    background-color: #00f; // 深蓝
 }
</style>
```
scss for循环有两种写法: 
+ **第一种是@for...from...to,前闭后开**
+ **第二种是@for...from...through, 前闭后闭**

```vue
<template>
    <div :class="`card${item}`" v-for="item in 4" :key="item">
        卡片{{item}}
    </div>
</template>
<style lang="scss" scoped>
$color: (
    1: #f00;
    2: #ff0;
    3: #f0f;
    4: #00f;
);

@for $i from 1 to 5 {
    .card#{$i} {
        background-color: map-get($color, $i);
    }
}
// 或
@for $i from 1 through 4 {
    .card#{$i} {
        background-color: map-get($color, $i);
    }
}
</style>
```

**如果使用`map.get($color, $i)`需要在顶部显示申明`@use "sass:map";`**

> 深层的嵌套对象(定义$color时，给第一个又嵌套一个对象)

```vue
<style lang="scss" scoped>
@use "sass:map";
$color: (
    1: ('bg': #f00);
    2: #ff0;
    3: #f0f;
    4: #00f;
);
@for $i from 1 through 4 {
    .card#{$i} {
        @if($i === 1) {
             background-color: map.get($color, $i, 'bg');
        } else {
             background-color: map.get($color, $i);
        }
    }
}
</style>
```

### each 循环
`@each循环`就是去遍历一个列表，然后取值`@each $var in`

**scss中模板字符串使用的是`#`而不是`$`,因为`$`是用来定义变量的**
```vue
<style lang="scss" scoped>
$test:top,right,bottom,left;

@mixin btn-extend{
  @each $i in  $test{
    border-#{$i}:5px;
  }
}

.btn{
  @include btn-extend;
}
</style>
```

### while 循环
```vue
<style lang="scss" scoped>
$gao: 1;

@while $gao < 4 {
    .div#{$gao} {
        height: $gao*10px;
    }
    $gao: $gao+1;
}

// 相当于
.div1 {
    height:10px;
}
.div2 {
    height:20px;
}
.div3 {
    height:30px;
}

</style>
```


## Scss嵌套
css:

```css
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
```
scss:

```vue
<style lang="scss" scoped>
#content {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
    aside { background-color: #EEE }
}
</style>
```

## 父选择器的标识符&

```vue
<style lang="scss" scoped>
article a {
    color: blue;
    &:hover { color:red; }
}
</style>
```
展开时，`&`被父选择器直接替换：

```css
article a { color: blue; }
article a:hover { color: red; }
```


## 群组选择器嵌套
```vue
<style lang="scss" scoped>
h1, h2 {
    margin: 0;
}
.container {
    h3,h4,h5 {
        margin-bottom: 8em;
    }
}
</style>
```

## 子组合选择器和同层组合选择器 `>` `+` `~`
```vue
<style lang="scss" scoped>
 /**子组合选择器 > */
 article > section  { border: 1ps solid #ccc; }
 /**相邻元素选择器 + (选择元素后紧跟的指定元素)*/
 header + p { font-size: 1.1em; }
 /**同层全体组合选择器 ~ (选择所有跟在article后的同层article元素) */
 article ~ article { border-top: 1px dashed #ccc; }

</style>
```

```vue
<style lang="scss" scoped>
 /**sass嵌套 */

 article {
  /* 放在 里层选择器前边 */
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  /* 放在 外层选择器后边 */
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
</style>
```

css：
```css
article ~ article { border-top: 1px dashed #ccc }
article > section { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```

## 属性的嵌套
```vue
<style lang="scss" scoped>
 nav {
    border: 1px solid #ccc {
        /**单独设置子属性 */
        left: 0px;
        right: 0px;
    }
 }

 // 生成后的 css
 nav {
    border: 1px solid #ccc;
    border-left: 0px;
    border-right: 0px;
 }
</style>
```

## 插值 `#{$variable_name}`
### 利用插值动态生成选择器、属性名、值
```vue
<style lang="scss" scoped>
$bWidth: 5px;
$style: "blue";

.nav {
    border: #{$bWidth} solid #ccc;
    &.nav-#{$style} {
        color: #{$style}
    }
}

// 生成编译成 css
.nav {
    border: 5px solid #ccc;
}
.nav .nav-blue {
    color: blue;
}
</style>
```

### 属性名使用插值
```vue
<style lang="scss" scoped>
 $value: grayscale(50%);
 $property: filter;

 .nav {
    #{$property}: $value;
 }
 // 编译后css
 .nav {
    filter: grayscale(50%);
 }
</style>
```

### @minxin中使用插值
```vue
<style lang="scss" scoped>
 @mixin define-emoji($name, $glyph) {
    span.emoji-#{$name} {
        font-family: IconFont;
        font-variant: normal;
        font-weight: normal;
        content: $glyph;
    }
 }
 @include define-emoji("women-holding-hands", "👭");

 // 编译后的css
 @charset "UTF-8";
 span.emoji-women-holding-hands {
    font-family: IconFont;
    font-variant: normal;
    font-weight: normal;
    content: "👭";
 }
</style>
```

## 导入sass文件

```vue
<style lang="scss" scoped>
@import "siderbar";
@import "siderbar.scss";
</style>
```
**Sass官方目前已经开始打算用 @use 替代 @import 规则，因此鼓励使用 @use。但是，目前只有 Dart Sass 支持 @use，因此，现阶段主要还是使用 @import。**

## sass局部文件
+ 有的sass文件是专门用于被`@import命令`导入的，而`不需要单独生成css文件`，这样的文件称为局部文件。
+ sass的约定是：`sass局部文件的文件名以下划线 _ 开头，sass在编译时就不会将这个文件编译输出为css`。
+ `在 @import 局部文件时，可以省略文件开头的下划线和.scss后缀，不需要写文件的全名`。
+ 局部文件可以被多个不同的文件引入。对于需要在多个页面甚至多个项目中使用的样式，非常有用。


## 默认变量值
**!default表示如果变量被声明赋值了则用新声明的值，否则用默认值。**

## 嵌套导入局部文件
```vue
<style lang="scss" scoped>
// _blue-theme.sass 局部文件
aside {
    backgroud: blue;
    color: white;
}
</style>
```

将它导入到一个css规则内:
```vue
<style lang="scss" scoped>
.blue-theme {
     @import "blue-theme"
}

// 同下:
.blue-theme {
    aside {
        backgroud: blue;
        color: white;
    }
}
</style>
```

## @mixin 混合器
```css
@mixin 名字(参数1,参数2) {
    ...样式...
}
```

```css
@mixin hunhe {
    color: red;
    a {
        font-size: 12px;
    }
}

div @include hunhe;

/**相当于 */
div {
  color: red;
}
div a {
    font-size: 12px;
}
```

## 继承/扩展(一个选择器可以继承另一个选择器的全部样式)
```vue
<style lang="scss" scoped>
.one {
    color: #000;
}
.one a {
    font-size: 10px;
}
.two {
    @extend .one;
    background-color: #fff;
}

// 相当于
.one, .two {
    color: #000;
}

.one a, .two a {
     font-size: 10px;
}
.two {
     background-color: #fff;
}
</style>
```

## 计算功能(scss允许在代码中使用算式)
```vue
<style lang="scss" scoped>
$change: 20px;
div {
    margin: (10px*2);
    left: 20px + $change;
}

// 相当于
div {
    margin: 20px;
    left: 40px;
}
</style>
```

## 自定义函数@function 
```vue
<style lang="scss" scoped>
 @function ziji($bian) {
    @return $bian+10px;
 }
 div {
    width: ziji(5px);
 }


 // 相当于
 div {
    width: 15px;
 }
</style>
```