function sidebarBasic() {
  return [
    {
      text: '入门篇',
      collapsible: true, // 开启可折叠侧边栏
      collapsed: false, // 初始加载页面时关闭
      items: [
        {
          text: 'HTML5',
          items: [
            {
              text: 'HTML新特性',
              link: '/basic/html5/',
            },
            {
              text: '浏览器',
              link: '/basic/html5/browser',
            },
            {
              text: 'a标签',
              link: '/basic/html5/a',
            },
          ],
        },
        {
          text: 'CSS3',
          items: [
            {
              text: 'CSS3新特性',
              link: '/basic/css3/',
            },
            {
              text: '常见css布局',
              link: '/basic/css3/layout',
            },
            {
              text: 'flex问题',
              link: '/basic/css3/flex',
            },
            {
              text: 'center居中',
              link: '/basic/css3/center',
            },
            {
              text: '三角形',
              link: '/basic/css3/triangle',
            },
            {
              text: 'scss语法',
              link: '/basic/css3/scss',
            },
          ],
        },
        {
          text: 'JavaScript',
          items: [
            {
              text: '简介',
              link: '/basic/javascript/',
            },
            {
              text: '前端解析XLSX',
              link: '/basic/javascript/readExcelToJson',
            },
            {
              text: '导出pdf并预览',
              link: '/basic/javascript/pdf',
            },
            {
              text: 'window窗口',
              link: '/basic/javascript/window',
            },
            {
              text: 'offset偏移',
              link: '/basic/javascript/offset',
            },
          ],
        },
        {
          text: 'Canvas',
          items: [
            {
              text: 'canvas基础',
              link: '/basic/canvas/',
            },
            { text: 'canvas应用案例', link: '/basic/canvas/applycation' },
          ],
        },
        {
          text: 'Vue2',
          items: [
            {
              text: '简介',
              link: '/basic/vue2/',
            },
            {
              text: 'vue2源码',
              link: '/basic/vue2/yuanma',
            },
          ],
        },
        {
          text: 'Vue3',
          items: [
            {
              text: '基础知识',
              link: '/basic/vue3/',
            },
            {
              text: '七大亮点',
              link: '/basic/vue3/lightpoint',
            },
            {
              text: 'pinia',
              link: '/basic/vue3/pinia',
            },
          ],
        },
        {
          text: 'React18',
          items: [
            {
              text: '简介',
              link: '/basic/react18/',
            },
            {
              text: 'React18新特性',
              link: '/basic/react18/react18',
            },
            {
              text: 'HOC高阶组件',
              link: '/basic/react18/hoc',
            },
            {
              text: 'Hooks',
              link: '/basic/react18/hooks',
            },
          ],
        },
        {
          text: '微信小程序',
          items: [
            {
              text: '简介',
              link: '/basic/wechat/',
            },
            {
              text: '小程序与uniapp的区别',
              link: '/basic/wechat/diffrent',
            },
            {
              text: '小程序生命周期',
              link: '/basic/wechat/lifecycle',
            },
            {
              text: '小程序路由跳转',
              link: '/basic/wechat/jump',
            },
            {
              text: '小程序登录',
              link: '/basic/wechat/login',
            },
            {
              text: '小程序支付',
              link: '/basic/wechat/pay',
            },
            {
              text: '小程序性能',
              link: '/basic/wechat/performance',
            },
            {
              text: 'yto小程序实战',
              link: '/basic/wechat/yto',
            },
          ],
        },
        {
          text: 'Uniapp',
          items: [
            {
              text: '简介',
              link: '/basic/uniapp/',
            },
          ],
        },
        {
          text: 'Axios',
          items: [
            {
              text: '基础知识',
              link: '/basic/axios/',
            },
            {
              text: '前端文件流下载',
              link: '/basic/axios/exportMethod',
            },
            {
              text: 'Content-Type',
              link: '/basic/axios/contentType',
            },
          ],
        },
      ],
    },
  ]
}

module.exports = sidebarBasic
