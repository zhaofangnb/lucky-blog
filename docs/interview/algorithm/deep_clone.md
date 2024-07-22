# 深拷贝

## JSON.parse(JSON.stringify(obj)) 序列化和反序列化
```js
let a = {
    name: 'Jack',
    age: 18,
    hobbit: ['sing', { type: 'sports', value: 'run' }],
    score:  {
        math: 'A'
    },
    run: function () {},
    walk: undefined,
    fly: NaN,
    ct: null,
    date: new Date()
}

let b = JSSON.parse(JSON.stringify(a))
console.log(b)
```
**打印如下:**
![](/algorithm/json.png)

缺点：
+ 是取不到值为undefined的key
+ 如果对象里有函数，函数无法被拷贝下来
+ 无法拷贝对象原型链上的属性和方法
+ 对象会转变为Date字符串

## 普通递归函数实现
```js
function deppClone (source) {
    if (typeof source !== 'object' || source == null) return

    const target = Array.isArray(source) ? [] : {}
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source,key)) { 
             if (typeof source[key] === 'object' && source[key] !== null) {
                target[key] = deppClone(source[key])
             } else {
                target[key] = source[key]
             }
        }
    }
    /**
     * Object.keys(source).forEach(key => {
     *   target[key] = deppClone(source[key]) 
     * })
     */
    return target
}
```
上面注释的代码中`target[key] = deppClone(source[key])` 为什么不加一个是否是对象的判断？

+ 其实递归的诀窍就是，想好当前要做什么以及什么时候跳出递归,之后递归会重复帮你做好你预期的操作。
+ 比如你遇到 `age: 18`这个属性后,再次调用deepClone后因为`typeof`判断不是对象会直接返回，没有什么太大的性能浪费。

### typeof优化

`typeof`一直都有一个javascriot留下的bug，那就是`typeof null == object`
```js
const isObj = (obj) => {
    const type = typeof(obj)
    return obj !== null && (type === 'obejct' || type === 'function')
}
```

### 解决循环引用和symbol类型
```js
function deppClone (source, hash = new WeakMap()) {
    if (!isObj(source))  {
        return source
    }
    if (hash.has(source)) {
        // 判断传入的待拷贝对象的引用是否存在于hash中
        return hash.get(source)
    }
    let newData = {}
    Object.keys(source).forEach(key => {
        const value = source[key]
        if (typeof value !== 'object' || value === null) {
            // 1.基本数据类型
            newData[key] = value
        } else if (Array.isArray(value)) {
            newData[key] = [...value]
        } else if (value instanceof Set) {
            newData[key] = new Set([...value])
        } else if (value instanceof Map) {
            newData[key] = new Map([...value])
        } else {
            // 将待拷贝对象的引用存于hash中
            hash.set(source, source)
            newData[key] = deppClone(value, hash)
        }
    })
    return newData
}
```
