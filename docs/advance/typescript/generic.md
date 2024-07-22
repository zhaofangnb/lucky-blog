
# 泛型

泛型给予开发者创造灵活、可重用代码的能力

## 单个类型参数

我们在静态编写的时候并不确定传入的参数到底是什么类型，只有当在运行时传入参数后我们才能确定。<br/>
仅仅是类型发生了变化，难道需要再写一遍？ 难道是能用any表示？
```ts
function returnItem (param: any) :any {
    return param
}
```

```ts
function returnItem<T>(param: T) : T {
    return param
}

console.log(returnItem<string>("randy"));
console.log(returnItem<number>(1));
```
在函数名称后声明泛型变量`<T>`，它用于捕获开发者传入的参数类型,然后就可以使用`T`做参数类型和返回值类型了



## 多个类型参数

定义泛型的时候，可以一次定义多个类型参数，多个类型参数用逗号分开。
```ts
 function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
 }

 console.log(swap<number, string>([27, "randy"])); // ['randy', 27]
```

## 默认类型
```ts
type Gen1 = {
  name: string
}

async function genfun1() {
  async function fetchApi<T>(path: string): Promise<T> {
    const response = await fetch(path);
    return response.json();
  }
  
  const result = await fetchApi<Gen1>('/test')
  

  console.log(result.name) // OK
}
```

默认类型使用形式跟默认参数一样，使用`=`即可
```ts
type Gen1 = {
  name: string
}

async function genfun1() {
  async function fetchApi<T = Gen1>(path: string): Promise<T> {
    const response = await fetch(path);
    return response.json();
  }
  
  const result = await fetchApi('/test')
  

  console.log(result.name) // OK
}
```

## 泛型约束
```ts
class Stack<T> {
    private arr: T[] = []
    public push(item: T) {
        this.arr.push(item)
    }
    public pop () {
        this.arr.pop()
    }
}
```

比如显示我们约束泛型为 number 或者 string 之一，当传入 boolean 类型的时候，就会报错
```ts
type Union = string | number
class Stack<T extends Union> {
    private arr: T[] = []
    public push(item: T) {
        this.arr.push(item)
    }
    public pop () {
        this.arr.pop()
    }
}
const stack2 = new Stack<string>()
const stack3 = new Stack<number>()
const stack4 = new Stack<boolean>() // Error
```

## 泛型接口和泛型类

### 泛型接口

```ts
interface Inter<T> {
    param : T
}
const param1 : Inter<string> = { param : 123 } // error, 不能将类型number分配给类型string
const param2 : Inter<string> = { param: '张三' } // ok
```

接口定义函数
```ts
interface ReturnItemFn<T> {
    (param: T) : T
}
const returnItem: ReturnItemFn<number> = param => param // 传入number作为参数
const returnItem: ReturnItemFn<string> = param => param // 传入string作为参数
```



### 泛型类

```ts
 class Stack {
    private arr: number[] = []
    public push (item: number) {
        this.arr.push(item)
    }
    public pop () {
        this.arr.pop()
    }
 }
```

```ts
class Stack<T> {
    private arr: T[] = []
    public push(item: T) {
        this.arr.push(item)
    }
    public pop () {
        this.arr.pop()
    }
}

const stack1 = new Stack<number>()
stack1.push(1)

const stack2 = new Stack<string>()
stack2.push('randy')
```

## 索引类型
需要一个 pick 函数，这个函数可以从对象上取出指定的属性<br/>
在js中:
```js
function pick (o, names) {
    return names.map(n=> o[n])
}
const user = {
  username: 'randy',
  id: 2300002033333333,
  token: '230000201922222',
  avatar: 'http://randy.jpg',
  role: 'admin'
}
const res = pick(user, ['id'])
console.log(res) // [ '4600002033333333' ]
```
在ts中：
这个对象的 key 都是 string 而对应的值可能是任意类型
```ts
interface obj { 
    [key: string] : any
}
function pick(o: obj, names: string[]) {
    return names.map(n => o[n])
}
```
还是会发现我们的类型定义不够严谨：<br/>
1. 参数 names 的成员应该是参数 o 的属性，因此不应该是 string 这种宽泛的定义，应该更加准确<br/>
2. 我们 pick 函数的返回值类型为 any[]，其实可以更加精准，pick 的返回值类型应该是所取的属性值类型的联合类型<br/>

### 索引类型查询操作符
索引类型查询操作符使用`keyof关键字`。我们可以用 keyof `作用于泛型 T 上来获取泛型 T 上的所有 public 属性名构成联合类型`。
```ts
class User {
    public name: string;
    public age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age
    }
}

// 对象键属性
type objKeys = keyof User; // name | age
```
### 索引访问操作符

访问类型的操作符也是通过 [] 来访问的，即 T[K]。

```ts
class User {
    public name: string;
    public age :number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age
    }
}
// 对象键属性
type objKeys = keyof User; // name | age
// 对象值类型
type objValues = User[objKeys] // string | number
```

```ts
function pick<T, K extends keyof T>(o: T, names : K[]): T[K][] {
    return names.map(n => o[n])
}
const res = pick(user, ['token', 'id', ])
```
它不仅拥有更严谨的类型约束能力，也提供了更强大的代码提示能力
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8da4939c071f4cd2bafe5fcc3952a23e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## 映射类型

现有一个User接口，需要将其中所有成员全部变成可选的,除了每个`:` 前加上`?` 还有更便捷的方法吗？
```ts
interface User {
    username: string
    id: number
    token: string
    avatar: string
    role: string
}
```

映射类型的语法是`[K in Keys]:`

1. `K：类型变量，依次绑定到每个属性上，对应每个属性名的类型`
2. `Keys：字符串字面量构成的联合类型，表示一组属性名（的类型）`

```ts
type partial<T> = { [ K in keyof T] ?: T[K]}
type partialUser = partial<User>
```
`keyof T`即传入类型T的属性名的联合 然后将`keyof T`的属性名称一一映射出来`[K in keyof T]`, `T[k]`取出相应的属性值<br/>
果然所有的属性都变成了可选类型：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aba0e5e12a5e4fe99b736a0ad9067b74~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
