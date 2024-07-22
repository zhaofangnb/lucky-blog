function sidebarInterview() {
  return [
    {
      text: '面试篇',
      collapsible: true, // 开启可折叠侧边栏
      collapsed: false, // 初始加载页面时关闭
      items: [
        {
          text: '算法',
          items: [
            {
              text: '算法',
              link: '/interview/algorithm/',
            },
            {
              text: '算法实例',
              link: '/interview/algorithm/demo',
            },
            {
              text: '数组reduce用法',
              link: '/interview/algorithm/reduce',
            },
            {
              text: 'const实现原理',
              link: '/interview/algorithm/const',
            },
            {
              text: 'js实现队列',
              link: '/interview/algorithm/queue',
            },
            {
              text: '两数之和',
              link: '/interview/algorithm/sum_two_num',
            },
            {
              text: 'n个数组求交集',
              link: '/interview/algorithm/intersection',
            },
            {
              text: '平方根',
              link: '/interview/algorithm/sqrt',
            },
            {
              text: '原型this',
              link: '/interview/algorithm/this',
            },
            {
              text: '字符串大小写转换',
              link: '/interview/algorithm/convert',
            },
            {
              text: '插入排序',
              link: '/interview/algorithm/insertion_sort',
            },
            {
              text: '整型数字逆序输出字符串',
              link: '/interview/algorithm/int_reverse_string',
            },
            {
              text: '浅拷贝',
              link: '/interview/algorithm/shallow_copy',
            },
            {
              text: '深拷贝',
              link: '/interview/algorithm/deep_clone',
            },
            {
              text: '堆排序',
              link: '/interview/algorithm/heap_sort',
            },
            {
              text: '冒泡排序',
              link: '/interview/algorithm/buttle_sort',
            },
            {
              text: '归并排序',
              link: '/interview/algorithm/merge_sort',
            },
            {
              text: '快速排序',
              link: '/interview/algorithm/quick_sort',
            },
            {
              text: '随机排序',
              link: '/interview/algorithm/random_sort',
            },
            {
              text: '重写assign',
              link: '/interview/algorithm/assign',
            },
            {
              text: '重写数组map()方法',
              link: '/interview/algorithm/arr_map',
            },
            {
              text: '字符串匹配',
              link: '/interview/algorithm/match_str',
            },
          ],
        },
        {
          text: '设计模式',
          items: [
            {
              text: '设计模式',
              link: '/interview/design/',
            },
          ],
        },
        {
          text: 'ES6',
          items: [
            {
              text: 'ES6',
              link: '/interview/es6/',
            },
          ],
        },
        {
          text: 'Git',
          items: [
            {
              text: 'Git',
              link: '/interview/git/',
            },
          ],
        },
        {
          text: 'Http',
          items: [
            {
              text: 'Http',
              link: '/interview/http/',
            },
          ],
        },
        {
          text: 'Linux',
          items: [
            {
              text: 'Linux',
              link: '/interview/linux/',
            },
          ],
        },
        {
          text: 'LiveStream',
          items: [
            {
              text: 'LiveStream',
              link: '/interview/live-stream/',
            },
          ],
        },
        {
          text: 'NPM',
          items: [
            {
              text: 'NPM',
              link: '/interview/npm/',
            },
          ],
        },
      ],
    },
  ]
}

module.exports = sidebarInterview
