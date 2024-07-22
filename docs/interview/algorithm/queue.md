# JS实现一个队列


## 简单队列
```js
class Queue {
     constuctor(){
        this.count = 0; 
        this.front = 0;
        this.items = [];
    }
    // 入队列
    enterQueue (el) {
        this.items[count] = el
        this.count++
    }
    // 队头元素出列
    delQueue () {
        if (this.isEmpty()) {
            return '队列为空'
        } else {
            let del = this.items[this.front];
            delete this.items[this.front];
            this.front++;
            return del;
        }
    }

    // 队列判空
    isEmpty () {
        return this.count - this.front === 0
    }

    // 查看队头元素
    peek () {
        return this.items[this.front];
    }

    // 查看队列长度
    size () {
        return this.count - this.front;
    }

    // 查看队列所有内容
    stringQueue () {
        if(this.isEmpty()) {
            return '队列为空'
        } else {
            let objString = this.items[this.front];
            for(let i = this.front+1; i < this.count; i++) {
                objString = `${objString},${this.items[i]}`;
            }
            return objString;
        }
    }

    // 清除队列元素
    clear () {
        this.items.splice(0,this.items.length)
        this.count = 0; 
        this.front = 0;
    }
}
```

## 双向队列

```js
function Queue() {
	this.data = [];
	this.enqueue = enqueue;//队尾添加一个元素
	this.dequeue = dequeue;//队首删除一个元素
	this.front = front;    //读取队首元素
	this.back = back;      //读取队尾元素
	this.toStringData = toStringData;//显示队内元素
	this.isEmpty = isEmpty;//判断队列是否为空
	this.fenqueue = fenqueue;  //队首添加一个元素`
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

	function fenqueue (element) {
        this.data.unshift(element);
    }

    function bdequeue () {
        return this.data.pop();
}
}
```