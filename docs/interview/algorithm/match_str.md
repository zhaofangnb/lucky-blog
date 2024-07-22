# 字符串匹配
> 实现一个字符串匹配算法，从`长度为n`的字符串`S`中，查找是否存在字符串`T`，T的长度是`m`，若存在返回所在位置。

```js
function match_str (str, target) {
    if (target.length > str.length) {
        return -1
    }
    let copyStr = str; // 复制原始串
    let tLen = target.length
    let i = 0;
    while(copyStr.length > 0) {
        if(copyStr.slice(0, tLen) === target) {
            return i
        }
        copyStr = cStr.slice(1);//从下一位置开始提取
	    i++;
    }
    return -1// 没找到
}
```