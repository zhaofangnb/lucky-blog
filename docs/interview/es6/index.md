# ES6

## let 与 const 与 var

let 声明的变量只在 let 命令所在的`代码块内有效`。不存在变量提升。

const 声明一个`只读的常量`，一旦声明，常量的值就不能改变。

var 在全局范围内有效， 且可以声明多次。会变量提升。

```js
for(var i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i)
    })
}
// 输出10个10

for(let j = 0; j < 10; j++) {
    setTtimeout(function () {
        console.log(j)
    })
}
// 0123456789
```
对于第一个for循环，setTimout定时器里面的i都是var声明的全局变量i，循环里的十个setTimout是在循环结束后才执行，此时的i都是10<br/>
第二个for循环，每次循环的j只在本轮循环中有效，javascript引擎内部会记住前一个循环的值，所以每次循环的j都是一个新变量。

### 暂时性死区

```js
if (true) {
    console.log(PI) // 不能再声明变量PI之前使用它
    const PI = 3.1415926 
}
```
代码块内如果存在let或者const，代码块会对这些命令声明的变量从块的开始就形成一个封闭作用域。

### const如何做到变量再声明初始化之后不允许改变的？

其实const保证的不是变量的值不变，而是保证变量指向的内存地址所保存的数据不允许改动。<br/>
你可以想到，简单类型和复合类型保存值的方式是不同的。对于简单类型，值就是保存在变量指向的那个内存地址，因此const声明的简单类型变量等同于常量。<br/>
而复杂类型(对象、数组、函数等),变量指向的内存地址其实是保存了一个指向实际数据的指针，所以const只能保证指针是固定的。

## 解构赋值
### 数组的解构
```js
 let [a, b, c] = [1,2,3] // a:1, b: 2, c :3
 let [a, [b], c] = [1, [[2], 3]] // a:1, b: 2, c :3
 let [a, , b] = [1, 2, 3] // a:1, b:3
 let [a = 1, b] = [] // a：1， b： undefined
 let [a, ...b] = [1, 2, 3] // a:1, b: [2, 3]
 let [a,b,c] = 'jsx' // a: 'j', b: 's', c: 'x'
 let [a = 2] = [undefined] // a:2
 let [a = 3, b = a] = [] // a: 3, b: 3
 let [a =3, b =a ] = [1] // a:1, b: 1
 let [a = 3, b = a] = [1, 2] // a: 1, b: 2
```

### 对象的解构

```js
let { foo, bar } = { foo:'a', bar: 'b'} // foo: 'a', bar: 'b'
let { name: nick } = { name: '张三'}  // nick: '张三'

let obj = {
     arr: [
        'hello',
        y: 'world'
     ]
}
let { arr: [x, { y }]} = obj // x: hello, y: world


let obj = { p: [ { y : 'world'} ]}
let { p: [ { y }, x ]} = obj // x: undefined, y :'world'


let { a, b, ...rest } = {a :10, b: 20, c: 30, d: 40}
// a:10, b:20，rest:{ c: 30, d: 40 }

let { a= 10, b = 5 } = { a:3 } // a: 3, b :5
let { a:aa = 10, b :bb = 5 } = { a: 3 } // aa: 3, bb : 5
```

## 防抖函数

```js
export const debounce = (fn, delay) => {
    var timer
    return function () {
        var context = this
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        },delay)
    }
}
```

## 节流函数

```js
export const throttle = (fn, delay) => {
    var last
    var timer
    delay || (delay =250)

    return function () {
        var context = this
        var args = arguments
        vat now = +new Date()
        if (last &&　now < last + delay)  {
            // 冷却时间未到，延时执行
            clearTimeout(timer)
            timer = setTimeout(() => {
                last = now
                fn.apply(context, args)
            }, delay)
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}
```

## 9个非常实用的新特性

### at
想要获取数组的第N个元素时，通常使用`[]`来获取。
```js
const arr = ['red', 'green', 'blue', 'black', 'white']
console.log(arr[0], arr[1]) // red green

const len = arr.length
console.log(arr[len - 1]) // white
console.log(arr[len - 2]) // black
```
可以使用更优雅的数组的`at()`方法:

