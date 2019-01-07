
---
layout: post
title: JS常用方法
category : js
tagline: "Supporting tagline"
tags : [js]
description: 
date: 2016-6-05 18:10:20
---


### **取整函数**

- 向上取整: Math.ceil():
- 向下取整: Math.floor():
- 四舍五入: Math.round():

### **生成随机数**

- 产生[m, n]的随机整数
  ```
  // Math.random产生[0, 1)的随机数
  const random = (m, n) => Math.ceil(Math.random() * (n - m)) + m;
  ```

- 产生(m, n]的随机整数
  
  ```
  const random = (m, n) => {
    const value = Math.random();
    return value === 0 ? m + 1 : Math.ceil(value * (n - m)) + m;
  }
  ```

- 产生[m, n)的随机整数
  
  ```
  const random = (m, n) => Math.floor(Math.random() * (n - m)) + m;
  ```

- 产生(m, n)的随机整数
  
  ```
    const random = (m, n) => {
      const value = Math.floor(Math.random() * (n - m));
      return value === 0 ? m + 1 : value + m;
    }
  ```

### **快速排序法**

```
const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1);
  const left = [];
  const right = [];

  for(let i = 0; i< arr.length; i++) {
    const value = arr[i];
    if (value < pivot) {
      left.push(value);
    } else {
      right.push(value);
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
}
```