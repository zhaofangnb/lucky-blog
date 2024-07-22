# 设计模式

## [软件设计模式的六个原则： 面向对象设计SOLID + 最少知识原则](https://baike.baidu.com/starmap/view?nodeId=294b5d3c8cc7452ad5c9cdba&lemmaTitle=%E8%BF%AA%E7%B1%B3%E7%89%B9%E6%B3%95%E5%88%99&lemmaId=2107000&starMapFrom=lemma_starMap&fromModule=lemma_starMap)
- 1.单一职责
- 2.开闭原则
- 3.里氏替换
- 4.依赖倒转
- 5.接口隔离
- 6.迪米特法则(最少知识原则)

## 设计模式分类

### 一、创建型模式
1.单例

2.建造者

3.原型

4.工厂方法

```ts
/**
 * 抽象咖啡类
 */
abstract class Coffee {
    constructor(public name: string) {

    }
}
class LatteCoffee extends Coffee { // 拿铁咖啡

}
class MachaCoffee extends Coffee { // 抹茶咖啡

}
class AmericanoCoffee extends Coffee { // 美式咖啡

}
// 简单工厂实现
class CoffeeFactory {
    static buy (name:string) {
        swtich(name) {
            case 'LatteCoffee':
                return new LatteCoffee('拿铁咖啡');
                break;
            case 'MachaCoffee':
                return new MachaCoffee('抹茶咖啡')
                break;
            case 'AmericanoCoffee':
                return new AmericanoCoffee('美式咖啡')
                break;
            default: 
                throw new Error('没有您需要的咖啡')
        }
    }
}
console.log(CoffeeFactory.buy('LatteCoffee'))
console.log(CoffeeFactory.buy('MachaCoffee'))
console.log(CoffeeFactory.buy('AmericanoCoffee'))


//工厂方法实现

abstract class CoffeeFactory {
    // 抽象咖啡工厂类
    constructor() {}
}
class LatteCoffeeFactory extends CoffeeFactory {
    createCoffee () {
        console.log('您创建了一份拿铁咖啡')
    }
}
class MachaCoffeeCoffeeFactory extends CoffeeFactory {
    createCoffee () {
        console.log('您创建了一份抹茶咖啡')
    }
}
class AmericanoCoffeeCoffeeFactory extends CoffeeFactory {
    createCoffee () {
        console.log('您创建了一份美式咖啡')
    }
}

class Factory {
    // 在工厂方法里，不再由Factory来创建产品，而是先创建了具体的工厂，然后由具体的工厂创建产品
    static buy(name:string) {
        switch(name) {
            case 'LatteCoffee':
                return new LatteCoffeeFactory().createCoffee();
                break;
            case 'MachaCoffee':
                return new MachaCoffeeCoffeeFactory().createCoffee();
                break;
            case 'AmericanoCoffee':
                return new AmericanoCoffeeCoffeeFactory().createCoffee();
                break;
            default: 
                throw new Error('没有您需要的咖啡')
        }
    }
}
```

+ 简单工厂：唯一工厂类, 一个产品抽象类,工厂类的创建方法`依据入参判断并创建具体产品对象`,适用于创建对象比较少的情况。
+ 工厂方法： 多个工厂类,一个产品抽象类，利用多态创建不同的产品。适用于`一个类通过其子类来指定创建哪个对象，将创建对象的任务委托给多个工厂子类中的某一个`，客户端使用是无须关心是哪一个工厂子类创建产品子类，需要是再动态指定。
5.抽象工厂

```ts
/**
 * 产品抽象类或接口
 */
abstract class MacProduct {} // 电脑类
abstract class IWatchProduct {} // 手表类
abstract class PhoneProduct {} // 手机类

/**
 * 具体产品实现类
 */
class AppleMacProduct extends MacProduct {}
class HuaweiMacProduct extends MacProduct {}

class AppleIWatchProduct extends IWatchProduct {}
class HuaweiIWatchProduct extends IWatchProduct {}

class ApplePhoneProduct extends PhoneProduct {}
class HuaweiPhoneProduct extends PhoneProduct {}

/**
 * 抽象工厂
 */
abstract class AbstractProductFactory {
    abstract createMacProduct():MacProduct;
    abstract createIWatchProduct():IWatchProduct;
    abstract createPhoneProduct():PhoneProduct;
}

/**
 * 具体产品工厂-苹果
 */
class AppleProduct extends AbstractProductFactory {
    createMacProduct() {
        return new AppleMacProduct()
    }
    createIWatchProduct() {
        return new AppleIWatchProduct()
    }
    createPhoneProduct() {
        return new ApplePhoneProduct()
    }
}
/**
 * 具体产品工厂-华为
 */
class HuaweiProduct extends AbstractProductFactory {
    createMacProduct() {
        return new HuaweiMacProduct()
    }
    createIWatchProduct() {
        return new HuaweiIWatchProduct()
    }
    createPhoneProduct() {
        return new HuaweiPhoneProduct()
    }
}

let huaweiProduct = new HuaweiProduct()
console.log(huaweiProduct.createMacProduct()) // 购买华为电脑
console.log(huaweiProduct.createIWatchProduct()) // 购买华为手表
console.log(huaweiProduct.createPhoneProduct()) // 购买华为手机
```

