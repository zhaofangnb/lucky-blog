# node精度问题

## JS运算中 `0.1 + 0.2 = 0.30000000000000004`

## 大数危机(大数处理精度丢失)问题

### js最大安全整数
IEEE 754 双精确度浮点数（Double 64 Bits）中尾数部分是用来存储整数的有效位数，为 52 位，加上省略的一位1可以保存的实际数值为 `[-((2^53)-1), 2^53]`
```js
Math.pow(2,53) // 9,007,199,254,740,992
Number.MAX_SAFE_INTEGER // 最大安全整数 9007199254740991 
Number.MIN_SAFE_INTEGER // 最小安全整数 -9007199254740991
```

#### 大数处理精度丢失例子
```js
const num = 200000436035958034   // 200,000,436,035,958,034 超出最大安全整数范围
console.log(num); // 200000436035958050  结果不正确
```

```js
// 第三方接口在通过流传递数据data时，使用的application/json协议，需要对data反序列化成一个obj做业务处理
req.on('end', () => {
    const data = {
        id: 200000436035958034
    }
    try {
        const obj = JSON.parse(data)
        res.setHeader('Content-Type', 'application/json')
        res.end(data)
    }
    catch (err) {
        console.log(err)
    }
})
// 经过JSON反序列化之后 { id: 200000436035958050 }
// JSON的数据格式标准(IETF7159)是一种轻量级的、基于文本与语言无关的数据交互格式，源自 ECMAScript 编程语言标准
// 上述协议中有规定必须为object, array, number,string 四个数据类型，也可以是 false, null, true 这三个值。
// JSON 在解析时对于其它类型的编码都会被默认转换掉。对应我们这个例子中的大数值会默认编码为 number 类型，这也是造成精度丢失的真正原因
```


## 大数运算的解决方案

### 常用方法转字符串
例如，对订单号的存储`采用数值类型Java中的long类型`表示的最大值为`2的64次方`， 而`JS中的Number.MAX_SAFE_INTEGER(Math.pow(2,53) -1)`, 显然超过了JS能表达的范围，最好的解决方案就是将订单号`由数值型转为字符串`返回给前端。

### 新的希望 BigInt

#### 创建BigInt 方法一
```js
// 在数字后面加数字n
200000436035958034n;
```

#### 创建BigInt 方法二
```js
BigInt(200000436035958034) // 200000436035958048n 这不是一个正确的结果
// 转换为字符串
String(200000436035958034n);
// 或
(200000436035958034n).toString()
```

#### 与JSON的冲突
```js
JSON.parse('{"id": 200000436035958034n}');
// SyntaxError: Unexpected token n in JSON at position 25
// 因为这将破坏 JSON 的格式，很可能导致无法解析。
```

### 第三方库 json-bigint
```js
const JsonBig = require('json-bigint')({ 'storeAsString': true })
req.on('end', () => {
    const data = {
        id: 200000436035958034
    }
    try {
        // 使用第三方库进行JSON序列化
        const obj = JsonBig.parse(data)
        res.setHeader('Content-Type', 'application/json')
        res.end(data)
    }
    catch (err) {
        console.log(err)
    }
})
// 结果:  { id: '200000436035958034' }   参数 storeAsString: true 会将 BigInt 自动转为字符串。
```


```js
// axios
const axios = required('axios').default
const JsonBig = require('json-bigint')({ 'storeAsString': true })

const request = axios.create({
    baseURL:'',
    transformResponse:[ function (data) {
        // transformResponse 属性我们对原始的响应数据做一些自定义处理。
        return JsonBig.parse(data)
    }]
})

```