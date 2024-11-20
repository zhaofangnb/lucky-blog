# html相关

## 语义化标签
使`HTML代码更加清晰和易于理解，同时也有助于提高网站的可访问性和搜索引擎排名`。在编写HTML代码时，应尽可能使用这些标签来描述页面的结构和内容。

+ `<header>`: 页眉
+ `<nav>` : 导航链接
+ `<section>` : 页面内容
+ `<main>` : 主要内容
+ `<article>` : 文章内容
+ `<aside>` : 侧边栏内容
+ `<footer>` : 页脚
+ `<figure>`和`<figcaption>`: `<figure>` 用于包含图像、图表等媒体内容，而 `<figcaption>` 则用于为这些媒体内容提供标题或说明。


> 对SEO的影响:
+ 1.提升页内容的可理解性
+ 2.改善管检测关联与匹配
+ 3.提升页面加载速度
+ 4.增强网站的可访问性
+ 5.提升搜索引擎排名

## 常用标签
```html
<!DOCTYPE html>          
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title>Document</title>
    </head>
    <body>
        <script src="index.js"></script>

        <div>
            <div>块级元素</div>
            <a href="url">a标签</a>
            <img src="image.png" alt="" />
            <span>内联元素</span>
        </div>
    </body>
</html>
```
+ 块级元素：div、p、h1-h6、ul、li、dl、dt、dd、table、form、header、footer、nav、section、article
+ 内联元素：a、span、img、input、button

>区别:
+ 块级元素会独占一行，不能与其他任何元素并列； 内联元素可以与其他行内元素并排显示，不会独占一行
+ `块级元素可以设置宽高`，如果不设置宽高，宽度将默认变为父级的100%; `内联元素不能设置宽高`，其宽度默认由内容决定，即文字的宽度或所包含元素的宽度，行内元素的高度和内外边距（特别是垂直方向的margin和padding）通常不会影响周围元素的布局。
+ `块级元素内外边距会影响周围元素的布局`，特别是垂直方向的margin和padding，会改变元素之间的间距和元素本身的大小； 内联元素虽然可以设置内外边距，但垂直方向的margin和padding通常不会影响周围元素的布局。水平方向的内外边距和边框则会影响元素的显示宽度。
+ `块级元素完整地参与盒模型`，即具有内边距(padding)、外边距(margin)、边框(border)和内容(content)，可以通过这些属性进行样式设置和布局调整； 行内元素其盒模型主要包括水平方向的内边距、外边距和边框。对垂直方向的设置（如margin和padding）有一定限制，可能不会按照预期影响布局。
+ `块级元素适用于构建网页的主要结构和布局，用于创建容器和组织内容`。它们通常用于实现各种复杂的页面布局和设计效果；`行内元素更适用于包裹文本或其他行内元素，并进行样式控制和文本布局`。它们通常用于调整文本的显示样式和增强文本的可读性。



