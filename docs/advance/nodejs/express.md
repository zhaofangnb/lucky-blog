# express

## Express简介
Express是一个基于Node.js的Web框架。它开源、免费、易于扩展并且非常高效，可以使用各种各样的预购建的包来处理应用中的各项内容。

## 如何安装Express
如果是一个空文件夹，首先使用命令创建一个新的Node.js的项目
```
npm init -y
```

然后执行:
```
npm install express
```
在项目中安装express。

## 第一个Hello World！
我们先要创建一个简单的`Express Web服务器`：
```js
// 项目根文件夹下的 app.js
const express = require('express')
const app = express()

app.get('/',(req, res) => res.send('Hello World!'))
app.listen(3000, () => { console.log('Server start at localhost:3000')})
```

然后通过以下命令启动服务器:
```
node app.js
```

打开浏览器通过`localhost`导航到`port3000`

上面四行代码做了哪些工作：
- 首先通过`express变量`引用`express包`
- 通过调用express()方法实例化一个应用.
- 一旦创建了应用对象，就使用`get()`方法监听来自`/`路径的GET请求，这些HTTP请求对应的方法都接收一个回调函数。
- Express在回调中发送两个对象：`req` 和 `res`,分别代表了请求和响应对象。
- 在本例的回调中通过`res.send()`方法发送Hello World字段返回给客户端，将字符串作为请求体，传输完毕后关闭连接。
- 最后一行代码是启动服务器，告诉它在3000端口监听

## 请求参数
Request对象持有Http请求信息，以下是主要属性:
| 属性 | 介绍|
| --   | -- |
| .app   | 对 Express app 对象的引用 |
| .baseUrl | app响应的基本路径 |
| .body | 包含在请求体中提交的数据(必须通过手动解析和填充后才能访问)|
| .cookies | 包含由请求发送的cookes(需要cookie-parser中间件) |
| .hostname| Host HTTP标头定义的主机名 |
| .ip | 客户端IP |
| .method | 使用的HTTP方法 |
| .params | 路由命名参数 |
| .path  | URL路径 |
| .protocal | 请求协议|
| .query | 包含请求中所有查询字符串的对象|
| .secure | 请求是安全(使用HTTPS)时为ture|
| .signedCookies | 包含由请求发送的签名 cookies（需要 cookie-parser 中间件） |
|.xhr	| 请求为 XMLHttpRequest 时为 true|

## 如何向客户端发送响应
```js
(req, res) => res.send('Hello World')
```
上述例子中使用响应对象的`send()`方法来将一个字符串作为响应。

如果传入一个字符串，它将`Content-Type`标头设置为`text/html`

如果传入的是对象或者数组，它将`Content-Type`标头设置为`application/json`，并将传入的对象或数组解析为`JSON`,之后send()关闭连接

sned()自动设置`Content-Type`标头，不像`end()`需要手动设置。

## 如何设置HTTP响应状态
在响应对象使用`status()`方法:
```js
res.status(404).end()
```
或者:
```js
res.status(404).send('Not Found')
```
sendStatus() 是快捷方式：
```js
res.sendStatus(200);
// === res.status(200).send('OK')

res.sendStatus(403);
// === res.status(403).send('Forbidden')

res.sendStatus(404);
// === res.status(404).send('Not Found')

res.sendStatus(500);
// === res.status(500).send('Internal Server Error')
```
## 如何发送一个JSON响应
可以使用响应对象的`json()`方法：
```js
res.json({
    username: '张三',
    age: 18
})
```

## 如何管理cookies

使用响应对象的`cookie()`方法：
```js
res.cookie('username', 'camile')
```
这个方法还接受第三个参数，包含各种选项:
```js
res.cookie('username','camile', {
    domain: '', //域名
    path: '', // cooki路径，默认为'/'
    secure: true, // 标记为 cookie HTTPS only
    expires: new Date(Date.now() + 900000), // 过期时间
    httpOnly: true, // 设置 cookie 仅被 web 服务器访问
    maxAge: '', // 设置相对于当前时间的过期时间，以毫秒为单位

})
```

清除cookie可以使用:

```js
res.clearCookie('username')
```

## 如何处理HTTP标头

### 如何通过请求获取HTTP标头
可以使用请求对象的`headers`属性访问:
```js
app.get('/', (req, res) => {
    console.log(req.headers)
})
```
使用请求对象的`header()`方法获取单个请求标头的值:
```js
app.get('/', (req, res) => {
    req.header('User-Agent')
})
```

### 如何为响应改变HTTP标头
可以使用响应对象的`set()`方法：
```js
res.set('Content-Type', 'text/html')
```

### 如何处理重定向
使用响应对象的`redirect()`方法:
```js
res.redirect('/redirect')
```

