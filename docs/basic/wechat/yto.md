# 实战
## 返回上一个页面
```js
uni.navigateBack({
    delta: 1
});
```

## 条件编译
```js
/* #ifdef  MP-WEIXIN  */
//...执行微信小程序相关代码
/* #endif  */


 // #ifdef  MP-WEIXIN
 // ...执行微信小程序相关代码
 // #endif


// #ifdef  MP-WEIXIN || MP-ALIPAY
// ...执行微信小程序或支付宝相关代码
// #endif

// #ifndef  MP-WEIXIN
// ...执行非微信小程序相关代码
// #endif
```

## tabBar 底部应用导航配置

```json
// pages.json
{
    "tabBar": {
		"color": "#747577",
		"selectedColor": "#000000",
		"borderStyle": "white",
		"backgroundColor": "#FFFFFF",
		"list": [
			{
				"pagePath": "pages/index/index",
				"iconPath": "static/icon_send.png",
				"selectedIconPath": "static/icon_send_selected.png",
				"text": "寄件"
			},
			{
				"pagePath": "pages/search/index",
				"iconPath": "static/icon_search.png",
				"selectedIconPath": "static/icon_search_selected.png",
				"text": "查件"
			},
			{
				"pagePath": "pages/me/me",
				"iconPath": "static/icon_me.png",
				"selectedIconPath": "static/icon_me_selected.png",
				"text": "我的"
			}
		]
	}
}
```
**注意事项:**
+ tabBar中的list只能配置最少2个，最多5个
+ 当渲染顶部tabBar时，不显示icon,只显示文本


## 个人中心页面禁止滚动并设置背景色及背景图片
```json
// pages.json文件
"pages": [
  {
    "path": "pages/me/index",
    "style": {
				"navigationBarTitleText": "个人中心", // 标题文字
				"disableScroll": true, // 禁止页面滚动
				"navigationStyle": "custom" 
                // default: 使用系统默认的导航栏样式
                // custom: 自定义导航栏，页面将隐藏默认的导航栏， 开发者需要自行实现导航栏的所有功能，包括返回按钮、标题显示、菜单按钮等。同时，也需要考虑不同设备和屏幕尺寸的适配问题，以确保自定义导航栏在各种情况下都能正常工作
			}
  }
]
```

## 页面加载pages和分包加载subPackages
1. `pages`字段用户配置小程序或uni-app项目的主包页面路径。这些页面是项目启动时即加载的。可以直接被访问和跳转,每个页面的路径都是相对于项目根目录的相对路径,例如`"pages/index/index"`。
```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {}
    },
    {
      "path": "pages/login/login",
      "style": {}
    }
    // 其他页面配置...
  ]
}
```
<br/>

2. `subPackages`字段用于配置小程序分包的结构。`分包机制`允许将应用的某些页面单独打包，在需要的时候再从主包中加载(异步加载), 从而优化应用的`初始加载速度`和`运行时性能`。每个分包都需要指定一个`root`字段————分包根目录 和一个`pages`字段————分包下的页面路径列表。分包中的页面路径是相对于分包根目录的相对路径，例如`"subStaticPageA/list/index"`或`"subStaticPageB/detail"`。

```json
{
  "subPackages": [
    {
      "root": "subStaticPageA",
      "pages": [
        {
          "path": "list/index",
          "style": {}
        }
        // 分包A的其他页面配置...
      ]
    },
    {
      "root": "subStaticPageB",
      "pages": [
        {
          "path": "detail",
          "style": {}
        }
        // 分包B的其他页面配置...
      ]
    }
    // 其他分包配置...
  ]
}

3. 分包注意事项

+ 分包配置的正确性 `subPackages字段，包括指定分包的root路径和pages页面列表`。
+ 分包大小限制：例如微信小程序规定单个分包的大小不能超过2M，整个小程序所有分包大小总和不能超过20M（某些情况下如开通虚拟支付后的小游戏可能有所不同）
+ 资源引用的规则: 主包无法直接引用分包内的私有资源，分包之间也不能相互引用私有资源。但分包可以引用主包内的公共资源。

```


## [剪切板复制功能](https://blog.csdn.net/happyyang303/article/details/124305370)
```js
export function setClipData(str, tip = '') {
    uni.setClipboardData({
        data: str,
        success: () => {
            uni.showToast({
                title: tip || '复制成功'
            });
        },
        fail: err => {
            console.log(err)
        }，
        complete: () => { 
            console.log('complete')
        }
    })
}
```
此功能需要在微信小程序的后台配置用户隐私保护指引，并且通过审核，才能使用剪贴板。

