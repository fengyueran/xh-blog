---
layout: post
title: React最佳实践
category : react
tagline: "Supporting tagline"
tags : [react]
description: 在React应用的开发中遵循一定的基本准则，能使代码更加友好，提高代码质量。
date: 2017-6-20 20:10:07
---
### 引入css

直接引入组件对应的css以便于修改
```
//before
build到一个main.css, 在主html引入

//recommend
import React from 'react';
import PropTypes from 'prop-types';
import styles from './infocard.css';
```

### 初始化State
es7语法定义state更简洁
```
//before
class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {

  }
} 

// recommend
class Main extends React.Component {
  state = { step: 0 }
  render() {

  }
} 

```

### propTypes书写顺序

```
//before
class Main extends React.Component {
  render() {

  }
} 
Main.propTypes = {
}
Main.defaultTypes = {
}

//recommend
//class组件
class Main extends React.Component {
  static propTypes = {

  }
  static defaultTypes = {
    
  }
  render() {

  }
}

//函数式组件
const mainProps = {};
const Main = () => {
  return() {

  }
}
Main.propTypes = mainProps;
```

### 用箭头函数绑定this

React.Component创建组件时，类中的方法并不会绑定this而需要显示绑定，如下，用箭头函数可以自动绑定(es6语法糖)this。
```
//before
constructor() {
  this.handleClick = this.handleClick.bind(this);
}
<div onClick={this.handleClick.bind(this)}>

//recommend
const handleClick = () => {}

```

### setState接受函数参数
react设计时为了性能上的优化，采取了批次的思想，每次更改state并不直接更新，而是收到一波state合并后才更新，是一个异步的过程，所以当需要前一个state做后续运算时应该传一个函数而不是对象，如下就可以避免这一问题。

```
//before
this.setState({ num: 1 }) 
console.log(this.state.num) //undefined

//recommend
this.setState((preState, props) => ({ num: 1 })); 
this.setState((preState, props) => ({ num: preState.num + 1 })); 
最后this.state.num为2
```

### 使用Get/Set访问器属性来做数据处理

如果需要在组件内做数据处理尽量使用Get/Set
```
  // recommend
  getSpeed () {
    return `${this.props.speed} m/s`;
  }
 
  // re
  get speed () {
    return `${this.props.firstName} m/s`;
  }
```

### 避免传递新的闭包给子组件

这里的闭包指通过这种形式(() => { alert('hit my heart');})创建的函数，每次父组件render时都会生成新的闭包，给子组件传递一个新的闭包prop，从而导致子组件重绘，即使子组件其他props并未更新。
```
//before
class Main extends React.Component {
  render() {
     <ViewHeart 
      onClick={() => {
        alert('hit my heart');
      }} />
  }
} 

//recommend
class Main extends React.Component {
  hitMyHeart = () => {
    alert('hit my heart');
  }
  render() {
     <ViewHeart 
      onClick={this.hitMyHeart} />
  }
}
```

### 尽量使用函数式组件

函数式组件没有生命周期管理或状态管理，易于调试，不需要分配特定的内存。此外函数式组件尽量不用箭头函数，因其为匿名函数，错误很可能以<< anonymous >>的方式呈现，难以调试。
```
//before
class Main extends React.Component {
  render() {

  }
} 

//bad
const Main = () => {
  return {

  }
} 

// recommend
function Main() {
  return {

  }
} 
```

### 布尔类型判断是否渲染的书写

如下当用一个布尔判断是否渲染时不需要用三目运算符，&&更简洁。

```
//before
{
  isActive ? <Active /> : null
}

//recommend
{
  isActive && <Active />
}
```

### 必要的时候用高阶组件

无状态函数组件与高阶组件结合能使代码层次更加清晰，分工明确，调试更加容易。如下通过函数withMain将无状态组件WrappedComponent包裹了一层，这一层负责管理state或生命周期WrappedComponent只负责显示。

```
const withMain = (mapPropsToData, WrappedComponent) => {
  class MainWrapper extends React.Component {
    componentDidMount() {}

    componentWillUnmount() {}

    shouldComponentUpdate(nextProps) {
      return nextProps !== this.props;
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }


@withMain({ title: '高阶组件' })
class Main extends React.Component {
  render() {

  }
} 

```





