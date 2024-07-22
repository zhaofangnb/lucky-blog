# 常用布局


## 线性布局(Column/Row)

### 基本概念
+ 布局容器: 具有布局能力的容器组件，可以承载其他元素作为其子元素，会对其其子元素进行尺寸计算和布局排列。
+ 主轴: 线性布局在布局方向上的轴线。 Row容器主轴在水平方向, Column容器主轴在垂直方向。
+ 交叉轴: 垂直于主轴方向的轴线.
+ 间距: 布局子元素的间距。
```bash
Column({ space: 20}) {
    Text('space: 20').fontSize(15).fontColor(Color.Gray).width('90%')
    Row().width('90%').height(50).backgroundColor(0xF5DEB3)
    Row().width('90%').height(50).backgroundColor(0xD2B48C)
    Row().width('90%').height(50).backgroundColor(0xF5DEB3)
}.width(100%)
```

```bash
Row({ space: 35 }) {
    Text('space: 35').fontSize(15).fontColor(Color.Gray)
    Row().width('10%').height(150).backgroundColor(0xF5DEB3)
    Row().width('10%').height(150).backgroundColor(0xD2B48C)
    Row().width('10%').height(150).backgroundColor(0xF5DEB3)
}.width('90%')
```
### 布局子元素在交叉轴对齐方式

交叉轴为`垂直方向时取值为VerticalAlign`类型，`水平方向取值为HorizontalAlign`。

Column容器内子元素在水平方向上的排列:

+ HorizontalAlign.Start：子元素在水平方向左对齐。
+ HorizontalAlign.Center：子元素在水平方向居中对齐。
+ HorizontalAlign.End：子元素在水平方向右对齐。

Row容器内子元素在垂直方向上的排列：

+ VerticalAlign.Top：子元素在垂直方向顶部对齐。
+ VerticalAlign.Center：子元素在垂直方向居中对齐。
+ VerticalAlign.Bottom：子元素在垂直方向底部对齐。

`alignSelf`属性用于控制单个子元素在容器交叉轴上的对齐方式，`其优先级高于alignItems属性，如果设置了alignSelf属性，则在单个子元素上会覆盖alignItems属性`。

### 布局子元素在主轴对齐方式

Column容器内子元素在垂直方向上的排列：
+ justifyContent(FlexAlign.Start)：元素在垂直方向首端对齐，第一个元素与行首对齐，同时后续的元素与前一个对齐。
+ justifyContent(FlexAlign.Center)：元素在垂直方向中心对齐，第一个元素与行首的距离与最后一个元素与行尾距离相同。
+ justifyContent(FlexAlign.End)：元素在垂直方向尾部对齐，最后一个元素与行尾对齐，其他元素与后一个对齐。
+ justifyContent(FlexAlign.SpaceBetween)：垂直方向均匀分配元素，相邻元素之间距离相同。第一个元素与行首对齐，最后一个元素与行尾对齐。
+ justifyContent(FlexAlign.SpaceAround)：垂直方向均匀分配元素，相邻元素之间距离相同。第一个元素到行首的距离和最后一个元素到行尾的距离是相邻元素之间距离的一半。
+ justifyContent(FlexAlign.SpaceEvenly)：垂直方向均匀分配元素，相邻元素之间的距离、第一个元素与行首的间距、最后一个元素到行尾的间距都完全一样。

Row容器内子元素在水平方向上的排列同理，如上。


### 自适应伸缩

设置Row和Column的宽高为百分比，当屏幕宽高变化时，会产生自适应效果。

### 自适应缩放

1. 父容器尺寸确定时，使用`百分比设置子组件和兄弟元素的宽度`，使他们在任意尺寸的设备下保持固定的自适应占比。
```bash
@Entry
@Component
struct WidthExample {
  build() {
    Column() {
      Row() {
        Column() {
          Text('left width 20%')
            .textAlign(TextAlign.Center)
        }.width('20%').backgroundColor(0xF5DEB3).height('100%')

        Column() {
          Text('center width 50%')
            .textAlign(TextAlign.Center)
        }.width('50%').backgroundColor(0xD2B48C).height('100%')

        Column() {
          Text('right width 30%')
            .textAlign(TextAlign.Center)
        }.width('30%').backgroundColor(0xF5DEB3).height('100%')
      }.backgroundColor(0xffd306).height('30%')
    }
  }
}
```

