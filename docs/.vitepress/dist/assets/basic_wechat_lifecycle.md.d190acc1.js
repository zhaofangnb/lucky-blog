import{_ as t,c as e,o as n,d as a}from"./app.008430f5.js";const x=JSON.parse('{"title":"小程序生命周期","description":"","frontmatter":{},"headers":[{"level":2,"title":"应用的生命周期","slug":"应用的生命周期","link":"#应用的生命周期","children":[]},{"level":2,"title":"页面的生命周期","slug":"页面的生命周期","link":"#页面的生命周期","children":[]},{"level":2,"title":"组件的生命周期","slug":"组件的生命周期","link":"#组件的生命周期","children":[]},{"level":2,"title":"特殊的生命周期","slug":"特殊的生命周期","link":"#特殊的生命周期","children":[]}],"relativePath":"basic/wechat/lifecycle.md","lastUpdated":null}'),l={name:"basic/wechat/lifecycle.md"},s=a(`<h1 id="小程序生命周期" tabindex="-1">小程序生命周期 <a class="header-anchor" href="#小程序生命周期" aria-hidden="true">#</a></h1><blockquote><p>小程序中生命周期主要分成了三部分:</p></blockquote><ul><li>应用的生命周期</li><li>页面的生命周期</li><li>组件的生命周期</li></ul><h2 id="应用的生命周期" tabindex="-1">应用的生命周期 <a class="header-anchor" href="#应用的生命周期" aria-hidden="true">#</a></h2><p>小程序的生命周期函数是在<code>app.js</code>里面调用的，通过<code>App(Object)函数</code>用来注册一个小程序，指定其小程序的生命周期回调</p><table><thead><tr><th style="text-align:center;">生命周期</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">onLaunch</td><td style="text-align:center;">小程序初始化完成时触发，全局只触发一次</td></tr><tr><td style="text-align:center;">onShow</td><td style="text-align:center;">小程序启动，或从后台进入前台显示时触发</td></tr><tr><td style="text-align:center;">onHide</td><td style="text-align:center;">小程序从前台进入后台时触发</td></tr><tr><td style="text-align:center;">onError</td><td style="text-align:center;">小程序发生脚本错误或 API 调用报错时触发</td></tr><tr><td style="text-align:center;">onPageNotFound</td><td style="text-align:center;">小程序要打开的页面不存在时触发</td></tr><tr><td style="text-align:center;">onUnhandledRejection</td><td style="text-align:center;">小程序有未处理的 Promise 拒绝时触发</td></tr><tr><td style="text-align:center;">onThemeChange</td><td style="text-align:center;">系统切换主题时触发</td></tr></tbody></table><h2 id="页面的生命周期" tabindex="-1">页面的生命周期 <a class="header-anchor" href="#页面的生命周期" aria-hidden="true">#</a></h2><p>页面生命周期函数就是当你<code>每进入/切换到</code>一个新的页面的时候，就会调用的生命周期函数，同样通过<code>App(Object)函数</code>用来注册一个页面</p><table><thead><tr><th style="text-align:center;">生命周期</th><th style="text-align:center;">说明</th><th style="text-align:center;">作用</th></tr></thead><tbody><tr><td style="text-align:center;">onLoad</td><td style="text-align:center;">生命周期回调—监听页面加载</td><td style="text-align:center;">发送请求获取数据</td></tr><tr><td style="text-align:center;">onShow</td><td style="text-align:center;">生命周期回调—监听页面显示</td><td style="text-align:center;">请求数据</td></tr><tr><td style="text-align:center;">onReady</td><td style="text-align:center;">生命周期回调—监听页面初次渲染完成</td><td style="text-align:center;">获取页面元素（少用）</td></tr><tr><td style="text-align:center;">onHide</td><td style="text-align:center;">生命周期回调—监听页面隐藏</td><td style="text-align:center;">终止任务，如定时器或者播放音乐</td></tr><tr><td style="text-align:center;">onUnload</td><td style="text-align:center;">生命周期回调—监听页面卸载</td><td style="text-align:center;">终止任务</td></tr></tbody></table><h2 id="组件的生命周期" tabindex="-1">组件的生命周期 <a class="header-anchor" href="#组件的生命周期" aria-hidden="true">#</a></h2><p>组件的生命周期，指的是组件自身的一些函数，这些函数在特殊的时间点或遇到一些特殊的框架事件时被自动触发，通过<code>Component(Object)</code>进行注册组件</p><table><thead><tr><th style="text-align:center;">生命周期</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">created</td><td style="text-align:center;">生命周期回调—监听页面加载</td></tr><tr><td style="text-align:center;">attached</td><td style="text-align:center;">生命周期回调—监听页面显示</td></tr><tr><td style="text-align:center;">ready</td><td style="text-align:center;">生命周期回调—监听页面初次渲染完成</td></tr><tr><td style="text-align:center;">moved</td><td style="text-align:center;">生命周期回调—监听页面隐藏</td></tr><tr><td style="text-align:center;">detached</td><td style="text-align:center;">生命周期回调—监听页面卸载</td></tr><tr><td style="text-align:center;">error</td><td style="text-align:center;">每当组件方法抛出错误时执行</td></tr></tbody></table><blockquote><p><strong>注意：</strong></p></blockquote><ul><li>组件实例刚刚被创建好时， created 生命周期被触发，此时，组件数据 this.data 就是在 Component 构造器中定义的数据 data ， <code>此时不能调用 setData</code></li><li>在组件完全初始化完毕、进入页面节点树后， attached 生命周期被触发。此时， this.data 已被初始化为组件的当前值。这个生命周期很有用，<code>绝大多数初始化工作可以在这个时机进行</code></li><li>在组件离开页面节点树后， detached 生命周期被触发。退出一个页面时，如果组件还在页面节点树中，则 detached 会被触发</li></ul><h2 id="特殊的生命周期" tabindex="-1">特殊的生命周期 <a class="header-anchor" href="#特殊的生命周期" aria-hidden="true">#</a></h2><p>它们并非与组件有很强的关联，但有时组件需要获知，以便组件内部处理，这样的生命周期称为<code>组件所在页面的生命周期</code>，在 <code>pageLifetimes</code>定义段中定义，如下：</p><table><thead><tr><th style="text-align:center;">生命周期</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">show</td><td style="text-align:center;">组件所在的页面被展示时执行</td></tr><tr><td style="text-align:center;">hide</td><td style="text-align:center;">组件所在的页面被隐藏时执行</td></tr></tbody></table><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">pageLifetimes</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">show</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">hide</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p><strong>当存在也应用生命周期和页面周期的时候，相关的执行顺序如下：</strong><br></p><p>打开小程序：(App)onLaunch --&gt; (App)onShow --&gt; (Pages)onLoad --&gt; (Pages)onShow --&gt; (pages)onRead<br></p><p>进入下一个页面：(Pages)onHide --&gt; (Next)onLoad --&gt; (Next)onShow --&gt; (Next)onReady<br></p><p>返回上一个页面：(curr)onUnload --&gt; (pre)onShow<br></p><p>离开小程序：(App)onHide<br></p><p>再次进入：小程序未销毁 --&gt; (App)onShow(执行上面的顺序），小程序被销毁，（App)onLaunch重新开始执行.<br></p>`,24),r=[s];function d(o,c,p,i,y,h){return n(),e("div",null,r)}const A=t(l,[["render",d]]);export{x as __pageData,A as default};