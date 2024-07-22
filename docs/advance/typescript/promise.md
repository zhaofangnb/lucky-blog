# Promise手写 使用class方法

## 1.创建一个class对象，新增构建函数
```ts
class myPromise {
    public constructor( fn: (resolve: (value: unknown) => void) => void) {
        // 成功
        const resolve = (value: unknown) => {
            console.log(value)
        }
    fn(resolve)
    }
}
const a = new myPromise((resolve) => {
    resolve('123') // 123
})
```
这样创建一个类，具有回调对象里面函数的方法

## 2.新增状态,执行返回值，拒绝返回值
```ts
const PENDING = 'pending' // 等待中
const FULFILLED = 'fulfilled' // 执行
CONST REJECTED = 'rejected'  // 拒绝

class MyPromise {
    // 执行状态
    state = PENDING
    // 执行返回
    value:any = null
    // 失败返回
    reason:any = null

    public constructor( fn: (resolve: (value: unknown) => void, reject: (reason: unknown) => void) => void) {
        // resolve调用，state转化为成功态
        const resolve = (value: unknown) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
            }
        }

        const reject = (reason: unknown) => {
            if (this.state = 'pending') {
                this.state = 'rejected'
                this.reason = reason
            }
        }

        try {
            fn(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }
}

const a = new MyPromise((resolve) => {
    resolve('123') // 123
})
```

## 3.then方法实现
```ts
const PENDING = 'pending' // 等待中
const FULFILLED = 'fulfilled' // 执行
const REJECTED = 'rejected'  // 拒绝

class MyPromise {
    // 执行状态
    state = PENDING
    // 执行返回
    value:any = null
    // 失败返回
    reason:any = null

    public constructor( fn: (resolve: (value: unknown) => void, reject: (reason: unknown) => void) => void) {
        // resolve调用，state转化为成功态
        const resolve = (value: unknown) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
            }
        }

        const reject = (reason: unknown) => {
            if (this.state = 'pending') {
                this.state = 'rejected'
                this.reason = reason
            }
        }

        try {
            fn(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled?: Function, onRejected?: Function) {
        if (this,state === 'fulfilled' &&　onFulfilled) {
            　onFulfilled(this.value)
        } 
        if (this.state === 'rejected' &&　onRejected) {
            　onRejected(this.reason)
        }
    }
}

const a = new MyPromise((resolve) => {
    resolve('123')
})
a.then((res:string) => {
    console.log(res) // 123
})
```

## 4.处理异步问题
> **当`resolve`在`setTimeout`内执行，`then`时`state`还是`pending`等待状态,我们就需要在`then调用`时，将成功和失败存到各自的数组,一旦`resolve`或者`reject`就调用他们。**

```ts
enum Status {
    PENDING = 'pending' // 等待中
    FULFILLED = 'fulfilled' // 执行
    REJECTED = 'rejected'  // 拒绝
}
class MyPromise {
    // 执行状态
    state: Status = Status.PENDING
    // 执行返回
    value:any = null
    // 失败返回
    reason:any = null
    // 成功存放的数组
    onResolveCallbacks: Function[] = []
    // 失败存放的数组
    onRejectedCallbacks: Function[] = []

     public constructor( fn: (resolve: (value: unknown) => void, reject: (reason: unknown) => void) => void) {
        const resolve = (value: unknown) => {
            if (this.state === Status.PENDING) {
                this.state = Status.FULFILLED
                this.value = value
                // 一旦resolve执行，调用成功数组的函数
                this.onResolveCallbacks.forEach((fn) => fn())
            }
        }
        const reject = (reason:unknown) => {
            if (this.state === Status.PENDING) {
                this.state = Status.REJECTED
                this.reason = reason
                // 一旦reject执行,调用失败数组的函数
                this.onRejectedCallbacks.forEach((fn) => fn())
            }
        }

        try {
            fn(resolve, reject)
        } catch (err) {
            reject(err)
        }
     }

    then(onFulfilled?: Function, onRejected?: Function) {
            if (this.state === Status.FULFILLED &&　onFulfilled) {
                　onFulfilled(this.value)
            }
            if (this.state === Status.REJECTED &&　onRejected)　{
                　onRejected(this.reason)
            }
            // 处理
            if (this.state === Status.PENDING) {
                if (onFulfilled && typeof onFulfilled === 'function') {
                    // onFulfilled传入到成功数组
                    this.onResolveCallbacks.push(() => {
                        onFulfilled(this.value)
                    })
                }
                if (onRejected && typeof onRejected === 'function') {
                    // onRejected传入到失败数组
                    this.onRejectedCallbacks.push(() => {
                        onRejected(this.reason)
                    })
                }
            }
    }
}

const a = new MyPromise((resolve) => {
    setTimeout(() => {
        console.log('444')
        resolve('123')
    }, 500)
    console.log('333')
})

a.then((res:string) => {
    console.log(res)
})
// 最终结果: 333 444 123
```

