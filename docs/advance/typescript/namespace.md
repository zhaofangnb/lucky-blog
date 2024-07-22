# 模块与命名空间

我们在不同的ts文件里命名同样的变量或方法是会报错的， 因为ts他们所处的空间是全局的。
```ts
// a.ts
const a = 1

// b.ts
const a = 2 //定义时报错
```

## 模块系统

```ts
// a.ts
export const a = 1

// b.ts
const a = 2 //ok
```

export把a变量变成了局部的命名空间内，与b.ts文件中的全局变量a不再产生冲突。

## 模块语法

利用`export`关键字导出变量或类型
```ts
export const a = 1

export type Person = {
    name: string
}

// 一次性导出

const a = 1
type Person {
    name: string
}
export { a, Person }

// 重命名
const a = 1
type Person {
    name: string
}
export { a as b, Person }
```

使用`import`关键字导入模块
```ts
import { a, Person } from './export'

// 重命名导入模块
import { Person as P } from './export'

// 模块整个导入
import * as P from './export'

// 导入后导出模块
export { Person as P } from './export'
```

## 命名空间

`namspace`用来解决重名问题

```ts
namespace SomeNameSpace {
    export const a = 1
    export coonst str = '张三'
    export const say = () => {
        console.log('SomeNameSpace')
    }
}

// 使用方式和对象一样
SomeNameSpace.a
SomeNameSpace.str
SomeNameSpace.say
```

可以在一个文件里面定义多个命名空间，每个命名空间可以包含相同的属性和方法<br/>
`export`暴露 `import`导入