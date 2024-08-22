# UI范式

## 基本语法

+ **装饰器**
 1. @Entery - 入口组件
 2. @Component - 自定义组件
 3. @State - 组件中的状态变量，状态变量变化会触发UI刷新。
+ **自定义组件，可复用的UI单元**
```java
struct Hello {
    // 以声明式的方式来描述UI的结构，例如build()方法中的代码块。
    build () {
        
    }
}
```
+ **系统组件**
ArkUI框架中默认内置的基础和容器组件，可直接被开发者调用，比如示例中的Column、Text、Divider、Button。

+ **属性方法**
组件可以通过链式调用配置多项属性

+ **事件方法**
组件可以通过链式调用设置多个事件的响应逻辑

**除此之外，ArkTS扩展了多种语法范式来使开发更加便捷：**
+ `@Builder/@BuilderParam`：特殊的封装`UI描述的方法，细粒度的封装和复用UI描述`。

+ `@Extend/@Styles`：扩展`内置组件和封装属性样式`，更灵活地组合内置组件。

+ `stateStyles`：`多态样式`，可以依据组件的内部状态的不同，设置不同样式。

## 声明式UI描述
```java
// 无参数
Column() {
  Text('item 1')
  Divider()
  Text('item 2')
}

// 有参数
Text('test')
Text($r('app.string.title_value'))

// 变量或表达式也可参加参数赋值
Image(this.imagePath)
Image('https://' + this.imageUrl)
Text(`count: ${this.count}`)
```

## 自定义组件

**特点:**

+ 可组合
+ 可复用
+ 数据驱动UI更新

### 基本用法
```java
@Component
struct HelloComponent {
  @State message: string = 'Hello, World!';

  build() {
    // HelloComponent自定义组件组合系统组件Row和Text
    Row() {
      Text(this.message)
        .onClick(() => {
          // 状态变量message的改变驱动UI刷新，UI从'Hello, World!'刷新为'Hello, ArkUI!'
          this.message = 'Hello, ArkUI!';
        })
    }
  }
}
```
**如果在`另外的文件中引用`该自定义组件，需要使用`export`关键字导出，并在使用的页面`import`该自定义组件。**


### 基本结构

+ struct CompName {...}
+ @Component
+ build () {...} UI描述
+ @Entry UI界面的入口
+ @Reusable 可复用 (API 10开始)

### 成员变量/函数

+ 成员变量/函数为私有，不建议声明成静态变量/函数
+ 成员变量本地初始化有些是可选的，有些是必选的


### 参数规定
```java
@Component
struct MyComponent {
  private countDownFrom: number = 0;
  private color: Color = Color.Blue;

  build() {

  }
}

@Entry
@Component
struct ParentComponent {
  private someColor: Color = Color.Pink;

  build() {
    Column() {
      // 创建MyComponent实例，并将创建MyComponent成员变量countDownFrom初始化为10，将成员变量color初始化为this.someColor
      MyComponent({ countDownFrom: 10, color: this.someColor })
    }
  }
}
```

### build() 函数规则

+ @Entry装饰的自定义组件 build()内 `根节点唯一`，且必须为`容器组件`, `不能使用ForEach`
+ @Component装饰的自定义组件 build()内 `根节点唯一`，`可为非容器组件`, `不能使用ForEach`
+ 不允许调用没有用`@Builder`装饰的方法
+ 不允许使用switch语法，如果需要使用条件判断，请使用`if/else`
+ 不允许使用表达式, 包括三元表达式
+ 不允许直接改变状态变量

```java
@Entry
@Component
struct MyComponent {
  build() {
    // 根节点唯一且必要，必须为容器组件
    Row() {
      ChildComponent() 
    }
  }
}

@Component
struct ChildComponent {
  build() {
    // 根节点唯一且必要，可为非容器组件
    Image('test.jpg')
  }
}
```

