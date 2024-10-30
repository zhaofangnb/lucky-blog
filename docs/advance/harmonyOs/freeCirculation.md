# 自由流转

![自由流转的两种形式](/harmoneyOs/freeCiculation.png)

+ 跨段迁移
+ 多端协同

![分布式应用开发模型](/harmoneyOs/distribution.png)


### 跨段迁移应用开发
1.在`entry/src/main/module.json5`配置文件中:<br/>
```json
module: {
    ...,
    "abilities": [
        ...,
        "continuable": true,  // 1.配置跨段迁移能力
        "lauchType": "singleton" // 2.配置启动模式为单例
        // 冷启动场景使用onCreate()实现   
        // 热启动场景使用onNewWant()实现
    ],
    "requestPermissions": [
        {
            "name": "ohos.permission.DISTRIBUTED_DATASYNC",
            // 3.增加权限配置，用于不同设备间的数据交换
        }
    ]
}
```


2. 应用动态运行时申请用户授权(分布式数据同步权限的权限类型为user_agent，需要动态申请用户授权。)

```js
onCreate (want: Want, launchParam: AbilityConstant.LaunchParam): void {
    ...
    this.checkPermissions(); 
    ...
}

async checkPermissions():Promise<void> {
    const permissions: Array<Permissions> = ["ohos.permission.DISTRIBUTED_DATASYNc"];
    const accessManager = abilityAccessCtrl.createAtManager();

    try {
        const bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
        const bundleInfo= await bundleManager.getBundleInfoForSelf(bundleFlags);
        const tokenId = bundleInfo.appInfo.accessTokenId;
        // 4. 获取授权状态
        const grantStatus = await accessManager.checkAccessToken(tokenId,permissions[θ]); 
        // 5. 未获得授权，需要向用户申请权限
        if(grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_DENIED){
            accessManager.requestPermissionsFromUser(this.context, permissions);
        }
    } catch（err）{
        console.error(err);
    }
}
```

3. 实现简单的接口
```js
// 源端：
onContinue(wantParam: Record<string, Object | undefined> ): AbilityConstant.onContinueResult {
    return AbilityConstant.onContinueResult.AGREE;   // 6.返回同意跨段迁移
}

// 对端:
onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    ...,
    this.checkPermissions(); 
    if(launchParam.lauchReason === AbilityConstant.LaunchReason.CONTINUATION){
        this.context.reStoreWindowStage(new LocalStorage());  // 7.触发页面恢复
    }
}
```

### 分布式数据传输
·页面数据<br/>
  + 1.使用ArkUI支持数据迁移的组件
  + 2.通过配置项设置进行页面栈迁移

·业务数据<br/>
  + 1.少量应用状态（<100KB）通过wantParam传输
  + 2.内存数据通过分布式对象迁移
  + 3.文件数据通过分布式文件迁移

```js
@Entry
@Component
struct Index {
    private arr: number[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    build() {
        Column() {
            // 部分组件支持数据迁移，如: List, Grid, Scroll, WaterFlow等
            List({ space: 20 }) {
                ForEach(this.arr, (item: number) => {
                    ListItem() {
                        Text('' + item)
                    }
                }, (item:number) => item.toString())
            }
            .restoredId(1) // 8.给需要迁移的组件设置restoredId
        }
    }
}
```

```js
// 页面栈迁移
onContinue(wantParam: Record<string: Object | undefined>): AbilityConstant.OnContinueResult {
    // 配置迁移页面栈和页面状态
    wantParam["ohos.extra.param.key.supportContinuePageStack"]= false;
    return AbilityConstant.OnContinueResult.AGREE;
}
onCreate(want: Want,launchParam:AbilityConstant.LaunchParam):void {
    if (launchParam.launchReason == AbilityConstant.LaunchReason.CONTINUATION) {
        this.context.restoreWindowStage(new LocalStorage()); // 9.触发页面恢复
    }
}

```
