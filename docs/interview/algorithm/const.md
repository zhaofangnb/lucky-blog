# const实现原理

## 定义

**由于ES5环境没有block的概念，所以是无法百分百实现const，只能是`挂载到某个对象下`，要么是全局的`window`，要么就是自定义一个`object`来当容器**

```js
var _const = function _const(data, value) {
    // 把要定义的data挂载到window下，并赋值value
    window.data = value ;
    Object.defineProperty(window, data, {
        //是否可枚举
        enumerable: false,
        //当前对象元素的属性描述符是否可改，是否可删除
        configurable: false,
        get: function() {
            return value
        },
        set: function (newVal) {
            if (newVal !== value) {
                // 当要对当前属性进行赋值时，则抛出错误！
                throw new TypeError('Assignment to constant variable.')
            } else {
                return value
            }
        }
    })
}
```

+ `Object.defineProperty(obj, prop, desc)`
+ 用于在一个对象上增加或修改属性
+ 通过配置属性描述符，可以精确地控制属性行为

## 测试
```js

_const('a', 10)
console.log(a) // 10

delete a 
console.log(a) 10 //因为a不可改，不可删除


for(let item in window) {
    // // 因为a不可枚举，所以不执行
     if (item === 'a') { 
        console.log(window[item])
    }
}

a = 20 // 报错： Assignment to constant variable.
```