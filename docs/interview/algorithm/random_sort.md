# 数组随机排序


```js
/**
 * 简易随机的随机： 各个位置的元素很大程度上会集中在原来位置附近
 */
function random (arr) {
    return arr.sort(() => Math.random() - 0.5)
}
```

```js
function random (arr) {
    let new_arr = arr.map(i => ({ v:i, r:Math.random()}))
    new_arr.sort((a,b) => a.r - b.r)
    arr.splice(0, arr.length, ...new_arr.map(i => i.v))
    return arr
}
```

**Fisher–Yates 洗牌算法**
```js
/**ES5 */
function shuffle (arr) {
    const len = arr.length
    for (let i = 0; i < len; i++) {
        const index = Math.floor(Math.random() * (len - i)) + i
        const temp = arr[index]
        arr[index] = arr[i]
        arr[i] = temp
    }
    return arr
}

/**ES6 */
function shuffle (arr) {
    let i = arr.length
    while(i) {
        let j =  Math.floor(Math.random() * i--);
	    [arr[j], arr[i]] = [arr[i], arr[j]];
    }
}
```