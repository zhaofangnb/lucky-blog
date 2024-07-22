import{_ as s,c as n,o as a,d as l}from"./app.008430f5.js";const d=JSON.parse('{"title":"配置文件tsconfig.json","description":"","frontmatter":{},"headers":[{"level":2,"title":"生成tsconfig.json","slug":"生成tsconfig-json","link":"#生成tsconfig-json","children":[]},{"level":2,"title":"tsconfig.json的作用","slug":"tsconfig-json的作用","link":"#tsconfig-json的作用","children":[]},{"level":2,"title":"tsconfig.json的读取方式","slug":"tsconfig-json的读取方式","link":"#tsconfig-json的读取方式","children":[]},{"level":2,"title":"详解","slug":"详解","link":"#详解","children":[{"level":3,"title":"files","slug":"files","link":"#files","children":[]},{"level":3,"title":"include/exclude","slug":"include-exclude","link":"#include-exclude","children":[]},{"level":3,"title":"compileOnSave","slug":"compileonsave","link":"#compileonsave","children":[]},{"level":3,"title":"extends","slug":"extends","link":"#extends","children":[]},{"level":3,"title":"compilerOptions","slug":"compileroptions","link":"#compileroptions","children":[]}]}],"relativePath":"advance/typescript/tsconfig.md","lastUpdated":null}'),o={name:"advance/typescript/tsconfig.md"},p=l(`<h1 id="配置文件tsconfig-json" tabindex="-1">配置文件tsconfig.json <a class="header-anchor" href="#配置文件tsconfig-json" aria-hidden="true">#</a></h1><h2 id="生成tsconfig-json" tabindex="-1">生成tsconfig.json <a class="header-anchor" href="#生成tsconfig-json" aria-hidden="true">#</a></h2><p>在第一节环境搭建时，通过 <code>tsc --init</code> 来生成配置文件</p><h2 id="tsconfig-json的作用" tabindex="-1">tsconfig.json的作用 <a class="header-anchor" href="#tsconfig-json的作用" aria-hidden="true">#</a></h2><ol><li>用于标识<code>TypeScript</code>项目的根路径</li><li>用于配置<code>TypeScript</code>编译器</li><li>用于指定编译的文件</li></ol><h2 id="tsconfig-json的读取方式" tabindex="-1">tsconfig.json的读取方式 <a class="header-anchor" href="#tsconfig-json的读取方式" aria-hidden="true">#</a></h2><ol><li>不带任何输入文件的情况下调用 tsc，编译器会从当前目录开始去查找 tsconfig.json 文件，逐级向上搜索父目录，直到根路径。</li><li>不带任何输入文件的情况下调用 tsc，且使用命令行参数 --project（或-p）指定一个包含 tsconfig.json 文件的目录。</li></ol><h2 id="详解" tabindex="-1">详解 <a class="header-anchor" href="#详解" aria-hidden="true">#</a></h2><p>主要配置项:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">files</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">include</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">exclude</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">compileOnSave</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">extends</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">compilerOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="files" tabindex="-1">files <a class="header-anchor" href="#files" aria-hidden="true">#</a></h3><p>指定待编译文件</p><h3 id="include-exclude" tabindex="-1">include/exclude <a class="header-anchor" href="#include-exclude" aria-hidden="true">#</a></h3><p>数组元素是类似 glob 的文件模式</p><p>*：匹配 0 或多个字符（注意：不含路径分隔符）<br> ?：匹配任意单个字符（注意：不含路径分隔符）<br> **/ ：递归匹配任何子路径</p><p>陪陪文件的优先级：<br> files &gt; exclude &gt; include</p><h3 id="compileonsave" tabindex="-1">compileOnSave <a class="header-anchor" href="#compileonsave" aria-hidden="true">#</a></h3><p>让IDE在保存文件的时候根据tsconfig.json重新编译文件。</p><h3 id="extends" tabindex="-1">extends <a class="header-anchor" href="#extends" aria-hidden="true">#</a></h3><p>实现配置复用，即一个配置文件可以继承另一个文件的配置属性</p><p>继承者中的同名配置会覆盖被继承者</p><p>所有相对路径都被解析为其所在文件的路径</p><h3 id="compileroptions" tabindex="-1">compilerOptions <a class="header-anchor" href="#compileroptions" aria-hidden="true">#</a></h3><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">compilerOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/* 基本选项 */</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">target</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">es5</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                       </span><span style="color:#676E95;font-style:italic;">// 指定 ECMAScript 目标版本: &#39;ES3&#39; (default), &#39;ES5&#39;, &#39;ES6&#39;/&#39;ES2015&#39;, &#39;ES2016&#39;, &#39;ES2017&#39;, or &#39;ESNEXT&#39;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">module</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">commonjs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                  </span><span style="color:#676E95;font-style:italic;">// 指定使用模块: &#39;commonjs&#39;, &#39;amd&#39;, &#39;system&#39;, &#39;umd&#39; or &#39;es2015&#39;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">lib</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                             </span><span style="color:#676E95;font-style:italic;">// 指定要包含在编译中的库文件</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">allowJs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                       </span><span style="color:#676E95;font-style:italic;">// 允许编译 javascript 文件</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">checkJs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                       </span><span style="color:#676E95;font-style:italic;">// 报告 javascript 文件中的错误</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">jsx</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">preserve</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                     </span><span style="color:#676E95;font-style:italic;">// 指定 jsx 代码的生成: &#39;preserve&#39;, &#39;react-native&#39;, or &#39;react&#39;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">declaration</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                   </span><span style="color:#676E95;font-style:italic;">// 生成相应的 &#39;.d.ts&#39; 文件</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">sourceMap</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                     </span><span style="color:#676E95;font-style:italic;">// 生成相应的 &#39;.map&#39; 文件</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">outFile</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                       </span><span style="color:#676E95;font-style:italic;">// 将输出文件合并为一个文件</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">outDir</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                        </span><span style="color:#676E95;font-style:italic;">// 指定输出目录</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">rootDir</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                       </span><span style="color:#676E95;font-style:italic;">// 用来控制输出目录结构 --outDir.</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">removeComments</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                </span><span style="color:#676E95;font-style:italic;">// 删除编译后的所有的注释</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">noEmit</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                        </span><span style="color:#676E95;font-style:italic;">// 不生成输出文件</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">importHelpers</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                 </span><span style="color:#676E95;font-style:italic;">// 从 tslib 导入辅助工具函数</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">isolatedModules</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">               </span><span style="color:#676E95;font-style:italic;">// 将每个文件做为单独的模块 （与 &#39;ts.transpileModule&#39; 类似）.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/* 严格的类型检查选项 */</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">strict</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                        </span><span style="color:#676E95;font-style:italic;">// 启用所有严格类型检查选项</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">noImplicitAny</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                 </span><span style="color:#676E95;font-style:italic;">// 在表达式和声明上有隐含的 any类型时报错</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">strictNullChecks</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">              </span><span style="color:#676E95;font-style:italic;">// 启用严格的 null 检查</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">noImplicitThis</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                </span><span style="color:#676E95;font-style:italic;">// 当 this 表达式值为 any 类型的时候，生成一个错误</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">alwaysStrict</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                  </span><span style="color:#676E95;font-style:italic;">// 以严格模式检查每个模块，并在每个文件里加入 &#39;use strict&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/* 额外的检查 */</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">noUnusedLocals</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                </span><span style="color:#676E95;font-style:italic;">// 有未使用的变量时，抛出错误</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">noUnusedParameters</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">            </span><span style="color:#676E95;font-style:italic;">// 有未使用的参数时，抛出错误</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">noImplicitReturns</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">             </span><span style="color:#676E95;font-style:italic;">// 并不是所有函数里的代码都有返回值时，抛出错误</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">noFallthroughCasesInSwitch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">// 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/* 模块解析选项 */</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">moduleResolution</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">node</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">            </span><span style="color:#676E95;font-style:italic;">// 选择模块解析策略： &#39;node&#39; (Node.js) or &#39;classic&#39; (TypeScript pre-1.6)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">baseUrl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                       </span><span style="color:#676E95;font-style:italic;">// 用于解析非相对模块名称的基目录</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">paths</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{},</span><span style="color:#F07178;">                           </span><span style="color:#676E95;font-style:italic;">// 模块名到基于 baseUrl 的路径映射的列表</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">rootDirs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                        </span><span style="color:#676E95;font-style:italic;">// 根文件夹列表，其组合内容表示项目运行时的结构内容</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">typeRoots</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                       </span><span style="color:#676E95;font-style:italic;">// 包含类型声明的文件列表</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">types</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                           </span><span style="color:#676E95;font-style:italic;">// 需要包含的类型声明文件名列表</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">allowSyntheticDefaultImports</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">  </span><span style="color:#676E95;font-style:italic;">// 允许从没有设置默认导出的模块中默认导入。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/* Source Map Options */</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">sourceRoot</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                    </span><span style="color:#676E95;font-style:italic;">// 指定调试器应该找到 TypeScript 文件而不是源文件的位置</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">mapRoot</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                       </span><span style="color:#676E95;font-style:italic;">// 指定调试器应该找到映射文件而不是生成文件的位置</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">inlineSourceMap</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">               </span><span style="color:#676E95;font-style:italic;">// 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">inlineSources</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">                 </span><span style="color:#676E95;font-style:italic;">// 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/* 其他选项 */</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">experimentalDecorators</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">        </span><span style="color:#676E95;font-style:italic;">// 启用装饰器</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">emitDecoratorMetadata</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;">          </span><span style="color:#676E95;font-style:italic;">// 为装饰器提供元数据的支持</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,24),t=[p];function e(c,r,F,y,D,i){return a(),n("div",null,t)}const q=s(o,[["render",e]]);export{d as __pageData,q as default};