```js
// 获取剪切盘内容
uni.getClipboardData({
    success: (res) => {
        console.log(res.data); // 返回复制的内容
    }
})
```

## 参数拼接

```js
export function qsStringify (data) {
  let params = [];
  Object.keys(data).forEach(key => {
    params.push(key + '=' + data[key])
  })
  return params.join('&');
}
```

## 火星坐标（GCJ02） 与  百度坐标（bd09II）互相转化
```js
// 火星坐标（GCJ02） 转百度坐标（bd09II）
export function marsTobaidu (mars_point) {
  const x_pi = 3.14159265358979324 * 3000.0 / 180.0
  const baidu_point = { lon: 0, lat: 0 }
  const x = mars_point.lon
  const y = mars_point.lat
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)
  baidu_point.lon = z * Math.cos(theta) + 0.0065
  baidu_point.lat = z * Math.sin(theta) + 0.006
  return baidu_point
}

// 百度坐标 （bd09II）转火星坐标 （GCJ02）
export function baiduTomars (baidu_point) {
  const x_pi = 3.14159265358979324 * 3000.0 / 180.0
  const mars_point = { lon: 0, lat: 0 }
  const x = baidu_point.lon - 0.0065
  const y = baidu_point.lat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
  mars_point.lon = z * Math.cos(theta)
  mars_point.lat = z * Math.sin(theta)
  return mars_point
}
```

## 发布-订阅模式
```js
// 简易版本
export const event = {
    list: {},
    // 监听
    on (key, fn) {
        if(!this.list[key]) {
            this.list[key] = [];
        }
        this.list[key].push(fn);
    },
    // 发送
    emit () {
        // 从函数调用的参数中提取第一个参数，并从 arguments 对象中删除它, 并将其存储在变量 key 
        let key = [].shift.call(arguments),
        fns = this.list[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        fns.forEach(fn => {
            fn.apply(this, arguments);
        });
    },
    // 取消订阅
    remove (key, fn) {
        let fns = this.list[key];
        if (!fns) return false;

        // 如果没有传对应函数的话
        // 就会将key值对应缓存列表中的函数都清空掉
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            fns.forEach((cb, i) => {
                if (cb === fn) {
                    fns.splice(i, 1);
                }
            });
        }
    }
}
```

```js
// common/event.js
const observerMap = {};

const listen = function (key, fn) {
    if (!observerMap[key]) {
        observerMap[key] = [];
    }
    observerMap[key].push(fn);
}

const trigger= function () {
    const key = Array.prototype.shift.call(arguments),
    fns = observerMap[key];
    if (!fns || fns.length === 0) {
        return false;
    }
    // fns.forEach(fn => {
    //     fn.apply(this, arguments);
    // });
    for (let i = 0, fn; fn = fns[i]; i++) {
        fn.apply(this, arguments);
    }
}

const remove = function (key, fn) {
    const fns = observerMap[key];
    if (!fns) {
        return false;
    }
    if (!fn) {
        fns && (fns.length = 0);
    } else {
        let findIndex = -1;
        for (let i = 0; i < fns.length;) {
            if (fns[i] === fn) {
                findIndex = i;
                break;
            }
        }
        if (findIndex !== -1) {
            // 找到要取消订阅的事件索引---删除
            fn.splice(findIndex, 1);
        }
    }
}

let offlineStack = [];  // listen 之前的 emit 事件进行缓存

const triggerProxy = function () {
    const _self = this;
    const args = arguments;
    const fn = function () {
        return trigger.apply(_self, args);
    };
    if (offlineStack) {
        return offlineStack.push(fn); // 缓存事件
    }
    return fn(); // 触发事件
}

const listenProxy = function (key, fn) {
    listen(key, fn);
    if (!offlineStack) {
        return;
    }
    // 触发之前缓存的事件
    for (let i =0, fn; fn = offlineStack[i]; i++) {
        fn();
    }
    offlineStack = null;
}

export const EventBus = {
    on: listenProxy,
    emit: triggerProxy,
    remove
}




// 使用
import { EventBus } from '@/common/event.js';

EventBus.on('test', () => {
    console.log('监听test');
});

EventBus.emit('test');
EventBus.remove('test');
```

