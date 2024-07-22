# Axios

```js
const SERVER_URL ='/server'
// 1. 创建一个XMLHttpRequest 对象
let xhr = new XMLHttpRequest()
// 2. 创建一个HTTP请求  open(请求方法，请求的地址， 是否异步， 用户的认证信息)
xhr.open("GET",url, true)
// 3. 设置状态监听函数
xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return
    if (this.status === 200) {
        handle(this.response)
    } else {
        console.error(this.statusText)
    }
}
// 4.设置请求失败监听函数
xhr.onerror = function () {
    console.error(this.statusText)
}
// 5.设置请求头信息
xhr.responseType = 'json'
xhr.setRequestHeader('Accept', 'applacation/json')
// 6.发送请求
xhr.send(null)
```

## 使用`Promise`封装Ajax
```js
function getJSON (url) {
    // 1.创建一个Promise对象
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open("GET", url, true)
        xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
        xhr.onerror = function () {
            reject(new Error(this.statusText))
        }
        xhr.responseType = 'json'
        xhr.setRequestHeader('Accept', 'applacation/json')
        xhr.send(null)
    })
    return promise
}
```

## Ajax、Axios、Fetch的区别

1. Ajax是指一种创建交互式网页应用的技术。本身针对MVC编程，基于原生XHR开发，不符合前端MVVM的浪潮

2. Fetch是在ES6出现的，使用了ES6中的promise对象。语法简单，更加语义化<br/>
   基于标准Promise实现，支持async/await<br/>
   更加底层，提供了丰富的API(request, response)<br/>
   缺点是支队网络请求报错，对400，500都当做成功的请求，只有网络错误导致这些请求不能完成时，Fetch才会被reject<br/>
   Fetch默认不会带cookie,需要添加配置项: `fetch(url, { credentials: 'include'})`<br/>
   不支持超时控制，没有办法原生监测请求的进度。


3. Axios是一种基于Promise封装的HTTP客户端，特点如下:
    `浏览器端发起XMLHttpRequest请求`

    `node端发起http请求`

    `支持Promise API`

    `监听请求和返回`

    `对请求和返回进行转化`
    
    `取消请求`

    `自动转换json数据`

    `客户端支持低于XSRF攻击`