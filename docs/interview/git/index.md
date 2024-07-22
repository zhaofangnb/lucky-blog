# Git

## Git极具前瞻性的三个诉求

Git 的作者是Torvalds，这位天才只用了10天的时间用`C语言`写了一个分布式版本控制系统。

1. 可靠性(reliable)
2. 高效(high-performance)
3. 分布式(distributed)

### Git config编辑配置
```
git config --global user.email "email" 
git config --global uer.name "username"
```

### Git 初始化配置

进入工作目录，右键`Git Bash Here`, 执行

```
git init
```

可以看到当前文件夹里多了一个.git的隐藏文件，一个git工作区就初始化好了


### 克隆远程仓库
```
git clone <远程仓库的url>
```

克隆指定分支的代码
```
git clone -b <分支branch> <远程仓库的url>
```

### 关联远程仓库地址
```
git remote add origin <远程仓库的url>
git push -u origin "master"
```

### 查看分支
```
git branch  // 查看本地分支
```

```
git branch -a // 查看本地和远程所有分支
```
### 切换分支
```
git checkout dev // 切换到dev分支
```

### 新建分支
```
git checkout -b <newBranch> // 从当前分支新建newBranch分支并切换到该分支
```

### 合并分支
```
git merge dev // 在当前分支的基础上合并dev分支
```

### 删除本地分支
```
git branch -d dev // 删除本地dev分支
```

### 删除远程分支
```
git branch origin --delete dev // 删除远程dev分支
```

### 同步所有分支列表
```
git fetch -p
```

### 简化输出commit信息
```
git log --oneline
```

### 撤销git commit
```
git reset --soft HEAD^  // 回退到上个版本
```
HEAD^ 表示上个版本
HEAD^^表示上上个版本

--soft 只是把[HEAD] 指向的commit恢复到指定的commit，【暂存区】、【工作区】不变
--hard 把[HEAD]、【暂存区】、【工作区】都修改为指定commit的文件状态

#### reset 还是 revert ?

reset用来`"回退"`版本。

revert用来`"还原"`某次提交。

例如master分支，有以下提交历史:

42eae13 `(HEAD -> master)` 第四次修改
97ea0f9 第三次修改
e50b7c2 第二次修改
3a52650 第一次修改

master最新版本为第四次修改。

`如果第四次修改有错误，需要回滚到第三次提交，就可以使用reset来回退。`
```
git reset --hard 97ea0f9  // 找到想要退回的commit_id
git push origin HEAD:master --force
```
执行完之后，git提交历史变为:

97ea0f9 `(HEAD -> master)` 第三次修改
e50b7c2 第二次修改
3a52650 第一次修改

`如果第三次修改有错误，想要恢复第三次修改，却要保留第四次修改呢？`

```
git revert -n 97ea0f9
git commit -m "恢复第三次修改"
```
执行完之后，git提交历史变为:
33b8b30 (HEAD -> master) Revert "恢复第三次修改"
42eae13 第四次修改
97ea0f9 第三次修改
e50b7c2 第二次修改
3a52650 第一次修改

实际上，Git把第三次修改从提交中剔除(还原)了，还保留了第四次修改，并且产生了新的commit_id。

### git栈

将当前的工作状态保存到git栈，在需要的时候恢复
```
git stash
git stash save "test" // 可添加注释，方便查找
git stash list  // 查看当前stash的所有内容
git stash pop // 恢复， 将堆栈中的最新内容删除
git stash apply // 恢复，堆栈中内容不会删除，可重用其他分支
git stash drop stash@{num} // 从堆栈中移除指定stash
git stash clear // 移除全部stash
git stash show // 查看堆栈中的内容与当前目录中的差异
```

### git比较文件差异
```
  git diff    --->   当暂存区有文件时，比较的是当前工作区中的文件与暂存区中的文件
  当暂存区没有文件时，git diff 比较的是上次提交到版本库中的文件与工作区中的文件
  git diff Head     -------->  Head指向版本库中当前最新版本
  git diff commitId   ----->  比较 指定提交ID 与当前工作区的差异
  git diff --cached commitId   ----> 比较暂存区 与 指定提交ID 的差异
  git diff --cached HEAD    -----> 将暂存区内容与最新一次提交进行比较
  git diff commit1 commit2     ------> 比较指定的两次提交的差异
```

### 设置版本库标签
在发布版本时，应该给git打上一个v.1.0.0这样的版本标记
```
// 创建版本号对应的 git tag
git tag 1.0.0

// 将新的 git tag 推送到 github 上面
git push --tag 
```

推送版本 ，就可以在 Git 上面看到一个版本标记，而且可以提供此版本的 zip 打包下载。实际上这个也可以作为一种软件分发方式，只不过相对于使用 npm 包管理器，没有提供自动依赖安装。