## Express中的路由
路由时确定调用URL时应该发生什么的过程。
```js
app.get('/', (req, res) => {

});
```
这里创建了一个路由，访问根域URL`/`，并使用GET方法映射道我们需要的响应。

## 命名参数

我们不希望参数作为查询字符串发送，而是希望作为URL的一部分发送。
```js
app.get('/uppercase/:value', (req, res) => {
    res.send(req.params.value.toUpperCase())
})
```
如果发送请求到`/uppercase/test`,我们会在响应体中得到`TEST`

你可以在同一个URL中使用多个命名参数，它们都将存储在`req.params`中。

## 如何使用正则表达式匹配路径
```js
app.get(/post/,(req, res) => {

})
```
以上代码将匹配`/post`、`/post/first`、`/thepost`、`/posting/something` 等路径。

## Express中的模板
Express能够处理服务器端模板引擎。

模板引擎允许我们向视图添加数据，并动态生成HTML。

Express 默认使用 Jade。Jade 是 Pug 的旧版本，特指 Pug 1.0。

请注意，由于商标问题，该项目在 2016 年发布第二版时，名称从 Jade 改为 Pug。你仍然可以使用 Jade，又称 Pug 1.0，但往后最好使用 Pug 2.0。

你可以在任何新项目中使用 Pug 或你选择的引擎。Pug 的官方网站是https://pugjs.org/。

可以使用许多不同的模板引擎，包括 Pug、Handlebars、Mustache、EJS 等。

安装:
```
npm install pug
```

初始化应用时，需要设置:
```js
const express = require('express')
const app = express()
app.set('view engine', 'pug')
```
然后就可以在`.pug`文件中编写模板。

创建一个about视图:

```js
app.get('/about', (req,res) => {
    res.render('about')
})
```
模板路径为`views/about.pug`

```
p Hello from camile
```
该模板创建一个p标签，内容为`Hello from camile`

可以使用一下代码插入变量：
```js
app.get('/about', (req, res) => {
  res.render('about', { name: 'camile' });
});
```

```
p Hello from #{name}
```

推荐你使用这个在线 HTML 到 Pug 转换器 https://html-to-pug.com/。


## Express中间件

`中间件`是一个挂钩到路由过程中的函数,在链中的某个点执行任意操作(取决于我们想要它做什么)。

通常用于`编辑请求或响应对象，或者在请求到达路由处理程序代码之前终止请求`。

可以通过如下方法`将中间件添加到执行栈`:
```js
app.use((req, res, next) => {

})
```
这和定义路由类似，但是在 Request 和 Response 实例之后，我们还引用了 next 中间件函数，并分配给了next变量。

我们总是在中间件函数末尾调用next()以便将执行传递给下一个处理程序。除非我们想提前结束响应并将其发送回客户端。


```
npm install cookie-parser
```

```js
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser') // 中间件cookie-parser，它可以将 cookie 解析为 req.cookies对象

app.get('/', (req, res) => res.send('Hello World'))
app.use(cookieParser)
app.listen(3000, () => console.log('server start at localhost:3000'))
```

我们还可以`将中间件函数设置为仅针对特定路由运行`，方法是将其作为路由定义的第二个参数:
```js
const myMiddleware = (req, res, next) => {
    /* */
    next()
}
app.get('/', myMiddleware, (req, res) => res.send('Hello World'))
```

如果需要存储中间件生成的数据，并传递给后续中间件函数或请求处理程序，你可以使用Request.locals对象。它将该数据附加到当前请求：
```
req.locals.name = 'Flavio';
```

## 如何使用Express提供静态资源
```js
const express = require('express')
const app = express()

app.use(express.static('public'))
```
通常图片、CSS 被存储在 public子文件夹，并暴露给根目录：

如果在 `public/` 有一个`index.html`文件，当你访问根域 URL(`http://localhost:3000`)时，就会提供静态资源。

## 如何向客户端发送文件
Express提供了一个渐变的方法将文件转换为附件传输: `Response.download()`

一旦用户点击使用此方法发送文件的路由，浏览器将提示用户下载。

 `Response.download()`方法允许发送附件到请求的文件，浏览器不会再页面中显示它，而是将其保存在磁盘中。
 ```js
app.get('/',(req, res) => res.download('./file.pdf'))
 ```

 可以将文件设置为使用自定义文件名发送:
 ```js
res.download('./file.pdf', 'user-facing-filename.pdf');
 ```

 此方法提供了一个回调函数，可以在文件发送后执行代码:
```js
res.download('./file.pdf', 'user-facing-filename.pdf', (err) => {
  if (err) {
    //handle error
    return;
  } else {
    //do something
  }
});
```

## Express中的会话
默认情况下，Express请求是有顺序的，但请求之前没有相互链接，所有没有办法知道这个请求是否来自之前已经执行过请求的客户端。

