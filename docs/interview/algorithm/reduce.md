# 数组reduce()的用法

## 求和
```js
const arr = [1,2,7,32,11]
let total
total = arr.reduce((prev, cur) => {
    return prev + cur
}, 0)
```

## 数组去重

上传多个文件时，如有重复文件，可根据文件名数组去重
```js
const names = fileList.map(file => file.name)

const newNames = names.reduce((pre, cur) => {
    if (!pre.includes(cur)) {
        pre.push(cur)
    }
    return pre
}, [])

 if (names.length !== newNames.length) {
      message.warning('请勿重复上传文件!')
      return
    }
```

## 数组分类
有个场景需求是需要校验表格数据中同一某字段A的所有行的另外一个字段B之和，需要`根据A字段将数组对象进行分类`

```js

let arr = [
  {name:'小明',old:'18'},
  {name:'小红',old:'18'},
  {name:'小王',old:'19'},
]

acc.reduce((a, b) => {
    if (a[b.A]) {
        a[b.A].push(b)
    } else {
         a[b.A] = [b]
    }
    return a
}, {})


// 分类：
{
    18:[
        {name: "小明", old: "18"},
        {name: "小红", old: "18"},
      ],
   19:[
        {name: "小王", old: "19"}
      ]
}
```

## 计算数组元素出现次数

```js
const arr = ['a', 'b', 'a', 'm', 'a', 'b', 't']
let countNums = arr.reduce(function(all, item) {
    // 通过键值对存储
    if (item in all) {
        all[item]++
    } else {
        all[item] = 1
    }
    return all
}, {})

console.log(countNums) // { a: 3, b: 2, m: 1, t : 1}
```

## 二维数组扁平化

```js
const arr = [[0, 1], [2, 3], [4, 5], 6]

function flat(arr) {
    return arr.reduce((pre, next) => {
        return  prev.concat(Array.isArray(next) ? flat(next) : next)
    }, [])
}

console.log(flat(arr)) // [0,1,2,3,4,5,6]
```

## 过滤和映射大数据集，性能更加

`reduce()`对比JavaScript提供的数组过滤方法`filter()`更具性能

例子： 对一个大数据数组(100万个数据)中筛选出所有的偶数项

```js
const bigData = []
for (let i =0; i< 1000000; i++) {
    bigData[i] = i
}
const filterBegin = Date.now()
const filterMappedBigData = bigData.filter((value) => value % 2 === 0)
const filterEnd = Date,now()
const filterTimeSpend = (filterEnd - filterBegin)/1000 + 's'

const reduceBegin = Date.now()
const reduceMappedBigData = bigData.reduce((acc, value) => {
    if (value % 2 === 0) {
        acc.push(value)
    }
    return acc
}, [])
const reduceEnd = Date,now()
const reduceTimeSpend = (reduceEnd - reduceBegin)/1000 + 's'


console.log("filtered Big Data:", filtertimeSpent) // 0.025 s
console.log("reduced Big Data:", reducedtimeSpent) // 0.020 s
```


***补充: 位运算判断奇偶**
```js
// for循环 的索引是i时
if (i&1) {
     // i为奇数
} else {
    // i为偶数
}
```
+ <u>因为二进制的末位为0表示偶数,末位为1表示奇数</u>
+ <u>按位与时， &运算符会将对应的两个二进位同为1时，结果对应的二进制位才为1，否则位0</u>
+ <u>位运算的优先级最低，但是运算速度却最快，使用i&1判断奇偶，要比用i % 2 == 1 来判断约快4倍,在一个要执行上万次的for循环里能明显提升判断效率</u>
