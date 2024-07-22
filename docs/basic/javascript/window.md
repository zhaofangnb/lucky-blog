# scrollHeight, clientHeight, offsetHeight的区别
## 浏览器窗口和网页文档

### 浏览器窗口
> 宽: window.innerWidth<br/>
> 高: window.innerHeight

+ 无论是否出现滚动条，这两个值都是不变的。
+ 当调整浏览器大小时，这两个值会变。

简而言之， 就是可以看到的`浏览器视窗的大小(不包括顶部的菜单栏)`

反之，浏览器窗口大小(包含菜单栏)
> 宽: window.outerWidth   <br/>
> 高: window.outerHeight 

### 网页文档

> 宽: documnet.body.scrollWidth<br/>
> 高: documnet.body.scrollHeight

```html
<div class="content">
    <div class="large_block"></div>
</div>
```
```css
.container {
            width: 600px;
            height: 600px;
            padding: 10px;
            border: 10px solid lightgray;
            overflow: auto; // 注意这个属性
        }
.large_block {
            width: 1000px;
            height: 2000px;
            background-color: lightblue;
            padding: 20px;
            margin: 20px;
        }
```
```js
document.querySelector('.container').scrollHeight // 2100
documnet.querySelector('.container').clientHeight // 603
documnet.querySelector('.container').offsetHeight // 640
```

+ `scrollHeight`: container内部的总高度（2000(large_block的高度) + 40（上下padding）+ 40（上下margin）+ 20(container上下padding)）
+ `clientHeight`: 600(container内部可见高度) + 20(container上下padding) -17 (滚动条高度)
+ `offsetHeight`: 603+ 20(自身border)  + 17(滚动条高度)