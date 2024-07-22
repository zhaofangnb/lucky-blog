# 函数function

## 函数定义


### 直接定义

```ts
function fun1(num1: number, num2:number): number {
    return num1 + num2
}
const fun2(num1: number, str1: string): string {
    return num1 + str1
}

function fun3(): void {
    console.log('fun3')
}

// 函数类型
type FnType = (x: number, y :number) => number

function fn() :number {
  return 1
}

const fn = function (): number{
  return 1
}

const fn = (): number => {
  return 1
}

const obj = {
  fn(): number {
    return 1
  }
}
```

### 通过表达式定义
```ts
const fun4: (num1: number, str1: string) => string = (num1: number, str1: string) => {
  return num1 + str1;
}
```

### 通过类型别名定义

```ts
type FucType = (num1: number, str1: string) => string

const fun5 : FucType = (num1: number, str1: string) => {
    return num1 + str1 
}
```

## 函数参数


### 可选参数

`可选参数必须放在必选参数后面`
```ts
type Add = (x: number, y: number, z?: number) => number;

let add: Add = (arg1, arg2, arg3) => arg1 + arg2 + arg3;

add(1, 2); // success   3
add(1, 2, 3); // success   6
```

### 默认参数
```ts
const add = (x: number, y = 2) => {
  return x + y;
};
add(1, "ts"); // error 类型"string"的参数不能赋给类型"number"的参数
```

显式给默认参数设置类型，且默认参数可以放在参数列表任何位置
```ts
const add = (x: number, y: number = 2) => {
  return x + y;
};

const add = (x: number = 2, y: number) => {
  return x + y;
};
```

### 剩余参数
```ts
const add = (a: number, ...rest: number[]) => rest.reduce(((a, b) => a + b), a)
```

## 函数重载
相同的方法名，只是方法参数列表不一样。和java的区别就是 TypeScript 只能是最后有一个方法来完整实现，而不是每个方法都有对应的实现。
```ts
interface Direction {
  top: number;
  bottom?: number;
  left?: number;
  right?: number;
}

// 参数列表可能的情况 1个参数 2个参数 4个参数，只需定义，不需要实现
function assigned(all: number): Direction;
function assigned(topAndBottom: number, leftAndRight: number): Direction;
function assigned(
  top: number,
  right: number,
  bottom: number,
  left: number
): Direction;

// 方法完整的实现
function assigned(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d,
  };
}

assigned(1);
assigned(1, 2);
assigned(1, 2, 3); // 没有定义三个参数的函数，编译阶段直接报错
assigned(1, 2, 3, 4);
```
## is关键字

```ts
function isString (test:any) :boolean {
  return typeof test === 'string'
}

function example (input: number | string) {
  if (isString (input)) {
    console.log(input.length) //会报错，类型string | number上不存在属性length
  }
}
```

第一种可以用类型守卫来解决，比如说typeof

```ts
function example (input: number | string) {
  if (isString(input) && typeof input === 'string') {
    console.log(input.length)
  }
}
```

第二种就是使用`is关键字`

```ts
function isString (test:any): test is string {
  return typeof test === 'string'
}

function example (input: number | string) {
  if (isString(input)) {
    console.log(input.length)
  }
}
```

如果`isString`方法返回true,就表示`参数test是string类型的`,所以后面直接调用.length就不会报错