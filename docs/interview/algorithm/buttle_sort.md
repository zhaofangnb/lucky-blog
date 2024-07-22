# 冒泡排序

## 基本概念
### 原理
+ 大数沉底、小数上浮（相反亦可）
+ 参加比较的两个元素是相邻的，每轮找出一个本轮最大放在最后，使得所有小数前移
+ 依此类推，每一趟比较次数减少
+ 相等的值不进行交换，因此是稳定的排序

### 使用场景
+ 数据规模较小,时间复杂度O(n^2),数据量较大时，排序的效率会降低
+ 数据基本有序，每次只需要少量的比较和交换操作
+ 

```js
function bubble_sort (arr) {
    var len = arr.length
    for (let i = 0; i < len - 1; i++) {
        let flag = true
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                flag = false
                let temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
            }
        }
        // 如果某次循环中没有交换过元素，则意味排序已经完成
        if (flag) break 
    }
    return arr
}
const arr1 = [5,2,8,1,4,9]
console.log(bubble_sort(arr1)) //  [1, 2, 4, 5, 8, 9]
const arr2 = ['s', 'b', 'm', 'q', 'a', 'u']
console.log(bubble_sort(arr2))  //  ['a', 'b', 'm', 'q', 's', 'u']
```

### 交换算法拓展
```js
// 先加后减
arr[j+1] = arr[j+1] + arr[j]
arr[j] = arr[j+1] - arr[j]
arr[j+1] = arr[j+1] - arr[j]
```

```js
// 先减后加
arr[j+1] = arr[j] - arr[j+1]
arr[j] = arr[j] - arr[j+1]
arr[j+1] = arr[j+1] + arr[j]
```

```js
a = a * b
b = a / b
a = a / b
```

+ 将两个数(相加/相减)的结果先保存在其中一个变量中，通过改变后的变量和另外一个原始变量进行交换。
+ 缺点是 两个数都是int类型,相加的结果可以越界。

```js
// 利用异或 (推荐)
a = a ^ b
b = a ^ b
a = a ^ b
```
+ 利用异或的方法可以非常适合计算及计算，一般`swap`函数底层会使用这种方式，而且避免了越界的问题

