# n个数组求交集
```js
  //输入n个数组，返回交集
  let a = [1,2];
  let b = [2,3];
  let c = [2,4,6];
  function intersection(...args) {
	  if(args.length == 0) {
		  return [];
	  }
	  if(args.length == 1) {
		  return args[0];
	  }
      return args.reduce((pre, next) => {
        return pre.filter((item) => next.indexOf(item) > -1);
      })
  }

console.log(intersection(a, b, c));
```
**注意**

+ 数组作为参数传入
+ `reduce`不设置初始值,默认pre为第一个元素,next为第二个元素开始计算
+ 交集 即 上一个数组中的某个元素也出现在下一个数组中