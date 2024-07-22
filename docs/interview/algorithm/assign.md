# 重写assign
> 仿`Object.assign()`的功能,方法用于对象的合并，将`源对象（source）的所有可枚举属性`，复制到`目标对象（target）`。

```js
function assign (to, from) {
    if (to === from) {
        return to
    }
    for (let key in from) {
        if(from.hasOwnProperty(key)) {
            Object.keys(from).forEach((item, index) => {
                to[item] = from[item]
            })
        }
    }
    return to
}
let obj1 = { a: 1, b: { a: 1 }, c: 3, };
let obj2 = { a: 1, b: { a: 'i' }, e: 3, };
console.log(assign(obj1, obj2));
//  {a: 1, b: {a: i}, c: 3, e: 3}
```