```java
@Component
struct ParentComponent {
  doSomeCalculations() {
  
  }

  calcTextValue(): string {
    return 'Hello World';
  }

  @Builder doSomeRender() {
    // 自定义构建函数
    Text(`Hello World`)
  }

  build() {
    Column() {
      // 反例：不能调用没有用@Builder装饰的方法
      this.doSomeCalculations();
      // 正例：可以调用
      this.doSomeRender();
      // 正例：参数可以为调用TS方法的返回值
      Text(this.calcTextValue())
    }
  }
}
```


### 自定义组件通用样式

```java
@Component
struct MyComponent2 {
  build() {
    Button(`Hello World`)
  }
}

@Entry
@Component
struct MyComponent {
  build() {
    Row() {
      MyComponent2()
        .width(200)
        .height(300)
        .backgroundColor(Color.Red)
        // 该通用样式不作用与Button组件，而是生效在Button所处的开发者不可见的容器组件上。
    }
  }
}
```

## 页面和组件的生命周期

**@Entry装饰的组件的生命周期：**
+ **onPageShow**   页面每次显示时触发一次，包括路由过程、应用进入前台等场景。
+ **onPageHide**   页面每次隐藏时触发一次，包括路由过程、应用进入后台等场景
+ **onBackPress**  当用户点击返回按钮时触发

**@Component装饰的自定义组件的生命周期:**
+ **aboutToAppear** 组件即将出现时回调该接口，具体时机为在创建自定义组件的新实例后，在build()函数之前执行。
+ **onDidBuild**  组件build()函数执行完成之后回调该接口，不建议在onDidBuild函数中更改状态变量、使用animateTo等功能，这可能会导致不稳定的UI表现。
+ **aboutToDisappear**   函数在自定义组件析构销毁之前执行。不允许在aboutToDisappear函数中改变状态变量，特别是@Link变量的修改可能会导致应用程序行为不稳定。

## @Builder装饰器
ArkUI提供了一种`轻量的UI元素复用机制`@Builder，该自定义组件`内部UI结构固定`，仅与使用方进行`数据传递`，开发者可以将重复使用的UI元素`抽象成一个方法`，在`build`方法里调用

```java
@Component
struct MyCopm  {

  // 组件私有的自定义构建函数
  @Builder MyBuilderFunction () {
    
  }

  build() {
    // 调用组件内函数
    this.MyBuilderFunction();
    // 调用全局函数
    globalBuilderFunction();
  }
} 

// 全局自定义构建函数
@Builder globalBuilderFunction () {

}
```

**注意: @Builder存在两个及两个以上的参数，即使通过对象字面量的形式传递，值的改变也不会引起UI的刷新。**
```java
class GlobalTmp {
  str_value: string = 'Hello';
  num_value: number = 0;
}
@Builder function overBuilder(param: GlobalTmp) {
  Column() {
    Text(`str_value: ${param.str_value}`)
    Text(`num: ${param.num_value}`)
  }
}

@Entry
@Component
struct Parent {
  @State objParam: GlobalTmp = new GlobalTmp();
  build() {
    Column() {
      Text('通过调用@Builder渲染UI界面')
        .fontSize(20)
      overBuilder({
          str_value: this.objParam.str_value,
          num_value: this.objParam.num_value
        }) // 此处只有一个参数对象正确，若存在两个以上错误
      Line()
        .width('100%')
        .height(10)
        .backgroundColor('#000000').margin(10)
      Button('点击改变参数值').onClick(() => {
        this.objParam.str_value = 'Hello World';
        this.objParam.num_value = 1;
      })
    }
  }
}
```

## @BuilderParam装饰器：引用@Builder函数

```java
@Component
struct Child {
  @Builder customBuilder() {};
  // @BuilderParam 使用父组件@Builder装饰的方法 来 初始化子组件
  @BuilderParam customBuilderParam: () => void = this.customBuilder;

  build() {
    Column() {
      this.customBuilderParam()
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
      Child({ customBuilderParam: this.componentBuilder })
    }
  }
}
```


