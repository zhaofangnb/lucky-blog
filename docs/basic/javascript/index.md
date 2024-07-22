# JavaScript 基础用法

## const 实现原理
> 由于ES5环境没有block的概念，所以是无法百分百实现const，只能是挂载到某个对象下，要么是全局的window，要么就是自定义一个object来当容器

```js
    var _const = function _const (data, value) {
        // 把要定义的data挂载到window下，并赋值value
        window.data = value;  
        // Object.defineProperty(obj, prop, desc)
        Object.defineProperty(window, data, {
            enumerable: false,     //是否可枚举
            configurable: false,   //当前对象元素的属性描述符是否可改，是否可删除
            get: function () {
                return value;
            },
            set: function (data) {
                if (data !== value) {
                     // 当要对当前属性进行赋值时，则抛出错误！
                     throw new TypeError('Assignment to constant variable.')
                } else {
                    return value;
                }
            }
        });
    }

    _const('a', 10);
    console.log(a)  // 10 
    delete a
    console.log(a) // 10
    for(let item in window) {
         // 因为const定义的属性在global下也是不存在的，所以用到了enumerable: false来模拟这一功能
         if (item === 'a') { 
            // 因为不可枚举，所以不执行
            console.log(window[item])
         }
    }
    a = 20 // 报错 Uncaught TypeError: Assignment to constant variable. 无法为其赋值
```

## flatten 数组扁平化 迭代法
```js
// 1.对于树状结构的数据， 最直接的处理方式就是递归
const arr = [1, [1, 2], [1, 2, 3]];
function flat(arr) {
    let result = [];
    for (const item of arr) {
        item instanceof Array ? result = result.concat(flat(item)) : result.push(item);
    }
    return result;
}
   flat(arr); 
   console.log(arr);
   // [1, 1, 2, 1, 2, 3]  

// 2. reduce() + 递归
const arr = [1, [1, 2], [1, 2, 3]];
function flat(arr) {
    return reduce((prev, cur) => {
        return prev.concat(cur instanceof Array ? flat(cur) : cur)
    }, [])
}
flat(arr);
console.log(arr);
// [1, 1, 2, 1, 2, 3] 


// 3.迭代+展开运算符
let arr = [1, [1,2], [1,2,3,[4,4,4]]];
while(arr.some(Array.isArray())) {
    // some() 为数组中的每一个元素执行一次 callback 函数
    arr = [].concat(...arr);
}
console.log(arr)
// (9) [1, 1, 2, 1, 2, 3, 4, 4, 4]
```

## JS 实现一个队列
```js
// 1. 创建一个队列类
class Queue {
    constructor () {
        this.count = 0;
        this.front = 0;
        this.items = [];
    }
}

// 2.添加元素
enQueue (el) {
    this.items[this.count] = el;
    this.count++;
}

// 3.删除元素
delQueue () {
    if (this.isEmpty()) {
        return 'Queue is null'
    }
    let del = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    return del;
}

// 4.查看队列头部元素
peek () {
    return this.items[this.front];
}

// 5.队列判空
isEmpty () {
    return this.count - this.front === 0;
}

// 6.清除队列元素
clear () {
    //法一：
 this.count = 0; 
 this.front = 0;
 this.items = [];

 //法二
 this.items.length = 0;

 //法三
 this.items.splice(0,this.items.length)
}

// 7.查看队列长度
size() {
    return this.count - this.front;
}

// 8.查看队列的所有内容
 toString(){
    if(this.isEmpty()) return "Queue is null";
    let objString = this.items[this.front];
    for(let i = this.front + 1; i < this.count; i++) {
        objString = `${objString},${this.items[i]}`;
    }
    return objString;
 }

```

