# 渲染控制

## if/else 条件渲染
``` java
@Entry    // 入口
@Component  // 组件
struct ViewA {
  @State count: number = 0;  // 声明变量 必须带类型

  build() {
    Column() {
      Text(`count=${this.count}`)

      if (this.count > 0) {
        Text(`count is positive`)
          .fontColor(Color.Green)
      }

      Button('increase count')
        .onClick(() => {
          this.count++;
        })

      Button('decrease count')
        .onClick(() => {
          this.count--;
        })
    }
  }
}
```

if...else 和子组件状态
```java
@Component
struct CounterView {
  @State counter: number = 0;   // @State装饰变量的子组件
  label: string = 'unknown';

  build() {
    Column({ space: 20 }) {
      Text(`${this.label}`)
      Button(`counter ${this.counter} +1`)
        .onClick(() => {
          this.counter += 1;
        })
    }
    .margin(10)
    .padding(10)
    .border({ width: 1 })
  }
}

@Entry
@Component
struct MainView {
  @State toggle: boolean = true;

  build() {
    Column() {
        // 这里是两个不同的组件实例
      if (this.toggle) {
        CounterView({ label: 'CounterView #positive' }) 
      } else {
        CounterView({ label: 'CounterView #negative' })
      }
      Button(`toggle ${this.toggle}`)
        .onClick(() => {
          this.toggle = !this.toggle;
        })
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```


条件更改时，若需要`保留counter值所做的修改`:
```java
@Component
struct CounterView {
  @Link counter: number;   // @Link需要使用$传参
  label: string = 'unknown';

  build() {
    Column({ space: 20 }) {
      Text(`${this.label}`)
        .fontSize(20)
      Button(`counter ${this.counter} +1`)
        .onClick(() => {
          this.counter += 1;
        })
    }
    .margin(10)
    .padding(10)
    .border({ width: 1 })
  }
}

@Entry
@Component
struct MainView {
  @State toggle: boolean = true;
  @State counter: number = 0;

  build() {
    Column() {
      if (this.toggle) {
        // 子组件的@Link变量值与其父组件的数据源变量保持同步（双向数据同步）。
        CounterView({ counter: $counter, label: 'CounterView #positive' })
      } else {
        CounterView({ counter: $counter, label: 'CounterView #negative' })
      }
      Button(`toggle ${this.toggle}`)
        .onClick(() => {
          this.toggle = !this.toggle;
        })
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```


## ForEach 循环渲染

ForEach接口基于数组类型数据来进行循环渲染，需要与`容器组件`配合使用，且接口返回的组件应当是允许包含在ForEach父容器组件中的子组件。例如，`ListItem`组件要求`ForEach的父容器组件`必须为`List`组件。

ForEach提供了一个名为`keyGenerator`的参数，这是一个函数，开发者可以通过它自定义键值的生成规则。如果开发者没有定义keyGenerator函数，则ArkUI框架会使用`默认的键值生成函数`，即`(item: Object, index: number) => { return index + '__' + JSON.stringify(item); }`。

### 首次渲染
```java
@Entry
@Component
struct Parent {
  @State simpleList: Array<string> = ['one', 'two', 'three'];  // 会渲染出 one teo three 三个
  // ['one', 'two', 'two', 'three']

  build() {
    Row() {
      Column() {
        ForEach(this.simpleList, (item: string) => {
          ChildItem({ item: item })
        }, (item: string) => item)
      }
      .width('100%')
      .height('100%')
    }
    .height('100%')
    .backgroundColor(0xF1F3F5)
  }
}

@Component
struct ChildItem {
  @Prop item: string;

  build() {
    Text(this.item)
      .fontSize(50)
  }
}
```