```java
class Tmp{
  label: string = ''
}

// 全局自定义函数
@Builder function overBuilder($$: Tmp) {
  Text($$.label)
    .width(400)
    .height(50)
    .backgroundColor(Color.Green)
}

@Component
struct Child {
  label: string = 'Child'
  // 组件内自定义函数
  @Builder customBuilder() {};

  // 无参数类型，指向的componentBuilder也是无参数类型
  @BuilderParam customBuilderParam: () => void = this.customBuilder
  // 有参数类型，指向的overBuilder也是有参数类型的方法
  @BuilderParam customOverBuilderParam: ($$: Tmp) => void = overBuilder

  build() {
    Column() {
      this.customBuilderParam(); //this指向本组件Child组件内的label: 'Child'
      this.customOverBuilderParam({label: 'global Builder label' });  // 'global Builder label'
    }
  }
}

@Entry
@Component
struct Parent {
  label: string = 'Parent';

  @Builder componentBuilder() {
    Text(`${this.label}`)
  }

  build() {
    Column() {
      this.componentBuilder()  // this指向父组件本组件 label: 'Parent'
      Child({ customBuilderParam: this.componentBuilder, customOverBuilderParam: overBuilder })
      // 'Child'
      // 'global Builder label'
    }
  }
}
```

```java
// 尾随闭包

@Component
struct CustomContainer {
  @Prop header: string = '';
  @Builder closerBuilder(){};
  // 使用父组件的尾随闭包{}(@Builder装饰的方法)初始化子组件@BuilderParam
  @BuilderParam closer: () => void = this.closerBuilder;

  build() {
    Column() {
      Text(this.header)
        .fontSize(30)
      this.closer()
    }
  }
}

@Builder function specificParam(label1: string, label2: string) {
  Column() {
    Text(label1)
      .fontSize(30)
    Text(label2)
      .fontSize(30)
  }
}

@Entry
@Component
struct CustomContainerUser {
  @State text: string = 'header';

  build() {
    Column() {
      // 创建CustomContainer，在创建CustomContainer时，通过其后紧跟一个大括号“{}”形成尾随闭包
      // 作为传递给子组件CustomContainer @BuilderParam closer: () => void的参数
      CustomContainer({ header: this.text }) {
        Column() {
          specificParam('testA', 'testB')
        }
        .backgroundColor(Color.Yellow)
        .onClick(() => {
          this.text = 'changeHeader';
        })
      }
    }
  }
}
```

使用全局和局部@Builder初始化@BuilderParam:
```java
@Component
struct ChildPage {
  label: string = `Child Page`;
  @Builder customBuilder() {};
  @BuilderParam customBuilderParam: () => void = this.customBuilder;
  @BuilderParam customChangeThisBuilderParam: () => void = this.customBuilder;

  build() {
    Column() {
      this.customBuilderParam()
      this.customChangeThisBuilderParam()
    }
  }
}
// 全局变量
const builder_value: string = 'Hello World';
// 全局函数
@Builder function overBuilder() {
  Row() {
    Text(`全局 Builder: ${builder_value}`)
      .fontSize(20)
      .fontWeight(FontWeight.Bold)
  }
}

@Entry
@Component
struct ParentPage {
  label: string = `Parent Page`;

  @Builder componentBuilder() {
    Row(){
      Text(`局部 Builder :${this.label}`)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
    }
  }

  build() {
    Column() {
      // 调用this.componentBuilder()时，this指向当前@Entry所装饰的ParentPage组件，所以label变量的值为"Parent Page"。
      this.componentBuilder()
      ChildPage({
        // 把this.componentBuilder传给子组件ChildPage的@BuilderParam customBuilderParam，this指向的是子组件ChildPage，所以label变量的值为"Child Page"。
        customBuilderParam: this.componentBuilder,
        // 把():void=>{this.componentBuilder()}传给子组件ChildPage的@BuilderParam customChangeThisBuilderPara，
        // 因为箭头函数的this指向的是宿主对象，所以label变量的值为"Parent Page"。
        customChangeThisBuilderParam: (): void => { this.componentBuilder() }
      })
      Line()
        .width('100%')
        .height(10)
        .backgroundColor('#000000').margin(10)
      // 调用全局overBuilder()时，this指向当前整个活动页，所以展示的内容为"Hello World"。
      overBuilder()
      ChildPage({
        // 把全局overBuilder传给子组件ChildPage的@BuilderParam customBuilderParam，this指向当前整个活动页，所以展示的内容为"Hello World"。
        customBuilderParam: overBuilder,
        // 把全局overBuilder传给子组件ChildPage的@BuilderParam customChangeThisBuilderParam，this指向当前整个活动页，所以展示的内容为"Hello World"。
        customChangeThisBuilderParam: overBuilder
      })
    }
  }
}
```