+ 抽象工厂类：多个工厂类，多个产品抽象类，产品子类分组，同一个工厂实现类创建同组中的不同产品，减少了工厂子类的数量
### 二、结构性模式

1.代理

包装对象,为了增强原对象功能,但又不允许直接修改原对象时,使用代理模式
```js
const obj = {
    name: '张三',
    age:20
}
const proxyObj = new Proxy(obj, {
    get: (target, property) {
        // 使用in方法查找，hasOwnProperty()方法无法从原型对象中查找
        return property in target ? target[property] : undefined
    },
    set: (target, property, value) {
        if (property === 'age') {
            console.log('age before change ===', target[property])
            target[property] = value
            console.log('age after change ===', value)
            return
        }
        target[property] = value
    }
})

proxyObj.age = 27
/**
 * 最终结果:
 * age before change=== 20
 * age after change=== 18
 * /

```
2.装饰器

包装对象,可以不侵入原有代码内部的情况下修改类代码的行为,处理一些与具体业务无关的公共功能，常见:日志、异常、埋码等。

```js
// log函数接收 类Calculator 作为参数，并返回一个新函数替换 Calculator类的构造函数
function log(name) {
    return function decrator(Class) {
        return (...args) => {
            console.log(`Arguments for ${name}: ${args}`)
            return new Class(...args)
        }
    }
}


@log('Multiply')
class Calculator {
    constructor(x,y) {}
}
let calculator = new Calculator(10, 10)

/**
 * 最终输出:
 * Arguments for Multiply: [10, 10]console.log(calculator);
 * Calculator {}
 */
```

3.适配器

包装对象,为了解决两个对象之间不匹配的问题,而源对象又不适合直接修改,此时可以使用适配器模式进行一层转换。

应用：

- 使用一个已经存在的对象，但其方法或属性不符合我们的要求。
- 统一多个类的接口设计。
- 适配不同格式的数据。
- 兼容老版本的接口。

举例：vue的计算属性


4.外观模式

包装一群对象以提供一个统一的接口来简化其接口

```js
// a.js
export default {
    getA (params) {

    }
}

// b.js
export default {
    getB (params) {

    }
}

// app.js  外观模式为子系统提供统一的高层接口
import A from './a'
import B from './b'
export default {
    A,
    B
}

// index.js
import app from './app'
app.A.getA(params)
app.B.getB(params)
```

5.组合模式

组合对象,将一组相关的对象,组合为`部分-整体`的结构

文件夹扫描：
```js
// 树对象- 文件目录
class cFolder {
    constructor(name) {
        this.name = name
        this.files = []
    }
    add (file) {
        this.files.push(file)
    }
    scan () {
        for (let file of this.files) {
            file.scan()
        }
    }
}

// 叶对象-文件
class cFile {
    constructor(name) {
        this.name = name
    }
    add (file) {
        throw new Error('文件下面不能再添加文件');
    }
    scan () {
        console.log(`开始扫描文件：${this.name}`);
    }
} 

let mediaFolder = new cFolder('娱乐')
let movieFolder = new cFolder('电影')
let musicFolder = new cFolder('音乐')

let file1 = new cFile('钢铁侠.mp4')
let file2 =  new cFile('再谈记忆.mp3')

movieFolder.add(file1)
musicFolder.add(file2)

mediaFolder.add(movieFolder)
mediaFolder.add(musicFolder)
mediaFolder.scan()

/* 输出:
开始扫描文件：钢铁侠.mp4
开始扫描文件：再谈记忆.mp3
*/
```

