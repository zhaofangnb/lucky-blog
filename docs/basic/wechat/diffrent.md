# 微信小程序与uniapp的区别
在微信小程序的平台上，两者的基础用法除了语法外基本一致，在此不讨论使用uni-app制作H5、App的特殊情况，只说最通俗易懂的**语法区别**。

## 触摸事件名称
``` bash
wechat: bindtap
uniapp: @click
```

## 函数传参方式
```bash
wechat: <view bindtap="click" data-id="id"></view>
uniapp: <view @click="click(id)"></view>
```

## 函数接受参数
```bash
wechat: function (e) {
    this.setData({
        currentId: e.currentTarget.dataset.id
    })
}
uniapp: function (id) {
    this.currentId = id
}
```

## for循环 
```bash
// 微信小程序可以不写`wx:for-index` 和w `x:for-item`，默认为index和item
wechat: <view 
            wx:for="{{currentList}}" 
            wx:for-index="s_index" 
            wx:for-item="s_item">
        </view>
uniapp: <view v-for="(s_item,s_index) in currentList"></view>
```

## if判断
```bash
wechat: <view wx:if="{{isShow}}"></view>
uniapp: <view v-if="isShow"></view>
```

## src动态接受图片
```bash
wechat: <image src="{{item.img}}"></image>
uniapp: <image :src="item.img"></image>
```

## 页面传参
```bash
// 两者接收参数都是在onLoad(options){}方法中获取
wechat: <navigator url="/pages/live?id={{item.room_id}}"></navigator>
uniapp: <navigator :url="'/pages/live?id=' + item.room_id"></navigator>
```

## 全局数据调用
```bash
wechat: getApp().globalData.baseUrl
uniapp: this.baseUrl
```

## 数据拼接
```bash
wechat(ES5): this.setData({ list: this.data.list.concat(res.list)})
uniapp(ES6): this.list = [...this.list,...res.list]
```

## 阻止冒泡
```bash
wechat：<view catchtap="clickTab">我是按钮</view>
uniapp：<view @click.stop="clickTab">我是按钮</view>
```

## api的差别(支付栗子)
```bash
wechat: wx.requestPayment({})
uniapp: uni.requestPayment({})
```

## 跨界面获取选择的参数
场景类似于填写表单时某个信息要跳转到其他页面选择数据后再返回，并在原填写表单页得到并展示刚才选择的数据，当然还有其他相关的问题能够运用该方法。
```bash
wechat: 通过`getCurrentPages()`获取页面栈，然后调用`上n个页面的setData()`方法，把数据存到上n个页面中。
// 选择参数的页面
chooseItem(data) {
    const pages = getCurrentPages()
    const prevPage = page[pages.length - 3] // 上两个页面
    prevPage.setData({
        myName: data
    })
    wx.navigateBack({ delta: 2 }); //返回到上两个页面
}
// 获取参数的页面，即上述的->原填写表单页
onShow () {
    const pages = getCurrentPages()
    if (pages[pages.length - 1]) {
        const currPage = pages[pages.length - 1]; // 当前页面
        this.brandName = currPage.data.myName; //这就是传递的参数
    }
}

uni-app：通过getCurrentPages()获取页面栈，然后使用 prevPage.$vm.myName = data，把数据存到上n个页面中。
// 选择参数的页面
chooseItem(data) {
  const pages = getCurrentPages();
  const prevPage = pages[pages.length - 3]; //上两个页面
  prevPage.$vm.myName = data; // 区别只是这里不同
  uni.navigateBack({ delta: 2 }); //返回到上两个页面
},
// 获取参数的页面，即上述的->原填写表单页
onShow() {
  const pages = getCurrentPages();
  if (pages[pages.length - 1]) {
    const currPage = pages[pages.length - 1]; // 当前页面
    this.brandName = currPage.data.myName; //这就是传递的参数
  }
},
```
