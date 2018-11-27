---
layout: post
title: Git submodule的使用
category : Git
tagline: "Supporting tagline"
tags : [Git]
description: 最近在做一个上传的客户端，上传的部分由后端同学以SDK的方式提供，因此该SDK是在一个独立的仓库，那么对于客户端该如何方便的对集成该SDK呢？这就可以考虑用git的submodule。
date: 2016-7-24 23:30:09
---

### **遇到的问题**

最近在做一个上传的客户端，上传的部分由后端同学以SDK的方式提供，因此该SDK是在一个独立的仓库，那么对于客户端该如何方便的集成该SDK呢？每次SDK更新把代码拷贝到客户端仓库？把SDK发布到npm？显然都不合理，这就可以考虑用git的submodule。

### **什么是submodule**

submodule是一个多项目管理工具，它允许将子项目以独立的git项目添加到主项目，而主项目以submodule的形式拥有子项目。子项目拥有自己的commit、push、pull，而与主项目互不干扰。主项目只需要记录子项目的地址和所需要的commit id，通过地址和commit id 就能够得到对应的子项目。

### **添加submodule**
通常情况下，我们都有一个主项目(MainProject)，在MainProject文件夹下执行如下命令，即可添加submodule。
```
$ git submodule add [url] [path]
//url为子项目远程地址或本地地址, path为子项目路径，可省略
例: git add submodule git@github.com:fengyueran/UploaderSDK.git ./src/UploaderSDK
```
git status可以看到如下信息
```
 On branch master
    Changes to be committed:
    
        new file:   .gitmodules
        new file:   UploaderSDK
```
可以看到多了两个个文件.gitmodules和UploaderSDK。
cat .gitmodules看到.gitmodules储存了submodule的路径及远程地址。
```
[submodule "src/uploaderSDK"]
	path = src/uploaderSDK
	url = git@github.com:fengyueran/UploaderSDK.git
```
UploaderSDK的内容为submodule的commit id。
```
Subproject commit 6b53e1840b27ca1587b96c1eb9dd5f4ff0866089
```
不难想象通过.gitmodules和UploaderSDK的信息就可以拿到submodule的内容了，因此我们需要提交这个两个文件。
```
git add .
git commit -m "add submodule"
```

### **克隆带有submodule的项目**

主要有两个方式

**1. 采用先克隆后更新的方式**

和想象中的不一样，直接clone主项目，submodule并不会跟着clone下来，而只有包含submodule名的空文件夹。
```
1）$ git clone git@github.com:fengyueran/MainProject.git
```
需再执行如下命令
```
2）$ git submodule init
```
输出如下，可以看到该命令给子项目注册了路径，即在主项目中的位置。此时，uploaderSDK文件夹仍未空。
```
    
    Submodule 'src/uploaderSDK' (git@github.com:fengyueran/UploaderSDK.git) registered for path 'src/uploaderSDK'
```
再执行
```
//该命令并不是直接更新到最新的submodule commit，而是更新至主项目所存储存的commit(有可能是较旧的commit)。
3）$ git submodule update
```
输出如下，可以看到sumodule得到更新，更新到主项目存储的submodule commit，是一个游离的git header。
  ```
  Cloning into '/Work/test/MainProject/tmp/MainProject/src/uploaderSDK'...

  Submodule path 'src/uploaderSDK': checked out '6b53e1840b27ca1587b96c1eb9dd5f4ff0866089'
  ```


**2. 采用递归参数--recursive**

```
git clone git@github.com:fengyueran/MainProject.git --recursive
```
输出如下，可以看到主项目包括submodule都被clone下来了。
```
Cloning into 'MainProject'...
remote: Counting objects: 7, done.
remote: Compressing objects: 100% (4/4), done.
Receiving objects: 100% (7/7), done.
remote: Total 7 (delta 0), reused 4 (delta 0), pack-reused 0
Submodule 'src/uploaderSDK' (git@github.com:fengyueran/UploaderSDK.git) registered for path 'src/uploaderSDK'
Cloning into '/Work/test/MainProject/tmp/MainProject/tmp/MainProject/src/uploaderSDK'...
Submodule path 'src/uploaderSDK': checked out '6b53e1840b27ca1587b96c1eb9dd5f4ff0866089'
```

### **修改更新submodule**

主要有两种情况

**1. 直接在主项目中的submodule下修改**

如上例，直接在MainProject下的src/uploaderSDK中修改，uploaderSDK切换到工作分支，修改并提交后，可以checkout到最新的commit，也可以不切，反正都在当前最新的commit上(如果想测试其他commit也可以切换到相应commit上)，此时MainProject中我们可以看到src/uploaderSDK的commit有如下变化，a4d6为修改的提交，需要注意的地方是此时submodule已经在最新的commit上了，不要再在MainProject中git submodule update进行更新了，如果进行此操作submodule又会回到原来的commit(带有减号的commit)，只需要在MainProject提交，并在必要的时候push到远程仓库。这种方法，非submodule的开发人员就不用关心submodule是否更新了，只需要在MainProject下pull代码发现submodule有更改时执行git submodule update(更新为带减号commit)进行更新，前提是其他开发人员提交了正确的submodule commit。
```差点
-Subproject commit 6b53e1840b27ca1587b96c1eb9dd5f4ff0866089
+Subproject commit a4d6dc0457673a275b1f6cbeda6f8ff23293b9de
```
**2. 在submodule自己独立的仓库进行修改**

在工作目录克隆下submodule的仓库，切换到工作分支进行修改提交并push到远程仓库。这种方法需要submodule开发人员告诉MainProject的开发人员submodule有更新或主动查看是否有更新，有更新时就在MainProject的src/uploaderSDK下pull远程代码(需要知道submodule的工作分支)，快速合并后，uploaderSDK的commit有如下变化，此时同1不要git submodule update，而只是在MainProject下提交这个更改。
```
-Subproject commit f4573cc1bb50000779202c7f56a640b1ffc075cb
+Subproject commit 64ae6d149c0f6e3b06b8cea262c6126a7bc0887f

```

### **删除submodule**

执行如下命令

1) $ git submodule deinit 
```
逆初始化模块，submodule为子模块目录，执行后可发现子模块目录被清空
$ git submodule deinit [submodule_name] 
-> Cleared directory 'test2sub'
Submodule 'test2sub' (git@github.com:fengyueran/test2sub.git) unregistered for path 'test2sub'

//执行如下命令还能看到子项目信息
$ git submodule
-> -dab52c62f52353d9967619625c28e28dc4320aef test2sub
```
2) $ git rm --cached [submodule_name]
```
// 删除.gitmodules中记录的模块信息（--cached选项清除.git/modules中的缓存）
git rm --cached test2sub
//执行如下命令已看看不到删除的子项目信息了
$ git submodule
```
3）$ git commit
```
git commit -m "remove submodule"
```




