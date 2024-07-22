import{_ as e,c as s,o as a,d as n}from"./app.008430f5.js";const u=JSON.parse('{"title":"Vite3","description":"","frontmatter":{},"headers":[{"level":2,"title":"搭建第一个Vite项目","slug":"搭建第一个vite项目","link":"#搭建第一个vite项目","children":[]},{"level":2,"title":"仅含类型的导入和导出","slug":"仅含类型的导入和导出","link":"#仅含类型的导入和导出","children":[]},{"level":2,"title":"Vite 为 Vue 提供第一优先级支持","slug":"vite-为-vue-提供第一优先级支持","link":"#vite-为-vue-提供第一优先级支持","children":[]}],"relativePath":"advance/vite/vite3.md","lastUpdated":null}'),l={name:"advance/vite/vite3.md"},t=n(`<h1 id="vite3" tabindex="-1">Vite3 <a class="header-anchor" href="#vite3" aria-hidden="true">#</a></h1><h2 id="搭建第一个vite项目" tabindex="-1">搭建第一个Vite项目 <a class="header-anchor" href="#搭建第一个vite项目" aria-hidden="true">#</a></h2><p>兼容性注意: Vite 需要 Node.js 版本 <code>14.18+</code>，<code>16+</code>。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">// 使用npm</span></span>
<span class="line"><span style="color:#A6ACCD;">npm create vite@latest</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 使用yarn</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn create vite</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 使用pnpm</span></span>
<span class="line"><span style="color:#A6ACCD;">pnpm create vite</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>还可以通过<code>附加的命令行选项</code>直接<code>指定项目名称和你想要使用的模板</code>:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">npm create vite@latest my-app --template vue</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>更多模板细节: <code>vue</code>、<code>vue-ts</code>、<code>react</code>、<code>react-ts</code>、<code>react-swc</code>、<code>react-swc-ts</code> ...</p><h2 id="仅含类型的导入和导出" tabindex="-1">仅含类型的导入和导出 <a class="header-anchor" href="#仅含类型的导入和导出" aria-hidden="true">#</a></h2><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">T</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">only/types</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">T</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="vite-为-vue-提供第一优先级支持" tabindex="-1">Vite 为 Vue 提供第一优先级支持 <a class="header-anchor" href="#vite-为-vue-提供第一优先级支持" aria-hidden="true">#</a></h2><ul><li>Vue 3 单文件组件支持：@vitejs/plugin-vue</li><li>Vue 3 JSX 支持：@vitejs/plugin-vue-jsx</li><li>Vue 2.7 支持：vitejs/vite-plugin-vue2</li><li>Vue &lt;2.7 的支持：underfin/vite-plugin-vue2</li></ul>`,11),p=[t];function o(c,i,r,d,y,v){return a(),s("div",null,p)}const D=e(l,[["render",o]]);export{u as __pageData,D as default};
