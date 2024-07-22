# 响应式系统核心[https://blog.csdn.net/qq_43422122/article/details/135733983]

github[https://github.com/SuYxh/share-vue3]

## 副作用
```js
let val = 1;

function effect () {
    val = 2; //修改全局变量，产生副作用
} 
```
当 `effect` 函数执行时，它会修改 `val` 的值，但除了 `effect` 函数之外的任何函数都可以修改 `val` 的值。也就是说，`effect`函数的执行会直接或间接影响其他函数的执行，这时我们说 `effect` 函数产生了副作用。

假设在一个副作用函数中读取了某个对象的属性：
```js
const obj = {
    age: 18
}

function effect () {
    console.log(obj.age)
} 
```
当 `obj.age` 的值发生变化时，我们`希望副作用函数 effect 会重新执行`，如果能实现这个目标，那么对象 obj 就是响应式数据。

## 响应式系统基本实现
+ 当副作用函数`effect`执行时，会触发`obj.age`的读取操作， 把副作用函数存储到一个桶里。
+ 当修改`obj.age`的值时，会触发字段`obj.age`的设置操作,把副作用函数从桶里取出执行。

```js
const bucket = new Set(); //储存副作用函数的桶

const data = {
    name: 'Tom',
    age： 10
}

// 对原始数据的代理
const obj = new Proxy(data, {
    get(target, key) {
        // 将副作用函数
        bucket.add(effect); 
        return target[key];
    },
    set(target, key, newVal) {
        target[key] = newVal;
        bucket.forEach(fn => fn());
        return true;
    }
})

//测试代码
// 副作用函数
function effect () {
    console.log(obj.age);
}

// 执行副作用函数，触发读取
effect();

// 修改响应式数据会触发effect重新执行
setTimeout(() => {
    obj.age = 15;
}, 1000)
```


+ 直接通过名字effect来获取副作用函数，如果名称变了怎么办？
+ 当我们在修改 name 的时候，副作用函数依然会执行

**解决硬编码副作用函数名字问题**

```js
const bucket = new Set(); //储存副作用函数的桶

const data = {
    name: 'Tom',
    age： 10
}
// 存储被注册的副作用函数
let currentEffect = null;

// 对原始数据的代理
const obj = new Proxy(data, {
    get(target, key) {
        // 将副作用函数添加到桶中
        if(currentEffect) {
             bucket.add(currentEffect);
        } 
        return target[key];
    },
    set(target, key, newVal) {
        target[key] = newVal;
        bucket.forEach(fn => fn());
        return true;
    }
})


// 副作用函数
export function effect (fn) {
   currentEffect = fn;
   fn();
   currentEffect = null;
}

// 执行副作用函数，触发读取
effect(() => {
    console.log(obj.age);
});

// 修改响应式数据会触发effect重新执行
setTimeout(() => {
    obj.address = '北京';
}, 1000)
```

**解决副作用函数会多次执行的问题**
匿名的副作用函数并没有读取obj.name,所以理论上，obj.name 并没有与副作用建立响应联系，因此，修改 obj.name 属性的值不应该触发匿名副作用函数重新执行。但如果我们执行上述这段代码就会发现，定时器到时后，匿名副作用函数却重新执行了，这是不正确的。为了解决这个问题，我们需要重新设计“桶”的数据结构。

原因:
没有在副作用函数与被操作的目标字段之间建立明确的联系


```js
const obj = new Proxy(data, {
    get(target, key) {
        if(!currentEffect) return;
        let depsMap = bucket.get(key);
        if (!depsMap) {
            bucket.set(target, (depsMap = new Map()));
        }
        let deps = depsMap.get(key);
        if (!deps) {
            depsMap.set(key, (deps = new Set()));
        }
        deps.add(currentEffect);
        return target[key];
    },
    set (target, key, newVal) {
        target[key] = newVal;
        const depsMap = bucket.get(target);
        if (!depsMap) return;
        const effects = depsMap.get(key);
        effects && effects.forEach(fn => fn());
        return true;
    }
})
```

**代码重构**

```js
function track (target, key) {
        if(!currentEffect) return target[key];
        // 根据 target 从“桶”中取得 depsMap，它也是一个 Map 类型：key --> effects
        let depsMap = bucket.get(target);
        // 如果不存在 depsMap，那么新建一个 Map 并与 target 关联
        if (!depsMap) {
            bucket.set(target, (depsMap = new Map()));
        }
        // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型，
        // 里面存储着所有与当前 key 相关联的副作用函数：effects
        let deps = depsMap.get(key);
        // 如果 deps 不存在，同样新建一个 Set 并与 key 关联
        if (!deps) {
            depsMap.set(key, (deps = new Set()));
        }
        // 最后将当前激活的副作用函数添加到“桶”里
        deps.add(currentEffect);
}

function trigger (target, key) {
    根据 target 从桶中取得 depsMap，它是 key --> effects
        const depsMap = bucket.get(target);
        if (!depsMap) return;
        // 根据 key 取得所有副作用函数 effects并执行
        const effects = depsMap.get(key);
        effects && effects.forEach(fn => fn());
}

// 对原始数据的处理
export function reactive(target) {
    return new Proxy(target, {
        // 拦截读取操作
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver);
            // 依赖收集
            track(target, key);
            return res;
        },
        // 拦截修改操作
        set(target, key, newVal, receiver) {
            const res = Reflect.set(target, key, newVal, receiver);
            //派发更新
            trigger(target, key);
            return res;
        }
    });
}
```