2.父容器尺寸确定时，使用layoutWeight属性设置子组件和兄弟元素在主轴上的权重，忽略元素本身尺寸设置，使它们在任意尺寸的设备下自适应占满剩余空间。
```bash
@Entry
@Component
struct WidthExample {
  build() {
    Column() {
      Row() {
        Column() {
          Text('layoutWeight(1)')
            .textAlign(TextAlign.Center)
        }.layoutWeight(1).backgroundColor(0xF5DEB3).height('100%')

        Column() {
          Text('layoutWeight(2)')
            .textAlign(TextAlign.Center)
        }.layoutWeight(2).backgroundColor(0xD2B48C).height('100%')

        Column() {
          Text('layoutWeight(3)')
            .textAlign(TextAlign.Center)
        }.layoutWeight(3).backgroundColor(0xF5DEB3).height('100%')
      }.backgroundColor(0xffd306).height('30%')
    }
  }
}
```

### 自适应延伸
+ 在List中添加滚动条：当List子项过多一屏放不下时，可以将每一项子元素放置在不同的组件中，通过滚动条进行拖动展示。可以通过`scrollBar属性`设置滚动条的常驻状态，`edgeEffect属性`设置拖动到内容最末端的回弹效果。
+ 使用Scroll组件：在线性布局中，开发者可以进行垂直方向或者水平方向的布局。当一屏无法完全显示时，可以`在Column或Row组件的外层包裹一个可滚动的容器组件Scroll`来实现可滑动的线性布局。

```bash
@Entry
@Component
struct ScrollExample {
  scroller: Scroller = new Scroller();
  private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  build() {
    Scroll(this.scroller) {
      Column() {
        ForEach(this.arr, (item) => {
          Text(item.toString())
            .width('90%')
            .height(150)
            .backgroundColor(0xFFFFFF)
            .borderRadius(15)
            .fontSize(16)
            .textAlign(TextAlign.Center)
            .margin({ top: 10 })
        }, item => item)
      }.width('100%')
    }
    .backgroundColor(0xDCDCDC)
    .scrollable(ScrollDirection.Vertical) # 滚动方向为垂直方向
    .scrollBar(BarState.On) # 滚动条常驻显示
    .scrollBarColor(Color.Gray) # 滚动条颜色
    .scrollBarWidth(10) # 滚动条宽度
    .edgeEffect(EdgeEffect.Spring) # 滚动到边沿后回弹
  }
}
```

## Flex弹性布局

### 布局方向
+ Row
+ RowReverse
+ Column
+ ColumnReverse

### 布局换行

+ FlexWrap. NoWrap（默认值）：不换行。如果子组件的宽度总和大于父元素的宽度，则子组件会被压缩宽度。
+ FlexWrap. Wrap：换行，每一行子组件按照主轴方向排列。
+ FlexWrap. WrapReverse：换行，每一行子组件按照主轴反方向排列。

### 主轴上对齐方式
通过justifyContent参数设置在主轴方向的对齐方式。
+ FlexAlign.Start
+ FlexAlign。Center
+ FlexAlign.End
+ FlexAlign.SpaceBetween
+ FlexAlign.SpaceAround
+ FlexAlign.SpaceEvently

### 交叉轴对齐方式
容器和子元素都可以设置交叉轴对齐方式，且子元素设置的对齐方式优先级较高。

容器组件设置交叉轴对齐:
通过Flex组件的alignItems参数设置子组件在交叉轴的对齐方式。
+ ItemAlign.Auto：使用Flex容器中默认配置。
+ ItemAlign.Start：交叉轴方向首部对齐。
+ ItemAlign.Center：交叉轴方向居中对齐。
+ ItemAlign.End：交叉轴方向底部对齐。
+ ItemAlign.Stretch：交叉轴方向拉伸填充，在未设置尺寸时，拉伸到容器尺寸。
+ ItemAlign. Baseline：交叉轴方向文本基线对齐。


