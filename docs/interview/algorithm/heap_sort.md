# 堆排序

## 基础概念
可以用二叉树来表示堆，二叉树是一颗被完全填满的二叉树，其实可以用一个数组来表示成一个二叉树:
![](/algorithm/two_tree.png)

**堆序性质：任意一个节点小于(大于)他的后裔，这取决于你的排序方式**

堆排序主要分三步:
+ 构建堆  从N/2处开始进行调整
+ 调整堆
+ 堆排序  进行N-1次调整堆的操作

## 堆排序的流程和实现

首先要构建堆，构建堆其实是先将`数组抽象`成二叉堆之后调整堆的过程。

```js
function heap_sort(array) {
    // 初始化大顶堆，从第一个非叶子结点开始
	for (let i = Math.floor(array.length / 2 - 1); i >= 0; i--) 
	{
		heapify(array, i, array.length);
	}

    for (let i = Math.floor(array.length - 1); i > 0; i-- ) {
        // 根节点与最后一个节点交换
        swap(array, 0, i)
        // 从根节点开始调整，并且最后一个结点已经为当前最大值，不需要再参与比较，
		//所以第三个参数为 i，即比较到最后一个结点前一个即可
		heapify(array, 0, i);
    }
    return array
}

function swap (array, i ,j) {
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
}

// 假设结点 i 以下的子堆已经是一个大顶堆，heapify 函数实现的
// 功能是实际上是：找到 结点i在（包括结点i）的堆中的正确位置。
// 后面将写一个 for 循环，从第一个非叶子结点开始，对每一个非叶子结点
// 都执行 heapify 操作，所以就满足了结点 i 以下的子堆已经是一大顶堆

function  heapify (array, i, length) {
	let temp = array[i]; // 当前父节点
	
	for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
		temp = array[i]; // 将 array[i] 取出，整个过程相当于找到 array[i] 应处于的位置
		if (j + 1 < length && array[j] < array[j + 1]) {
			j++; // 找到两个孩子中较大的一个，再与父节点比较
		}
		if (temp < array[j]) {
			swap(array, i, j); // 如果父节点小于子节点:交换；否则跳出
			i = j; // 交换后，temp 的下标变为 j
		} else {
			break;
		}
	}
}
```



```js
/**
 * 调整堆，从上到下，直到节点超出范围
 */
function maxHeap (arr, size, index) {
    // 1. 取得当前节点的左右节点，当前节点为index
    let left = getChildrenLeftIndex(index)
    let right = getChildrenRightIndex(index)
    // 2. 比较
    let largest = index
    if (left < size && arr[index].compareTo(arr[left]) < 0) {
        largest = left
    }
    if (right < size && arr[index].compareTo(arr[right]) < 0) {
        largest = right
    }
    // 3. 交换位置
    if (largest !== index) {
        let temp = arr[index]
        arr[index] = arr[largest]
        arr[largest] = temp
    }
}


/**
 * 初始化构建堆
 */

function buildMaxHeap (arr) {
    // 根据最后一个元素获取，开始调整位置
    let startIndex = getParentIndex(arr.length - 1)
    // 反复调整
    for (let i = startIndex; i >= 0; i--) {
        maxHeap(arr, ar.length, i)
    }
}


/**
 * 排序操作
 */
 function heapSort (arr) {
    // 每次循环都能取到一个最大值，该值为根节点
    for (let i = arr.length - 1; i > 0; i--) {
        let temp = arr[0]
        arr[0] = arr[i]
        arr[i] = temp
        //每次调整都是从根节点开始i不断减小，保证前一次最大节点不会参与到调整堆
        maxHeap(arr, i, 0);
    }
 }

 /**
  * 获取父节点的位置
  */
 function getParentIndex (current) {
    return (current-1)>>1
 }

 /**
  * 获取左子节点
  */
 function getChildrenLeftIndex (current) {
    return (current<<1) + 1
 }

 /**
  * 获取右子节点
  */
 function getChildrenRightIndex (current) {
    return (current<<1)+ 2
 }
```