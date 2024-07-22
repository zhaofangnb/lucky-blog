# 求平方根
```js 
function mySqrt (n) {
    if(n === 0 || n === 1) return n;
    const precision = 0.01
    var low = 0,
    high = n,
    mid = (low + high) / 2,
    last;
    do{
        if(mid * mid > n) {
             high = mid
        } else if (mid * mid < n) {
            low = mid 
        } else {
            return mid
        }
        last = mid
        mid = (low + high) / 2
    } while(Math.abs(mid-last) > precision)
    
    return last
}

console.log(mySqrt(10)) // 3.14453125
```