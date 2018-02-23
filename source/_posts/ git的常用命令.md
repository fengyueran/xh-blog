---
layout: post
title: Git常用命令
tag: Git
description: Git作为一种流行的版本管理系统已经广泛应用于我们的日常开发中，在这里记录下日常遇到的关于git的常见用法，以备后续查询。
date: 2016-6-24 23:30:09
---

#### 创建代码仓库

```
1）在当前文件夹创建仓库 
$ git init 

2）新建文件夹并创建git仓库
$ git init [project-name]

3）克隆远程分支，默认为master分支
$ git clone [url] -b [branch-name] [yourfolder]
例: $ git clone https://github.com/fengyueran/Test.git -b dev
```
#### 配置
通过git config可以配置git的环境变量，这些变量存在三个不同的地方
- /etc/gitconfig文件：适用于所有用户。
- ~/.gitconfig文件：适用于当前用户。
- .git/config文件：当前项目中的配置文件，适用于当前项目。

每一个级别的配置都会覆盖上层的相同配置，所以 .git/config 里的配置会覆/etc/gitconfig中的同名变量。
```
1）查看配置信息(包括用户名、邮箱等)
$ git config --list

2）编辑配置文件(--system/global)
$ git config -e 

3）设置用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"

4）清除用户信息
$ git config --unset --global user.name "[name]"
$ git config --unset --global user.email "[email address]"
```

#### 查看信息
```objc
//查看当前分支及其所有父类的提交历史
$ git log 

//可以查看所有分支的所有操作记录（包括已经被删除的commit记录和 reset操作）
$ git reflog

//查看变更的文件
$ git status

//查看b提交相对a提交的差异
$ git diff [a-commit] [b-commit]

//查看工作区与最新commit的前一次commit的差异，当从远程拉取更新时即可查看变动的内容。
$git diff HEAD^

```

#### 远程操作
```
// 推送当前本地分支到远程分支
$ git push [remote-repository-name] [branch-name]
// 将当前分支dev推送到远程仓库origin的remoteDev分支
例: $ git push origin dev:remoteDev
 ->   * [new branch]      dev -> remoteDev

//省略远程仓库分支名则在远程创建当前同名分支dev
例: $ git push origin dev
 ->   * [new branch]      dev -> dev

//删除远程仓库origin的分支dev
例: $ git push origin --delete dev

// 添加远程仓库
$ git remote add [repository] [url]
$ git remote add pb git://github.com/fengyueran/test.git

// 拉取远端数据
//会使你与另一仓库同步，提取你本地所没有的数据，不merge，拉取下来的数据在.git/FETCH_HEAD下
$ git fetch 

// 将你的仓库与远端仓库origin同步，提取所有它独有的数据到本地分支以合并或者怎样。
$ git fetch origin

//首先执行下面的fetch操作使用远程dev分支在本地创建localDev分支(但不会切换到该分支)，如果本地不存在localDev分支, 则会自动创建一个新的localDev分支, 如果本地存在localDev分支, 并且是`fast forward', 则自动合并两个分支, 否则, 会阻止以上操作。
$ git fetch origin dev:localDev
-> * [new branch]      dev        -> localDev

```
#### 分支操作

```
// 查看分支
$ git branch

//查看远程分支,远程分支会用红色表示出来（如果你开了颜色支持的话）
$ git branch -r

// 新建分支
$ git branch [branch-name]
例: $ git branch dev

// 切换分支
$ git checkout [branch-name]
例: $ git checkout dev

// 新建并切换分支 
$ git checkout -b <branchname>
//当前分支的记录都会到新分支dev上
例: $ git checkout -b dev

// 删除分支 - git branch -D branchname

$ git branch -D <branchname>
//删除分支dev/app
例: $ git branch -D dev/app(D强制删除)
```



11）git 如何让单个文件回退到指定的版本 - git reset
```objc
1).进入到文件所在文件目录，或者能找到文件的路径
$ git reflog MainActivity.js
2) 回退到指定的版本
$  git reset ecb2cae MainActivity.js
//或用sourceTree
3) 可用sourceTree右键回退。
```

12）合并分支 - git rebase/merge
```objc
//产生更简洁的提交历史
$ git rebase master（将master分支合并到当前分支)
//会产生合并的提交历史
$ git merge hotfix（将hotfix分支合并到当前分支）
```
![](/assets/pic98-1.png)

13）合并提交历史 - git mergetoolhttps://github.com/fengyueran/FMDBDemo.git
```objc
$ git mergetool -t kdiff3
```

14）合并提交历史 - git merge --squash

当我们由master分支切换到新的分支dev工作，工作结束后想merge回master，如果直接在master应用git merge dev，dev的提交历史就会出现在master中，有时这些记录很琐碎没有必要添加到master上，用squash就能解决这一问题。
```objc
//1.squash后dev上的提交就变成了新的文件
$ git merge --squash dev
//2.重新commit代替之前所有提交
$ git commit -m"dev"

```

15）追加到上一次提交 - git commit --amend
```objc
$ git commit --amend
```
#### 其他
```
// 查看某个命令的帮助
git help [command-name]
例: $ git help add
```


 
19）从远端仓库提取数据并尝试合并到当前分支 - git pull
```objc
//基本上，该命令就是在 git fetch 之后紧接着 git merge 远端分支到当前分支
$ git pull 
//衍合能产生一个更为整洁的提交历史
$ git pull --rebase
```
git pull与git pull --rebase的区别如下图，可以看到相比git pull(merge) git rebase不会产生合并记录因而历史记录更加清爽简洁，因此在进行pull时可以用git pull --rebase。

![](/assets/pic98-2.png)

20）储存临时文件 - git stash
```objc
//当工作区有未提交的文件，又想切换到另一个branch时就可以用git stash暂时存储
$ git stash 

//可以通过git stash list查看存储了哪些文件
$ git stash list

//当回到之前的dirty工作区时可以通过git stash apply来恢复之前未提交的文件，也可以在其他branch应用这些存储的临时文件
$ git stash apply

```
21）查看当前配置有哪些远程仓库 - git remote

```objc
$ git remote
例: $ git remote –v  显示对应的远程仓库地址
origin	git@github.com:fengyueran/iOSNote.git (fetch)
origin	git@github.com:fengyueran/iOSNote.git (push)
```
22）打tag

```
//打tag
 //创建一个含附注类型的标签非常简单
 $ git tag -a v1.1.1 -m 'CuraCloudMI version 1.1.1'
 //轻量级tag
 $ git tag v1.0.0
 
//查看tag
$ git show v1.0.0

//删除tag
git tag -d v1.0.0
``` 
23）保留空文件
```
//在空文件夹中新建.gitkeep文件
.gitkeep
```
PS: I am xinghun who is on the road.

24）忽略某些文件
objc常见忽略文件
```
Pods/
xcuserdata/

```
```
//在repository中新建.gitignore文件,在文件中添加需要忽略的文件
//忽略Pods文件夹下的所有文件
platforms/ios/Pods
//忽略www下的所有文件除了plugins
platforms/ios/www/*
!platforms/ios/www/plugins

```
PS: I am xinghun who is on the road.