## 函数的参数
```js
function myFunction(...args) {
  const key = args.shift(); // 或者直接使用解构来获取第一个参数
  // 函数的其余逻辑
}

// 或者，如果你只关心第一个参数，可以这样写：
function myFunction(key, ...rest) {
  // 在这里，`key` 就是第一个参数
  // `rest` 是一个数组，包含了除了第一个参数之外的所有参数
  // 函数的其余逻辑
}
```

## [小程序富文本组件实现用户协议](https://ext.dcloud.net.cn/plugin?id=805)
1. 点击右上角的 `使用 HBuilder X 导入插件` 按钮`直接导入项目`或点击 `下载插件 ZIP` 按钮下载插件包并`解压`到项目的 `uni_modules/mp-html` 目录下
2. 使用
```vue
<template>
    <mp-html :content="html" />
</template>
<script>
export default {
    data() {
        return {
            html: '<div style="font-family: 宋体;">Hello World!</div>'
        }
    }
}
</script>
```

## 验证收寄件人省市区是否存在

```js
export const isValidRegion = (expressInfo) => {
  const regionList = [ ...uni.getStorageSync('mainlandRegion'), ...uni.getStorageSync('otherlandRegion') ]
  let flag = false
  for (let i = 0; i < regionList.length; i++) {
    if (regionList[i].code === expressInfo.provCode) {
      for (let j = 0; j < regionList[i].child.length; j++) {
        if (regionList[i].child[j].code === expressInfo.cityCode) {
          for (let k = 0; k < regionList[i].child[j].child.length; k++) {
            if (regionList[i].child[j].child[k].code === expressInfo.districtCode) {
              flag = true
              break
            }
          }
          if (flag === true) break
        }
      }
      if (flag === true) break
    }
  }
  return flag
}

// 由于使用了多层循环，所以每个if (flag === true) break语句都是必要的，以确保在找到匹配项后能够立即退出所有循环。
```

## uni.scss定义全局样式变量
```scss
/* 主题色 */
$theme1: #6C5BABFF;
$theme2: #FE8200FF;
$theme3: #FFECC9;

/* 定义静态资源图片地址 */
@function static-img($name) {
    @return "/static/temp/#{$name}@2x.png";
}
```

```css
.content {
    background-color: $theme1;
    background: url(static-img2('home/collect_miniprogram')) no-repeat top left;
    background-size: 100% auto;
    /**
    可简写为:
    background: $theme1 url(static-img2('home/collect_miniprogram')) no-repeat top left;
    background-size: 100% auto;
    */
}
```

```css
.me {
  width: 750rpx;
  height: 100vh;
  box-sizing: border-box;
  background: #F2F3F4 url(static-img3('personalMember/top/bg')) no-repeat left top;
  background-size: 100% 630rpx;
  overflow-y: scroll;
  overflow-x: hidden;
}
```

## 微信小程序使用自定义组件
```json
{
    // 全局样式及全局范围内可引用自定义组件
    "gobalStyle": {
        "navigationBarTitleText": "小程序标题",
        "navigationBarTextStyle": "black",
		"navigationBarBackgroundColor": "#fff",
		"backgroundColor": "#F2F2F2"
        /*  #ifdef  MP-WEIXIN  */
        "usingComponents": {
            "my-component": "/wxcomponents/vant/weapp/component/index"
        }
        /*  #endif  */
    }
}
```

## 使用Vant Weapp微信小程序版本组件库
![dist源代码](/wechat/vant-weapp.png)

+ [官方使用-快速开始](https://vant-ui.github.io/vant-weapp/#/quickstart)
+ [github地址](https://github.com/youzan/vant-weapp/tree/dev/dist)
+ 本项目是采用`下载源代码`的方式使用@vant/weapp组件库


## app.vue定义应用生命周期
```vue
<script>
export default {
    onLaunch(option) {
        console.log('App Launch', option)
    },
    onShow() {
        console.log('App Show');
        // #ifdef MP-WEIXIN
        // 微信小程序更新版本
        if (uni.canIUse('getUpdateManager')) {
        // 获取应用更新管理器
        const updateManager = uni.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            if (res.hasUpdate) {
                updateManager.onUpdateReady(function () {
                    uni.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success: function (res) {
                            if (res.confirm) {
                                updateManager.applyUpdate();
                            }
                        }
                    });
                });
                updateManager.onUpdateFailed(function () {
                    uni.showModal({
                        title: '已经有新版本了哟~',
                        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                    });
                });
            }
        })
        }
        // #endif
    },
    onHide() {
        console.log('App Hide')
    },
    onUnload () {
        console.log('App Unload')
    },
    onError() {
        console.log('App Error')
    },
}
</script>
```