子组件的alignSelf属性也可以设置子组件在父容器交叉轴的对齐格式，且会覆盖Flex布局容器中alignItems配置。

### 内容对齐
通过alignContent参数设置子组件各行在交叉轴剩余空间内的对齐方式，只在多行的flex布局中生效
+ FlexAlign.Start：子组件各行与交叉轴起点对齐。
+ FlexAlign.Center：子组件各行在交叉轴方向居中对齐。
+ FlexAlign.End：子组件各行与交叉轴终点对齐。
+ FlexAlign.SpaceBetween：子组件各行与交叉轴两端对齐，各行间垂直间距平均分布。
+ FlexAlign.SpaceAround：子组件各行间距相等，是元素首尾行与交叉轴两端距离的两倍。
+ FlexAlign.SpaceEvenly: 子组件各行间距，子组件首尾行与交叉轴两端距离都相等。

## 自适应拉伸
+ flexBasis：设置子组件在父容器主轴方向上的基准尺寸。如果设置了该值，则子项占用的空间为设置的值；如果没设置该属性，那子项的空间为width/height的值。
```bash
Flex() {
  Text('flexBasis("auto")')
    .flexBasis('auto') // 未设置width以及flexBasis值为auto，内容自身宽度
    .height(100)
    .backgroundColor(0xF5DEB3)
  Text('flexBasis("auto")' + ' width("40%")')
    .width('40%')
    .flexBasis('auto') //设置width以及flexBasis值auto，使用width的值
    .height(100)
    .backgroundColor(0xD2B48C)

  Text('flexBasis(100)') // 未设置width以及flexBasis值为100，宽度为100vp
    .fontSize(15)
    .flexBasis(100)
    .height(100)
    .backgroundColor(0xF5DEB3)

  Text('flexBasis(100)')
    .fontSize(15)
    .flexBasis(100)
    .width(200) // flexBasis值为100，覆盖width的设置值，宽度为100vp
    .height(100)
    .backgroundColor(0xD2B48C)
}.width('90%').height(120).padding(10).backgroundColor(0xAFEEEE)
```
+ flexGrow：设置父容器的剩余空间分配给此属性所在组件的比例。用于“瓜分”父组件的剩余空间。
```bash
Flex() {
Text('flexGrow(2)')
  .flexGrow(2) 
  .width(100)
  .height(100)
  .backgroundColor(0xF5DEB3)

Text('flexGrow(3)')
  .flexGrow(3)
  .width(100)
  .height(100)
  .backgroundColor(0xD2B48C)

Text('no flexGrow')
  .width(100) 
  .height(100)
  .backgroundColor(0xF5DEB3)
}.width(420).height(120).padding(10).backgroundColor(0xAFEEEE)
```
父容器宽度420vp，三个子元素原始宽度为100vp，左右padding为20vp，总和320vp，剩余空间100vp根据flexGrow值的占比分配给子元素，未设置flexGrow的子元素不参与“瓜分”。

第一个元素以及第二个元素以2:3分配剩下的100vp。第一个元素为100vp+100vp*2/5=140vp，第二个元素为100vp+100vp*3/5=160vp。

+ flexShrink: 当父容器空间不足时，子组件的压缩比例。
```bash
Flex({ direction: FlexDirection.Row }) {
  Text('flexShrink(3)')
    .fontSize(15)
    .flexShrink(3)
    .width(200)
    .height(100)
    .backgroundColor(0xF5DEB3)

  Text('no flexShrink')
    .width(200)
    .height(100)
    .backgroundColor(0xD2B48C)

  Text('flexShrink(2)')
    .flexShrink(2)
    .width(200)
    .height(100)
    .backgroundColor(0xF5DEB3)
}.width(400).height(120).padding(10).backgroundColor(0xAFEEEE)
```