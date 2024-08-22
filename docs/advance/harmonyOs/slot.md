# 自定义组件插槽 @BuilderParam

## 组件定义
```bash
@Componnet
struct Container {
    @BuilderParam content: () => void

    build () {
        Column() {
            Text('其他内容')
            this.content(); # 占位符
            Button('其他')

        }
    }
}
```

## UI结构定义
```bash
@Builder function contentBuilder1 () {
    ...
}
@Builder function contentBuilder2 () {
    ...
}
@Builder function contentBuilder3 () {
    ...
}
```

## 组件创建
```bash
Container({ content：contentBuilder1 })
Container({ content：contentBuilder2 })
Container({ content：contentBuilder3 })
```

```java
@Component
struct Child {
    @Builder myBuiler () {}
    @BuilderParam contentBuildParam: () => void = this.myBuiler

     build () {
        Column() {
            Text('其他内容')
            this.contentBuildParam(); # 占位符
            Button('其他')

        }
    }
}

@Entry
@Component
struct Parent {
 @Builder componentBuilder() {
    Text(`Parent builder`)
  }

  build() {
    Column() {
      Child({ contentBuildParam: this.componentBuilder })
    }
  }
}
```