### 非首次渲染
```java
@Entry
@Component
struct Parent {
  @State simpleList: Array<string> = ['one', 'two', 'three'];

  build() {
    Row() {
      Column() {
        Text('点击修改第3个数组项的值')
          .fontSize(24)
          .fontColor(Color.Red)
          .onClick(() => {
            this.simpleList[2] = 'new three';
          })

        ForEach(this.simpleList, (item: string) => {
          ChildItem({ item: item })
            .margin({ top: 20 })
        }, (item: string) => item)
      }
      .justifyContent(FlexAlign.Center)
      .width('100%')
      .height('100%')
    }
    .height('100%')
    .backgroundColor(0xF1F3F5)
  }
}

@Component
struct ChildItem {
  @Prop item: string;

  build() {
    Text(this.item)
      .fontSize(30)
  }
}
```
可以看出@State可以监听到简单数据类型数组项的变化：
+ 当 simpleList数组项发生变化时，会触发 ForEach 进行重新渲染。
+ ForEach 遍历新的数据源 ['one', 'two', 'new three']，并生成对应的键值one、two和new three。
+ 其中，`键值one和two在上次渲染中已经存在`，所以 ForEach `复用`了对应的组件并进行了渲染。对于第三个数组项 "new three"，由于其通过键值生成规则 item 生成的键值new three在上次渲染中不存在，因此 ForEach 为该数组项创建了一个新的组件

### 应用场景
+ 数据源不变---数据源可以直接采用基本数据类型。
+ 数据源数组项发生变化的场景下，例如进行数组插入、删除操作或者数组项索引位置发生交换时，数据源应为对象数组类型，并使用对象的唯一ID作为最终键值。
+ 当数据源的数组项为`对象数据类型`，并且`只修改某个数组项的属性值`时，由于数据源为`复杂数据类型`，**ArkUI框架无法监听到@State装饰器修饰的数据源数组项的属性变化**，从而无法触发ForEach的重新渲染。为实现ForEach重新渲染，需要**结合@Observed和@ObjectLink装饰器使用**。

```java
class Article {
    id: string;
    title: string;
    brief: string;
    constructor (id: string, title: string, brief:string) {
        this.id = id;
        this.title = title;
        this.brief = brief;
    }
}

@Entry
@Component
struct ArticleListView {
    @State isListReachEnd: booelan = false;
    @State articleList: Array<Article> = [
        new Article('001', '标题一', '文章介绍1'),
        new Article('002', '标题二', '文章介绍2'),
    ];

    loadMoreArticles () {
        this.articleList.push(new Article('003', '标题三', '新添加的文章介绍'))
    }

    build() {
        Column({ space: 5 }) {
            List() {
                ForEach(this.articleList, (item: Article) => {
                    ListItem() {
                        ArticleCard({ article: item})
                        .margin({ top: 20 })
                    }
                }, (item: Article) => item.id)
            }
            .onReachEnd () {
                // 列表到底末尾位置时触发。
                this.isListReachEnd = true;
            }
            // 组件通用信息-手势处理
            .parallelGesture(
                // 平移手势，滑动最小距离为5vp时识别成功。
                PanGesture({ 
                    direction: PanDirection.Up, // Up向上拖动
                    distance： 80   // 拖动的最小单位
                 })
                 .onActionStart(() => {
                     if (this.isListReachEnd) {
                        this.loadMoreArticles();
                        this.isListReachEnd = false;
                    }
                 })
            )
            .padding(20)
            .scrollBar(BarState.Off)
             // 滚动条状态: Off: 不显示; On: 常驻显示; Auto：触摸时显示，2s后消失;
        }
        .width('100%') // string
        .height('100%') // string
        .backgroundColor(0xF1F3F5) // 16进制的颜色
    }   
}

@Component
struct ArticleCard {
  @Prop article: Article;

  build () {
    Row() {
        Image($r('app.media.icon'))
        .width(80)
        .height(80)
        .margin({ right: 20})

        Column() {
            Text(this.article.title)
                .fontSize(20)
                .margin({ bottom: 8 })
            Text(this.article.brief)
                .fontSize(16)
                .fontColor(Color.Gray)
                .margin({ bottom: 8 })
        }
        .alignItems({ HorizontalAlign.Start }) // 竖直方向始对齐
        .width('80%')
        .height('100%')
    }
    .padding(20)
    .borderRadius(12)
    .backgroundColor('#FFECECEC')
    .height(120)
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween) // 设置子组件在水平方向上的对齐格式: 均匀对齐
  }
}
```

