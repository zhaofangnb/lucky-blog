# 代码复用

## 样式复用
开发者可使用`@Styles`或 `@Extend`装饰器将多条样式设置提炼成一个方法，然后`在各个组件声明的位置进行调用`。

### @Styles
可定义在`组件内`和`全局`
```bash
@Entry
@Component
struct MyPage {
    build () {
        Column() {
            Row({ space: 50 }) {
                Button('确认')
                .type(ButtonType.Normal)
                .backGroundColor(Color.Green)
                .compButtonStyle()
                .onClick(() => {
                    console.log('确认')
                })
                Button('取消')
                .type(ButtonType.Normal)
                .backGroundColor(Color.Gray)
                .compButtonStyle()
                .onClick(() => {
                    console.log('取消')
                })
            }
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
    }

    # 组件内样式定义
    @Styles compButtonStyle () {
        .width(100)
        .height(40)
        .borderRadius(10)
    }
}
```

```bash
@Entry
@Component
struct MyPage {
    build () {
        Column() {
            Row({ space: 50}) {
                Button('确认')
                .type(ButtonType.Normal)
                .backGroundColor(Color.Green)
                .globalButtonStyle()
                .onClick(() => {
                    console.log('确认')
                })
                Button('取消')
                .type(ButtonType.Normal)
                .backGroundColor(Color.Gray)
                .globalButtonStyle()
                .onClick(() => {
                    console.log('取消')
                })
            }
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
    }
}

# 全局样式定义
    @Styles function globalButtonStyle () {
        .width(100)
        .height(40)
        .borderRadius(10)
    }
```

### @Extend
只能定义在全局，不能定义在组件内。只能用于指定类型的组件。支持参数。

```bash
@Entry
@Component
struct MyPage {
    build () {
        Column() {
            Row({ space: 50}) {
                Button('确认')
                 .buttonStyle(Color.Green)
                 .onClick(() => {
                    console.log('确认')
                })
                Button('取消')
                 .buttonStyle(Color.Gray)
                 .onClick(() => {
                    console.log('取消')
                })
            }
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
    }
}

@Extend(Button) function buttonStyle(color: Color) {
     .width(100)
     .height(40)
     .borderRadius(10)
     .type(ButtonType.Normal)
     .backGroundColor(color)
}
```

## UI结构复用

除了`自定义组件`, 更加轻量的复用机制`@Builder()方法`,该方法可以在`build()方法`中多次调用，以完成复用。
`@Builder()方法`可以定义在`组件内`或`全局`。支持导出。

```bash
@Entry
@Component
struct MyPage {
    build () {
        Column() {
            Row({ space: 50}) {
                this.compButtonBuilder($r('app.media.icon_edit'), '编辑', () => {
                    console.log('编辑')
                })
                 this.compButtonBuilder($r('app.media.icon_send'), '发送', () => {
                    console.log('发送')
                })
            }
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
    }

    # 组件内UI复用
    @Builder compButtonBuilder(icon: Resource, text: string, callback: () => void) {
        Button() {
            Row({ space: 10 }) {
                Image(icon)
                .width(25)
                .height(25)
                Text(text)
                .fontColor(Color.White)
                .fontSize(25)
            }
        }
        .width(120)
        .height(50)
        .onClick(callback)
    }
}
```

```bash
@Entry
@Component
struct MyPage {
    build () {
        Column() {
            Row({ space: 50}) {
                globalButtonBuilder($r('app.media.icon_edit'), '编辑', () => {
                    console.log('编辑')
                })
                 globalButtonBuilder($r('app.media.icon_send'), '发送', () => {
                    console.log('发送')
                })
            }
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
    }
}

    # 全局UI复用
    @Builder export function globalButtonBuilder(icon: Resource, text: string, callback: () => void) {
        Button() {
            Row({ space: 10 }) {
                Image(icon)
                .width(25)
                .height(25)
                Text(text)
                .fontColor(Color.White)
                .fontSize(25)
            } 
        }
        .width(120)
        .height(50)
        .onClick(callback)
    }
```

+ 组件内 @Builder 通过this访问当前组件的属性的方法，而全局的不能。
+ 全局 @Builder 方法可 { export }后，用于整个应用。
+ @Builder参数传递有 按值传递 和 按引用传递。按引用传递时，若传参为状态变量，则状态变量的变化会触发@Builder内部UI的刷新，按值传递则不会。
+ 自定义组件可以定义自己的状态变量，而@Builder方法则不能。


```bash
# 
@Builder function valueTextBuilder (count: number) {
    Text(`按值传递:${count}`)
    .fontSize(30)
    .fontWight(FontWeight.Bold)
}

# 
@Builder function referenceTextBuilder( obj: { count: number }) {
    Text(`按引用传递:${obj.count}`)
    .fontSize(30)
    .fontWight(FontWeight.Bold)
}
```