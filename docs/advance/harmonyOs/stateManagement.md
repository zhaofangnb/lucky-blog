# 状态管理

## 状态管理稳定版

### 装饰器总览

**按范围：**
+ 管理`组件`拥有状态的装饰器：组件级别的状态管理，可以观察组件内变化，和不同组件层级的变化，但需要唯一观察同一个组件树上，即同一个页面内。
+ 管理`应用`拥有状态的装饰器：应用级别的状态管理，可以观察不同页面，甚至不同UIAbility的状态变化，是应用内全局的状态管理。

**按数据的传递形式和同步类型层面：**
+ `只读`的`单向`传递；

+ `可变更`的`双向`传递。

**管理组件状态**

`@State`：@State装饰的变量拥有其所属组件的状态，可以作为其子组件单向和双向同步的数据源。当其数值改变时，会引起相关组件的渲染刷新。

`@Prop`：@Prop装饰的变量可以`和父组件建立单向同步关系，@Prop装饰的变量是可变的，但修改不会同步回父组件`。

`@Link`：@Link装饰的变量可以`和父组件建立双向同步关系`，子组件中@Link装饰变量的修改会同步给父组件中建立双向数据绑定的数据源，父组件的更新也会同步给@Link装饰的变量。

`@Provide/@Consume`：@Provide/@Consume装饰的变量用于`跨组件层级（多层组件）同步状态变量`，可以不需要通过参数命名机制传递，通过alias（别名）或者属性名绑定。

`@Observed`：@Observed装饰class，需要观察多层嵌套场景的`class需要被@Observed装饰`。单独使用@Observed没有任何作用，需要和@ObjectLink、@Prop联用。

`@ObjectLink`：@ObjectLink装饰的变量接收@Observed装饰的class的实例，应用于`观察多层嵌套场景`，和父组件的数据源构建`双向同步`。


**管理应用状态**

`AppStorage`是应用程序中的一个`特殊的单例LocalStorage对象`，是应用级的数据库，和`进程绑定`，通过`@StorageProp`和`@StorageLink`装饰器可以和组件联动。

AppStorage是应用状态的`“中枢”`，将需要与组件（UI）交互的数据存入`AppStorage`，比如`持久化数据PersistentStorage`和`环境变量Environment`。UI再通过`AppStorage提供的装饰器或者API接口，访问这些数据`。

框架还提供了`LocalStorage`，AppStorage是LocalStorage特殊的单例。LocalStorage是应用程序声明的应用状态的内存“数据库”，通常用于`页面级的状态共享`，通过`@LocalStorageProp`和@`LocalStorageLink`装饰器可以和UI联动。

**其他装填管理**
`@Watch`用于`监听状态变量的变化`。

```java
@Entry
@Component
struct TotalView {
  @State @Watch('onCountUpdated') count: number = 0;
  @State total: number = 0;

  // @Watch 回调
  onCountUpdated(): void {
    this.total += this.count;
  }

  build() {
    Text(`Total: ${this.total}`)
  }
}
```

`$$`运算符：给内置组件提供`TS变量的引用`，使得`TS变量`和`内置组件的内部状态`保持同步。

```java
// xxx.ets
@Entry
@Component
struct TextInputExample {
  @State text: string = '';
  controller: TextInputController = new TextInputController();  // 输入文本框

  build() {
    Column({ space: 20 }) {
      Text(this.text)
      TextInput({ 
        text: $$this.text, 
        placeholder: 'input your word...', 
        controller: this.controller
     })
        .placeholderColor(Color.Grey)
        .placeholderFont({ size: 14, weight: 400 })
        .caretColor(Color.Blue)
        .width(300)
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```