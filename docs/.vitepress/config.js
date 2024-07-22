const { sidebar } = require('../sidebar/index')
const { nav } = require('../nav/index')
module.exports = {
    base: '/lucky-blog/', // 网站部署基地址
    title: '个人博客',  // 网站标题
    description: 'lucky-zf的个人博客,专注分享前端知识',
    lang: 'zh-CN',
    head: [['link', { rel: 'icon', type: 'image/svg+xml', href: 'logo.svg' }]],
    lastUpdated: true,
    appearance: true,
    themeConfig: {
        logo: '/avator.jpg',
        outline: 'deep',
        outlineTitle: 'On this page',
        // 启动页面丝滑滚动
        smoothScroll: true, 
         // 社交账户链接
        socialLinks: [
            {
            icon: {
                svg: '<svg t="1675837057998" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1407" width="200" height="200"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="1408"></path></svg>'
            },
            link: 'https://gitee.com/lucky-zhaofang'
            }
        ],
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023-present lucky zhaofang'
        },
        nav,
        sidebar
    },
}