# js原型

## prototype

在JS的每个函数中都有一个`prototype`属性，这个属性指向了一个对象，这个对象就是原型对象。
```js
// 普通函数可以new 构造函数
function Person(age) {
    this.age = age;
}

Person.prototype.name = '张三'; 

var p1 = new Person(18);
console.log(p1.name); // 张三
console.log(p1.age); // 18
```


## __proto__

每个对象(除null意外)都有一个`__proto__`属性，指向了创建该对象的构造函数的原型。
```js
function Person(age) {
    this.age = age;
}

var p1 = new Person(18);
p1.__proto__ === Person.prototype; // true
p1.__proto__ === Object.getPrototypeOf(p1); // true
Object.getPrototypeOf(p1) === Person.prototype; // true

//类似于一个getter，当使用p1.__proto__的时候，返回了Object.getPrototypeOf(p1), 即Person.prototype
```

## constuctor
每一个原型都有一个`constructor`属性，指向了该原型的构造函数。

```js
function Person(age) {
    this.age = age;
}

console.log(Person.prototype.constructor === Person); // true
```

## 实例与原型
当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。

```js
function Person() {

}

Person.prototype.name = '张三';

var p1 = new Person();
p1.name = '李四';
console.log(p1.name); // 李四

delete p1.name;
console.log(p1.name); // 张三
```

## 原型链
```js
console.log(Object.prototype.__proto__ === null); // true

```



### 
+ [](https://www.cnblogs.com/loveyaxin/p/11151586.html)
+ [undefined与null的区别](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)