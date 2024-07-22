# 大小写字符串转换
```js
function convert (str) {
    let covertStr = ''
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i)   //返回在指定的位置的字符的 Unicode 编码。
        if (code > 97) {
            // 小写
            covertStr += String.fromCharCode(code - 32) // 大小写相差32
        } else{
            // 大写
            covertStr += String.fromCharCode(code + 32)
        }
    }
    return covertStr
}

console.log(convert('AbC'))  // aBc
```