# 小程序路由跳转
常见的小程序跳转方式：
+ wx.navigateTo(Object)
+ wx.redirectTo(Object)
+ wx.swtichTab(Object)
+ wx.navigateBack(Object)
+ wx.reLaunch(Object)

##  wx.navigateTo()

 `wx.navigateTo()`用于保留当前页面、跳转到应用内的某个页面，使用 `wx.navigateBack()`可以返回到原页面
 > **对于页面不是特别多的小程序，通常推荐使用 wx.navigateTo进行跳转， 以便返回原页面，以提高加载速度。当页面特别多时，则不推荐使用**

 |  属性 |  类型 | 默认值 |  必填 |  说明 |
 | :---: | :---: | :---: |:---: | :---: |
 | url| string |  | 是| 需要跳转应用内`非tabBar`的页面的路径，路径后可以带参数|
 | events| Object |  | 否| 页面间通信接口,用于监听被打开页面发送到当前页面的数据|
 | success | function | | 否| 接口调用成功的回调函数 |
 | fail | function | | 否| 接口调用失败的回调函数 |
 | complete | function | | 否| 接口调用结束的回调函数(不管成功失败都会调用) |

## wx.redirectTo()

`wx.redirectTo()`用于重定向，当页面过多时，被保留页面会挤占微信分配给小程序的内存，或是达到微信所限制的 10 层页面栈的情况下，我们应该考虑选择 `wx.redirectTo`

> **这样的跳转，可以避免跳转前页面占据运行内存，但返回时页面需要重新加载，增加了返回页面的显示时间**

## wx.switchTab()

`wx.switchTab()`跳转到`tabBar`页面，并关闭其他所有非`tabBar`页面

> **需要跳转的tabBar页面的路径需要在app.json的`tabBar`字段定义**

## wx.navigateBack()

`wx.navigateBack()`用于关闭当前页面，并返回上一页面或多级页面，开发者可以通过`getCurrentPages()`获取当前的页面栈，`决定需要返回几层则设置对象的delta属性即可`

 |  属性 |  类型 | 默认值 |  必填 |  说明 |
 | :---: | :---: | :---: |:---: | :---: |
 | delta | number | 1 | 否 | 返回的页面数，如果delta大于现有页面数，则返回首页 |
 | success | function | | 否| 接口调用成功的回调函数 |
 | fail | function | | 否| 接口调用失败的回调函数 |
 | complete | function | | 否| 接口调用结束的回调函数(不管成功失败都会调用) 

 ## wx.reLaunch()
 `wx.reLaunch()`关闭所有页面，打开到应用内的某个页面，返回的时候跳到首页

 ## 总结
 关于上述五种跳转方式，做下总结：

+ navigateTo 保留当前页面，跳转到应用内的某个页面，使用 wx.navigateBack 可以返回到原页
+ redirectTo 关闭当前页面，跳转到应用内的某个页面
+ switchTab 跳转到 tabBar 页面，同时关闭其他非 tabBar 页面
+ navigateBack 返回上一页面
+ reLanch 关闭所有页面，打开到应用内的某个页面

其中关于它们的页面栈的关系如下：

+ navigateTo 新页面入栈

+ redirectTo 当前页面出栈，新页面入栈

+ navigateBack 页面不断出栈，直到目标返回页，新页面入栈

+ switchTab 页面全部出栈，只留下新的 Tab 页面

+ reLanch 页面全部出栈，只留下新的页面