```js
const arr = ['red', 'green', 'blue', 'black', 'white']
console.log(arr.at(0)) // red
console.log(arr.at(-1)) // white
console.log(arr.at(-2)) // black
```

### Object.hasOwn

通常有两种方法，有什么区别呢？
- 对象中的"名称"
- obj.hasOwnProperty('名称')

**in 运算符**
如果指定属性在`指定对象`或`其原型链`中，则in运算符返回true

```js
const Person = function (age) {
    this.age = age
}
Person.prototype.name ="张三"

const p1 = new Person(24)
console.log('age' in p1) // true
console.log('name' in p1) //true 
```
**obj.hasOwnProperty**
hasOwnProperty()方法返回一个布尔值，指示对象是否具有指定的属性作为`其自身的属性`(而不是继承它)

```js
const Person = function (age) {
    this.age = age
}
Person.prototype.name = '张三'

const p1 = new Person(24)
console.log(p1.hasOwnProperty('age')) // true
console.log(p1.hasOwnProperty('name')) // false
```

也许“obj.hasOwnProperty”已经可以过滤掉原型链上的属性，但在某些情况下并不安全，会导致程序失败。

```js
Object.create(null).hasOwnProperty('name')
// Uncaught TypeError: Object.create(...).hasOwnProperty is not a function
```

**Object.hasOwn**

我们可以使用“Object.hasOwn”来规避这两个问题，比“obj.hasOwnProperty”方法更方便也更安全。

```js
let object = { age:24 }
Object.hasOwn(object, 'age') // true

let object2 = Object.create({ age: 24 })
Object.hasOwn(object2, 'age') // false 

let object3 = Object.create(null)
Object.hasOwn(object3, 'age') // false
```

### 在模块的顶层使用await

await操作符用于等待一个Promise并获取它的fulfillment值。

```js
const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        setTimeOUT(() => {
            resolve({
                name: '张三'
            })
        },2000)
    })
}

// 如果想使用await，必须使用async
const fetch = async () => {
    const userInfo = await getUserInfo()
    console.log('userInfo', userInfo)
}
fetch()

// 直接使用会报错 SyntaxError: await is only valid in async functions
const userInfo = await getUserInfo()
console.log('userInfo', userInfo)
```

在ES13之后，可以在模块的顶层使用await.
```js
const getUseInfo = () => {
    return new Promise((resolve,reject) => {
        setTimeOUT(() => {
            resolve({
                name: '张三'
            })
        },2000)
    })
}
const userInfo = await getUseInfo()
console.log('userInfo', userInfo)
```


### 使用#声明私有属性
以前使用`_`来表示私有属性，但是不安全，仍有可能被外部修改
```js
class Person {
    constructor(name) {
        this._money = 1
        this.name = nme
    }
    get money() {
        return this._money
    }
    set money(money) {
        this._money = money
    }
    showMoney() {
        console.log(this._money)
    }
}

const p1 = new Person('张三')

console.log(p1.money) // 1
console.log(p1._money) // 1

p1._money = 2 //从外部修改私有属性 _money

console.log(p1.money) // 2
console.log(p1._money) // 2
```

使用`#`来实现真正安全的私有属性
```js
class Person {
    #money = 1
    constructor(name) {
        this.name = name
    }
    get money () {
        return this.#money
    }
    set money(money) {
        this.#money = money
    }
    showMoney () {
        console.log(this.#money)
    }
}
const p1 = new Person('张三')
console.log(p1.money) // 1
// p1.#money = 2  // 不能修改#money
p1.money = 2
console.log(p1.money) // 2
```

### 更容易为类设置成员变量
除了通过`#`为类设置私有属性外，我们还可以通过一种新的方式设置类的成员变量。
```js
class Person {
    constructor () {
        this.age = 1000
        this.name = '张三'
    }
    showInfo (key) {
        console.log(this[key])
    }
}
const p1 = new Person()
p1.showInfo('name') // 张三
p1.showInfo('age') // 1000
```

可以使用下面更为方便的方式:
```js
class Person {
    age = 1000
    name = '张三'

    showInfo (key) {
        console.log(this[key])
    }
}
const p1 = new Person()
p1.showInfo('age') // 1000
p1.showInfo('name') // 张三
```