```js

 // 9.双向队列即队列的首尾都能进能出
function Queue() {
	this.data = [];
	this.enqueue = enqueue;//队尾添加一个元素
	this.dequeue = dequeue;//队首删除一个元素
	this.front = front;    //读取队首元素
	this.back = back;      //读取队尾元素
	this.toStringData = toStringData;//显示队内元素
	this.isEmpty = isEmpty;//判断队列是否为空
	this.fenqueue = fenqueue;  //队首添加一个元素
    this.bdequeue = bdequeue;  //队尾删除一个元素	
	
	//在队尾添加一个元素即为入队
	function enqueue(element) {
		this.data.push(element);
	}

	//在队首删除一个元素，并返回被删除的值
	function dequeue() {
		return this.data.shift();
	}

	//返回数组第一项即返回队首元素
	function front() {
		return this.data[0];
	}

	//返回数组最后一项即返回队尾元素
	function back() {
		return this.data[this.data.length - 1];
	}

	//数组长度为0即队列为空
	function isEmpty() {
		return this.data.length === 0;
	}

	//打印队列
	function toStringData() {
		return this.data;
	}
    //队首添加一个元素
	function fenqueue (element) {
        this.data.unshift(element);
    }

    // 队尾删除一个元素
    function bdequeue () {
        return this.data.pop();
    }
}



/*测试*/
var q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.enqueue(4);
console.log(q.toStringData());//[1, 2, 3, 4]
console.log(q.dequeue());//1
console.log(q.toStringData());//[2, 3, 4]
console.log(q.front());//2
console.log(q.back());//4
console.log(q.isEmpty());//false
```

## Map 数组求和 + 二维数组去重
```js
 /*
 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数的下标数组，且同样的元素不能被重复利用。
    示例：
    给定 nums = [2, 7, 11, 15], target = 9
    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]
*/
function computed(arr,target)
 {	
	let result = []
	const map = new Map();//Map 对象保存键值对
	for(let i = 0; i < arr.length; i++)
	{
		map.set(arr[i],i); //key : value = 某个元素：该元素的下标
	}
	for(let i = 0; i < arr.length; i++)
	{
		const j = map.get(target - arr[i]);//返回和key关联的value,即另一个数的下标
		if(j && j !== i ) {
			result.push([i,j]);
		}
	}
	const arrIndex = result.map(item => item.sort((a,b) => a-b))
	// indexOf 防范和 set 去重都是使用的元素的引用而不是值,对于二维数组无法去重
	// 使用对象的key不能重复原则，对数组进行去重
	var obj = {}
	arrIndex.forEach(item => {
		obj[item] = item;
	})
	return  Object.values(obj);
 }
 console.log( computed([1,4,6,5,9],10)) // [[0,4].[1,2]]
```

## n个数组交集
```js
 function intersection (...args) {
    if (args.length === 0) {
        return [];
    }
    if (args.length === 1) {
        return args[0];
    }
    return args.reduce((prev,next) => {
        return prev.filter(item => next.indexOf(item) > -1);
    })
 }
    let a = [1,2];
    let b = [2,3];
    let c = [2,4,6];
 console.log(intersection(a, b, c)); // [2]

```


## n个数组并集
```js
 // 取并集 可以参考new Set 去重功能
 function union (...args) {
    if (args.length === 0) {
        return [];
    }
    if (args.length === 1) {
        return args[0];
    }
    return args.reduce((prev,next) => {
        return [...new Set(prev.concat(next))];
    },[])
 }
    let a = [1,2];
    let b = [2,3];
    let c = [2,4,6];
 console.log(intersection(a, b, c)); // [1,2,3,4,6]
```

## Promise
```js
//Promise解决了回调地狱，而且因为有了resolve和reject可以异步处理并得知任务进度
const isPregnent = false;
const promise = new Promise((resolve, reject) => {
    if (isPregnent) {
        resolve('孩子他爹');
    } else {
        reject('老公');
    }
});

promise.then(name => {
    console.log(`男人成为了${name}!`);
}).catch(name => {
    console.log(`男人成为了${name}!`);
}).finally(() => {
    console.log('男人和女人结婚了');
});

// 某方法封装Promise
function xxxMethod (param) {
    return new Promise((resolve, reject) => {
        if (xxxx) {
            resolve()
        } else {
            reject()
        }
    })
}

xxxMethod(...args).then((res) => {

}).catch(err => {

})
```

## 开平方算法，误差小于0.01
```js
function mySquareRoot (num) {
    if (num == 0 || num == 1) return num;
    var low = 0,
    high = num,
    mid = (low + hign) / 2,
    last;
    do {
        if (mid * mid > num) {
            hign = mid;
        } else if(mid * mid < num) {
            low = mid;
        } else {
            return mid;
        }
        last = mid;
        mid = (low + hign) / 2;
    } while (Math.abs(mid - last) > 0.0.1) 
    return last;
}
mySquareRoot(10); // 3.14453125
```