改变内容UI不刷新:

```java
@Component
struct ChildPage {
  @State label: string = `Child Page`;
  @Builder customBuilder() {};
  @BuilderParam customChangeThisBuilderParam: () => void = this.customBuilder;

  build() {
    Column() {
      this.customChangeThisBuilderParam()
    }
  }
}

@Entry
@Component
struct ParentPage {
  @State label: string = `Parent Page`;

  @Builder componentBuilder() {
    Row(){
      Text(`Builder :${this.label}`)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
    }
  }

  build() {
    Column() {
      ChildPage({
        customChangeThisBuilderParam: this.componentBuilder // this指向Child Page
        /*
        customChangeThisBuilderParam: () => { this.componentBuilder() } // 使用箭头函数的方式使this停留在ParentPage， 下面点击按钮会引起UI变化
        */
      })
      Button('点击改变label内容')
        .onClick(() => {
          this.label = 'Hello World'; // 改变父组件的label,UI不会变化
        })
    }
  }
}
```


## wrapBuilder：封装全局@Builder
```java
@Builder function MyBuilder(value: string, size: number) {
  Text(value)
    .fontSize(size)
}

// 封装全局@Builder
let globalBuilder: WrappedBuilder<[string, number]> = wrapBuilder(MyBuilder);

@Entry
@Component
struct Index {
  @State message: string = 'Hello World';

  build() {
    Row() {
      Column() {
        globalBuilder.builder(this.message, 50)
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

```java
@Builder function MyBuilder(value: string, size: number) {
  Text(value)
    .fontSize(size)
}

@Builder function YourBuilder(value: string, size: number) {
  Text(value)
    .fontSize(size)
    .fontColor(Color.Pink)
}

const builderArr: WrappedBuilder<[string, number]>[] = [wrapBuilder(MyBuilder), wrapBuilder(YourBuilder)];



@Entry
@Component
struct Index {
  @Builder testBuilder() {
      ForEach(builderArr, (item: WrappedBuilder<[string, number]>) => {
        item.builder('Hello World', 30)
      }
    )
  }