### 从数组末尾查找元素
当我们向从数组中找到满足一定条件的元素时，`find`和`findIndex`都是不错的选择。
```js
const arr = Array(10000).fill(1)
arr.push(2)
const d1 = Date.now()
const e1 = arr.find((el) => el >= 2)
const d2 = Date.now()
console.log({ el, time: d2 - d1})  // {el: 2, time: 84}
```
查找到2的时间用了84ms。

从ES13开始，如果之前指定目标元素更靠近尾部，使用`findLast`将大大减少其查找时间.
```js
const arr = Array(10000).fill(1)
arr.push(2)
const d1 = Date.now()
const e1 = arr.findLast((el) => el >= 2)
const d2 = Date.now()
console.log({ el, time: d2 - d1})  // {el: 2, time: 0}
```

### Array.of()

```js
const arr1 = Array.of(3) // [3]
const arr2 = Array.of()  // []
const arr3 = Array.of(undefined) // [undefined]
const arr4 = Array.of(1,2,3) // [1,2,3]
```

### Array.from()
可以通过`Array.from()`方法将类数组对象、arguments对象 和 NodeList对象 转换为真正的数组

1.类数组对象
```js
const arr = {
    0: "apple",
    1:"banana",
    length: 2
}
const arr1 = [].slice.call(arr) // ['apple','banana']
// A more convenient way
const arr2 = Array.from(arr)  // ['apple','banana']
```

2.节点列表
```js
const domsNodeList = document.querySelectorAll('div')
const domsArray = Array.from(domsNodeList) // [dom, dom , dom, ...]
```

3.Arguments
```js
const logInfo = function () {
    console.log('arguments', arguments)
    console.log('Array.from arguments', Array.from(arguments))
}
logInfo('张三', 100)
```

4.Array.from的第二个参数

我们可以像`[].map`一样使用Array.from()方法
```js
const arr = [1,2,3]
const arr2 = arr.map((num) => num * 2) // [2,4,6]
const arr3 = Array.from(arr, (num) => num * 2)  // [2,4,6]
```

### findindex
`findIndex()`方法返回数组中满足提供的测试函数的第一个元素的索引，否则返回-1
```js

const array = [ -1, 0, 10, 10,  20, 100 ]
const index1 = array.findIndex((num) => num < 0) // 0
const index2 = array.findIndex((num) => num >= 10) // 2
```

## Object.assign()
该方法可以将多个源对象属性复制到一个目标对象中
```js
const abj1 = {
    a:123,
    b:234
}
const obj2 = {
    a:456,
    c:789
}
const result = Object.assign(obj1, obj2)
console.log(result)  // { a:456, b: 234, c: 789}
console.log(result === obj1) // true
```
第一个参数为目标对象，该方法返回值为目标对象。
复制对象防止外部操作更改对象内容的时候可以复制空对象:`Object.assign({}, obj1, ...)`

## some() 
检测数组元素中是否有元素符合指定条件，如果有一个元素满足条件，则表达式返回true, 剩余的元素不会再执行检测。
```js
var ages = [12, 18, 20, 35, 100]
const adult =  ages.some((age) => {
    return age >= 18
})// true
```

## every()
检测数组每个元素是否都符合条件，只要有一个不符合就返回false。
```js
var ages = [12, 18, 20, 35, 100]
const adult =  ages.every((age) => {
    return age >= 18
})// false
```

## filter()
检测数值元素，并返回符合条件所有元素的数组(过滤)。
```js
var ages = [12, 18, 20, 35, 100]
const adult =  ages.filter((age) => {
    return age >= 18
})// [18,20,35,100]
```
## map()
通过指定函数处理数组的每个元素，并返回处理后的数组(映射)。
```js
var ages = [12, 18, 20, 35, 100]
const adult =  ages.map((age) => {
    return age >= 18
})// [18,20,35,100]
```
## 数组的keys() 、values()、entries()
```js
let arr = ['a', 'b', 'c']
for(let index of arr.keys()) {
    console.log(index) // 0 1 2
}
for(let item of arr.values()){
    console.log(item) // 'a', 'b', 'c'
}
for(let [index, item] of arr.entries()) {
    console.log(index, item)  // 0 'a'  1 'b' 2 'c'
}
```
## concat()
连接两个或多个数组。
```js
const arr1 = [1, 2, 3]
const arr2 = [1, 'a', true]
const newArr = arr1.concat(arr2) // [1,2,3,1,'a', true]
```

