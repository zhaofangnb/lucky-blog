# 类
在 `ES6` 之后，JavaScript 拥有了 class 关键字，虽然本质依然是构造函数，但是开发者已经可以比较舒服地使用 class 了。<br/>
在TypeScript中，对类有了更一步的提升，比如`添加了访问修饰符public、private、protected`，有了抽象类的概念等等。

## 定义类
```ts
class People {
    name : string
    constructor (name: string) {
        this.name = name
    }
    say () {
        console.log(this.name)
    }
}
// 在类中我们可以定义属性和方法，并且可以在构造函数中给属性赋初始值。

// 上面的例子我们首先定义了name属性，然后再在构造函数中给该属性赋值。如果不想这么麻烦的话，我们还可以简写。

// 直接定义在构造函数中就可以了。
class People {
    constructor(public name: string) {
        this.name = name
    }
    say () {
         console.log(this.name)
    }
}

console.log(typeof People) // function class其实就是function的语法糖。
```

方法定义构造函数:
```ts
 let Animal = function (type) {
    this.type = type
    this.say = function () {
        console.log('say')
    }
 }

 // 在原型上定义属性和方法
 Animal.prototype.info = '动物'
 Animal.prototype.walk = function () {
    console.log('walk')
 }

 const a1 = new Animal('dog')
 console.log(a1)
```
我们会发现，在构造函数里面定义的方法和属性都会挂载在实例上，如果需要挂载在原型上需要我们使用prototype显示定义。
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a9a02bb243841a4a053ab9a30ae116c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)


使用class定义:
```ts
class Animal {
  type:string;
  say: () => void;
  constructor(type:string) {
    this.type = type;
    
  }
}
class Animal {
    type: string;
    say: () => void;
    constructor (type: string) {
        this.type = type
        this.say = function () {
            console.log('say')
        }
    }

    walk () {
        console.log('walk')
    }
}
const a1 = new Animal('dog')
console.log(a1)
```
在constructor定义的属性和方法都会挂载在实例上，跟function是一样的。<br/>

但是定义在类中的方法，默认会被挂载到原型上，不再需要我们显示定义在prototype上。
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca8fd15860fe4b2facec7b6b960a3ba7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## 继承
类不比接口，不能多继承， 一次只能继承一个类
```ts
class People {
    name: string
    constructor(name: string) {
        this.name = name
    }
    say () {
        console.log(this.name)
    }
}

// 继承
class Child extends People {
   // 不显示定义构造函数 默认会调用父类构造函数
  
  // 如果显示定义了构造函数，就必须使用super调用父类构造函数
  // 子类构造函数会比父构造函数先运行
  constructor(name: string) {
    super(name)
  }
}

const c1 = new Child('张三')
c1.name // 张三
c1.say() // 张三
```

## 访问修饰符

访问修饰符总共有`省略、public、protected、private四种`，只是省略和public是一样的。

### public
public是公开的，也就是`用public定义的属性和方法在外部是可以被访问到的`。<br/>

public权限我们一般会把public省略，当然你写上也是一样的。
```ts
class People1 {
  // 公共属性
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  
  // 公共方法
  say() {
    console.log("say");
  }
  // 公共方法
  public say1() {
    console.log(this.name + " say");
  }
}

const p1 = new People1('randy')
p1.name // randy
p1.say() // say
p1.say1() // randy say
```

### protected
protected定义的属性或方法`只能在本类或子类中访问到`。就算是本身实例或子实例也访问不到。
```ts
class People {
  name: string
  protected count: number
  
  constructor(name: string) {
    this.name = name
  }
  
  sayCount() {
    // 本类能访问到
    console.log(this.count)
  }
}

// 继承
class Child extends People {
  constructor(name: string) {
    super(name)
  }
  
  sayCount2() {
    // 子类能访问到
    console.log(this.count)
  }
}

const p1 = new People("demi")
p1.count // Error 访问不到

const c1 = new Child("randy")
c1.count // Error 访问不到
```
### private

private是私有的意思，就是`只能在本类中访问`。