万能遥控器:
```js
// 创建一个宏命令
var MacroCommand = function () {
    return {
        // 宏命令的子命令列表
        commandList: [],
        add: function (command) {
            this.commandList.push(command)
        },
        // 依次执行子命令列表里面的命令
        execute: function () {
            for (let i = 0, command = this.commandList[i]; i++ ) {
                command.execute()
            }
        }
    }
}

// 打开空调命令
var openAcCommand = {
    execute: function () {
        console.log('打开空调')
    }
}
// 打开电视命令
var openTvCommand = {
    execute: function () {
        console.log('打开电视')
    }
}
// 打开音响命令
var openSoundCommand = {
    execute: function () {
        console.log('打开音响')
    }
}


var macroCommand1  = MacroCommand()
// 把打开空调\电视\音响 装进这个宏命令里
macroCommand1.add(openAcCommand)
macroCommand1.add(openTvCommand)
macroCommand1.add(openSoundCommand)


var closeDoorCommand = {
    execute: function(){
        console.log( '关门' );
    }
};
var openPcCommand = {
    execute: function(){
        console.log( '开电脑' );
    }
};
var openQQCommand = {
    execute: function(){
        console.log( '登录QQ' );
    }
};
var macroCommand2 = MacroCommand()
macroCommand2.add(closeDoorCommand)
macroCommand2.add(openPcCommand)
macroCommand2.add(openQQCommand)

// 把各个宏命令装进一个超级命令中去
var macroCommand = MacroCommand()
macroCommand.add(macroCommand1)
macroCommand.add(macroCommand2)
```

6.享元

一个工厂需要20个男模特和20个女模特穿上40件新款衣服拍照

不使用享元模式:
```js
let Model = function (sex, underwear) {
    this.sex = sex
    this.underwear = underwear
}
Model.prototype.takePhoto = function () {
    console.log('sex='+this.sex + 'underwear=' + this.underwear)
}
for (let i = 0; i < 20; i++) {
    new Model('男',  'underwear' + i).takePhoto();
}
for (let i = 0; i < 20; i++) {
    new Model('女',  'underwear' + i).takePhoto();
}
```

使用享元模式重构:
```js
let ModelR = function(sex) {
    this.sex = sex
}
let ModelF = new ModelR('女')
let ModelM = new ModelR('男')
ModelR.prototype.takePhoto = function () {
    console.log('sex='+this.sex + 'underwear=' + this.underwear)
}
for(let i = 0; i < 20 ; i++) {
    ModelF.underwear = 'underwear' + i;
    ModelF.takePhoto();
}
for(let i = 0; i < 20 ; i++) {
    ModelM.underwear = 'underwear' + i;
    ModelM.takePhoto();
}
```

7.桥接
```js
function Toast (node, animation) {
    this.node = node
    this.animation = animation
}
Toast.prototype.show = function () {
    this.animation.show(this.node)
}
Toast.prototype.hide = function () {
    this.animation.hide(this.node)
}
function Message (node, animation) {
    this.node = node
    this.animation = animation
}
Message.prototype.show = function () {
    this.animation.show(this.node)
}
Message.prototype.hide = function () {
    this.animation.hide(this.node)
}

const Animations = {
    bounce: {
        show: function(node) {
            console.log(node+ '弹跳着出现')
        },
        hide: function(node) {
            console.log(node+ '弹跳着消失')
        }
    },
    slide: {
        show: function(node) {
            console.log(node+ '滑动着出现')
        },
        hide: function(node) {
            console.log(node+ '滑动着消失')
        }
    }
}

let toast = new Toast('元素1', Animation.bounce)
toast.show()

let messageBox = new Message('元素2', Animations.slide)
messageBox.hide()
```
### 三、行为型模式

#### 一、单个对象行为封装

**1.策略**

受外部状态影响改变对象行为：`封装不同的对象行为，返回一个行为接口`

应用: 重构大量if-else逻辑或switch-case逻辑

**2.状态**

受内部状态影响改变对象行为：`封装不同的状态行为(包含对象行为)`

**3.模板方法**

将不同的功能组合再一起，只提供框架，具体实现还需要调用者传进来。

举例：把东西放进冰箱

```js
function putIntoIcebox (openFunc, pickFunc, putFunc) {
    openFunc()
    pickFunc()
    putFunc()
}
// 打开冰箱
function openIcebox () {

}
// 抱起大象
function pickElephant () {

}
// 放大象
function putElephant () {

}

putIntoIcebox(openIcebox, pickElephant, putElephant)

// 抱起老虎
function pickTiger () {

}
// 放老虎
function putTiger (){
    
}

putIntoIcebox(openIcebox, pickTiger, putTiger)

```

**4.迭代器**

提供一个接口，访问一个对象内的所有行为(属性),接口可提供多种访问顺序

应用: 数组遍历、对象遍历

**5.备忘录**

为对象提供一个快照功能，能随时提供返回

应用: 状态管理数据持久化和还原，保证刷新页面应用状态不丢失

#### 二、依赖对象行为封装

**6.发布订阅**

对象行为一对多,分离发布和多个订阅对象的行为

```js
// 对象通信解耦
export class EventBus {
    static map = new Map()
    static publish (key, data) {
        const funcArr = this.map.get(key) || []
        for (let i = 0; i < funcArr.length; i++) {
            funcArr[i](data)
        }
    }
    static subscribe(key, callback) {
        const funcArr = this.map.get(key) || []
        this.map.set(key, funcArr.push(callback))
    }
}
```
