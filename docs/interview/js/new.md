# 
## new()操作符实现原理
>主要作用就是执行一个构造函数、返回一个实例对象，在 new 的过程中，根据 构造函数 的情况，来确定是否可以接受参数的传递。

```js
function Person(name, age) {
    this.name = name;
    this.age = age;

    this.say = function () {
         console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
    }
}

const p = new Person('Jack', 20);
p.say(); // Hello, my name is Jack and I'm 20 years old.
```


```js
function myNew(func, ...args) {
    // 创建一个空对象
    const obj = {};
    // 将构造函数的prototype属性赋值给新对象的__proto__属性，从而建立起原型链
    obj.__proto__ = func.prototype;
    // 绑定this并执行构造函数
    const result = func.apply(obj, args);
    // 如果构造函数返回一个对象，则使用该对象作为结果；否则，返回新创建的对象实例
    return (typeof result === 'object') ? result : obj;
}
```

```js
function new2(fn,...args){
  // 创建一个新对象obj,该对象的原型被设置为构造函数的prototype属性
  let obj = Object.create(fn.prototype);
  let ret = fn.bind(obj)(...args);
  return typeof ret === 'object' ? ret : obj;
}
```

## call、apply、bind的区别
>call、apply、bind都是Function.prototype上的方法，作用是改变this的指向。

+ 执行方式
+ 参数传递
+ 返回值
+ 使用场景

```js
Function.prototype.myCall = function(context) {
  var context = context || window;
  context.fn = this;
  // 接收参数
  var args = [...arguments].slice(1);
  // 立即执行函数
  var result = context.fn(...args);
  delete context.fn;
  return result;
}
```

```js
Function.prototype.myApply = function(context) {
  var context = context || window;
  context.fn = this;
  // 接收参数
  var result;
  if(arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}
```

```js
Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
      throw new TypeError( 'Error')
  }
  var _this = this;
  var args = [...arguments].slice(1);
  // 返回⼀个函数
  return function F() {
    // 因为返回了⼀个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
        return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments));
  }
}
```

## == 和 === 的区别
1. `== (等于)` 比较之前会进行`类型转换`。如果两个值的类型不同，JavaScript会尝试将它们转换为相同的类型，然后再进行比较。

```js
// 两个都为简单类型，字符串和布尔值都会转化成数值，再比较；
// 简单类型与引用类型比较，对象转化成原始类型的值，再比较；
// 两个都为引用类型，则比较它们是否指向同一个对象；
// null和undefined相等；
// 存在NaN，则返回false。
console.log(NaN == 0); // false，因为NaN不等于任何值(包括它自己
console.log(0 == "0"); // true，因为字符串"0"会被转换为数字0
console.log(null == undefined); // true，因为null和undefined在==比较下是相等的
console.log([] == []); // false，因为引用类型不同,两个数组指向不同的对象
```

2. `=== (严格等于)` 不进行类型转换，类型相等且值相等才返回true。

```js
console.log(0  === "0"); // false，因为类型不同（数字和数字字符串）
console.log(null === undefined); // false，因为类型不同（null和undefined）
console.log('a' === 'b');
```

## 箭头函数和普通函数的区别

1. 声明方式：

普通函数使用`function关键字`进行声明，可以是具名函数或匿名函数。
箭头函数则使用`箭头=>`进行声明，且总是`匿名函数`。虽然箭头函数本身没有名称，但可以通过赋值给变量的方式实现具名化。

2. this指向：

`普通函数的this指向在调用时确定，通常指向调用它的对象`。如果作为构造函数使用，this将指向新创建的对象实例。此外，this的指向可以通过call、apply或bind方法进行改变。
`箭头函数的this指向在定义时就已经确定，且永远指向其定义时的上层作用域中的this`。因此，箭头函数没有自己的this对象，也不支持使用call、apply或bind方法来改变其this指向。

3. 构造函数与原型：

`普通函数可以作为构造函数使用，通过new关键字创建对象实例，并且具有prototype属性，可以定义共享的方法和属性`。
`箭头函数不能作为构造函数使用`，即不能使用new关键字来创建对象实例。同时，箭头函数也没有prototype属性。
4. arguments对象：

在普通函数内部，可以使用`arguments对象`来访问传递给函数的参数列表（类数组对象）。
箭头函数内部没有自己的arguments对象。作为替代方案，可以使用`剩余参数（...args`）来获取传递给箭头函数的参数列表（作为真正的数组）。

5. 其他特性：

箭头函数更`简洁`，尤其适用于简单函数和回调函数。
当箭头函数的函数体`只有一条语句时，可以省略大括号和return关键字`（如果语句是返回值的话）。
如果箭头函数`只有一个参数，可以省略小括号`（但在某些情况下为了清晰起见仍然推荐保留）。




