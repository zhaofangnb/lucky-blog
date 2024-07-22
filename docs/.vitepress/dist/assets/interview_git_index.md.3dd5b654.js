import{_ as a,c as s,o as e,d as n}from"./app.008430f5.js";const A=JSON.parse('{"title":"Git","description":"","frontmatter":{},"headers":[{"level":2,"title":"Git极具前瞻性的三个诉求","slug":"git极具前瞻性的三个诉求","link":"#git极具前瞻性的三个诉求","children":[{"level":3,"title":"Git config编辑配置","slug":"git-config编辑配置","link":"#git-config编辑配置","children":[]},{"level":3,"title":"Git 初始化配置","slug":"git-初始化配置","link":"#git-初始化配置","children":[]},{"level":3,"title":"克隆远程仓库","slug":"克隆远程仓库","link":"#克隆远程仓库","children":[]},{"level":3,"title":"关联远程仓库地址","slug":"关联远程仓库地址","link":"#关联远程仓库地址","children":[]},{"level":3,"title":"查看分支","slug":"查看分支","link":"#查看分支","children":[]},{"level":3,"title":"切换分支","slug":"切换分支","link":"#切换分支","children":[]},{"level":3,"title":"新建分支","slug":"新建分支","link":"#新建分支","children":[]},{"level":3,"title":"合并分支","slug":"合并分支","link":"#合并分支","children":[]},{"level":3,"title":"删除本地分支","slug":"删除本地分支","link":"#删除本地分支","children":[]},{"level":3,"title":"删除远程分支","slug":"删除远程分支","link":"#删除远程分支","children":[]},{"level":3,"title":"同步所有分支列表","slug":"同步所有分支列表","link":"#同步所有分支列表","children":[]},{"level":3,"title":"简化输出commit信息","slug":"简化输出commit信息","link":"#简化输出commit信息","children":[]},{"level":3,"title":"撤销git commit","slug":"撤销git-commit","link":"#撤销git-commit","children":[]},{"level":3,"title":"git栈","slug":"git栈","link":"#git栈","children":[]},{"level":3,"title":"git比较文件差异","slug":"git比较文件差异","link":"#git比较文件差异","children":[]},{"level":3,"title":"设置版本库标签","slug":"设置版本库标签","link":"#设置版本库标签","children":[]}]}],"relativePath":"interview/git/index.md","lastUpdated":null}'),l={name:"interview/git/index.md"},t=n(`<h1 id="git" tabindex="-1">Git <a class="header-anchor" href="#git" aria-hidden="true">#</a></h1><h2 id="git极具前瞻性的三个诉求" tabindex="-1">Git极具前瞻性的三个诉求 <a class="header-anchor" href="#git极具前瞻性的三个诉求" aria-hidden="true">#</a></h2><p>Git 的作者是Torvalds，这位天才只用了10天的时间用<code>C语言</code>写了一个分布式版本控制系统。</p><ol><li>可靠性(reliable)</li><li>高效(high-performance)</li><li>分布式(distributed)</li></ol><h3 id="git-config编辑配置" tabindex="-1">Git config编辑配置 <a class="header-anchor" href="#git-config编辑配置" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git config --global user.email &quot;email&quot; </span></span>
<span class="line"><span style="color:#A6ACCD;">git config --global uer.name &quot;username&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git-初始化配置" tabindex="-1">Git 初始化配置 <a class="header-anchor" href="#git-初始化配置" aria-hidden="true">#</a></h3><p>进入工作目录，右键<code>Git Bash Here</code>, 执行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git init</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>可以看到当前文件夹里多了一个.git的隐藏文件，一个git工作区就初始化好了</p><h3 id="克隆远程仓库" tabindex="-1">克隆远程仓库 <a class="header-anchor" href="#克隆远程仓库" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git clone &lt;远程仓库的url&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>克隆指定分支的代码</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git clone -b &lt;分支branch&gt; &lt;远程仓库的url&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="关联远程仓库地址" tabindex="-1">关联远程仓库地址 <a class="header-anchor" href="#关联远程仓库地址" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git remote add origin &lt;远程仓库的url&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">git push -u origin &quot;master&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="查看分支" tabindex="-1">查看分支 <a class="header-anchor" href="#查看分支" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git branch  // 查看本地分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git branch -a // 查看本地和远程所有分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="切换分支" tabindex="-1">切换分支 <a class="header-anchor" href="#切换分支" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git checkout dev // 切换到dev分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="新建分支" tabindex="-1">新建分支 <a class="header-anchor" href="#新建分支" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git checkout -b &lt;newBranch&gt; // 从当前分支新建newBranch分支并切换到该分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="合并分支" tabindex="-1">合并分支 <a class="header-anchor" href="#合并分支" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git merge dev // 在当前分支的基础上合并dev分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="删除本地分支" tabindex="-1">删除本地分支 <a class="header-anchor" href="#删除本地分支" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git branch -d dev // 删除本地dev分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="删除远程分支" tabindex="-1">删除远程分支 <a class="header-anchor" href="#删除远程分支" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git branch origin --delete dev // 删除远程dev分支</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="同步所有分支列表" tabindex="-1">同步所有分支列表 <a class="header-anchor" href="#同步所有分支列表" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git fetch -p</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="简化输出commit信息" tabindex="-1">简化输出commit信息 <a class="header-anchor" href="#简化输出commit信息" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git log --oneline</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="撤销git-commit" tabindex="-1">撤销git commit <a class="header-anchor" href="#撤销git-commit" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git reset --soft HEAD^  // 回退到上个版本</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>HEAD^ 表示上个版本 HEAD^^表示上上个版本</p><p>--soft 只是把[HEAD] 指向的commit恢复到指定的commit，【暂存区】、【工作区】不变 --hard 把[HEAD]、【暂存区】、【工作区】都修改为指定commit的文件状态</p><h4 id="reset-还是-revert" tabindex="-1">reset 还是 revert ? <a class="header-anchor" href="#reset-还是-revert" aria-hidden="true">#</a></h4><p>reset用来<code>&quot;回退&quot;</code>版本。</p><p>revert用来<code>&quot;还原&quot;</code>某次提交。</p><p>例如master分支，有以下提交历史:</p><p>42eae13 <code>(HEAD -&gt; master)</code> 第四次修改 97ea0f9 第三次修改 e50b7c2 第二次修改 3a52650 第一次修改</p><p>master最新版本为第四次修改。</p><p><code>如果第四次修改有错误，需要回滚到第三次提交，就可以使用reset来回退。</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git reset --hard 97ea0f9  // 找到想要退回的commit_id</span></span>
<span class="line"><span style="color:#A6ACCD;">git push origin HEAD:master --force</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>执行完之后，git提交历史变为:</p><p>97ea0f9 <code>(HEAD -&gt; master)</code> 第三次修改 e50b7c2 第二次修改 3a52650 第一次修改</p><p><code>如果第三次修改有错误，想要恢复第三次修改，却要保留第四次修改呢？</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git revert -n 97ea0f9</span></span>
<span class="line"><span style="color:#A6ACCD;">git commit -m &quot;恢复第三次修改&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>执行完之后，git提交历史变为: 33b8b30 (HEAD -&gt; master) Revert &quot;恢复第三次修改&quot; 42eae13 第四次修改 97ea0f9 第三次修改 e50b7c2 第二次修改 3a52650 第一次修改</p><p>实际上，Git把第三次修改从提交中剔除(还原)了，还保留了第四次修改，并且产生了新的commit_id。</p><h3 id="git栈" tabindex="-1">git栈 <a class="header-anchor" href="#git栈" aria-hidden="true">#</a></h3><p>将当前的工作状态保存到git栈，在需要的时候恢复</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">git stash</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash save &quot;test&quot; // 可添加注释，方便查找</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash list  // 查看当前stash的所有内容</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash pop // 恢复， 将堆栈中的最新内容删除</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash apply // 恢复，堆栈中内容不会删除，可重用其他分支</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash drop stash@{num} // 从堆栈中移除指定stash</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash clear // 移除全部stash</span></span>
<span class="line"><span style="color:#A6ACCD;">git stash show // 查看堆栈中的内容与当前目录中的差异</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="git比较文件差异" tabindex="-1">git比较文件差异 <a class="header-anchor" href="#git比较文件差异" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">  git diff    ---&gt;   当暂存区有文件时，比较的是当前工作区中的文件与暂存区中的文件</span></span>
<span class="line"><span style="color:#A6ACCD;">  当暂存区没有文件时，git diff 比较的是上次提交到版本库中的文件与工作区中的文件</span></span>
<span class="line"><span style="color:#A6ACCD;">  git diff Head     --------&gt;  Head指向版本库中当前最新版本</span></span>
<span class="line"><span style="color:#A6ACCD;">  git diff commitId   -----&gt;  比较 指定提交ID 与当前工作区的差异</span></span>
<span class="line"><span style="color:#A6ACCD;">  git diff --cached commitId   ----&gt; 比较暂存区 与 指定提交ID 的差异</span></span>
<span class="line"><span style="color:#A6ACCD;">  git diff --cached HEAD    -----&gt; 将暂存区内容与最新一次提交进行比较</span></span>
<span class="line"><span style="color:#A6ACCD;">  git diff commit1 commit2     ------&gt; 比较指定的两次提交的差异</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="设置版本库标签" tabindex="-1">设置版本库标签 <a class="header-anchor" href="#设置版本库标签" aria-hidden="true">#</a></h3><p>在发布版本时，应该给git打上一个v.1.0.0这样的版本标记</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">// 创建版本号对应的 git tag</span></span>
<span class="line"><span style="color:#A6ACCD;">git tag 1.0.0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 将新的 git tag 推送到 github 上面</span></span>
<span class="line"><span style="color:#A6ACCD;">git push --tag </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>推送版本 ，就可以在 Git 上面看到一个版本标记，而且可以提供此版本的 zip 打包下载。实际上这个也可以作为一种软件分发方式，只不过相对于使用 npm 包管理器，没有提供自动依赖安装。</p>`,60),i=[t];function p(c,o,r,d,h,g){return e(),s("div",null,i)}const u=a(l,[["render",p]]);export{A as __pageData,u as default};