##  splice()
```js
var a = [1, 2, 3, 4, 5]
var b = [6, 7, 8, 9]
a.splice(5, 0, ...b) //  [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
## 展开运算符
```js
var a = [1, 2, 3, 4, 5]
var b = [6, 7, 8, 9]
a = [...a, ...b] //  [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## join()
把数组的所有元素放入一个字符串,元素通过指定分隔符进行分隔。
```js
const  arr = ['a','b','c']
arr.join('-') // a-b-c
```
## toString()
把数组转换为字符串，以逗号分隔，并返回结果。
```js
const  arr = ['a','b','c']
arr.toString() // a,b,c
```

## reverse()
反转数组的元素顺序。
```js
const  arr = ['a','b','c']
arr.reverse() // c,b,a
```
## sort()
对数组的元素进行排序。
```js
const arr = ['b', 'a', 'c']
arr.sort(); // a,b,c 默认按照字母顺序排序
const arr2 = [5, 13, 20, 1, 9]
arr2.sort((a,b) => a-b) // 升序 1,5,9,13,20
arr2.sort((a,b) => b-a) // 降序 20,13,9,5,1
```

## reduce()
将数组元素计算为一个值（从左到右）累加。
```js
let total = 0
const arr = [1,2,3,4]
arr.reduce(function(preV, curV, curIndex, arr) {
    return preV + curV
}, total)// 10
```

## flat()
flat() 方法方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
```js
const arr1 = [1,2,[3,4]];
arr1.flat() // [1,2,3,4]
const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat() // [1,2,3,4,[5,6]]
arr2.flat(2) // [1,2,3,4,5,6]

```

## copyWithin()
从数组的指定位置拷贝元素到数组的另一个指定位置中,如果省略起始结束，则默认从第一个元素开始复制。
```js
// 复制数组的前面两个元素到后面两个元素上：
const arr = ['apple', 'orange','mango', 'banana']
arr.copyWithin(2) // ['apple', 'orange','apple', 'orange']

//复制数组的前面两个元素到第三和第四个位置上：
const arr = ['apple', 'orange','mango', 'banana', '']
arr.copyWithin(2, 0) // ['apple', 'orange']
```

## toString()
返回一个表示 String 对象的值。
```js
const str = 'zhangsan'
const res = str.toString() // zhangsan
```
## valueOf()
用于返回指定对象的原始值，若对象没有原始值，则将返回对象本身。通常由JavaScript内部调用，而不是在代码中显式调用。
```js
var str = 'https://www.baidu.com'
console.log(str.valueOf() === str) // true
```

## charAt()
返回在指定位置的字符。
```js
const str = 'hello'
console.log(str.charAt(1)) // e
```
## charCodeAt()
返回在指定的位置的字符的 Unicode 编码(Unicode值)。
```js
const str = 'hello',
console.log(str.charCodeAt(0)) // 104
```
## indexOf()
返回某个指定的字符串值在字符串中首次出现的位置。
```js
const str = 'hello, elon'
console.log(str.indexOf(e)) // 1
```
## lastIndexOf()
返回某个子字符串在字符串中最后出现的位置。
```js
const str = '你好JavaScript'
console.log(str.lastIndexOf('a')) // 5
console.log(str.lastIndexOf('a', 6)) // 5 从下标为6的位置向前查找a最后出现的位置
console.log(str.lastIndexOf('css')) // -1  未查找到返回-1
```

## includes()
查找字符串中是否包含指定的子字符串。
```js
const str = 'hello mike'
console.log(str.includes('mike')) // true
console.log(str.includes('o', 6)) // false  从下标为6的位置开始查找 
```