使用会话后，你的API或网站的每个用户都将被分配一个唯一的会话，就可以存储用户的状态。

我们将使用 express-session 模块来演示，它由 Express 团队维护。

安装:
```
npm install express-session
```

```js
const express = require('express')
const session = require('express-session')
const app = express()
app.use(
    session({
        secret: '343ji43j4n3jn4jk3n'
    })
)
```
所有应用路由都是用会话，`secret`是唯一必填参数，必须为一个唯一的随机字符串，还有许多可选参数。

会话会被添加到请求，所以可以通过`req.session`访问:
```js
app.get('/',(req, res) => {
    console.log(req.session)
})
```

该对象可用于从会话中获取数据，也可用于设置数据：
```js
req.session.name = 'Flavio';
console.log(req.session.name); // 'Flavio'
```

会话数据可被存储在：

- 内存，不适用于生产
- 数据库，如 MySQL 或者 Mongo
- 内存缓存，如 Redis 或者 Memcached

## 如何在Express中验证输入
假设你有一个接收name、email、age参数的post端点：
```js
const express = require('express')
const app = express()

app.use(express.json())
app.post('/form', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const age = req.body.age
})
```
如何对这些结果执行服务器端验证以确保:
+ name是包含至少三个字符的字符串?
+ email是真正的邮箱地址?
+ age为0到110之间的数字?

在Express中处理来自外部的任何输入的验证的最佳方法是使用`express-validator`包:

安装:
```
npm install express-validator
```

引用包中的`check`和`validationResult`对象:
```js
const express = require('express')
const app = express()
const { check, validationResult } = require('express-validator')

app.use(express.json())
app.post('/form',
 [
    check('name').isLength({min: 3}),
    check('email').isEmail(),
    check('age').isNumberic()
 ],
 (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const name = req.body.name
    const email = req.body.email
    const age = req.body.age
})
```
上面使用了：

+ `isLength()`
+ `isEmail()`
+ `isNumeric()`
还有更多方法，都来自 `validator.js`，包括：

+ `contains()`, 检查是否包含指定值
+ `equals()`, 检查是否与指定值相等
+ `isAlpha()`
+ `isAlphanumeric()`
+ `isAscii()`
+ `isBase64()`
+ `isBoolean()`
+ `isCurrency()`
+ `isDecimal()`
+ `isEmpty()`
+ `isFQDN()`, 检查是否为完全合格的域名
+ `isFloat()`
+ `isHash()`
+ `isHexColor()`
+ `isIP()`
+ `isIn()`, 检查值是否属于允许值数组
+ `isInt()`
+ `isJSON()`
+ `isLatLong()`
+ `isLength()`
+ `isLowercase()`
+ `isMobilePhone()`
+ `isNumeric()`
+ `isPostalCode()`
+ `isURL()`
+ `isUppercase()`
+ `isWhitelisted()`, 检查输入是否在白名单内
你也可以使用`matches()`来进行正则表达式验证。

日期可以通过以下方式验证：

+ `isAfter()`, 检查输入的日期是否在你传入的日期之后
+ `isBefore()`, 检查输入的日期是否在你传入的日期之前
+ `isISO8601()`
+ `isRFC3339()`

可以使用`withMessage()`覆盖默认报错:
```js
check('name')
.isAlpha()
.withMessage('Must be only alphabetical chars')
.isLength({ min: 10})
.withMessage('Must be at least 10 chars long')
```

如果想要编写自定义验证器，可以使用`custom`验证器
```js
// 在回调函数中，你可以通过抛出异常或返回被拒绝的 promise 来拒绝验证：
app.post(
  '/form',
  [
    check('name').isLength({ min: 3 }),
    check('email').custom((email) => {
        if (alreadyHaveEmail(email)) {
            throw new Error('Email already registered');
        }
    }),
    // check('email').custom((email) => {
    //     if (alreadyHaveEmail(email)) {
    //         return Promise.reject('Email already registered');
    //     }
    // }),
    check('age').isNumeric()
  ],
  (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;
  }
);
```

## 如何在Express清理输入
在服务器端清理输入。

express-validator 包除了可以验证输入以外也可以清理输入。

通过在验证方法之后串联清理方法来添加清理：

```js
app.post(
  '/form',
  [
    check('name').isLength({ min: 3 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('age').isNumeric().trim().escape()
  ],
  (req, res) => {
    //...
  }
);
```
使用的清理方法包括:
+ `trim()`修剪字符串开头和结尾的字符（默认为空格）
+ `escape()`将 <, >, &, ', "和 /替换成它们对应的 HTML 实体
+ `normalizeEmail()`规范化电子邮件地址，它接受小写邮件地址或者子地址的选项。(如 flavio+newsletters@gmail.com)

