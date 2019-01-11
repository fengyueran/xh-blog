---
layout: post
title: JavaScript中的this
category : js
tagline: "Supporting tagline"
tags : [js]
description: 在JavaScript中并没有OOP编程的概念，我们谈到的this不同于一些OOP编程里指向的实例化对象，它指的是运行时的上下文。所谓上下文，就是运行时所在的环境对象，比如你在公司，可能你的领导是你的部门经理，在家就是你媳妇儿一样，不同的场合上下文是不一样的。
date: 2016-1-02 16:17:25
---

### **this是什么** 
在JavaScript中并没有OOP编程的概念，我们谈到的this不同于一些OOP编程里指向的实例化对象，它指的是运行时的上下文。所谓上下文，就是运行时所在的环境对象，比如你在公司，可能你的领导是你的部门经理，在家就是你媳妇儿一样，不同的场合上下文是不一样的。

### **this的应用场景** 
在JavaScript中的函数具有定义时上下文、运行时上下文以及上下文可改变的特点，也就是说函数中的this在不同的场合对应不同的值，来看如下例子：

**全局调用(非严格模式)**
全局调用即单纯的函数调用，如下: 例1中函数getName在全局调用，this指向全局对象，例2中尽管函数getNameFunc为boy对象的方法，但因其在全局调用，this同样指向全局对象。
```
// 例1
var name = 'lily';
function getName() {
  console.log(this.name)
};
getName();
=> lily

// 例2
var boy = {
  name: 'lucy',
  getName,
};
var getNameFunc = boy.getName;
getNameFunc();
=> lily
```

**对象调用**

实例对象调用自己的方法getName，this则指向改实例对象

```
var boy = {
  name: 'lucy',
  getName,
};

boy.getName();
=> lucy
```

**构造函数调用**

构造函数生成一个新的对象，this就指向这个对象。

```
function person() {
　this.name = 'xhm';
}

var p = new person();
p.name // xhm
```

**func.call和func.apply**
func.call和func.apply的作用一样都是改变执行上下文，只是接收参数的形式不同。

- func.apply(context, param)
  func.apply方法传入两个参数，第一个参数是上下文对象，为空则指向全局对象，第二个参数是函数参数组成的数组。
  如下，给出了apply函数的源码大义，可以看到传入的数组参数会拼接成参数列表组成的一个字符串，并将需要执行的函数绑定到目标对象上。
  ```
  Function.prototype.apply = function(target, arr){
    target = target || window
    target.fn = this;
     if(arr == []) {
        return target.fn;
        delete target.fn;
     } else {
        var args = [];
        for(var i = 0; i < arr.length; i ++){
          args.push('arr['+ i + ']');
        }
        //eval()函数会将传入的字符串当做JavaScript代码进行执行
        var result = eval('target.fn('+ args.join(',') +')');
        delete target.fn;
        return result;
     }
  }
  ```
  - 应用1-apply方法数组参数特性的应用
  实例1：求数组a = [2, 4, 1, 6]的最大值，不要遍历数组
  ```
  /*
   target = window，this = Math.max，target.fn = window.Math.max
   result = eval(target.fn(2,4,1,6))
  */
  Math.max.apply(null, a);
  => 6
  ```
    实例2：实现一个log方法来代理console.log方法
  ```
    //arguments为一个对应于传递给函数参数的类数组对象Arguments，它是所有非箭头函数中可用的局部变量
    function log() {
      console.log.apply(null, arguments)
    }
    // 
    log(1, 2);
    => 1
    => 2
  ```

  
  - 应用2-apply方法改变this指向的应用:
  如下boy并没有getName方法，但是通过apply改变this的指向达到了在boy中调用girl的getName方法。
  ```
    function getName(firstName, lastName) {
      console.log(`${firstName}.${this.name}.${lastName}`)
    };
    const girl = {
      name: 'lucy',
      getName,
    };
    const boy = {
      name: 'Jeffrey'
    };
    //相当于boy.getName(['Michael', 'Jordan'])
    girl.getName.apply(boy, ['Michael', 'Jordan']);
    => Michael.Jeffrey.Jordan
  ```
- func.call(context, param)
  func.call方法传入两个参数，第一个参数是上下文对象，第二个参数是传入的是一个参数列表，而不是单个数组。

  如下，给出了call函数源码大义:
  ```
  Function.prototype.call = function(){
    var target = arguments[0] || window
    target.fn = this;
    var args = [];
    for(var i = 1; i < arguments.length; i ++){
        args.push('arguments['+ i +']');
    }
    
    var result = eval('target.fn(' + args.join(',')+')');
    
    delete target.fn;
    return result;
  }
  ```
  - 应用1-call方法改变this指向的应用
  获取`<div><ul>1</ul><ul>2</ul></div>`的ul的内容
  ```
   const nodes = document.querySelectorAll('ul');
   // nodes为伪数组，没有数组的遍历方法，通过[].slice.call返回真数组
   const realArr = [].slice.call(nodes);
   realArr.forEach((node)=> console.log(node.innerText))
   => 1 
   => 2
  ```
  
**bind函数**
bind方法不会立即执行，而是返回一个改变了上下文this后的函数。

```
const newGetName = girl.getName.bind(boy);
newGetName('Michael', 'Jordan')
=> Michael.Jeffrey.Jordan
```  

综上，this的指向由其具体的执行环境决定，同时也可以通过函数的原型方法apply、call以及bind来显式地改变this指向。



