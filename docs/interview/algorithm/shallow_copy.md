# 浅拷贝

> 浅拷贝指只对对象或数组的第一层进行赋值，其他层级复制的是所存储的内存地址。修改原有的会引起新的发生变化。

```js
let arr = [1, 2, [3, 4]]
let arr1 = [...arr]
console.log(arr === arr1)  // false

arr[0] = 0
console.log(arr1) // [1,2, [3, 4]]
arr[2][1] = 5
console.log(arr1) // [1,2, [3, 5]]
```

+ 通过上例可以看出浅拷贝虽然复制了一个新的数组，当原始对象的属性是`基本数据类型`时，浅拷贝对`属性值`进行拷贝。 但是当数组的元素为`引用数据类型`时，只复制了`地址(引用)`，通过原数组改动这个地址指向的数组，新数组同样会发生变化

## 实现浅拷贝的方法

### ...拓展符
```js
const hero = {
 name:'libai',
 age:27
}

const { ...heroCpy } = hero
console.log(heroCpy)  // { name:'libai',age:27 }
console.log(hero === heroCpy) // false

const heroEnhancedClone = {
    ...hero,
    name: '李白',
    real: '刺客'
}
console.log(heroEnhancedClone) // { name:'李白', age: 27, real: '刺客'}
console.log(hero === heroEnhancedClone) // false
```

### Object.assign()

```js
const hero = {
 name:'libai',
 age:27,
 hobbies:['coding', 'cooking']
}

const heroNew = Object.assign({}, hero) // 将hero对象的属性复制到目标对象空对象中
console.log(heroNew) // { name:'libai',age:27,hobbies:['coding', 'cooking'] }
```

+ `Object.assign()` 方法只会复制对象的第一层数据结构，如果对象中包含引用类型的属性，则新对象与原对象将共享这些引用类型的属性。

### 数组的浅拷贝
```js
const arr = [1, 2, 3]
const copyArr =  arr.slice()
console.log(copyArr) // [1, 2, 3]
console.log(arr === copyArr)  // false
```

+ Array.slice() 方法返回一个从开始索引到结束索引（不包括结束索引）的新数组。如果不传入任何参数，将返回一个原数组的浅拷贝。

```js
const arr = [1, 2, 3]
const copyArr = Array.from(arr)
console.log(copyArr )  // [1, 2, 3]
console.log(arr === copyArr)  // false
```

```js
const arr = [1, 2, 3];
const copyArr = [].concat(arr);
console.log(copyArr); // [1, 2, 3]
console.log(arr === copyArr)  // false
```
+ Array.concat() 方法用于将一个或多个数组与原数组合并，并返回新的数组。如果不传入任何参数，将返回一个原数组的浅拷贝。