其他的清理方法包括：

+ `blacklist()` 删除出现在黑名单中的字符
+ `whitelist()` 删除未出现在白名单中的字符
+ `unescape()` 将 HTML 编码的实体替换为<, >, &, ', " 和 /
+ `ltrim()` 类似于 trim()，但只修剪字符串开头的字符
+ `rtrim()` 类似于 trim()， 但只修剪字符串末尾的字符
+ `stripLow()`删除通常不可见的 ASCII 控制字符

强制转换格式：

+ `toBoolean()` 将输入字符串转换为布尔值。除了 '0'、'false' 和 '' 之外的所有内容都返回 true。在严格模式下，只有 '1' 和 'true' 返回 true。
+ `toDate()` 将输入字符串转换为日期，如果输入不是日期，则为 null。
+ `toFloat()` 将输入字符串转换为浮点数，如果输入不是浮点数，则转换为 NaN。
+ `toInt()`将输入字符串转换为整数，如果输入不是整数，则转换为 NaN。

在回调函数中，创建自定义清理器，只需返回清理后的值：
```js
const sanitizeValue = (value) => {
  //sanitize...
};

app.post(
  '/form',
  [
    check('value').customSanitizer((value) => {
      return sanitizeValue(value);
    })
  ],
  (req, res) => {
    const value = req.body.value;
  }
);
```

## 如何在Express中处理表单

```html
<form method="POST" action="/submit-form">
  <input type="text" name="username" />
  <input type="submit" />
</form>
```
当用户按下提交按钮时，浏览器会自动向页面同源的`/submit-form` URL 发出 POST请求。浏览器发送表单包含的数据，编码为` application/x-www-form-urlencoded`。在此特定示例中，表单数据包含`username`输入字段值。

表单也可以通过 GET 方法发送数据，但是大多数情况为POST。

表单数据将在 POST 请求体中发送。

可以使用`express.urlencoded()`中间件提取：
```js
const express = require('express');
const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);
app.post('/submit-form', (req, res) => {
  const username = req.body.username;
  //...
  res.end();
});
// 别忘记提前使用express-validator验证数据。
```

## 如何在Express中处理表单中的文件上传

```html
<form method="POST" action="/submit-form" enctype="multipart/form-data">
  <input type="file" name="document" />
  <input type="submit" />
</form>
```
别忘记在表单添加`enctype="multipart/form-data`，否则表单不会被上传。

当用户按下提交按钮时，浏览器会自动向页面同源的`/submit-form` URL 发出 POST 请求。浏览器发送表单包含的数据，表单编码为`multipart/form-data`。

使用`formidable`库处理多部分数据。

安装:
```
npm install formidable
```

使用:
```js
const express = require('express');
const app = express();
const formidable = require('formidable');

app.post('/submit-form', (req, res) => {
    // 实例化一个新的 Formidable 表单
    new formidable.IncomingForm()
})
```

这样做之后，我们需要解析表单。我们可以通过回调来同步执行此操作，这意味着所有文件都已处理。一旦 formidable 完成，文件就可以被访问：
```js
const express = require('express');
const app = express();
const formidable = require('formidable');

app.post('/submit-form', (req, res) => {
    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error', err);
            throw err;
        }
        console.log('Fields', fields);
        console.log('Files', files);
        for (const file of Object.entries(files)) {
        console.log(file);
        }
    })
})
```

或者可以使用事件而不是回调。例如，当每个文件被解析时，或其他事件（例如文件处理完成、接收非文件字段或发生错误）时，都会收到通知：
```js
app.post('/submit-form', (req, res) => {
    new formidable.IncomingForm()
    .parse(req)
    .on('field', (name, field) => {
        console.log('Field', name,field)
    })
    .on('file', (name, file) => {
        console.log('Uploaded file', name, file)
    })
    .on('aborted', () => {
        console.error('Request aborted by the user');
    })
    .on('error', (err) => {
      console.error('Error', err);
      throw err;
    })
    .on('end', () => {
      res.end();
    });
})
```
无论选择哪种方式，你都将获得一个或多个 Formidable.File 对象，这些对象为你提供有关已上传文件的信息。这些是可以调用的一些方法：

+ `file.siz`e, 以字节为单位的文件大小
+ `file.path`, 文件写入的路径
+ `file.name`, 文件名
+ `file.type`, 文件的 MIME 类型

路径默认为临时文件夹，如果监听 fileBegin 事件可以修改：
```js
app.post('/submit-form', (req, res) => {
  new formidable.IncomingForm()
    .parse(req)
    .on('fileBegin', (name, file) => {
      file.path = __dirname + '/uploads/' + file.name;
    })
    .on('file', (name, file) => {
      console.log('Uploaded file', name, file);
    });
  //...
});
```