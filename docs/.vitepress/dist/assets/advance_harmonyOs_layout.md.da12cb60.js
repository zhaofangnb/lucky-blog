import{_ as s,c as n,o as a,d as l}from"./app.008430f5.js";const A=JSON.parse('{"title":"常用布局","description":"","frontmatter":{},"headers":[{"level":2,"title":"线性布局(Column/Row)","slug":"线性布局-column-row","link":"#线性布局-column-row","children":[{"level":3,"title":"基本概念","slug":"基本概念","link":"#基本概念","children":[]},{"level":3,"title":"布局子元素在交叉轴对齐方式","slug":"布局子元素在交叉轴对齐方式","link":"#布局子元素在交叉轴对齐方式","children":[]},{"level":3,"title":"布局子元素在主轴对齐方式","slug":"布局子元素在主轴对齐方式","link":"#布局子元素在主轴对齐方式","children":[]},{"level":3,"title":"自适应伸缩","slug":"自适应伸缩","link":"#自适应伸缩","children":[]},{"level":3,"title":"自适应缩放","slug":"自适应缩放","link":"#自适应缩放","children":[]},{"level":3,"title":"自适应延伸","slug":"自适应延伸","link":"#自适应延伸","children":[]}]},{"level":2,"title":"Flex弹性布局","slug":"flex弹性布局","link":"#flex弹性布局","children":[{"level":3,"title":"布局方向","slug":"布局方向","link":"#布局方向","children":[]},{"level":3,"title":"布局换行","slug":"布局换行","link":"#布局换行","children":[]},{"level":3,"title":"主轴上对齐方式","slug":"主轴上对齐方式","link":"#主轴上对齐方式","children":[]},{"level":3,"title":"交叉轴对齐方式","slug":"交叉轴对齐方式","link":"#交叉轴对齐方式","children":[]},{"level":3,"title":"内容对齐","slug":"内容对齐","link":"#内容对齐","children":[]}]},{"level":2,"title":"自适应拉伸","slug":"自适应拉伸","link":"#自适应拉伸","children":[]}],"relativePath":"advance/harmonyOs/layout.md","lastUpdated":null}'),p={name:"advance/harmonyOs/layout.md"},o=l(`<h1 id="常用布局" tabindex="-1">常用布局 <a class="header-anchor" href="#常用布局" aria-hidden="true">#</a></h1><h2 id="线性布局-column-row" tabindex="-1">线性布局(Column/Row) <a class="header-anchor" href="#线性布局-column-row" aria-hidden="true">#</a></h2><h3 id="基本概念" tabindex="-1">基本概念 <a class="header-anchor" href="#基本概念" aria-hidden="true">#</a></h3><ul><li>布局容器: 具有布局能力的容器组件，可以承载其他元素作为其子元素，会对其其子元素进行尺寸计算和布局排列。</li><li>主轴: 线性布局在布局方向上的轴线。 Row容器主轴在水平方向, Column容器主轴在垂直方向。</li><li>交叉轴: 垂直于主轴方向的轴线.</li><li>间距: 布局子元素的间距。</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">Column(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">space:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#C3E88D;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">Text(&#39;space:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">).fontSize(15).fontColor(Color.Gray).width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">90</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">    Row().width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">90</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">).height(50).backgroundColor(0xF5DEB3)</span></span>
<span class="line"><span style="color:#C3E88D;">    Row().width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">90</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">).height(50).backgroundColor(0xD2B48C)</span></span>
<span class="line"><span style="color:#C3E88D;">    Row().width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">90</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">).height(50).backgroundColor(0xF5DEB3)</span></span>
<span class="line"><span style="color:#C3E88D;">}.width(100%)</span></span>
<span class="line"></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">Row(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">space:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">35</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">Text(&#39;space:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">35</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">).fontSize(15).fontColor(Color.Gray)</span></span>
<span class="line"><span style="color:#C3E88D;">    Row().width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">10</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">).height(150).backgroundColor(0xF5DEB3)</span></span>
<span class="line"><span style="color:#C3E88D;">    Row().width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">10</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">).height(150).backgroundColor(0xD2B48C)</span></span>
<span class="line"><span style="color:#C3E88D;">    Row().width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">10</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">).height(150).backgroundColor(0xF5DEB3)</span></span>
<span class="line"><span style="color:#C3E88D;">}.width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">90</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"></span></code></pre></div><h3 id="布局子元素在交叉轴对齐方式" tabindex="-1">布局子元素在交叉轴对齐方式 <a class="header-anchor" href="#布局子元素在交叉轴对齐方式" aria-hidden="true">#</a></h3><p>交叉轴为<code>垂直方向时取值为VerticalAlign</code>类型，<code>水平方向取值为HorizontalAlign</code>。</p><p>Column容器内子元素在水平方向上的排列:</p><ul><li>HorizontalAlign.Start：子元素在水平方向左对齐。</li><li>HorizontalAlign.Center：子元素在水平方向居中对齐。</li><li>HorizontalAlign.End：子元素在水平方向右对齐。</li></ul><p>Row容器内子元素在垂直方向上的排列：</p><ul><li>VerticalAlign.Top：子元素在垂直方向顶部对齐。</li><li>VerticalAlign.Center：子元素在垂直方向居中对齐。</li><li>VerticalAlign.Bottom：子元素在垂直方向底部对齐。</li></ul><p><code>alignSelf</code>属性用于控制单个子元素在容器交叉轴上的对齐方式，<code>其优先级高于alignItems属性，如果设置了alignSelf属性，则在单个子元素上会覆盖alignItems属性</code>。</p><h3 id="布局子元素在主轴对齐方式" tabindex="-1">布局子元素在主轴对齐方式 <a class="header-anchor" href="#布局子元素在主轴对齐方式" aria-hidden="true">#</a></h3><p>Column容器内子元素在垂直方向上的排列：</p><ul><li>justifyContent(FlexAlign.Start)：元素在垂直方向首端对齐，第一个元素与行首对齐，同时后续的元素与前一个对齐。</li><li>justifyContent(FlexAlign.Center)：元素在垂直方向中心对齐，第一个元素与行首的距离与最后一个元素与行尾距离相同。</li><li>justifyContent(FlexAlign.End)：元素在垂直方向尾部对齐，最后一个元素与行尾对齐，其他元素与后一个对齐。</li><li>justifyContent(FlexAlign.SpaceBetween)：垂直方向均匀分配元素，相邻元素之间距离相同。第一个元素与行首对齐，最后一个元素与行尾对齐。</li><li>justifyContent(FlexAlign.SpaceAround)：垂直方向均匀分配元素，相邻元素之间距离相同。第一个元素到行首的距离和最后一个元素到行尾的距离是相邻元素之间距离的一半。</li><li>justifyContent(FlexAlign.SpaceEvenly)：垂直方向均匀分配元素，相邻元素之间的距离、第一个元素与行首的间距、最后一个元素到行尾的间距都完全一样。</li></ul><p>Row容器内子元素在水平方向上的排列同理，如上。</p><h3 id="自适应伸缩" tabindex="-1">自适应伸缩 <a class="header-anchor" href="#自适应伸缩" aria-hidden="true">#</a></h3><p>设置Row和Column的宽高为百分比，当屏幕宽高变化时，会产生自适应效果。</p><h3 id="自适应缩放" tabindex="-1">自适应缩放 <a class="header-anchor" href="#自适应缩放" aria-hidden="true">#</a></h3><ol><li>父容器尺寸确定时，使用<code>百分比设置子组件和兄弟元素的宽度</code>，使他们在任意尺寸的设备下保持固定的自适应占比。</li></ol><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">@Entry</span></span>
<span class="line"><span style="color:#FFCB6B;">@Component</span></span>
<span class="line"><span style="color:#FFCB6B;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">WidthExample</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">Column</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#82AAFF;">Row</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">Column</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#FFCB6B;">Text(&#39;left</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">width</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">            .textAlign(TextAlign.Center)</span></span>
<span class="line"><span style="color:#C3E88D;">        }.width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">20</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">).backgroundColor(0xF5DEB3).height(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">100</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">        Column() {</span></span>
<span class="line"><span style="color:#C3E88D;">          Text(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">center</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">width</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">            .textAlign(TextAlign.Center)</span></span>
<span class="line"><span style="color:#C3E88D;">        }.width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">50</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">).backgroundColor(0xD2B48C).height(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">100</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">        Column() {</span></span>
<span class="line"><span style="color:#C3E88D;">          Text(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">right</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">width</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">            .textAlign(TextAlign.Center)</span></span>
<span class="line"><span style="color:#C3E88D;">        }.width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">30</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">).backgroundColor(0xF5DEB3).height(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">100</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">      }.backgroundColor(0xffd306).height(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">30</span><span style="color:#C3E88D;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">    }</span></span>
<span class="line"><span style="color:#C3E88D;">  }</span></span>
<span class="line"><span style="color:#C3E88D;">}</span></span>
<span class="line"></span></code></pre></div><p>2.父容器尺寸确定时，使用layoutWeight属性设置子组件和兄弟元素在主轴上的权重，忽略元素本身尺寸设置，使它们在任意尺寸的设备下自适应占满剩余空间。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">@Entry</span></span>
<span class="line"><span style="color:#FFCB6B;">@Component</span></span>
<span class="line"><span style="color:#FFCB6B;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">WidthExample</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">Column</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#82AAFF;">Row</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">Column</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#FFCB6B;">Text(&#39;layoutWeight(1</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">            .textAlign(TextAlign.Center)</span></span>
<span class="line"><span style="color:#C3E88D;">        }.layoutWeight(1).backgroundColor(0xF5DEB3).height(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">        Column() {</span></span>
<span class="line"><span style="color:#C3E88D;">          Text(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">layoutWeight</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">            .textAlign(TextAlign.Center)</span></span>
<span class="line"><span style="color:#C3E88D;">        }.layoutWeight(2).backgroundColor(0xD2B48C).height(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">        Column() {</span></span>
<span class="line"><span style="color:#C3E88D;">          Text(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">layoutWeight</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">            .textAlign(TextAlign.Center)</span></span>
<span class="line"><span style="color:#C3E88D;">        }.layoutWeight(3).backgroundColor(0xF5DEB3).height(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">      }.backgroundColor(0xffd306).height(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">30</span><span style="color:#A6ACCD;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">    }</span></span>
<span class="line"><span style="color:#C3E88D;">  }</span></span>
<span class="line"><span style="color:#C3E88D;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="自适应延伸" tabindex="-1">自适应延伸 <a class="header-anchor" href="#自适应延伸" aria-hidden="true">#</a></h3><ul><li>在List中添加滚动条：当List子项过多一屏放不下时，可以将每一项子元素放置在不同的组件中，通过滚动条进行拖动展示。可以通过<code>scrollBar属性</code>设置滚动条的常驻状态，<code>edgeEffect属性</code>设置拖动到内容最末端的回弹效果。</li><li>使用Scroll组件：在线性布局中，开发者可以进行垂直方向或者水平方向的布局。当一屏无法完全显示时，可以<code>在Column或Row组件的外层包裹一个可滚动的容器组件Scroll</code>来实现可滑动的线性布局。</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">@Entry</span></span>
<span class="line"><span style="color:#FFCB6B;">@Component</span></span>
<span class="line"><span style="color:#FFCB6B;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ScrollExample</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">scroller:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Scroller</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Scroller</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">arr:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">number[]</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">7</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">8</span><span style="color:#A6ACCD;">, </span><span style="color:#F78C6C;">9</span><span style="color:#89DDFF;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">Scroll(this.scroller</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#82AAFF;">Column</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#FFCB6B;">ForEach(this.arr,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">item</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> =</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#82AAFF;">Text(item.toString</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">.width(&#39;90%&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">.height(150</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">.backgroundColor(0xFFFFFF</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">.borderRadius(15</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">.fontSize(16</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">.textAlign(TextAlign.Center</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#FFCB6B;">.margin(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">top:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">, item =</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> item)</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">.width</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">100%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">.backgroundColor(0xDCDCDC</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">.scrollable(ScrollDirection.Vertical</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;"># 滚动方向为垂直方向</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">.scrollBar(BarState.On</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;"># 滚动条常驻显示</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">.scrollBarColor(Color.Gray</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;"># 滚动条颜色</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">.scrollBarWidth(10</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;"># 滚动条宽度</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">.edgeEffect(EdgeEffect.Spring</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;"># 滚动到边沿后回弹</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="flex弹性布局" tabindex="-1">Flex弹性布局 <a class="header-anchor" href="#flex弹性布局" aria-hidden="true">#</a></h2><h3 id="布局方向" tabindex="-1">布局方向 <a class="header-anchor" href="#布局方向" aria-hidden="true">#</a></h3><ul><li>Row</li><li>RowReverse</li><li>Column</li><li>ColumnReverse</li></ul><h3 id="布局换行" tabindex="-1">布局换行 <a class="header-anchor" href="#布局换行" aria-hidden="true">#</a></h3><ul><li>FlexWrap. NoWrap（默认值）：不换行。如果子组件的宽度总和大于父元素的宽度，则子组件会被压缩宽度。</li><li>FlexWrap. Wrap：换行，每一行子组件按照主轴方向排列。</li><li>FlexWrap. WrapReverse：换行，每一行子组件按照主轴反方向排列。</li></ul><h3 id="主轴上对齐方式" tabindex="-1">主轴上对齐方式 <a class="header-anchor" href="#主轴上对齐方式" aria-hidden="true">#</a></h3><p>通过justifyContent参数设置在主轴方向的对齐方式。</p><ul><li>FlexAlign.Start</li><li>FlexAlign。Center</li><li>FlexAlign.End</li><li>FlexAlign.SpaceBetween</li><li>FlexAlign.SpaceAround</li><li>FlexAlign.SpaceEvently</li></ul><h3 id="交叉轴对齐方式" tabindex="-1">交叉轴对齐方式 <a class="header-anchor" href="#交叉轴对齐方式" aria-hidden="true">#</a></h3><p>容器和子元素都可以设置交叉轴对齐方式，且子元素设置的对齐方式优先级较高。</p><p>容器组件设置交叉轴对齐: 通过Flex组件的alignItems参数设置子组件在交叉轴的对齐方式。</p><ul><li>ItemAlign.Auto：使用Flex容器中默认配置。</li><li>ItemAlign.Start：交叉轴方向首部对齐。</li><li>ItemAlign.Center：交叉轴方向居中对齐。</li><li>ItemAlign.End：交叉轴方向底部对齐。</li><li>ItemAlign.Stretch：交叉轴方向拉伸填充，在未设置尺寸时，拉伸到容器尺寸。</li><li>ItemAlign. Baseline：交叉轴方向文本基线对齐。</li></ul><p>子组件的alignSelf属性也可以设置子组件在父容器交叉轴的对齐格式，且会覆盖Flex布局容器中alignItems配置。</p><h3 id="内容对齐" tabindex="-1">内容对齐 <a class="header-anchor" href="#内容对齐" aria-hidden="true">#</a></h3><p>通过alignContent参数设置子组件各行在交叉轴剩余空间内的对齐方式，只在多行的flex布局中生效</p><ul><li>FlexAlign.Start：子组件各行与交叉轴起点对齐。</li><li>FlexAlign.Center：子组件各行在交叉轴方向居中对齐。</li><li>FlexAlign.End：子组件各行与交叉轴终点对齐。</li><li>FlexAlign.SpaceBetween：子组件各行与交叉轴两端对齐，各行间垂直间距平均分布。</li><li>FlexAlign.SpaceAround：子组件各行间距相等，是元素首尾行与交叉轴两端距离的两倍。</li><li>FlexAlign.SpaceEvenly: 子组件各行间距，子组件首尾行与交叉轴两端距离都相等。</li></ul><h2 id="自适应拉伸" tabindex="-1">自适应拉伸 <a class="header-anchor" href="#自适应拉伸" aria-hidden="true">#</a></h2><ul><li>flexBasis：设置子组件在父容器主轴方向上的基准尺寸。如果设置了该值，则子项占用的空间为设置的值；如果没设置该属性，那子项的空间为width/height的值。</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">Flex</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Text(&#39;flexBasis(&quot;auto&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">    .flexBasis(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">auto</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">) // 未设置width以及flexBasis值为auto，内容自身宽度</span></span>
<span class="line"><span style="color:#C3E88D;">    .height(100)</span></span>
<span class="line"><span style="color:#C3E88D;">    .backgroundColor(0xF5DEB3)</span></span>
<span class="line"><span style="color:#C3E88D;">  Text(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">flexBasis</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">auto</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;"> + </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> width</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">40%</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">    .width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">40</span><span style="color:#A6ACCD;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">    .flexBasis(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">auto</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">) //设置width以及flexBasis值auto，使用width的值</span></span>
<span class="line"><span style="color:#C3E88D;">    .height(100)</span></span>
<span class="line"><span style="color:#C3E88D;">    .backgroundColor(0xD2B48C)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">  Text(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">flexBasis</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">) // 未设置width以及flexBasis值为100，宽度为100vp</span></span>
<span class="line"><span style="color:#C3E88D;">    .fontSize(15)</span></span>
<span class="line"><span style="color:#C3E88D;">    .flexBasis(100)</span></span>
<span class="line"><span style="color:#C3E88D;">    .height(100)</span></span>
<span class="line"><span style="color:#C3E88D;">    .backgroundColor(0xF5DEB3)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">  Text(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">flexBasis</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">    .fontSize(15)</span></span>
<span class="line"><span style="color:#C3E88D;">    .flexBasis(100)</span></span>
<span class="line"><span style="color:#C3E88D;">    .width(200) // flexBasis值为100，覆盖width的设置值，宽度为100vp</span></span>
<span class="line"><span style="color:#C3E88D;">    .height(100)</span></span>
<span class="line"><span style="color:#C3E88D;">    .backgroundColor(0xD2B48C)</span></span>
<span class="line"><span style="color:#C3E88D;">}.width(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F78C6C;">90</span><span style="color:#A6ACCD;">%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">).height(120).padding(10).backgroundColor(0xAFEEEE)</span></span>
<span class="line"></span></code></pre></div><ul><li>flexGrow：设置父容器的剩余空间分配给此属性所在组件的比例。用于“瓜分”父组件的剩余空间。</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">Flex</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#FFCB6B;">Text(&#39;flexGrow(2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">  .flexGrow(2) </span></span>
<span class="line"><span style="color:#C3E88D;">  .width(100)</span></span>
<span class="line"><span style="color:#C3E88D;">  .height(100)</span></span>
<span class="line"><span style="color:#C3E88D;">  .backgroundColor(0xF5DEB3)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">Text(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">flexGrow</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">  .flexGrow(3)</span></span>
<span class="line"><span style="color:#C3E88D;">  .width(100)</span></span>
<span class="line"><span style="color:#C3E88D;">  .height(100)</span></span>
<span class="line"><span style="color:#C3E88D;">  .backgroundColor(0xD2B48C)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">Text(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">no flexGrow</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">  .width(100) </span></span>
<span class="line"><span style="color:#C3E88D;">  .height(100)</span></span>
<span class="line"><span style="color:#C3E88D;">  .backgroundColor(0xF5DEB3)</span></span>
<span class="line"><span style="color:#C3E88D;">}.width(420).height(120).padding(10).backgroundColor(0xAFEEEE)</span></span>
<span class="line"></span></code></pre></div><p>父容器宽度420vp，三个子元素原始宽度为100vp，左右padding为20vp，总和320vp，剩余空间100vp根据flexGrow值的占比分配给子元素，未设置flexGrow的子元素不参与“瓜分”。</p><p>第一个元素以及第二个元素以2:3分配剩下的100vp。第一个元素为100vp+100vp<em>2/5=140vp，第二个元素为100vp+100vp</em>3/5=160vp。</p><ul><li>flexShrink: 当父容器空间不足时，子组件的压缩比例。</li></ul><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">Flex(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">direction:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">FlexDirection.Row</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">Text(&#39;flexShrink(3</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">    .fontSize(15)</span></span>
<span class="line"><span style="color:#C3E88D;">    .flexShrink(3)</span></span>
<span class="line"><span style="color:#C3E88D;">    .width(200)</span></span>
<span class="line"><span style="color:#C3E88D;">    .height(100)</span></span>
<span class="line"><span style="color:#C3E88D;">    .backgroundColor(0xF5DEB3)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">  Text(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">no flexShrink</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">    .width(200)</span></span>
<span class="line"><span style="color:#C3E88D;">    .height(100)</span></span>
<span class="line"><span style="color:#C3E88D;">    .backgroundColor(0xD2B48C)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">  Text(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">flexShrink</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">)</span></span>
<span class="line"><span style="color:#C3E88D;">    .flexShrink(2)</span></span>
<span class="line"><span style="color:#C3E88D;">    .width(200)</span></span>
<span class="line"><span style="color:#C3E88D;">    .height(100)</span></span>
<span class="line"><span style="color:#C3E88D;">    .backgroundColor(0xF5DEB3)</span></span>
<span class="line"><span style="color:#C3E88D;">}.width(400).height(120).padding(10).backgroundColor(0xAFEEEE)</span></span>
<span class="line"></span></code></pre></div>`,52),e=[o];function t(c,r,C,i,D,y){return a(),n("div",null,e)}const h=s(p,[["render",t]]);export{A as __pageData,h as default};