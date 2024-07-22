# 内置工具类型

`TypeScript`提供了一些工具类型来帮助常见的类型转换，这些类型是全局可调用的。

## Exclude<T, U> 从T 可分配给的类型中排除U

可以简单理解为排除一个联合类型中的某些类型。
```ts
type Exclude<T, U> = T extends U ? never : T;
```
使用:
```ts
type E1 = Exclude<string| number, string> // 排除string剩下number

let e: E1 = 10 // e就是number类型
```
当然也支持排除多个
```ts
type E2 = Exclude<string | number | boolean, string | boolean>;
```

## Extract<T, U> 从T可分配给的类型中提取U
简单理解为提取一个联合类型中的某些类型
```ts
type Extract<T, U> = T extends U ? T : never
```
使用:
```ts
type E3 = Extract<string | number, string> // 提取string
let e : E3 = "张三" // e是string类型
```
当然也支持提取多个
```ts
type E4 = Extract<string|number|boolean, string | boolean> // 提取string和boolean
```

## NonNullable 从T中排除null和undefined
简单理解为剔除一个联合类型中的null和undefined
```ts
type NonNullable<T> = T extends null | undefined ? never : T
```
使用:
```ts
type E5 = NonNullable<string | number | null | undefined>
let e1: E3 = 1
let e2: E3 = '张三'
```

## ReturnType 表示在 extends 条件语句中待推断的类型变量

主要获取函数类型的返回值类型

```ts
function getUserInfo () {
    return {
        name: '张三',
        age: 24
    }
}
type E6 = ReturnType<typeof getUserInfo> //通过ReturnType将函数getUserInfo的返回值类型赋给了E6

const userA : E6 = {
    name: 'hello',
    age: 10
}
```

## Parameters 获取函数类型的参数类型

```ts
type T0 =  Parameters<() => string> // []
type T1 = Parameters<(s:string) => void> // [string]
type T2 = Parameters<<T>(arg: T) => T> // [unknown]
```

## Partial 可以将传入的属性由必选变为可选

```ts
interface A {
    a1: string;
    a2: string;
    a3: boolean;
}
type aPartial = Partial<A>
const a: aPartial = {}  // 不会报错
```
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3a40718d3a94f51873f7ca50ef09d30~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## Required 可以将传入的属性中的可选项变为必选项
```ts
interface Person {
    name: string;
    age: number;
    gender?: "male" | "female"
}
type p = Required<Person>
const person : p = {
    name: '张三',
    age: 24,
    gender: 'female'
}
```

## Readonly 通过为传入的属性每一项都加上readonly 修饰符来实现
```ts
interface Person {
    name: string;
    age: number;
    gender?: "male" | "female"
}

type p = Readonly<Person>

const person: p = {
    name: '张三',
    age: 24
}
person.age = 23 //error
```

## Pick<T, K> 能够帮助我们从传入的属性中摘取某些返回
```ts
interface Todo {
    title: string;
    description: string;
    done: boolean;
}
type TodoBase = Pick<Todo, "title" | "done">
const todo : TodoBase = {
    title: '编码',
    done: true
}
```

## Record<K, T>构造一个类型，该类型具有一组属性K，每个属性的类型为T
```ts
type Point = "x" | "y"
type PointList = Record<Point, { value: number }>
const cars : PointList = {
    x:{ value: 10 },
    y: { value: 20 }
}
```

## Omit<K, T>基于已经声明的类型进行属性剔除获得新类型
使用：
```ts
type User = {
    id: string;
    name: string;
    email: string;
}

type UserWithoutEmail = Omit<User, "email">

const user: UserWithoutEmail = {
    id :'1',
    name: '张三'
}
```

## infer表示在extends条件语句中待推断的类型变量
假如项获取数组中的元素类型：
```ts
type Ids = number[]
type Names = string[]

type Unpacked<T> = T extends Names ? string : T extends Ids: number : T

type idType = Unpacked<Ids> // idType 类型 为number
type nameType = Unpacked<Names> // idType 类型 string

```
使用infer：
```ts
type ElementOf<T> = T extends Array<infer E> ? E : T
type Tuple = string[]
type TupleToUnion = ElementOf<Tuple>; // string
type TupleToUnion2 = ElementOf<number[]>; // number
```
如果T是某个待推断类型的数组，则返回推断的类型，否则返回T。








