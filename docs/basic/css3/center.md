# css实现元素垂直水平居中

## flex布局(推荐)
```css
    display: flex;
    justify-content: center;
    align-items: center;
```


## 不知宽高 用定位 + transform

```css
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
```

## 已知宽高
```css
    background: green;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;
```