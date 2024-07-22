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