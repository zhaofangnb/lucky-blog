# 整型数字逆序输出字符串

```js
/**
* 输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。
* 要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。
*/

function int_reverse_string (n) {
    let last = n % 10 // 对10取余拿到个位数
    let s = String(last)
    if (n / 10 >= 1) {
        s += int_reverse_string((n - end )/10)
    }
    return s
}
```