# 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为<br/>
使用@装饰器需要把 tsconfig.json 的 experimentalDecorators 字段设置为 true。

##　装饰器类型
在 TypeScript 里，主要有`类装饰器`、`方法装饰器`、`属性装饰器`、`参数装饰器`。

### 类装饰器

类装饰器定义在类上面。类装饰器运行是在类初始化的时候。

类装饰器的参数只有一个，参数是类本身。

比如，我们声明一个函数 addAge 去给 Class 的属性 age 添加年龄.
```ts
function addAge (constructor: Function) {
    constructor.prototype.age = 18
}
@addAge
class Person {
    name: string;
    age!: number;
    constructor () {
        this.name = '张三' 
    }
}

let person = new Person()
console.log(person.age) // 18
```

constructor.prototype.age 就是在类原型上添加了age属性并赋值18。这样我们通过类Person实例化出来的每个对象都会有age属性，并且值为18。

### 属性/方法装饰器
属性/方法装饰器运行是在类初始化的时候。

```ts
// 声明装饰器修饰方法
function method(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target);
    console.log("prop " + propertyKey);
    console.log("desc " + JSON.stringify(descriptor) + "\n\n");
    descriptor.writable = false;
}

// 声明装饰器修饰属性
function prop (target: any, key: string):any {
    console.log(target);
    console.log("prop " + key);
    const descriptor: PropertyDescriptor = {
        writable: true,
        configurable: true,
        enumerable: true,
        value: "jack",
    };
    return descriptor;
}

//类
class Person {
    @prop
    name: string;
    constructor () {
        this.name = '张三';
    }
    @method
    say () {
        return "instance method"
    }
    @method
    static run () {
        return "static method"
    }
}
```
普通函数和静态函数参数是有区别的。

1. 普通函数的装饰器接收的参数第一个是类的原型第二个是方法名第三个是修饰符。
2. static 函数的装饰器接收的参数第一个是类本身第二个是方法名第三个是修饰符。

属性的装饰器接收的参数第一个是类的原型第二个是属性名。<br/>

属性的装饰器可以返回属性描述符来描述该属性。

### 参数装饰器

## 多个装饰器
一个类、属性、方法可以同时被多个装饰器修饰。<br/>

多个装饰器可以同时应用到一个声明上，就像下面的示例：
1. 书写在同一行
```ts
@f @g x
```
2. 书写在渡航
```ts
@f
@g
x
```
当多个装饰器应用在一个声明上时执行顺序从下往上执行,先运行@g然后运行@f。

## 装饰器执行顺序
装饰器的执行顺序总的来说先执行class内部（属性、方法、参数）装饰器再执行类装饰器。这个顺序是固定的。<br/>
class内部（属性、方法、参数）装饰器的执行顺序是不固定的，依赖你在class内部的书写顺序。书写越靠前，越先执行。<br/>
当参数装饰器和方法装饰器同时定义在同一个方法上的时候，先执行参数装饰器再执行方法装饰器。