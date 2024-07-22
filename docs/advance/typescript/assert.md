# 断言

## 类型推断 

TypeScript 会根据上下文自动帮我们推断出变量或方法的类型，而不需要我们显式去定义
```ts
let str = 'this is string'
let num = 123
let bool = true

// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查
let flag; //推断为any
let count = 123; //为number类型
let hello = "hello"; //为string类型

// 根据参数的类型，推断出返回值的类型也是 number
function add(a: number, b: number) { 
    return a + b; 
}
```


## 类型断言

有些情况下 TS 并不能正确或者准确得推断类型，这个时候可能产生不必要的警告或者报错。
```ts
const person = {}

person.name = '张三' // error, 'name'属性不存在于{}
person.age = 24 // error, 'age'属性不存在于{}
```
由于类型推断，这个时候 person 的类型就是 {}，根本不存在后添加的那些属性，虽然这个写法在js中完全没问题，但是开发者知道这个 person 实际是有属性的，只是一开始没有声明而已，但是 typescript 不知道啊，所以就需要类型断言了:
```ts
interface Person {
    name: string;
    age: number;
}
const person  = {} as Person
person.name = '张三'
person.age = 24
```
类型断言不要滥用,在万不得已的情况下使用要谨慎,因为你强制把某类型断言会造成 TypeScript 丧失代码提示的能力。

上面使用的`as`语法，其实我们还可以使用`<>`

```ts
// as语法
let someValue: any = "this is a string"
let strLength : number = (someValue as string).length

// <>语法
let someValue:any = "this is a string"
let strLength : number = (<string>someValue).length
```
as和<>都可以用来类型推断，但是尖括号格式会与 react 中 JSX 产生语法冲突，因此我们更推荐使用 as 语法。

## 双重断言
虽然类型断言是有强制性的,但并不是万能的,因为一些情况下也会失效:
```ts
interface Person {
  name: string;
  age: number;
}

const person = 'randy' as Person; // Error
```
很显然不能把 string 强制断言为一个接口 Person

```ts
interface Person {
  name: string;
  age: number;
}

const person = 'randy' as any as Person; // ok
```

## 非空断言
非空断言用`!`表示，它用来`断定某变量一定不是 null 和 undefined`。

```ts
let flag: null | undefined | string;
flag!.toString(); // ok
flag.toString(); // error
```

## 确定赋值断言

允许在`实例属性`和`变量声明`后面放置一个 `!` 号，从而告诉 TypeScript 该属性会被明确地赋值。
```ts
let x: number;
initialize();

console.log( 2 * x); // error, 变量x在赋值之前被使用了

function initialize () {
    x = 10;
}
```

```ts
let x!: number;
initialize();

console.log( 2 * x);

function initialize () {
    x = 10;
}
```
通过`let x!: number;` 确定赋值断言，TypeScript 编译器就会知道该属性会被明确地赋值。
## 类型守卫
`缩小类型的范围`，常用的有`typeof、instanceof、in`

### tyoeof 
通过typeof精细化数据类型进行操作，避免了不必要的错误。
```ts
function double (input: string | number | boolean) {
    if (typeof input === "string") {
    return input + input;
  } else {
    if (typeof input === "number") {
      return input * 2;
    } else {
      return !input;
    }
  }
}
```

### instanceof
`instanceof 类型保护`是通过构造函数来细化类型的一种方式.

```ts
class Person {
    name: '张三',
    age: 24
}
class Animal {
    name : 'dog',
    color: 'brown'
}
function getSomething (arg: Person | Animal) {
    // 不使用类型守卫，不管使用啥属性都报错
    console.log(arg.age) // error
    console.log(arg.color) //error

    // 类型细化为Person
    if (arg instanceof Person) {
        console.log(arg.color); // Error，因为arg被细化为Person，而Person上不存在 color属性
        console.log(arg.age); // ok
    }
    // 类型细化为Animal
    if (arg instanceof Animal) {
        console.log(arg.age); // Error，因为arg被细化为Animal，而Animal上不存在 age 属性
        console.log(arg.color); // ok
  }
}
```
### in

跟上面的例子类似，`x in y 表示 x 属性在 y 中存在`。
```ts
class Person {
    name: '张三',
    age: 24
}
class Animal {
    name : 'dog',
    color: 'brown'
}
function getSomething (arg: Person | Animal) {
    // 不使用类型守卫，不管使用啥属性都报错
    console.log(arg.age) // error
    console.log(arg.color) //error

   if ("age" in arg) {
        console.log(arg.age); // ok
        console.log(arg.color); // Error
   }
   if ("color" in arg) {
        console.log(arg.color); // ok
        console.log(arg.age); // Error
   }
}
```
## 类型别名
可以作用于`原始值、联合类型、元组、以及其他你需要手写的类型`
```ts
type some = boolean | string
const b :some = true //ok
const c :some = 'hello' // ok
const d : some = 123 // 不能将类型123分配给some
```

```ts
type newstring = string
const str : newstring = '张三'
```

类型别名可以是泛型
```ts
type Container<T> = { value : T }
```

也可以使用类型别名来在属性里引用自己：
```ts
type Tree<T> {
    value: T;
    left: Tree<T>;
    right: Tree<T>
}
```
```ts
const num: number = 10
(num as unknown as string).split('')
// 静态编译的时候，unknown不能调用任何方法，而any可以
const foo: unknown = 'string'
foo.substr(1) // Error：静态类型检查不通过
const bar : any = 10
bar.substr(1)

// unknown的一个使用场景是，避免使用any作为函数的参数类型而导致的静态类型检查bug
function test(input: unknown): number {
  if (Array.isArray(input)) {
    return input.length // Pass: 这个代码块中，类型守卫已经将input识别为array类型
  }
  return input.length    // Error: 这里的input还是unknown类型，静态检查报错。如果入参是any，则会放弃检查直接成功，带来报错风险
}

// 在不确定函数参数的类型时，将函数的参数声明为unknown类型而非any，TS同样会对于unknown进行类型检测，而any就不会
function resultValueByName(val: unknown) {
  if (typeof val === 'string') {
    // 此时val是string类型
  } else if (typeof val === 'number') {
    // 此时val是number类型
  }
}
```