```java
@Observed
class Article {
    id: string;
    title: string;
    brief: string;
    isLiked: boolean;
    likesCount: number;
    constructor (id: string, title: string, brief:string, isLiked: boolean, likesCount: number) {
        this.id = id;
        this.title = title;
        this.brief = brief;
        this.isLiked = isLiked;
        this.likesCount = likesCount;
    }
}

@Entry
@Component
struct ArticleListView {
    @State isListReachEnd: booelan = false;
    @State articleList: Array<Article> = [
        new Article('001', '标题一', '文章介绍1', false, 100),
        new Article('002', '标题二', '文章介绍2', false, 100),
    ];

    build() {
         List() {
            ForEach(this.articleList, (item: Article) => {
                ListItem() {
                    ArticleCard({
                        article: item
                    })
                    .margin({ top: 20 })
                }
            }, (item: Article) => item.id)
        }
        .padding(20)
        .scrollBar(BarState.Off)
        .backgroundColor(0xF1F3F5)
  }
}

@Component
struct ArticleCard {
  @ObjectLink article: Article;

  handleLiked () {
    // 修改对象数组的某个属性
    this.article.isLiked = !this.article.isLiked 
    this.article.likesCount = this.article.isLiked 
    ? 
    this.article.likesCount + 1 
    : 
    this.article.likesCount - 1;
  }
    build() {
        Row() {
            Image($r('app.media.icon'))
                .width(80)
                .height(80)
                .margin({ right: 20 })

            Column() {
                Text(this.article.title)
                    .fontSize(20)
                    .margin({ bottom: 8 })
                Text(this.article.brief)
                    .fontSize(16)
                    .fontColor(Color.Gray)
                    .margin({ bottom: 8 })

                Row() {
                    Image( this.article.isLiked ? 
                        $r('app.media.iconLiked')
                        : 
                        $r('app.media.iconUnLiked')
                    )
                        .width(24)
                        .height(24)
                        .margin({ right: 8 })
                    Text(this.article.likesCount.toString()) //number类型展示使用toString()
                        .fontSize(16)
                }
                .onClick(() => this.handleLiked())
                .justifyContent(FlexAlign.Center)
            }
            .alignItems(HorizontalAlign.Start)
            .width('80%')
            .height('100%')
        }
        .padding(20)
        .borderRadius(12)
        .backgroundColor('#FFECECEC')
        .height(120)
        .width('100%')
        .justifyContent(FlexAlign.SpaceBetween)
    }
}
```

在本示例中，`Article类被@Observed装饰器修饰`。父组件`ArticleListView`传入Article对象实例给子组件ArticleCard，`子组件使用@ObjectLink装饰器接收该实例`。

+ 当点击第1个文章卡片上的点赞图标时，会触发ArticleCard组件的handleLiked函数。该函数修改第1个卡片对应组件里article实例的isLiked和likesCount属性值。
+ 由于子组件ArticleCard中的`article`使用了`@ObjectLink装饰器`，`父子组件共享同一份article数据`。因此，父组件中articleList的第1个数组项的isLiked和likedCounts数值也会`同步修改`。
+ 当父组件监听到数据源数组项属性值变化时，会触发ForEach重新渲染。，ForEach`键值生成规则为数组项的id属性`值。当ForEach遍历新数据源时，数组项的id均没有变化，不会新建组件。
+ 渲染第1个数组项对应的ArticleCard组件时，读取到的isLiked和likesCount为修改后的新值。


## LazyForEach 数据懒加载
当在滚动容器中使用了`LazyForEach`，框架会根据`滚动容器可视区域按需创建组件`，当组件滑出可视区域外时，框架会进行组件`销毁回收以降低内存占用`。

## ContentSlot：混合开发
