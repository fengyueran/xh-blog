---
layout: post
title: AJAX是什么
category : network
tagline: "Supporting tagline"
tags : [network]
description: 
date: 2016-1-01 18:10:20
---

### **this是什么** 
在JavaScript中并没有OOP编程的概念，我们谈到的this不同于一些OOP编程里指向的实例化对象，它指的是运行时的上下文。所谓上下文，就是运行时所在的环境对象，比如你在公司，可能你的领导是你的部门经理，在家就是你媳妇儿一样，不同的场合上下文是不一样的。

### **什么是AJAX** 
在JavaScript中的函数有这样的特点:
  - 定义时上下文
  - 运行时上下文
  - 上下文可改变
  也就是说函数中的this在不同的场合对应不同的值，来看如下例子：

全局调用(非严格模式)
方法getName在全局调用指向全局对象，尽管方法getNameFunc为boy对象的方法，但因其在全局调用，this同样指向全局对象。
```
// 1.
var name = 'lily';
function getName() {
  console.log(this.name)
};
getName();
=> lily

// 2.
var boy = {
  name: 'lucy',
  getName,
};
var getNameFunc = boy.getName;
getNameFunc();
=> lily
```
对象调用

实例对象调用自己的方法getName，this则指向改实例对象

```
var boy = {
  name: 'lucy',
  getName,
};

boy.getName();
=> lucy
```

改变执行上下文，func.call和func.apply
func.call func.apply的作用一样都是改变执行上下文，只是接收参数的形式不同

- func.apply(context, param)
  func.apply方法传入两个参数，第一个参数是上下文对象，第二个参数是函数参数组成的数组
  ```
    function getName(firstName, lastName) {
      console.log(`${firstName}.${this.name}.${lastName}`)
    };
    var girl = {
      name: 'lucy',
      getName,
    };
    var getNameFunc = girl.getName;
    getNameFunc.apply(girl, ['Anne', 'Hathaway']);
    =>Anne.lucy.Hathaway
  ```
- func.call(context, param)
  func.call方法传入两个参数，第一个参数是上下文对象，第二个参数是传入的是一个参数列表，而不是单个数组
  ```
    getNameFunc.call(girl, 'Anne', 'Hathaway');
    =>Anne.lucy.Hathaway
  ```
  
  1.bind 发返回值是函数
var obj = {
    name: 'linxin'
}

function func() {
    console.log(this.name);
}

var func1 = func.bind(obj);
func1();                        // linxin
bind 方法不会立即执行，而是返回一个改变了上下文 this 后的函数。而原函数 func 中的 this 并没有被改变，依旧指向全局对象 window。