## startsWith()
查看字符串是否以指定的子字符串开头。
```js
const str = 'hello mike'
console.log(str.startsWith('hello')) // true
console.log(str.startsWith('hello', 6)) // false 从下标为6的位置开始查找 
```
## endsWith()
判断字符串是否以指定的子字符串结尾（区分大小写）
```js
const str = 'Hello World'
console.log(str.endsWith('World')) // true
console.log(str.endsWith('world')) // false
```
## split()
把字符串分割为字符串数组。
```js
const str = 'hello world'
console.log(str.split(' ')) // ['hello', 'world']
console.log(str.split('')) // ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
```

## slice()
提取字符串的某个部分，并以新字符串返回
```js
const str = 'hello'
console.log(str.slice(1,4)) // ello
console.log(str.slice(-2)) // lo  截取倒数第二个到最后一个元素
console.log(str.slice(-4,-2)) // el  截取倒数第四个到倒数第二个元素
```

## substr()
从`起始索引号`提取字符串中`指定数目`的字符。
```js
const str = 'hello mike'
console.log(str.substr(2,3)) // llo 
console.log(str.substr(-3)) // ike
console.log(str.substr(-3,3)) // ike
```

## substring()
提取字符串中介于两个指定下标之间的字符。(包括开始，不包括结束)
```js
const str = 'hello world'
console.log(str.substring(3)) // lo world
console.log(str.substring(3,7)) // lo w
```
## toLowerCase()
转小写。
## toUpperCase()
转大写。

## trim()
trim() 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。
trim() 方法不会改变原始字符串。
```js
const str = '    hello     '
console.log(str.trim()) // hello
```
## trimStart()
删除字符串开头的空格
```js
const str = '    hello     world'
console.log(str.trimStart()) // hello      world
```
## trimEnd()
删除字符串末尾的空格
```js
const str = '    hello     '
console.log(str.trimEnd()) //    hello
```

## replace()
在字符串中查找匹配的子串，并替换与正则表达式匹配的子串。
```js
const str = 'hello zhangsan'
console.log(str.replace('zhangsan', 'lisi')) // 'hello lisi'
// 全局替换
const str1 = 'zhangsan has a blue house and a blue car'
console.log(str.replace(/blue/g, 'red')) // zhangsan has a red house and a red car
```

## match()
查找找到一个或多个正则表达式的匹配。
```js
const str = 'zhangsan has a Blue house and a blue car'
console.log(str.match(/Blu/g)) // Blu
const str1 = 'zhangsan has a Blue house and a blue car'
console.log(str.match(/Blu/gi)) // Blu,blu
```

## search()
查找与正则表达式相匹配的值。
```js
let str = 'zhangsan has a blue house and a blue car'
console.log(str.search('blue')) // 15
console.log(str.search(/blue/g)) // 15
```

## padStart()
补全字符串头部。
```js
const str = '2'
console.log(str.padStart(2,'x')) // x2
```

## padEnd()
补全字符串尾部。
```js
const str = '2'
console.log(str.padEnd(3, 'x')) // 2xx
```

## concat()
连接两个或多个字符串。
```js
const str1 = 'hello '
const str2 = 'world'
console.log(str1.concat(str2)) // hello world
```

## repeat()
字符串复制指定次数。
```js
const str = 'hello'
console.log(str.repeat(2)) // hellohello
```

## 字符串转数字 parseInt() parseFloat()
只有对String类型调用才不会返回NaN。
```js
parseInt("12bl34ue"); // 12
parseInt("blue"); // NaN
parseInt("24.5"); // 24
parseInt('0xA'); // 10
// 基模式
parseInt("10",2); // 2
parseInt("10", 8); // 8
parseInt("10",10); // 10
parseInt("AF", 16); // 175

// parseFloat()没有基模式，字符串必须已十进制形式表示浮点数
parseFloat("1234blue"); // 1234
parseFloat("blue"); // NaN
parseFloat("22.5"); //22.5
parseFloat("13.14.1"); //13.14
// ~是按位非，即按位取反 2个~~就是2次取反，粗略将就是保持原址，且强制会转换成int类型，取整
~~ "123" // 123
~~ "123.4" // 123
~~ 123  // 123
~~ 123.4 // 123

~~true // 1
~~false // 0
~~null // 0
~~undefined // 0

2**5 // 幂运算 32
Math.pow(2,5) // 32
```