那想要私有属性能被设置或访问怎么办呢？这就需要用到我们的get和set方法。当提供了get方法后我们就能访问，当提供了set方法后我们就能设置新值。
```ts
class People1 {
  name: string;
  private _sex: string;

  constructor(name: string) {
    this.name = name;
  }

  get sex() {
    return this._sex;
  }

  set sex(val) {
    this._sex = val;
  }
}

const p1 = new People1('randy')
p1.sex = 'male'
console.log(p1.sex) // male

```
## 静态属性和方法
静态属性和方法是类所有的，只能使用类来访问，不能通过实例来访问。
```ts
let Animal2 = function (type) {
  this.type = type;
};

// 定义静态属性和静态方法
Animal2.count = 1;
Animal2.say = () => {
  console.log("say");
};

const a2 = new Animal2("cat");
console.log(Animal2.count); // 1
console.log(Animal2.say()); // say
// console.log(a2.count); // Error
// console.log(a2.say()); // Error
```
在class中，我们使用static来定义静态属性和静态方法。
```ts
class Animal2 {
  public type: string;

  public static count: number = 1;

  constructor(type: string) {
    this.type = type;
  }

  public static say() {
    console.log("say");
  }
}

const a2 = new Animal2("cat");
console.log(Animal2.count); // 1
console.log(Animal2.say()); // say
// console.log(a2.count); // Error
// console.log(a2.say()); // Error
```
## 只读属性
```ts
class People1 {
  public readonly num: number = 10;
}

const p1 = new People()
console.log(p1.num) // 10
p1.num = 100 // Error 无法分配到 "num" ，因为它是只读属性。
```
我们只能使用`readoly来定义只读属性，不能定义只读方法`。

## 可选属性
```ts
class People {
  name: string;
  age?: number;

  constructor(name: string, age?: number, public sex?: string) {
    this.name = name;
    this.age = age;
  }
}

const p1 = new People("randy");
const p2 = new People("randy", 24);
const p3 = new People("randy", 24, "male");

```
## 抽象类

抽象类做为其它派生类的基类使用，它不能直接被实例化，不同于接口，抽象类可以包含成员的实现细节。但是接口是只能有定义，不能有实现。
```ts
abstract class A1 {
    // 抽象属性
    abstract age : number;
    sex: string = 'male'

    say () {
        console.log('say')
    }

    // 抽象方法
    abstract hi () : void
}
// 继承抽象类的时候，必须把里面的抽象属性和抽象方法全都实现，不然会报错。

class Son extends A1 {
    age: number;
    hi () {
        console.log('hi')
    }
}

const s1 = new Son()
console.log(s1.age) 
console.log(s1.sex)
s1.say() // say
s1.hi() // hi
```

## 接口实现
接口是可以被类实现的。
```ts
interface Inter1 {
  name: string;

  hello(): void;
  // hello: () => void
}
```
使用implements关键字来实现接口。接口里面定义的属性和方法我们必须全部都实现，否则会报错。

```ts
class Son implements Inter1 {
    name: string;
    hello () {
        console.log('hello')
    }
}
const s1 = new Son()
console.log(si.name)
s1.hello()
```

接口是可以被多实现的。

```ts
interface Inter2 {
  name2: string;

  hello2: () => void;
}
// 多实现，使用逗号分开

class Son implements Inter1, Inter2 {
    name: string;
    name2: string;
    hello () {
        console.log('hello')
    }
    hello2 () {
        console.log('hello2')
    }
}
```

## 类、 抽象类、 接口的区别

### 类是对对象的抽象
类里面可以定义属性和方法，并且属性有值，方法有具体的实现，实例化出来是一个一个的具有属性和方法的对象。

### 抽象类是对类的抽象
抽象类不能被实例化。它里面既可以有抽象属性和抽象方法又可以有普通属性和普通方法。我们可以在抽象类中把通用行为定义成普通属性和普通方法。<br/>

把一些灵活多变的属性和方法定义为抽象属性和抽象方法，在子类中根据不同场景去具体的实现。<br/>

`抽象类可以被继承，只能单继承。`<br/>

`抽象类可以继承抽象类，并且不需要把抽象属性和方法实现。`<br/>

`抽象类可以继承普通类。`

### 接口是对行为的抽象
接口不能被实例化。接口里面只能定义属性和方法，属性不能被赋值，方法不能有具体实现，相当于就只能有抽象。相比抽象类更加严格。<br/>

`接口可以被类实现，并且可以多实现。`<br/>

`接口可以继承接口，并且支持多继承。`
