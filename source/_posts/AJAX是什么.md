---
layout: post
title: AJAX是什么
category : network
tagline: "Supporting tagline"
tags : [network]
description: 前端的同学在日常编程中应该对网络请求得心应手，什么get请求、post请求第三方库api一调用得溜溜的，其实这些库基本都是封装的ajax请求，那什么是ajax呢？
date: 2016-1-01 18:10:20
---

### **什么是AJAX** 

AJAX即Asynchronous JavaScript and XML(异步的JavaScript和XML技术)，它不是一种具体的东西，而是一种使用现有标准的技术，它允许客户端脚本向服务器发送请求，这对于21世纪的我们来说似乎再寻常不过了，但没有AJAX之前发送网络请求是这样的：
 - 打开浏览器 => 输入网址 => 回车 => 发送请求 => 服务器返回页面，页面刷新
 - 表单 => 提交 => 发送请求 => 服务器返回页面，页面刷新
 - 特殊标签，img、link、script等请求特定文件(不刷新页面)

可以看到没有AJAX之前除了请求特定文件外都会导致页面刷新，即使只修改了页面很小一部分也需要刷新整个页面，这样的处理效率低下，用户体验也相当糟糕。于是AJAX横空出世，它允许客户端用JS向服务器请求必要数据并进行处理，更新网页(不刷新整个页面)

### **发起AJAX请求** 

- 创建XMLHttpRequest对象
  XMLHttpRequest对象是AJAX的基础，现代浏览器均支持该对象。
```
const xhr = new XMLHttpRequest();
```
- 监听请求状态
```
xhr.onreadystatechange = () => {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("root").innerHTML=xhr.responseText
    console.log('请求成功');
  }
};

```
- 设置请求参数

```
/*
 方法：open(method,url,async)
 - method: GET或POST
 - url: 发送请求的URL
 - async: 异步或同步(true或false)
*/
// get请求
xhr.open( "get", "http://localhost:4000/data?page=" + encodeURTComponent(page), true);
// post 请求
xhr.open("POST","http://localhost:4000/data",true);
// 必须设置提交时的内容类型，否则服务器端收不到参数 
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
```

- 发送请求

```
  // get
  request.send();
  // post data为为请求参数
  const data ="name=" + encodeURIComponent("xhm");
  request.send(data);
```
  
### **AJAX请求post和get的区别** 

- get请求
 - 数据较小，一般限制在1kb以下
 - 数据追加到url中，如(http://localhost:4000/data?username=xhm&&password=xhm)
 - 浏览器会缓存请求记录，可能带来安全性问题
 - 服务器端用Request.query获取变量的值

- post请求
 - 没有数据量限制(但理论上，因服务器的不同而异)
 - 发送包含未知字符的用户输入时post更加安全
 - get请求时参数在url里，send的时参数为null，post请求时可以给send函数赋予参数
 - 服务器端用Request.Form获取提交的数据

