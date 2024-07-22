# a标签的使用方法和跳转方式
```html
<a href="www.baidu.com" target="_blank"></a>
```
## 属性

> `href`: 
+ _self 表示在当前页面打开链接（默认）
+ _blank 表示跳到新页面，打开一个新窗口
+ _parent 表示在父级框架中打开
+ _top 表示在整个窗口打开，最顶级上下文

## 修改css状态
```css
a {
    text-decoration: none; // 去除下划线
}
a:link {
    color: #FF0000; // 未访问的链接
}
a:visited {
    color: #00FF00; // 已访问的链接
}
a:hover {
    color: #FF00FF;
}
a：active {
    color: #0000FF;
}
```

## 锚点
锚点可以在同一页面的不同位置间跳转，使用场景为当一个页面很长的时候可以设置章节导航，用户点击某一章节的时候页面就会跳转到对应章节的位置。
```html
<body>
    <a href="#c1">第一章</a>
    <a href="#c2">第二章</a>
    <a href="#c3">第三章</a>

    <h2><a>第一章</a></h2>
    <p>1.本章。。。</p>

    <h2><a>第二章</a></h2>
    <p>12本章。。。</p>

    <h2><a>第三章</a></h2>
    <p>3.本章。。。</p>
</body>
```

## 如何拨打电话
```html
<a href="tel:12341233213"></a>
```
## 创建email链接
a标签可以指向一个email邮箱地址，当用户点击链接的时候会打开用户本地的邮件程序来发送邮件。
```html
<a href="mailto:605230040@qq.com">发送邮件</a>
```
## 下载文件
a标签的`dwnload`属性是html5新增的属性，如果设置属性值的话，则会将属性值作为文件名保存为本地文件，但如果跨域则该文件无效
```html
<a href="http://www.baidu.com/img/bd_logo1.png" download="百度首页图片.png">下载图片</a>
```

## 防止被搜索引擎收录
有时候我们并不希望a标签里的链接内容被Google或百度等搜索引擎抓取，这时候就需要使用a标签下`rel属性`来防止连接被收录,将其设置为`externalnofollow`
