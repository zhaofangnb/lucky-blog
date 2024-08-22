# ArkTs高性能编程实践

## 使用const声明不变的变量

## number类型变量避免整型和浮点型混用

```js
let intNum = 1;
intNum = 1.1;  // 该变量在声明时为整型数据，建议后续不要赋值浮点型数据

let doubleNum = 1.1;
doubleNum = 1;  // 该变量在声明时为浮点型数据，建议后续不要赋值整型数据
```

## 循环中常量提取，减少属性访问次数

```js
getList().then(res => {
    const data = res.data;
    const list = data; // 使用常量data而不是res.data;
})
```

## 建议使用参数传递函数外的变量
```js
let arr = [1, 2, 3];

function getTotal () {
    return arr[0] + arr[1];
}

getTotal();
```
使用闭包会造成额外的闭包创建和访问开销。在性能敏感场景中，建议使用`参数传递函数外的变量`来替代使用闭包。

```js
let arr = [1, 2, 3];

function getTotal (arr) {
    return arr[0] + arr[1]; 
}

getTotal(arr);
```

## 避免使用可选参数
```js
// 函数的可选参数表示参数可能为undefined，在函数内部使用该参数时，需要进行非空值的判断，造成额外的开销。
function getTotal (left?: number, right?:number) {
    if (left !== undefined && right !== undefined) {
        return left + right
    }
    return undefined;
} 
// 可使用默认参数
function getTotal(left:number = 0, right:number = 0) {
    return left + right
}
```

## 数值数组推荐使用TypedArray
```js
const arr1 = new Array<number>([1, 2, 3]);
const arr2 = new Array<number>([4, 5, 6]);
let res = new Array<number>(3);
for (let i = 0; i < 3; i++) {
  res[i] = arr1[i] + arr2[i];
}

// 优化：
const typedArray1 = new Int8Array([1, 2, 3]);
const typedArray2 = new Int8Array([4, 5, 6]);
let res = new Int8Array(3); // 声明数组长度为2
for (let i = 0; i < 3; i++) {
  res[i] = typedArray1[i] + typedArray2[i];
}
// res: [5,7,9]
```

## 避免使用稀疏数组

## 避免使用联合类型数组

## 避免频繁抛出异常
```js
// 优化前
function div(a: number, b: number): number {
  if (a <= 0 || b <= 0) {
    throw new Error('Invalid numbers.')
  }
  return a / b
}

function sum(num: number): number {
  let sum = 0
  try {
    for (let t = 1; t < 100; t++) {
      sum += div(t, num)
    }
  } catch (e) {
    console.log(e.message)
  }
  return sum
}

// 优化后
function div(a: number, b: number): number {
  if (a <= 0 || b <= 0) {
    return NaN
  }
  return a / b
}

function sum(num: number): number {
  let sum = 0
  for (let t = 1; t < 100; t++) {
    if (t <= 0 || num <= 0) {
      console.log('Invalid numbers.')
    }
    sum += div(t, num)
  }
  return sum
}
```