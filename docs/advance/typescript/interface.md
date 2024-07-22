# 接口

## 接口的作用

在`TypeScript`里，接口的作用就是`类型命名`和为你的代码或第三方代码`定义契约`。<br/>

在接口中我们只需要`定义属性或方法，不需要具体的实现`。<br/>

一般我们用接口来定义`对象类型`和`方法类型`。

## 接口定义对象类型
使用关键字`interface`来定义接口
```ts
interface User {
    name: string
}

const user : User = { name：'张三' }
```

### 必选属性和必选方法
```ts
interface User {
    name: string; //必须属性
    hi: (nun: number) => number; //必须函数，返回值为number
    eat: () => void; //必须函数，没有返回值的方法
    sleep(): void; //必须函数，没有返回值的方法，简写
}
```
使用User接口定义对象的时候就必须具有这四个属性，否则在编译阶段就会报错
```ts
let user:User = {
    name:'张三',
    hi: (num:number) => num,
    eat: () => { console.log('eat') },
    sleep: () => { console.log('sleep') }
}
```

### 可选属性和可选方法
```ts
interface User {
    name?： string  // 可选属性
    hi?: (num: number) => number  // 可选方法
}
// 使用
let user :User = {}
```


### 只读属性和只读方法
只读属性和只读方法就是定义的属性的方法是不能被修改的，使用`readonly关键字`来定义
```ts
interface User {
    readonly name: string;
    readonly hi: (num:number) => number
}
// 使用
let user : User = {
    name: '张三',
    hi: (num: number) => num
}
user.name = '李四'// error 无法分配, 因为他是只读属性
user.hi = (num: number) => num + 1 // error 无法分配, 因为他是只读属性
```

### 任意属性和任意方法
`中途添加属性和方法`，就需要用到`索引签名`了
```ts
interface User {
    name:string;
    [prop: string] :any;
}
```
这里使用`[prop:string]:any` 定义了一个索引签名。它表示可以接受任意的属性名，只要是字符串类型的就可以，接受任意的属性值。
```ts
let user : User = { name: '张三', age: 24 }
// 还能动态添加任意属性和方法
user.count = 1
user.say = () => { console.log('你能拿我怎么办') }

user[Symbol(1)] = 123 // Error  key只能是string
```

`需要注意，索引签名参数类型必须是 “string”、“number”、“symbol”或模板文本类型`<br/>

`必选属性和可选属性值的类型必须是任意属性值类型的子集`<br/>


比如我们有个user对象，它的联系方式有很多种，不同的人有不同的情况。
```ts
{ 
  name: '张三', 
  concat: {
    wechat: 'xiaozhang@163.com', 
    qq: '1845751425@qq.com', 
    // ...
  }
},
{ 
  name: '李四', 
  concat: {
    phone: '17673298765', 
    qq: '1845751425@qq.com', 
    // ...
  }
}
```
concat对象的键始终是string，值也始终是string，这时我们就可以为concat属性定义一个索引类型的接口。

```ts
interface Concat {
    [prop: string] : string
}
interface User {
    name: string;
    concat: Concat
}
```

## 接口定义函数类型

```ts
interface Say {
    (str: string) : string
}

// 上面定义了一个接受string参数并且返回string类型的函数
const say : Say = (str) => str
```

## 接口定义构造函数
```ts
interface ToString () {
    new () : string
}
declare const sometingToString : ToString
new sometingToString() // ok
```

## 接口的继承

接口是接受继承的，且是支持多继承的
```ts
interface User1 {
    name: string
}
interface User2 extends User1 {
    age: number
}
const user : User2 = { name: '张三', age: 24 }
interface User3 extends User1, User2 {
    sex: string 
}
const user1 : User3 = { name:'张三', age: 24, sex : '女' }
```

## 接口和类型别名type的区别


### 接口能实现继承
`接口可以使用继承，相当于多个接口组合，代码更具有灵活性，但是type是不支持的`

### 接口能多次定义
```ts
interface User2 {
  name: string;
}
interface User2 {
  age: number;
}
// User2 同时具备name和age属性
const user2: User2 = { name: "randy", age: 24 };
// 会报错 type不能重复定义
// type User2 = { name: string };
// type User2 = { age: number };
```
### 接口能被实现
接口能被class来实现。type是不支持的。
```ts
class People implements User2 {
    name：'张三';
    age: 24;
}
```
### 类型别名支持给原始类型取别名

```ts
// 给string原始类型取别名
type newstring = string;
const str2: newstring = "randy";
const str3: string = "randy";
console.log(str2, str3);
```

大多数是在联合类型的时候使用type去重新定一下。

```ts
type NumAndStr = number | string;

```
总结: `简单场景使用type ，复杂场景选择接口` `type使用=` `interface使用 {}`

一、type可以定义一个集合，可以包含各种类型的属性和值，以用来描述对象、函数、联合类型、交叉类型
二、interface 定义了一个对象的形状，描述了对象应该具有的属性及其类型

type 可以通过联合类型(`|`) 和交叉类型(`&`)进行组合
interface 可以被扩展，可以使用`extend`关键字来实现接口的继承，从而添加更多的属或者方法