  build() {
    Row() {
      Column() {
        this.testBuilder()
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

```java
// 通过按引用传递的方式传入参数，会触发UI的刷新。
class Tmp {
  paramA2: string = 'hello';
}

@Builder function overBuilder(param: Tmp) {
  Column(){
    Text(`wrapBuilder value:${param.paramA2}`) // 按引用传参
  }
}

const wBuilder: WrappedBuilder<[Tmp]> = wrapBuilder(overBuilder);

@Entry
@Component
struct Parent{
  @State label: Tmp = new Tmp();
  build(){
    Column(){
      wBuilder.builder({paramA2: this.label.paramA2})
      Button('Click me').onClick(() => {
        this.label.paramA2 = 'ArkUI';
      })
    }
  }
}
```

## @LocalBuilder装饰器： 维持组件父子关系

在自定义函数体中，this指代当前所属组件，组件的状态变量可以在自定义构建函数内访问。

区别:

```java
@Component
struct Child {
  label: string = `Child`;
  @BuilderParam customBuilderParam: () => void;

  build() {
    Column() {
      this.customBuilderParam()
    }
  }
}

@Entry
@Component
struct Parent {
  label: string = `Parent`;

  @Builder componentBuilder() {
    Text(`${this.label}`)
    // this指向在Child的label， 显示Child  
  }

  // @LocalBuilder componentBuilder() {
  //   Text(`${this.label}`)    // this指向Parent的label，显示Parent
  // }

  build() {
    Column() {
      Child({ customBuilderParam: this.componentBuilder }) 
    }
  }
}
```

## @Styles装饰器：定义组件重用样式
@Styles装饰器可以将多条样式设置提炼成一个方法，直接在组件声明的位置调用。通过@Styles装饰器可以快速定义并复用自定义样式。

+ 当前@Styles仅支持`通用属性`和`通用事件`
+ @Styles方法`不支持参数`
+ @Styles可以定义在组件内或全局，在全局定义时需在方法名前面添加`function`关键字，组件内定义时则不需要添加function关键字。
+ 组件内@Styles的优先级高于全局@Styles。

```java
// 全局
@Styles function globalStyleFunc() {
  .width(150)
  .height(100)
  .backgroundColor(Color.Pink)
}


@Entry
@Component
struct styleUse {
  @State heightValue: number = 100

  // 组件内
  @Styles innerStyleFunc () {
    .width(100)
    .height(this.heightValue)
    .backgroundColor(Color.Yellow)
    .onClick(() => {
      this.heightValue = 200
    })
  }

   build() {
    Column({ space: 10 }) {
      // 使用
      Text('GlobalStyle')
        .globalStyleFunc()
        .fontSize(30)

      Text('InnerStyle')
        .innerStyleFunc()
        .fontSize(30)
    }
  }
}
```

## @Extend装饰器：定义扩展组件样式

### 装饰器说明
```java
@Extend(UIComponentName) function functionName {

}
```
### 使用规则
+ 和@Styles不同，@Extend仅支持在全局定义，不支持在组件内部定义,不支持export。
+ 和@Styles不同，@Extend支持封装指定组件的`私有属性`、`私有事件`和`自身定义的全局方法`。
```java
// @Extend(Text)可以支持Text的私有属性fontColor
@Extend(Text) function fancy () {
  .fontColor(Color.Red)
}
// superFancyText可以调用预定义的fancy
@Extend(Text) function superFancyText(size:number) {
    .fontSize(size)
    .fancy()
}
```
+ 和@Styles不同，@Extend装饰的方法`支持参数`，开发者可以在调用时传递参数，调用遵循TS方法传值调用。
```java
// xxx.ets
@Extend(Text) function fancy (fontSize: number) {
  .fontColor(Color.Red)
  .fontSize(fontSize)
}

@Entry
@Component
struct FancyUse {
  build() {
    Row({ space: 10 }) {
      Text('Fancy')
        .fancy(16)
      Text('Fancy')
        .fancy(24)
    }
  }
}
```
+ @Extend装饰的方法的`参数可以为function，作为Event事件的句柄`。

```java
@Extend(Text) function makeMeClick(onClick: () => void) {
  .backgroundColor(Color.Blue)
  .onClick(onClick)
}

@Entry
@Component
struct FancyUse {
  @State label: string = 'Hello World';

  onClickHandler() {
    this.label = 'Hello ArkUI';
  }

  build() {
    Row({ space: 10 }) {
      Text(`${this.label}`)
        .makeMeClick(() => { this.onClickHandler() }) // 箭头函数 ， Hello World 变为 Hello ArkUI
    }
  }
}
```
+ @Extend的`参数可以为状态变量`，当状态变量改变时，UI可以正常的被刷新渲染。

```java
@Extend(Text) function fancy (fontSize: number) {
  .fontColor(Color.Red)
  .fontSize(fontSize)
}

@Entry
@Component
struct FancyUse {
  @State fontSizeValue: number = 20
  build() {
    Row({ space: 10 }) {
      Text('Fancy')
        .fancy(this.fontSizeValue)
        .onClick(() => {
          this.fontSizeValue = 30
        })
    }
  }
}
```

## stateStyles：多态样式
