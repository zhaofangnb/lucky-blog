# Vue2 

### computed 和 methods 的区别

- 我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。
- 然而，不同的是计算属性是基于它们的响应依赖关系缓存的。计算属性只在相关响应式依赖发生改变时它们才会重新求值。
- 这就意味着只要依赖项还没有发生改变，多次访问计算属性会立即返回之前的计算结果，而不必再次执行函数。


### key的作用
比如一个列表，需要往中间插入一个元素，如果`以下标作为对应关系`时，`不使用key`或者`使用列表的index作为key`,会导致插入元素到后面的全部元素，对应的位置关系发生变更，全都需要执行更新操作。

我们希望的是只渲染添加的那一个元素， 其他元素不做任何变更。

`使用唯一key值`: 只会渲染要更新的元素，其他元素内容没发生改变，对应的位置关系也没有发生改变。

总结特点:
- key 的作用主要是为了更高效的更新虚拟 DOM，因为它可以非常精确的找到相同节点，因此 patch 过程会非常高效
- Vue 在 patch 过程中会判断两个节点是不是相同节点时，key 是一个必要条件。比如渲染列表时，如果不写 key，Vue 在比较的时候，就可能会导致频繁更新元素，使整个 patch 过程比较低效，影响性能
- 应该避免使用数组下标作为 key

### diff算法核心原理
#### patch
它可以接收四个参数:
- oldValue : 老的虚拟DOM节点
- vnode ：新的虚拟DOM节点
- hydrating: 是不是要和真实DOM混合
- removeOnly

### 父子组件生命周期先后顺序
>挂载阶段

执行顺序为： 父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted

>更新阶段

- 执行顺序为： 父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated

>销毁阶段

- 执行顺序为： 父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed；

规律就是：父组件先开始执行，然后等到子组件执行完，父组件收尾。


