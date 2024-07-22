# flex布局

## 特点
+ 相对于常规布局(float, position),它具备更高的灵活性
+ 相对grid布局，它具有更强的兼容性
+ 使用简单

## 几个概念
+ 主轴 (main axis)
+ 交叉轴（cross axis）
+ flex容器 (flex container)
+ flex项 (flex item)

### flex item 的基本特点
+ flex item 的布局将由 flex container 属性的设置来进行控制的。
+ flex item 不再严格区分块级元素和行内级元素。
+ flex item 默认情况下是包裹内容的，但是可以设置高度和宽度

## flex-wrap 换行引起的间距
```html
<body>
  <div class="father">
    <div class="son" style="background-color: aqua">1</div>
    <div class="son" style="background-color: blueviolet">2</div>
    <div class="son" style="background-color: burlywood">3</div>
    <div class="son" style="background-color: chartreuse">4</div>
  </div>
</body>
```
```css
 .father {
    width: 400px;
    height: 400px;
    background-color: #ddd;
    display: flex;
    flex-wrap: wrap;
  }
  .son {
    width: 120px;
    height: 120px;
  }
</style>
```
> 问题: 使用 flex-wrap 换行后，不是依次排列，而是排列之间存在间距。

`stretch`: 拉伸所有行来填满剩余空间。剩余空间平均地分配给每一行。
修改:
```css
.son {
     width: 120px;
    /* 注释掉 height , 高度为auto, 子元素被拉伸了*/
    /* height: 120px */
}
```

## flex item 拉伸？ 压缩？
当在一行，子元素为3哥，不会被拉伸，但当子元素为6时，宽度会被压缩

`flex-grow`: flex元素当存在剩余空间时，根据其系数去分配剩余空间。 flex-grow默认为0,元素不拉伸<br/>

`flex-shrink`: flex元素仅在默认宽度之和大于容器的时候才发生收缩。flex-shrink默认为1， 元素压缩


> 以上两个属性都是针对 主轴方向的剩余空间


## 文本溢出 flex-basis> width?
在布局中，如果指定了宽度，当内容很长时，就会换行。但有种特殊情况，如果一个单词有很长的内容则不会换行。<br/>

在flex布局中，会存在两种情况:
+ 设置了固定的`width`属性, 字符串超出宽度后，就会截取,只显示一部分。
+ 设置了固定的`flex-basis`属性,字符串超出宽度，会自动扩充宽度

`flex-basis`: 主轴上的基础尺寸，大多数情况与width属性是等价的，都是设置flex-item的宽度
+ auto: 默认值， 参照自身`width`或者`height`属性
+ content: 自动尺寸，根据内容撑开
+ `<'width'>`：指定宽度

当一个属性同时设置`flex-basis（属性值不为auto)`和`width`时，`flex-basis`具有更高的优先级

## flex 平分
```css
.father {
    width: 400px;
    height: 400px;
    background-color: #ddd;
    display: flex;
}
.son {
    flex: 1;
    height: 90px;
}
```
> `flex: 1`属性是 `flex-grow`, `flex-shrink`, `flex-basis`的简写

```
// 记忆公式
flex = none | auto | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
```

> 语法:
+ `|` 表示要么是`none`， 要么是`auto`， 要么是后面这一坨，三选一
+ `?` 表示`flex-shrink` 可选
+ `||`表示`逻辑或`

> 一个值： 
+ 1.`none(0 0 auto)` 和 `auto(1 1 auto)`
+ 2.`无单位` 就是flex-grow（规定是一个number类型）
+ 3.`有单位` jiushi flex-basis ，类似width

> 两个值:
+ 其中一个无单位(flex-grow)，其中一个有单位(flex-basis)

> 三个值:
一一对应

**flex：1; 即： 一个值，没有单位，就是flex-grow 剩余空间平均分配**

