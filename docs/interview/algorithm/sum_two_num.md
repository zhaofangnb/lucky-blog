# Map 求两数之和
```js
 **
 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数下标。且同样的元素不能被重复利用。
    示例：
    给定 nums = [2, 7, 11, 15], target = 9
    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]
** */


function compute (arr, target) {
    let result = []
    const map = new Map()
    for (let i = 0; i < arr.length; i++) {
        map.set(arr[i], i) //Map对象映射值与下标
    }
    for (let i = 0; i < arr.length; i++) {
        const j = map.get(target - arr[i]) // 返回和key关联的value,即另一个数的下标
        if (j && j!== i) {
            result.push([i, j])
        }
    }
    console.log('111', result)
    // return result 需要去重
   const arrIndex = result.map(item => item.sort((a,b) => a-b)) // 下标排序

	// 使用对象的key不能重复原则，对数组进行去重
	var obj = {}
	arrIndex.forEach(item => {
		obj[item] = item;
	})
	return  Object.values(obj);
}
console.log(compute([3, 2,7, 11, 15, 6, 3], 9))
```