# 快速排序

## 基本概念
快排，是一种基准划分区块，再不断交换左右项的排序方式，其采用了分治法，较少了交换的次数。
### 基本思想
通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归或迭代进行，以此让整个数列变成有序序列。
### 实现思路
+ 在待排序区间找到一个`基准点(pivot)`，便于理解一般是位于`数组中间的那一项`。
+ `逐个循环数组将小于基准的项放左侧，将大于基准的项放在右侧`。一般通过交换的方式来实现。
+ 将基准点左侧全部项和基点右侧全部项分别通过递归(或迭代)方式重复第1项，直到所有数组都交换完成。

```js
/**
 * 1.新建左右数组递归版本，无需交换，每个分区都是新数组，数量庞大，效率较差
 */
function quick_sort (arr) {
    if (arr.length <= 1) {
        return arr
    }

    var pivot
    const left = []
    const right = []

    var mid = Math.floor(arr.length / 2)
    pivot = arr[mid]

    for (let i = 0; i < arr.length; i++) {
        if (mid === i) continue // 基准元素跳过，后面插入中间

        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    arr = quick_sort(left).cconcat(pivot, quick_sort(right))
    return arr
}
```

```js
/**
 * 2. 标准左右分区递归交换排序，无需新建数组
 */
function quick_sort (arr, left, right) {
    left = left !== undefined ? left : 0
    right = right !== undefined ? right: arr.length - 1
    if (left < right) {
        var pivot = partition(arr, left, right)
        quick_sort(arr, left, pivot - 1)
        quick_sort(arr, pivot + 1, right)
    }
}

// 分区函数
function partition (arr, left, right) {
    var pivotIndex = right
    var pivot = arr[pivotIndex]
    var partitionIndex = left - 1 // 分区索引
    for (let i = left; i < right; i++) {
        if (arr[i] < pivot) {
            partitionIndex++
            if (partitionIndex !== i) {
                [arr[partitionIndex], arr[i]] = [arr[i], arr[partitionIndex]]
            }
        }
    }
    partitionIndex++
    [arr[partitionIndex], arr[i]] = [arr[i], arr[partitionIndex]]
    return partitionIndex
}
```

```js
function quick_sort (arr, left, right) {
   // left和right代表分区后“新数组”的区间下标
   if (left < right) {
    let pos = left - 1
    for (let i = left; i <= right; i++) {
        let pivot = arr[right]
        if (arr[i] <= pivot) {
            pos++
            let temp = arr[pos]
            arr[pos] = arr[i]
            arr[i] = temp
        }
    }
    // 一趟排序完成后，pos位置为基准数的位置
    quick_sort(arr, left, pos - 1)
    quick_sort(arr, pos + 1, right)
   }
   return arr //数组只包含1或0个元素时(即left>=right)，递归终止
}
```