# js迭代、递推、穷举、递归常用算法实例讲解

## 累加和累积

- 累加： 将一系列的数据加到一个变量里面
```js
// 小球从高100处落下，每次返回到原来高度的一般，求第十次小球落地时走过的路程
var h = 100
var s = 0
for (var i = 0; i < 10; i++) {
    h = h / 2
    s += h
}
```
- 累积： 将一系列的数据成绩到一个变量里面，得到累积的结果
```js
// n的阶乘
var n = 100
var result = 1
for (var i = 1; i <= n; i++) {
    result *= i
}
```

- **一般形式:**

累加： V += e

累积： V *= e

V代表累加(累积),e代表累加项(累积项)

算法要点:

1. 初始化
2. 循环的控制条件
3. 确认累加/积项的变化


## 迭代

迭代法也就是辗转法

规律: 就是可以`不断地用旧的值得到新的值，直到我们想要的结果`

解决办法:

1. 找到迭代的变量(旧的值)
2. 确定迭代的关系
3. 知道想要的结果是什么(结束循环的条件)

```js
/**
 * 1. 接收用户输入的两个数
 * 2. 一个函数的最大公约数
 * 3. 打印这个最大公约数
 */
var num1 = Number(prompt('请输入一个数:'))
var num2 = Number(prompt('请输入一个数:'))
var result = GCD(num1, num2)
alert(result)

function GCD (num1, num2) {
    if (num1 < num2) {
        if (num1 < num2) {
            // 保证num1是两个数中较大的那一个
            var temp = num1
            num1 = num2
            num2 = temp
        }
        var remainer = num1 % num2  // 余数
        while(remainer != 0) {
            num1 = num2
            num2 = remainer
            remainer = num1 % num2
        }
        return num2
    }
}
```


```js
/**
 * 题目描述：
 * 猴子第一天采摘了一些桃子
 * 第二天吃了第一天的一半多一个
 * 第三天吃了第二天的一半多一个
 * 直到第十天就剩下一个
 * 问：猴子第一天摘了多少桃子？
 */

递推关系：
f(n) = f(n-1) / 2 - 1

f(n-1) = (f(n) + 1) *　2

边界条件:
f(10) = 1

法一:
let f = []
f[10] = 1
for (let i = 10; i > 1; i++) {
    f[i-1] = (f[i] + 1) * 2
}
console.log(f[1])

法二：
let total = 1, i
for (i = 1; i < 10; i++) {
    total = (total + 1) * 2
}
console.log('第一天有'+ total+ '个桃子')
```

```js
// 兔子产子: 通过前两项得到下一项
var month = Number(prompt('输入月份:'))
var rabbit = [1, 1]
for( var m = 2; m < month; m++) {
    rabbit[m] = rabbit[m-1] + rabbit[m-2]
}
alert(rabbit[month])

```

## 穷举法
利用计算机计算速度快的特点，将所有可能性全部列举出来

```js
// 公鸡1个值5元，母鸡一个值3元，鸡仔3个值1元
// 100元买了100个鸡，问各有几个？
// x + y +z = 100   
// x * 5 + y * 3 + z / 3 = 100 
for (var cock = 0; cock <= 20; cock++) {
    for (hen = 0; hen <= 33; hen++) {
        var chihen = 100 -cock - hen
        if (100 == cock * 5 + hen * 3 + chihen / 3) {
            console.log("公鸡一共："+ cock + "母鸡一共：" + hen + "小鸡一共：" + chihen )
        }
    }
}

// 结果:
公鸡一共：0 母鸡一共：25 小鸡一共：75
公鸡一共：4 母鸡一共：18 小鸡一共：78
公鸡一共：8 母鸡一共：11 小鸡一共：81
公鸡一共：12 母鸡一共：4 小鸡一共：84
```

案例：有一个三位数，个位数字比百位数字大，而百位数字又比十位数字大，并且各位数字之和等于各位数字相乘之积，求此三位数  x 个位>=2  y 百位>=1  z 十位 0-9
```js
for (var x = 2; x <= 9; x++) {
    for (var y = 0; y <= 9; y++) {
        for (var z = 1; z <= 9; z++) {
            if (x > z && z > y && x+y+z == x*y*z) {
                console.log(z,y,x)
            }

        }
    }
}
// 213
```


## 递归
看似函数调用一层一层嵌套调用，然后一层一层返回，实际上就是`将规模为n的问题降阶为n-1的问题进行求解`。

```js
// 递归法求n的阶乘
function fact (n) {
    if (1 == n) {
        return 1
    }
    return n * fact(n-1)
}

console.log(fact(5)) // 5*4*3*2*1 = 120 
```