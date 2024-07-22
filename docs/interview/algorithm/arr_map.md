# 重写数组map()方法

## map
`array.map(function(item, index, arr) , ins)`
+ 参数一: 回调函数(必需)
+ 参数二: 提供给回调函数的指针(可选)

```js
let ins = { a: 1}
let array = [1, 2, 3]
array.map( function(item, index, arr) {
    console.log(item ,index, arr)
    console.log(this)
}, ins)
```

输出结果:
![](/algorithm/map_args.png)

回调函数的参数:
+ 当前遍历的数组项item
+ 当前项的下标
+ 原数组

### >> 注意
如果`map`函数的第二个参数ins不传，则回调函数的`this`为全局window对象
```js
let array = [1, 2, 3]
array.map((item, index), arr => {
    // console.log(item ,index, arr)
    console.log(this)
})
```

### >> 箭头函数

```js
let ins = { a: 1}
let array = [1, 2, 3]
array.map((item, index, arr) => {
    console.log(this)
}, ins)
```
由于箭头函数没有自己的`this指针`,所以第二个参数无效,this不会打印ins，而是全局window对象

## 返回值
```js
// 将数组每个元素放大2倍
let arr = [1, 2, 3]
let new_arr = arr.map(x => x * 2)
console.log(new_arr) // [2, 4, 6]
console.log(arr) // [1,2 3] 

// arr.map() 返回了新数组， 如果不return的话
let arr = [1, 2, 3]
let new_arr = arr.map(x => {
    console.log(x)
})
console.log(new_arr) // [undefined, undefined, undefined]
console.log(arr) // [1,2 3] 
```

## 改变原数组
### >> 重新赋值
```js
let arr = [1 ,2, 3]
arr = arr.map(x => x *2)
console.log(arr) // [2, 4, 6]
```

### >>使用回调函数的第三个参数
```js
let arr = [1, 2, 3]
arr.map((item, index, array) => {
    arr[index] = item * 2
})
console.log(arr) // [2, 4, 6]
```

## 手写map
```js
Array.prototype._map = function (callback, ins) {
    let res = []
    for (let i = 0; i < this.length; i++) {
        res[i] = callback.call(ins || window, this[i], i, this)
    }
    return res
}

Array.prototype.myMap = function (fn, context) {
    let res = []
    const _this = this // 原数组
    const ctx = context ? context : _this

    if (typeof fn !== 'function') {
        throw new Eroor(`${fn} is not a function`)
    }
    _this.forEach((item, index) => {
        res.push(fn.call(ctx, item, index, _this))
    })
    return res
}
```


