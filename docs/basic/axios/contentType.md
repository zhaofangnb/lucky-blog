# Content-Type

 Content-Type（MediaType），即是Internet Media Type，互联网媒体类型，也叫做MIME类型。<br/>
 在互联网中有成百上千中不同的数据类型，HTTP在传输数据对象时会为他们打上称为MIME的数据格式标签，用于区分数据类型。

## 常见的四种Content-Type


### application/x-www-form-urlencoded

这是最常见的POST提交数据的方式，HTTP会将请求参数用`key1=val1&key2=val2`的方式进行组织，并放到`请求实体`里<br/>
如果是`中文`或者`特殊字符`就会自动就行`URL转码`。
`一般用于表单提交`。

```js
import axios from 'axios'
import qs from 'Qs'
let data = { "name": "中文", "nickname": "leoss", "addr": "c/g,:" }
axios.post(`${url}`, qs.stringify({data})).then(res => {
    
})
```
### application/json

JSON 是一种轻量级的数据格式，以`键值对`的方式组织数据。<br/>
使用这个类型，需要参数本身就是JSON格式,参数会被直接放在`请求实体`里，`不做任何处理`。

```js
import axios from 'axios'
let data = { "code":"1234","name":"yyyy" }
axios.post(`${url}`, data).then(res => {

})
```

![](https://segmentfault.com/img/bVbccg7?w=854&h=362)


### multipart/form-data

这是一个多部分多媒体类型，首先生成了一个boundary用于分割不同的字段，为了避免与正文内容重复，boundary很长很复杂.<br/>
然后Content-Type会指明是以multipart/form-data来编码，boundary就是用于分割字段的那个。

```js
import axios from 'axios'
let data = new FormData()
data.append('name', '中文')
data.append('nickname', 'leoss')
data.append('addr', 'c/g')
data.append('file', file) // 上传的文件
axios.post(`${url}`, data).then(res => {

})
```

### text/xml

这是一种使用HTTP作为传输协议，XML作为编码方式的远程调用规范。
```xml
POST http://www.example.com HTTP/1.1 
Content-Type: text/xml

<?xml version="1.0"?>
<methodCall>
    <methodName>examples.getStateName</methodName>
    <params>
        <param>
            <value><i4>41</i4></value>
        </param>
    </params>
</methodCall>
```
