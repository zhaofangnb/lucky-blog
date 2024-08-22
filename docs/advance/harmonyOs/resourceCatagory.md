# 资源分类与访问
```bash
resources
|---base
|   |---element
|   |   |---string.json
|   |---media
|   |   |---icon.png
|   |---profile
|   |   |---test_profile.json
|---en_US  // 默认存在的目录，设备语言环境是美式英文时，优先匹配此目录下资源
|   |---element
|   |   |---string.json
|   |---media
|   |   |---icon.png
|   |---profile
|   |   |---test_profile.json
|---zh_CN  // 默认存在的目录，设备语言环境是简体中文时，优先匹配此目录下资源
|   |---element
|   |   |---string.json
|   |---media
|   |   |---icon.png
|   |---profile
|   |   |---test_profile.json
|---en_GB-vertical-car-mdpi // 自定义限定词目录示例，由开发者创建
|   |---element
|   |   |---string.json
|   |---media
|   |   |---icon.png
|   |---profile
|   |   |---test_profile.json
|---rawfile // 其他类型文件，原始文件形式保存，不会被集成到resources.index文件中。文件名可自定义。
|---resfile // 其他类型文件，原始文件形式保存，不会被集成到resources.index文件中。文件名可自定义。
```

## 资源目录
**base目录**
>目录中的资源文件会被`编译成二进制文件`，并赋予`资源文件ID`。通过指定资源类型（type）和资源名称（name）引用。

**限定词目录**
> `en_US`和`zh_CN`是默认存在的两个限定词目录，`其余限定词目录`需要开发者根据开发需要自行创建，需留意命名规则。<br/>
> 目录中的资源文件会被`编译成二进制文件`，并赋予`资源文件ID`。通过指定资源类型（type）和资源名称（name）引用。

**rawfile目录**
>支持创建多层子目录，子目录名称可以自定义，文件夹内可以自由放置各类资源文件。<br/>

> 目录中的资源文件会被直接打包进应用，不经过编译，也不会被赋予资源文件ID。通过指定文件路径和文件名引用。

**resfile目录**
>支持创建多层子目录，子目录名称可以自定义，文件夹内可以自由放置各类资源文件。<br/>

>目录中的资源文件会被直接打包进应用，不经过编译，也不会被赋予资源文件ID。应用安装后，resfile资源会被解压到应用沙箱路径，通过Context属性resourceDir获取到resfile资源目录后，可通过文件路径访问。

## 资源组目录
+ element
+ media
+ profile

### element
JSON文件表征:

- boolean，布尔型

- color，颜色

- float，浮点型，范围是-2^128-2^128

- intarray，整型数组

- integer，整型，范围是-2^31-2^31-1

- plural，复数形式

- strarray，字符串数组

- string，字符串

### media
表示媒体资源，包括图片、音频、视频等非文本格式的文件
+ 图片支持`.jpg`, `.png`, `.gif`, `.svg`, `.webp`, `.bmp`
+ 音频支持`.mp3`, `.3gp`

## 资源如何访问

+ 对于“color”、“float”、“string”、“plural”、“media”、“profile”等类型的资源，通过`"$r('app.type.name')"`形式引用。其中，`app`为resources目录中定义的资源；`type`为资源类型或资源的存放位置；`name`为资源名，开发者定义资源时确定。
+ 对于`string.json中使用多个占位符`的情况，通过`"$r('app.string.label','aaa','bbb',444)"`形式引用。

+ 对于`rawfile`目录资源，通过`"$rawfile('filename')"`形式引用。其中，filename为rawfile目录下`文件的相对路径`，`文件名需要包含后缀`，路径开头不可以"/"开头。

```java
  Text('Hello')
  .fontColor($r('sys.color.ohos_id_color_emphasize')) // 使用系统中预定义的资源，统一应用的视觉风格
  .fontSize($r('sys.float.ohos_id_text_size_headline1'))
  .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
  .backgroundColor($r('sys.color.ohos_id_color_palette_aux1'))

  Image($r('sys.media.ohos_app_icon'))
  .border({
    color: $r('sys.color.ohos_id_color_palette_aux1'),
    radius: $r('sys.float.ohos_id_corner_radius_button'), width: 2
  })
  .margin({
    top: $r('sys.float.ohos_id_elements_margin_horizontal_m'),
    bottom: $r('sys.float.ohos_id_elements_margin_horizontal_l')
  })
  .height(200)
  .width(300)
```

+ 通过本应用上下文获取ResourceManager后，调用不同资源管理接口访问不同资源。

> 例如：getContext().resourceManager.getStringByNameSync('test') 可获取字符串资源；getContext().resourceManager.getRawFd('rawfilepath') 可获取Rawfile所在hap包的descriptor信息，访问rawfile文件时需{fd, offset, length}一起使用。

## 资源匹配
> 应用使用某资源时，系统会根据当前设备状态优先从相匹配的限定词目录中寻找该资源。只有当resources目录中没有与设备状态匹配的限定词目录，或者在限定词目录中找不到该资源时，才会去base目录中查找。rawfile是原始文件目录，不会根据设备状态去匹配不同的资源。

```java
@Entry
@Component
struct Index {
  @State englishString: string = ""
  @State germanString: string = ""

  getString(): string {
    let resMgr = getContext().resourceManager
    let resId = $r('app.string.greetings').id

    //获取符合当前系统语言地区、颜色模式、分辨率等配置的资源
    let currentLanguageString = resMgr.getStringSync(resId)

    //获取符合当前系统颜色模式、分辨率等配置的英文资源
    let overrideConfig = resMgr.getOverrideConfiguration()
    overrideConfig.locale = "en_US" //指定资源的语言为英语，地区为美国
    let overrideResMgr = resMgr.getOverrideResourceManager(overrideConfig)
    this.englishString = overrideResMgr.getStringSync(resId)

    //获取符合当前系统颜色模式、分辨率等配置的德文资源
    overrideConfig.locale = "de_DE" //指定资源的语言为德语，地区为德国
    overrideResMgr.updateOverrideConfiguration(overrideConfig) //等效于resMgr.updateOverrideConfiguration(overrideConfig)
    this.germanString = overrideResMgr.getStringSync(resId)

    return currentLanguageString
  }

  build() {
    Row() {
      Column() {
        Text(this.getString())
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Text(this.englishString)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Text(this.germanString)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
}
```
### overlay机制