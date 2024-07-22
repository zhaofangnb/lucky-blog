# 

```js
 function Foo() {
  // 可以称之为类的静态方法，实例化后也通过类名来调用。
  Foo.a = function() {
    console.log(1)
  }
  // this指针 实例方法(对象方法，必须通过实例化对象来调用)
  this.a = function() {
    console.log(2)
  }
}

//原型方法，可以在实例中调用。
Foo.prototype.a = function() {
    console.log(3)
}

Foo.a = function() {
    console.log(4)
}

Foo.a();             //输出4
let obj = new Foo(); 
obj.a();             // 输出2
Foo.a();             //输出 1 
```