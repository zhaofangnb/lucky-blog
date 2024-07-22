# 浏览器(Browser)

## preload 和 prefetch

- `preload`是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源
- `prefetch`是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源

## 移动端触摸事件

+ `touchstart`事件：当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，preventDefault()事件可以阻止滚动。
+ `touchend`事件: 当手指从屏幕上离开的时候触发。
* `touchcancel`事件：当系统停止跟踪触摸的时候触发。

每个Touch对象包含的属性如下:
clientX: 触摸目标在视口中的x坐标。
clientY：触摸目标在视口中的y坐标。
identifier: 标识触摸的唯一ID。
pageX: 触摸目标在页面中的x坐标。
pageY: 触摸目标在页面中的y坐标。
screenX: 触摸目标在屏幕中的x坐标。
screenY: 触摸目标在屏幕中的y坐标。
target: 触摸的DOM节点目标。

## 基于HTTP的前端鉴权

### http无状态

HTTP 请求方和响应方间无法维护状态，都是一次性的，它不知道前后的请求都发生了什么。

> 最典型的，一个用户登陆微博，发布、关注、评论，都应是在登录后的用户状态下的。

### cookie
Cookie的一般过程是:

- 在提供标记的接口，通过 HTTP 返回头的 `Set-Cookie` 字段，直接「种」到浏览器上
- 浏览器发起请求时，会自动把 cookie 通过` HTTP 请求头的 Cookie 字段`，带给接口

`「配置：Domain / Path」`

cookie 是要限制::「空间范围」::的，通过 Domain（域）/ Path（路径）两级。

> Domain属性指定浏览器发出 HTTP 请求时，哪些域名要附带这个 Cookie。如果没有指定该属性，浏览器会默认将其设为当前 URL 的一级域名，比如`www.example.com`会设为`example.com`，而且以后如果访问example.com的任何子域名，HTTP 请求也会带上这个 Cookie。如果服务器在Set-Cookie字段指定的域名，不属于当前域名，浏览器会拒绝这个 Cookie。

> Path属性指定浏览器发出 HTTP 请求时，哪些路径要附带这个 Cookie。只要浏览器发现，Path属性是 HTTP 请求路径的开头一部分，就会在头信息里面带上这个 Cookie。比如，PATH属性是/，那么请求/docs路径也会包含该 Cookie。当然，前提是域名必须一致。

`「配置：Expires / Max-Age」`

> Expires属性指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 Cookie。它的值是 `UTC` 格式。如果不设置该属性，或者设为null，Cookie 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，该 Cookie 就会被删除。另外，浏览器根据本地时间，决定 Cookie 是否过期，由于本地时间是不精确的，所以没有办法保证 Cookie 一定会在服务器指定的时间过期。

> Max-Age属性指定从现在开始 Cookie 存在的秒数，比如60 * 60 * 24 * 365（即一年）。过了这个时间以后，浏览器就不再保留这个 Cookie。

> 如果同时指定了Expires和Max-Age，那么`Max-Age`的值将优先生效。

> 如果Set-Cookie字段没有指定Expires或Max-Age属性，那么这个 Cookie 就是 `Session Cookie`，即它只在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie。

`「配置：Secure / HttpOnly」`
> Secure属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。另一方面，如果当前协议是 HTTP，浏览器会自动忽略服务器发来的Secure属性。该属性只是一个开关，不需要指定值。如果通信是 HTTPS 协议，该开关自动打开。

> HttpOnly属性指定该 `Cookie 无法通过 JavaScript 脚本拿到`，主要是`Document.cookie`属性、`XMLHttpRequest对象`和 `Request API `都拿不到该属性。这样就防止了该 Cookie 被脚本读到，只有浏览器发出 HTTP 请求时，才会带上该 Cookie。