# Http
## 1.同源策略（协议+ 主机+端口 ）

+ CORS 跨域资源共享 服务端设置响应头
+ JSONP 最早出现，只支持get 如：`script、img、link、iframe`
+ 代理服务器
+ postMessage

## 2.xss攻击 和 csrf攻击

+ xss：诱骗用户点击恶意链接盗取用户 cookie 进行攻击、通常出现在`搜索框、留言板、评论区`等地方
+ csrf：跨站请求伪造、无法获取用户的 cookie 而是直接冒充用户、需要用户登录后进行操作, 可以设置token验证
+ 在`Vue`中，可以通过使用`插值表达式、指令和计算属性`来防止 XSS 攻击。
+ Content Security Policy（内容安全策略，CSP）限制网页内容如何被加载资源的策略