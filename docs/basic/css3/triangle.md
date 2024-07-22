# [css画一个三角形](https://zhuanlan.zhihu.com/p/482361933)

## 宽高都设为0 用border 实现效果
```css

width:0;
height: 0;
border-left: 50px solid transparent;
border-right: 50px solid transparent;
border-bottom: 100px solid red;
```

## clip-path(最精简和最可具扩展性的,不过需要考虑浏览器兼容性)
```css
     width: 100px;
    height: 80px;
    background: #ccc;
    -webkit-clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
```

+ `clip-path`为沿路径放置的每个点定义坐标
+ [在线工具](https://bennettfeely.com/clippy/)

## linaer-gradient 渐变+ background-image
```css
.triangle {
  width: 160px;
  height: 200px;
  outline: 2px solid skyblue;
  background-repeat: no-repeat;
  background-image: linear-gradient(32deg, orangered 50%, rgba(255, 255, 255, 0) 50%), linear-gradient(148deg, orangered 50%, rgba(255, 255, 255, 0) 50%);
  background-size: 100% 50%;
  background-position: top left, bottom left;
}
```

+ 拓展： linaer-gradient 可实现锯齿效果