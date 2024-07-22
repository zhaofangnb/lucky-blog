# 归并排序

## 基本概念
+ 归并排序建立在归并操作上的一种`有效、稳定`的算法，采用`分治法`的典型应用。
+ 将已有序的子序列合并，得到完全有序的序列
+ 自上而下的递归

```js
function merge_sort (arr) {
    var len = arr.length
    if (len < 2) {
        return arr
    }
    var mid = Math.floor(len / 2)   
    left = arr.slice(0, mid)
    right = arr.slice(mid)

    return merge(merge_sort(left), merge_sort(right))
}

function merge (left, right) {
    var mergeResult = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            // 左边的先进数组
            // shift() 方法用于把数组的第一个元素从其中删除,并返回第一个元素的值.
            mergeResult.push(left.shift())
        } else {
            // 反之亦然
            mergeResult.push(right.shift())
        }
    }
    while(left.length) {
        mergeResult.push(left.shift())
    }
    while (right.length) {
        mergeResult.push(right.shift())
    }
}
```

+ 双指针移动结合数组的方法


```js
/**
 * 归并排序，采用分而治之的策略步骤
 * 1. 分解(Divide)： 将待排序元素分为两个子序列
 * 2. 解决(Conquer)： 对每个子序列分别递归调用归并操作，进行递归或非递归操作，完成内部排序
 * 3. 合并(Combine)： 合并两个排好序的子序列，生成排序结果
 */
function mergeSort (arr, left, right) {
    const mid = Math.floor((left + right) / 2)
    if (left < right) {
        //分别递归合并左侧和右侧
        mergeSort(arr, left, mid)
        mergeSort(arr, mid + 1, right)

        // 合并左右结果
        merge(arr, left, mid, right)
    }
    return arr
}

/**
 * 合并两个有序数组为一个新的有序的数组
 */
function merge (arr, left, mid, right) {
    const temp = []
    let i = left
    let j = mid + 1
    let k = 0
    while(i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++]
        } else {
            temp[k++] = arr[j++]
        }
    }
    while(i <= mid) {
        temp[k++] = arr[i++]
    }
    while (j <= right) {
        temp[k++] = arr[j++]
    }

    // 将排序后的元素全部移动到原数组中
    let x = 0
    while(left <= right) {
        arr[left++] = temp[x++]
    }
    console.log('arr:', arr)
}
```