## 5.链式then调用，用来解决回调地狱
```ts
enum Status {
    PENDING = 'pending' // 等待中
    FULFILLED = 'fulfilled' // 执行
    REJECTED = 'rejected'  // 拒绝
}
class MyPromise {
    // 执行状态
    state: Status = Status.PENDING
    // 执行返回
    value:any = null
    // 失败返回
    reason:any = null
    // 成功存放的数组
    onResolveCallbacks: Function[] = []
    // 失败存放的数组
    onRejectedCallbacks: Function[] = []

      public constructor( fn: (resolve: (value: unknown) => void, reject: (reason: unknown) => void) => void) {
        const resolve = (value: unknown) => {
            if (this.state === Status.PENDING) {
                this.state = Status.FULFILLED
                this.value = value
                // 一旦resolve执行，调用成功数组的函数
                this.onResolveCallbacks.forEach((fn) => fn())
            }
        }
        const reject = (reason:unknown) => {
            if (this.state === Status.PENDING) {
                this.state = Status.REJECTED
                this.reason = reason
                // 一旦reject执行,调用失败数组的函数
                this.onRejectedCallbacks.forEach((fn) => fn())
            }
        }

        try {
            fn(resolve, reject)
        } catch (err) {
            reject(err)
        }
      }

      then(onFulfilled?: Function, onRejected?: Function) {
        // 声明返回的promise2
        const promise2 = new MyPromise((resolve,reject) => {
            if (this.state === Status.FULFILLED && onFulfilled) {
                const x = onFulfilled(this.value)
                this.resolvePromise(promise2, x, resolve, reject)
            }
            if (this.state === Status.REJECTED &&　onRejected) {
                const x = onRejected(this.reason)
                this.resolvePromise(promise2, x, resolve, reject)
            }
            if (this.state === Status.PENDING) {
                if (onFulfilled && typeof onFulfilled === 'function') {
                    // onFulfilled传入到成功数组
                    this.onResolveCallbacks.push(() => {
                        const x = onFulfilled(this.value)
                        this.resolvePromise(promise2, x, resolve, reject)
                    })
                }
                if (onRejected && typeof onRejected === 'function') {
                    // onRejected传入到失败数组
                    this.onRejectedCallbacks.push(() => {
                        const x = onRejected(this.reason)
                        this.resolvePromise(promise2, x, resolve, reject)
                    })
                }
            }
        })
        return promise2
    }

    resolvePromise(promise2: MyPromise, x: any, resolve: (value:unknown) => void, reject: (value:unknown) => void ) {
        if (promise2 === x) {
            return reject(new TypeError('Chaining cycle deteced for promise #<promise>')) //需要检测是否存在循环调用了同一个promise
        }
        if ((typeof x === 'object' && x != null) || typeof x === 'function') {
            try {
                const then = x.then
                if (typeof then === 'function') {
                    then.call(x, (y:any) => {
                        console.log('y',y)
                        resolve(y)
                    }, (r:any) => {
                        reject(r)
                    })
                } else {
                    resolve(x)
                }
            }catch(err) {
                reject(err)
            }
        } else {
            // x 是一个普通值
            resolve(x)
        }
    }
}
```


```js
// 使用
new MyPromise((resolve) => {
    setTimeout(() => {
        console.log('开始')
        resolve('a')
    }, 500)
}).then((res:string) => {
    console.log(res)
    console.log('结束')
    return 'b'
}).then((res:string) => {
    console.log(res)
})
// 最终结果: 开始 a 结束 b

new Promise((resolve) => {
    resolve('a')
}).then((res) => {
    console.log(res)
    return 'b'
}).then((res) => {
    console.log(res)
})
// 最终结果: a b Promise{<fulfilled>: undefined} 
```

