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

2）新建文件夹并创建仓库
$ git init [project-name]

3）克隆远程分支，默认为master分支
$ git clone [url] -b [branch-name] [your-folder]
// 克隆远程dev分支
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
// 编辑当前用户的配置文件
例: $ git config -e --global

3）设置当前用户信息
$ git config --global user.name "[name]"
$ git config --global user.email "[email address]"

4）清除当前用户信息
$ git config --unset --global user.name "[name]"
$ git config --unset --global user.email "[email address]"
```
#### 文件操作
```
1）添加文件file1，file2...到暂存区
$ git add [file1] [file2]

2）添加当前目录所有文件到暂存区
$ git add .

3) 添加目录(包括子目录)到暂存区
$ git add [dir]

4) 删除当前目录没有track过的文件
$ git clean -f

5) 删除当前目录没有track过的文件和文件夹
$ git clean -df

6）提交暂存区到仓库区 
$ git commit -m [message]

7）追加到上一次提交 
$ git commit --amend -m [message]

```
#### 查看信息
```
1）查看当前分支及其所有父类的提交历史
$ git log 

2）可以查看所有分支的所有操作记录(包括已经被删除的commit记录和 reset操作）
$ git reflog

3）查看变更的文件
$ git status

4）查看b提交相对a提交的差异
$ git diff [a-commit] [b-commit]

5）查看工作区与最新commit的前一次commit的差异，当从远程拉取更新时即可查看变动的内容。
$ git diff HEAD^

```
#### 远程操作
```
1）列出远程仓库名
$ git remote

2）列出远程仓库名及对应的地址
$ git remote –v  
-> origin	git@github.com:fengyueran/iOSNote.git (fetch)
-> origin	git@github.com:fengyueran/iOSNote.git (push)

3）推送当前本地分支到远程分支
$ git push [remote-repository-name] [branch-name]
// 将当前分支dev推送到远程仓库origin的remoteDev分支
例: $ git push origin dev:remoteDev
 ->   * [new branch]      dev -> remoteDev
// 省略远程仓库分支名则在远程创建当前同名分支dev
例: $ git push origin dev
 ->   * [new branch]      dev -> dev

4）删除远程仓库origin的分支dev
例: $ git push origin --delete dev

5）添加远程仓库
$ git remote add [repository] [url]
// 在远程添加名为pb的仓库
例: $ git remote add pb git://github.com/fengyueran/test.git

6) 拉取远端数据
// 使你与另一仓库同步，提取你本地所没有的数据，不merge，拉取下来的数据在.git/FETCH_HEAD下
$ git fetch 
// 将你的仓库与远端仓库origin同步，提取所有它独有的数据到本地分支以合并或者怎样。
$ git fetch origin
// 下面的fetch操作使用远程dev分支在本地创建localDev分支(但不会切换到该分支)，如果本地不存在localDev分支,则会自动创建一个新的localDev分支,
如果本地存在localDev分支, 并且是`fast forward', 则自动合并两个分支, 否则, 会阻止以上操作。
$ git fetch origin dev:localDev
-> * [new branch]      dev        -> localDev

7）从远程仓库提取数据并尝试合并到当前分支
// 基本上，该命令就是在git fetch之后紧接着git merge远端分支到当前分支
$ git pull 
//merge操作会生成一个新的节点，之前的提交分开显示。而rebase操作不会生成新的节点, 因而能产生一个更为整洁的提交历史
$ git pull --rebase

```
#### 分支操作

```
1）查看本地分支
$ git branch

2）查看远程分支,远程分支会用红色表示出来(如果你开了颜色支持的话）
$ git branch -r

3）新建分支
$ git branch [branch-name]
例: $ git branch dev

4）切换分支
$ git checkout [branch-name]
例: $ git checkout dev

5）新建并切换分支 
$ git checkout -b [branch-name]
// 当前分支的记录都会到新分支dev上
例: $ git checkout -b dev

6）删除分支 
$ git branch -D [branch-name]

7）叫起合并冲突工具kdiff3
$ git mergetool -t kdiff3

8) 合并某个分支到当前分支
// 如果不是`fast forward'则会产生合并的提交历史
$ git merge [branch-name]
// 将hotfix分支合并到当前分支
例: $ git merge hotfix
// 无论是否是`fast forward'都产生合并的提交历史
例: $ git merge hotfix --no-f

9) 选择任意一个commit，合并进当前分支
$ git cherry-pick [commit]

10）合并提交历史 
// 当我们由master分支切换到新的分支dev工作，工作结束后想merge回master，如果直接在master应用git merge dev，
dev的提交历史就会出现在master中，有时这些记录很琐碎没有必要添加到master上，用squash就能解决这一问题。
a:squash后dev上的提交就变成了新的文件
  $ git merge --squash dev
b:重新commit代替之前所有提交
  $ git commit -m "dev"

```
#### 版本回退

```
1）储存临时文件
//当工作区有未提交的文件，又想切换到另一个branch时就可以用git stash暂时存储
$ git stash 

2）查看存储了哪些文件
$ git stash list

3）应用存储的临时文件
// 当回到之前的dirty工作区时可以通过git stash apply来恢复之前未提交的文件，也可以在其他branch应用这些存储的临时文件
$ git stash apply

4) 让单个文件回退到指定的版本
a:进入到文件所在文件目录，或者能找到文件的路径
  $ git reflog test.js
  -> 60e207a (HEAD -> master) HEAD@{0}: commit: test.js +2
     1435819 HEAD@{1}: commit: test.js +1
b:回退到指定的版本
  $  git reset 1435819 test.js

```
#### tag

```
1) 轻量级tag
$ git tag [version]
例: $ git tag v1.0.0
 
2) 创建一个含附注类型的标签非常简单
$ git tag -a [version] -m "[detail]"
$ git tag -a v1.1.1 -m "CuraCloudMI version 1.1.1"

3) 查看tag
$ git show [version]

4) 删除tag
git tag -d [version]
```
#### 其他
```
1) 查看某个命令的帮助
git help [command-name]

2) 保留空文件
在空文件夹中新建.gitkeep文件

3) 忽略某些文件
在.gitignore文件中添加需要忽略的文件夹或文件
例: 
//忽略Pods文件夹下的所有文件
platforms/ios/Pods

//忽略www下的所有文件除了plugins
platforms/ios/www/*
!platforms/ios/www/plugins

```






