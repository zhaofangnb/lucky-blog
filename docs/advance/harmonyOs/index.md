# 鸿蒙系统开发
![alt text](/harmoneyOs/develop.png)

## UI框架
ArkUI框架（方舟开发框架）可为开发者提供应用UI开发所必需的能力，比如多种组件、布局计算、动画能力、UI交互、绘制等。

+ 基于ArkTS的声明式开发范式（简称“声明式开发范式”）
+ 兼容JS的类Web开发范式（简称“类Web开发范式”）

## 应用模型
应用模型是HarmonyOS`为开发者提供的应用程序所需能力的抽象提炼`，它提供了应用程序`必备的组件`和`运行机制`。有了应用模型，开发者可以`基于一套统一的模型`进行应用开发，使应用开发更简单、高效。

+ **Stage模型：**  HarmonyOS `API 9`开始新增的模型，是`目前主推且会长期演进`的模型。在该模型中，由于提供了`AbilityStage、WindowStage等类`作为`应用组件`和`Window窗口`的“舞台”，因此称这种应用模型为Stage模型。
+ **FA（Feature Ability）模型：**  HarmonyOS `API 7`开始支持的模型，`已经不再主推`。

## [工程目录结构](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ide-project-structure-V5)

## 开发技巧
![alt text](/harmoneyOs/ets-part.png)

+  **pages**文件夹用于存储应用的主入口。它表示应用启动时最先执行的代码，是应用的入口点。
+  **model**文件夹用于存储数据模型。它表示组件或其他相关业务逻辑之间传输的数据，是对原始数据的进一步处理。
+  **view**文件夹用于UI组件。
```java
// src/main/ets/view/Banner.ets
// 引入工具方法
import { bufferToString } from '../util/BufferUtil';

@Component
export struct Banner {
  @State bannerList: BannerClass[] = [];

  getBannerDataFromJSON() {
    getContext(this).resourceManager.getRawFileContent('BannerData.json').then(value => {
      this.bannerList = JSON.parse(bufferToString(value.buffer)) as BannerClass[];
    })
  }
  
  build() {
  // ...
  }
}
```

+ **util**文件夹用于存储工具类。
```java
// src/main/ets/util/BufferUtil.ets

import { util } from '@kit.ArkTS';
// 读取json数据 buffer转string
export function bufferToString(buffer: ArrayBufferLike): string {
  let textDecoder = util.TextDecoder.create('utf-8', {
    ignoreBOM: true
  });
  let resultPut = textDecoder.decodeWithStream(new Uint8Array(buffer), {
    stream: true
  });
  return resultPut;
}
```

## 生命周期
![alt text](/harmoneyOs/lifecycle.png)