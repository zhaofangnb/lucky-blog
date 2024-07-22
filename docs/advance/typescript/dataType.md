# 数据类型

在TypeScript中定义变量的时候需要指定变量的数据类型。

## 简单数据类型

数据类型我们需要使用`小写形式`,TypeScript 中的`仅表示类型`

### 数字类型

```ts
const decLiteral: number = 6
const hexLiteral: number = 0xf00d
const binaryLiteral: number = 0b1010
const octalLiteral: number = 0o744
```

### 字符串类型

```ts
const str :string = 'randy'
```

### 布尔类型

```ts
const isTrue : boolean = true
```

### null类型
`默认情况下null是只能赋值给null类型的变量的`。但是当我们在tsconfig.json设置`strictNullChecks: false `后 null 可以赋值给任何类型的变量。

```ts
let n :null = null
```



### undefined类型

默认情况下 undefined 是所有类型的子类型。就是说你可以把 `undefined 赋值给其他类型`。如果你在tsconfig.json指定了"strictNullChecks":true ，null 和 undefined 只能赋值给 void 和它们各自的类型。

```ts
let u : undefined = undefined
```


### symbol类型

```ts
const sym : symbol = Symbol('kkk')
```

### bigint类型

使用 BigInt 需要在tsconfig.json中给lib选项添加ESNext。

```ts
const big: bigint = BigInt("1111111111111111");
```

虽然number和bigint都表示数字，但是这两个类型不兼容
```ts
let big : bigint = 100n
let num: number = 6
big = num
num = big
// 以上亮个赋值操作会抛出一个类型不兼容的ts（2322）错误
```
## 复杂数据类型

### object
object 表示非原始类型。

```ts
const user : {
    name: string;
    age: number;
} = { name: '张三', age: 18}
```

引用类型都可以是`object`类型

```ts
let value : object
value = new Date()
value = [1]
value = [1, 'hello']
```

### 数组[] 或者Array<>
```ts
const arr1: number[] = [1,2,3]
const arr2: Array<number> = [4,5,6]

// 联合类型
const arr3: (string | number)[] = [123, 'randy']
const arr4: Array<string | number> = [456, 'timi']

// 存对象
const arr5 : { name: string , age: number }[] = [{name: 'tom', age: 25}]

// 使用类型别名 type
type User = {
    name: string;
    age: number;
}
const arr6 :User[] = [{ name: 'jj', age: 30}]

// 二维数组
const twoArr : [][] = [
    [1, 2, 3],
    [4, 5, 6]
]
```

### 元组 Tuple

元组类型允许表示一个`已知元素数量和类型的数组，各元素的类型不必相同，但是顺序和个数不能变`。

```ts
let x: [string, number]

x = ['hello', 10]  // 正确

x = [10, 'hello']  // 错误
```

### 枚举 enum
枚举 enum 类型是对 JavaScript 标准数据类型的一个补充。

```ts
enum Color {
    Red,
    Green,
    Blue
}
// 返回的是下标， 
let c1: Color = Color.Red // c1: 0

let c2: Color = Color.Green // C2: 1

// 通过下标访问
console.log(Color[0] === 'Red') // true
```

设置枚举的值是字符串，但是设置之后，通过下标的方式就获取不到值了。

```ts
enum Direction {
    LEFT = 'left',
    RIGHT = 'right'
}
console.log(Direction.LEFT) // left
```

### any
我们`不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查`。那么我们可以使用 any 类型来标记这些变量。

```ts
let notSure : any = 43;
notSure = 'maybe a string instead' 
```

### unknown
unknown 是 TypeScript 3.0 引入了新类型，是 any 类型对应的安全类型。<br/>
虽然它们都可以是任何类型，但是当`unknown 类型被确定是某个类型之前，它不能被进行任何操作`,比如实例化、getter、函数执行等等。

```ts
let value1: any;

value1.foo.bar;  // OK
value1();        // OK
new value1();    // OK
value1[0][1];    // OK

let value2: unknown;

value2.foo.bar;  // ERROR
value2();        // ERROR
new value2();    // ERROR
value2[0][1];    // ERROR
```

### void
void 申明变量或函数。 当一个函数没有返回值时，你可以申明类型为 void。

```ts
function sayName(): void {
    console.log('tim')
}
```

当变量申明为 void 的时候只能为它赋予 undefined。

```ts
const u: void = undefined
```

当然，当我们在tsconfig.json设置strictNullChecks: false 后 null 可以赋值给任何类型的变量。也就可以赋值给void类型的变量。

```ts
const n : void = null
```

### never

`never` 类型表示的是那些永不存在的值的类型。用得少(死循环或者抛出异常)

```ts
function whileTrueFunction() :never {
    while(true) {}
}

function throwErrorFunction() :never {
    throw new Error('自定义错误')
}
// 空数组，且永远为空
const empty: never[] = []
```

## 高级类型

### 联合类型
多个类型中选择一种

```ts
let myFavorite: string | number = 123
myFavorite = 'apple'
```

### 交叉类型

将多个类型合并为一个类型
```ts
type Flag1 = { x: number }
type Flag2 = { y: string }
type Flag3 = Flag1 & Flag2

let flag :Flag3 = {
    x: 1,
    y:'hello'
}
// 接口也支持
interface  User1 {
    name: string
}
interface User2 {
    age: number
}
type User3 = User1 &　User2

const user: User3 = {
    name:'张三',
    age: 14
}
```

### 字面量类型

在 TypeScript 中，字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。<br/>
目前，TypeScript 支持 3 种字面量类型：`字符串字面量类型、数字字面量类型、布尔字面量类型`

```ts
let flag1: "hello" = "hello";
let flag2: 1 = 1;
let flag4: true = true;

// 定义好之后就不能改变值了

// flag1 = 'randy' // error 不能将类型“"randy"”分配给类型“"hello"”。
// flag2 = 2 // error 不能将类型“2”分配给类型“1”
// flag4 = false // error 不能将类型“false”分配给类型“true”
```

字面量类型它真正的应用场景是可以`把多个字面量类型组合成一个联合类型，用来描述拥有明确成员的实用的集合`。

```ts
type Direction = 'up'|'down'|'left'| 'right' // 限制函数的参数为指定字面量类型集合
function move (dir: Direction) {

}

move('up') // ok
move('topleft') // 类型“"topleft"”的参数不能赋给类型“Direction”的参数
```


### 条件类型

条件类型够表示非统一的类型，以一个条件表达式进行类型关系检测，从而在两种类型中选择其一

```ts
T extend U ? X : Y
```
若 T 能够赋值给 U，那么类型是 X，否则为 Y，有点类似于JavaScript中的三元条件运算符。

比如我们声明一个函数 f，它的参数接收一个布尔类型，当布尔类型为 true 时返回 string 类型，否则返回 number 类型

```ts
declare function f<T extends boolean> (X:T): T extends true ? string : number

const x = f(Math.random() < 0.5)  // const x: string | number
const y = f(false)  // const y :number
const z = f(true)  // const z : string
```

