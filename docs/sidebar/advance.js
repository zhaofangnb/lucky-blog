function sidebarAdvance() {
  return [
    {
      text: '进阶篇',
      collapsible: true, // 开启可折叠侧边栏
      collapsed: false, // 初始加载页面时关闭
      items: [
        {
          text: 'TypeScript',
          items: [
            {
              text: '环境搭建',
              link: '/advance/typescript/',
            },
            {
              text: '数据类型',
              link: '/advance/typescript/dataType',
            },
            {
              text: '函数',
              link: '/advance/typescript/function',
            },
            {
              text: '接口',
              link: '/advance/typescript/interface',
            },
            {
              text: '类',
              link: '/advance/typescript/class',
            },
            {
              text: '断言',
              link: '/advance/typescript/assert',
            },
            {
              text: '泛型',
              link: '/advance/typescript/generic',
            },
            {
              text: '装饰器',
              link: '/advance/typescript/decoration',
            },
            {
              text: '模块与命名空间',
              link: '/advance/typescript/namespace',
            },
            {
              text: '申明',
              link: '/advance/typescript/declare',
            },
            {
              text: '内置工具类型',
              link: '/advance/typescript/util',
            },
            {
              text: '配置文件tsconfig.json',
              link: '/advance/typescript/tsconfig',
            },
            {
              text: 'Promise + ts写法',
              link: '/advance/typescript/promise',
            },
          ],
        },
        {
          text: 'Vite',
          items: [
            {
              text: '简介',
              link: '/advance/vite/',
            },
            {
              text: '原理',
              link: '/advance/vite/principle',
            },
            {
              text: 'Vite2',
              link: '/advance/vite/vite2',
            },
            {
              text: 'Vite3',
              link: '/advance/vite/vite3',
            },
            {
              text: 'vite.config.ts配置',
              link: '/advance/vite/viteconfig',
            },
          ],
        },
        {
          text: 'Webpack5',
          items: [
            {
              text: '简介',
              link: '/advance/webpack5/',
            },
            {
              text: '基础配置',
              link: '/advance/webpack5/basicConfig',
            },
          ],
        },
        {
          text: 'NodeJs',
          items: [
            {
              text: '简介',
              link: '/advance/nodejs/',
            },
            {
              text: 'Express应用',
              link: '/advance/nodejs/express',
            },
            {
              text: 'Node精度问题',
              link: '/advance/nodejs/accurancy',
            },
          ],
        },
        {
          text: 'Electron',
          items: [
            {
              text: '简介',
              link: '/advance/electron/',
            },
          ],
        },
        {
          text: 'Nuxt3',
          items: [
            {
              text: '简介',
              link: '/advance/nuxt3/',
            },
          ],
        },
        {
          text: '鸿蒙',
          items: [
            {
              text: '简介',
              link: '/advance/harmonyOs/',
            },
            {
              text: '自定义弹窗',
              link: '/advance/harmonyOs/customDialog',
            },
            {
              text: '代码复用',
              link: '/advance/harmonyOs/codeReuse',
            },
            {
              text: '组件插槽',
              link: '/advance/harmonyOs/slot',
            },
            {
              text: '常用布局',
              link: '/advance/harmonyOs/layout',
            },
            {
              text: '渲染控制',
              link: '/advance/harmonyOs/renderControl',
            },
            {
              text: 'UI范式',
              link: '/advance/harmonyOs/uiParadigm',
            },
            {
              text: 'ArkTs高性能编程实践',
              link: '/advance/harmonyOs/hignPerfermanceCode',
            },
            {
              text: '状态管理',
              link: '/advance/harmonyOs/stateManagement',
            },
            {
              text: '资源分类与访问',
              link: '/advance/harmonyOs/resourceCatagory',
            },
            {
              text: '一次开发，多端部署',
              link: '/advance/harmonyOs/oneToMore',
            },
            {
              text: '自由流转',
              link: '/advance/harmonyOs/freeCirculation',
            },
          ],
        },
      ],
    },
  ]
}

module.exports = sidebarAdvance
