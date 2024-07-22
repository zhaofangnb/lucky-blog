# 插入排序
## 基本思想

一个对`少量元素`进行排序的`有效算法`

## 分类
+ 直接插入排序
+ 二分插入排序(又称折半插入排序)
+ 链表插入排序
+ 希尔排序(又称缩小增量排序)

## 直接插入排序思想
每次从无序表中取出最后一个元素，把他插入倒有序表的合适位置，使有序表仍然有序

>可以理解为从无序的数组第二个元素开始遍历(抓牌),将数组第一个元素作为起始元素(即已排好序的有序表),找到排序插入点插入元素，直到最后一个数组元素插入完成。


## 核心代码

```js
// 升序
function insertion_sort (arr) {
    for (let i = 1;  i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                // 交换
                let temp = arr[j]
                arr[j] = arr[j - 1]
                arr[j - 1] = temp
            }
        }
    }
    return arr
}
insertion_sort([3,1,4,6,2,10,5])
```

```js
// 升序--while版
function insertion_sort (arr) {
    let len = arr.length;
    let temp, i, j
    for (i = 1; i < len; i++) {  // 从第二个元素开始每次都要和它前面的元素进行比较
        j = i
        temp = arr[i]
        while (j && arr [j - 1] > temp) {  // 只要存在比temp大的元素都要调换位置
            arr[j] = arr[j - 1] // 依次往后挪位置，让temp插入
            j--
        }
        arr[j] = temp
    }
    return arr
}
insertion_sort([3,1,4,6,2,10,5])
```

```js
// 升序--递归版
function insertion_sort (arr, i) {
    if (i <= 0) return

    insertion_sort(arr, i - 1) // 执行完该语句，arr[0...,i - 1]已经是有序的了

    // 然后将arr[i]插入到arr[0...,i -1]中
    let key = arr[i]
    let j = i - 1
    while (j >= 0 && key < arr[j]) {  // a[j]此时是已排序的最大元素,若key小于最大元素，则前移
        arr[j + 1] = arr[j] 
        j--
    }
    arr[j + 1] = key //最终将key插入到合适的位置
    return arr
}
const arr = [3,1,4,6,2,10,5]
const pos = arr.length - 1 // 其实是从数组最后一个开始的
insertion_sort(arr, pos)
```