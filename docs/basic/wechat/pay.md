# 小程序支付
微信小程序为电商类小程序，提供了非常完善、优秀、安全的支付功能

在小程序内可调用微信的`API`完成支付功能，方便、快捷
![](/wechat/pay.png)

+ 用户通过分享或扫描二维码进入商户小程序，用户选择购买
+ 调起微信支付控件，用户开始输入密码
+ 密码验证通过，跳转支付成功页面，商户后台得到支付成功的结果
+ 返回商户小程序， 显示购买成功
+ 微信支付公众号下发支付凭证

## 支付流程
![](/wechat/payment.png)

具体流程： 

+ 打开小程序，选择完商品，点击直接下单
+ `wx.login()`获取用户临时登录凭证`code`，发送到后台服务器换取`openId`
+ 在下单时， 小程序需要将购买商品的`id`，商品数量，以及用户的`openId`传送到服务器
+ 服务器在接收到`商品id、商品数量、openId`后，生成服务器订单数据，同时经过一定的签名算法，向微信支付发送请求，获取预付单信息(`prepay_id`),同时将获取的数据再次进行相应规则的签名，向小程序端响应必要的信息
+ 小程序端在获取对应的参数后，调用wx.requestPayment()发起微信支付，唤醒支付工作台，进行支付
+ 接下来的一些列操作都是由用户来操作的包括了微信支付密码，指纹等验证，确认支付之后执行鉴权调起支付
+ `鉴权调起支付`：在微信后台进行鉴权，微信后台直接返回给前端支付的结果，前端收到返回数据后对支付结果进行展示
+ `推送支付结果`：微信后台在给前端返回支付的结果后，也会向后台也返回一个支付结果，后台通过这个支付结果来更新订单的状态

其中`后端响应数据必要的信息`则是`wx.requestPayment`方法所需要的参数，大致如下：
```js
wx.requestPayment({
    //时间戳
    timeStamp: '',
    // 随机字符串
    nonceStr: '',
    // 统一下单接口返回的 prepay_id 参数值
    package: '',
    // 签名类型
    signType: '',
    // 签名
    paySign: '',
    // 调用成功回调
    success () {},
    // 失败回调
    fail () {},
    // 接口调用结束回调
    complete () {}
})
```