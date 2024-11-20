# js继承

## 原型链继承
```js
function Parent () {
    this.name = 'Parent';
}
Parent.prototype.sayName = function () {
    console.log(this.name);
}

function Child () {}
// 子类的原型指向父类的实例
Child.prototype = new Parent();  // 方法定义在构造函数中，且不能传递参数

var child1 = new Child();
var child2 = new Child();
child1.sayName();  // Parent
child2.sayName();  // Parent
// 存在子类实例共享父类引用属性的问题，每个实例无法拥有自己独立的属性
```

## 构造函数继承

```js
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}
Parent.prototype.sayName = function () {
    console.log('Parent原型方法');
}

function Child (name , age) {
    Parent.call(this, name);
    this.age = age;
}

var child1 = new Child('Bob', 20);  // 可以向父类的构造函数传递参数
child1.colors.push('black');
console.log(child1.colors);  // ['red', 'blue', 'black']
console.log(child1.name);  // Bob
console.log(child1.age);  // 20
child1.sayName(); //  无法继承父类原型属性和方法  child1.sayName is not a function
```

## 组合继承(构造函数 + 原型链)
```js
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}
Parent.prototype.sayName = function () {
    console.log(this.name);
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}
// 设置 Child.prototype.__proto__ = Parent.prototype
Child.prototype = Object.create(Parent.prototype);  
// 修正原型链继承的构造函数
Child.prototype.constructor = Child;

Child.prototype.sayAge = function () {
    console.log(this.age);
}

var child1 = new Child('Bob', 20);
child1.colors.push('black');
console.log(child1);  // Child {name: "Bob", age: 20, colors: Array(3)}
// 存在调用两次父类构造函数的问题
```

## 寄生式继承
创建一个仅用于封装继承过程的函数，该函数接收一个包含对象的参数，然后复制到新创建的对象上。

```js
function createAnother (original) {
    var clone = Object.create(original); // 创建一个新对象
    clone.sayHi = function () {   // 增强对象
        console.log('hi');
    }
    return clone;
}

var person = {
    name: 'Bob',
    friends: ['Tom']
}
var anotherPerson = createAnother(person);
anotherPerson.sayHi();  // hi
```

## 寄生组合式继承
```js
function Supertype (name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}

function Subtype (name, age) {
    Supertype.call(this, name);
    this.age = age;
}

var newObj = Object.create(Supertype.prototype);
newObj.constructor = Subtype;
Subtype.prototype = newObj;

var instance1 = new Subtype('Bob', 20);
var instance2 = new SubType("Alice", 25);

instance1.colors.push('black');
console.log(instance1.colors);  // ['red', 'blue', 'black']
console.log(instance2.colors);  // ['red', 'blue']
console.log(instance1 instanceof Subtype);  // true
console.log(instance2 instanceof Supertype);  // true
```

## ES6继承
```js
class Parent {
    constructor (name) {
        this.name = name;
    }
    sayName () {
        console.log(this.name);
    }
}

class Child extends Parent {
    constructor (name, age) {
        super(name); // 调用父类的构造函数
        this.age = age;
    }
    sayAge () {
        console.log(this.age);
    }
}

var child = new Child('Bob', 20);
child.sayName();  // Bob
child.sayAge();  // 20
```

## 总结

1. 原型链继承
2. 构造函数继承
3. 组合继承(构造函数 + 原型链)
4. 寄生式继承
5. 寄生组合式继承
6. ES6继承
