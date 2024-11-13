# js数据类型

## typeof
```js
console.log(typeof undefined); // "undefined"
console.log(typeof true); // "boolean"
console.log(typeof 123); // "number"
console.log(typeof "Hello"); // "string"
console.log(typeof BigInt(10)); // "bigint"（需要支持BigInt的环境）
console.log(typeof Symbol("foo")); // "symbol"（需要支持Symbol的环境）
console.log(typeof {}); // "object"
console.log(typeof null); // "object"（历史遗留问题）
console.log(typeof function() {}); // "function"
```

## instanceof 
+ instanceof 会不断向上遍历对象的原型链，直到找到指定的构造函数或达到原型链的末端。如果找到匹配的构造函数，它返回 true，否则返回 false。
+ `instanceof不能用于检测原始数据类型(如: null、undefined、number、string、boolean等),它只能用于对象`


```js
function Ctor() {}
const obj = new Ctor();
 
console.log(obj instanceof Ctor); // 输出: true
console.log(obj instanceof Object); // 输出: true, 因为Ctor.prototype继承自Object.prototype

function instanceofOperator(L, R) {
    var O = R.prototype;
    L = L.__proto__;
    while (true) {
        if (L === null)
            return false;
        if (O === L)
            return true;
        L = L.__proto__;
    }
}
// instanceof 接受两个参数：要检查的对象和要检查的构造函数（或类）。
function instanceOfNew (obj, constructor) {
    // 边界判断
    if (typeof obj !== 'object' || obj === null) return false;

    // 返回指定对象的原型
    let proto = Object.getPrototypeOf(obj);
    while (proto) {
        // 判断的结束条件: 构造函数的prototype属性是否存在于对象的原型链上
        if (proto === constructor.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}
```

## Object.prototype.toString.call(obj);
+ 可更精确地判断数据类型，这种方法可以区分出 `null` 和`数组`等复杂类型

```js
let num = 10;
let str = "Hello";
let obj = {};
let bool = true;
let undef;
let nul = null;
let arr = [];
let date = new Date();
let error = new Error();
let func = function(){};
let reg = /a/g;

console.log(Object.prototype.toString.call(num)); // "[object Number]"
console.log(Object.prototype.toString.call(str)); // "[object String]"
console.log(Object.prototype.toString.call(obj)); // "[object Object]"
console.log(Object.prototype.toString.call(bool)); // "[object Boolean]"
console.log(Object.prototype.toString.call(undef)); // "[object Undefined]"
console.log(Object.prototype.toString.call(nul)); // "[object Null]"
console.log(Object.prototype.toString.call(arr)); // "[object Array]"
console.log(Object.prototype.toString.call(date)); // "[object Date]"
console.log(Object.prototype.toString.call(error)); // "[object Error]"
console.log(Object.prototype.toString.call(func)); // "[object Function]"
console.log(Object.prototype.toString.call(reg)); // "[object RegExp]"
```
