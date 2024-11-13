# js事件循环
1. 执行同步任务，这些任务被放置在执行栈中。

2. 当遇到异步任务（如setTimeout, AJAX请求等），则将其回调函数放置在一个特定的任务队列中（例如setTimeout的回调会放在`宏任务（macrotask）队列`中，而Promise的回调会放在`微任务（microtask）队列`中）。

3. 继续执行执行栈中的同步任务。

4. 当执行栈为空时，浏览器会检查`微任务队列`，如果有任务，则执行这些任务。

5. 微任务执行完毕后，浏览器会检查`宏任务队列`，并执行队列中的一个宏任务。

6. 执行完一个宏任务后，浏览器会再次检查微任务队列。

7. 如此循环，直到所有任务都被执行。



+ 宏任务：script，setTimeout（0s也是宏任务）, setInterval, setImmediate, I/O, UI-rendering
+ 微任务：Promise.then(), process.nextTick(), MutationOvserver(), Object.observe(), requestAnimationFrame()

```js
// node.js环境

console.log('Step 1'); // 同步任务


setTimeout(function() {  // 进入宏任务队列
    console.log('Step 2');
    process.nextTick(function () {
        console.log('Step 3');
    });
    new Promise(function (resolve) {
        console.log('Step 4');
        resolve();
    }).then(function () {
        console.log('Step 5');
    });
});

process.nextTick(function () { // 进入微任务队列
    console.log('Step 6'); // 比 new Promise()构造函数中的同步代码先执行，有更高优先级
});

new Promise(function (resolve) { 
    // new Promise构造函数本身是同步执行
    console.log('Step 7'); 
    resolve();
}).then(function () {
    console.log('Step 8');
});

setTimeout(function() { // 宏任务
    console.log('Step 9');
    process.nextTick(function () {
        console.log('Step 10');
    });
    new Promise(function (resolve) {
        console.log('Step 11');
        resolve();
    }).then(function () {
        console.log('Step 12');
    });
});


// 输出结果
// Step 1：首先执行同步代码。

// Step 6：然后是第一个process.nextTick，因为它在当前执行栈清空后会立即执行。

// Step 7：接下来是第二个同步执行的console.log，在Promise构造函数中。

// Step 8：之后是第一个Promise的.then()，因为它被推入微任务队列中并在当前执行栈清空后执行。

// Step 2：此时，事件循环开始处理宏任务队列，执行第一个setTimeout中的同步代码。

// Step 4：在setTimeout内部的Promise构造函数中的同步代码执行。

// Step 3：紧接着是setTimeout内部的process.nextTick，因为它会在当前执行栈清空后立即执行。

// Step 5：然后是setTimeout内部的Promise的.then()方法，因为它被推入微任务队列中。

// Step 9：事件循环继续处理下一个宏任务，即第二个setTimeout中的同步代码。

// Step 11：在第二个setTimeout内部的Promise构造函数中的同步代码执行。

// Step 10：接下来是第二个setTimeout内部的process.nextTick。

// Step 12：最后是第二个setTimeout内部的Promise.then()方法。
```


```js
// 浏览器环境

console.log(1);

new Promise((resolve, reject) => {
    // new Promise构造函数本身是同步执行
    console.log(2);
    resolve();
}).then(() => {
    // 进入异步微任务队列1
    console.log(3);
}).then(() => {
    // 进入异步宏任务队列2
    console.log(4);
});

// 进入宏任务队列
setTimeout(function () {
    console.log(5);
});

console.log(6);
// 输出结果
// 1 2 6 3 4 5
```

```js
 // 浏览器环境
console.log(1);

new Promise((resolve, reject) => {
    console.log(2);
    resolve();
}).then(() => {
    // 进入异步微任务队列
        console.log(3);
        // 进入异步宏任务队列1
        setTimeout(() => {
            console.log(4);
        }, 0)
});

setTimeout(() => {
    console.log(5);
    // 进入异步宏任务队列2
    setTimeout(() => {
        console.log(6);
    }, 0)
}, 0)

console.log(7);

// 输出结果
// 1 2 7 3 5 4 6
```

```js
console.log('script start');

async function async1() {
    await async2(); // await会将后续代码阻塞进微任务队列
    console.log('async1 end'); // 加入异步微任务队列1 
}
async function async2() {
    console.log('async2 end'); // 同步代码直接执行
}
async1();

setTimeout(function () {
    // 加入异步宏任务队列
    console.log('setTimeout');
}, 0);

new Promise(function (resolve, reject) {
    console.log('promise');
    resolve();
}).then(() => {
    // 加入异步微任务队列2
        console.log('then1');
}).then(() => {
    // 加入异步微任务队列3
        console.log('then2');
});

console.log('script end');

// 输出结果
// script start
// async2 end
// promise
// script end
// async1 end
// then1
// then2
// setTimeout
```