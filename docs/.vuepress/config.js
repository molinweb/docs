module.exports = {
  title: '漠林',
  description: ' 耕耘漠林里，最美柒月天。风雨随缘至，草木自盎然。',
  base: '/docs/',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }]
  ],
  markdown: {
    lineNumbers: false
  },
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    nav: [{
      text: 'Home',
      link: '/'
    }, {
      text: 'React',
      link: '/React/'
    }, {
      text: 'Java',
      link: '/Java/'
    }, {
      text: 'Learning',
      link: '/Learning/'
    }, ],
    displayAllHeaders: false, //显示所有页面的标题链接
    sidebarDepth: 2,
    sidebar: {
      '/React/': [
        ['Animated', 'React动画指南'],
        ['ActionSheet', '动作菜单组件的封装'],
        ['Dialog', '动态弹窗'],
        ['TabBar', '导航栏组件'],
        ['titleWrapper', '简单实用的高阶组件'],
        ['closeKeyBoard', 'QAP自动关闭键盘'],
        ['heightProvider', '动态组件自适应键盘高度'],
        ['listView', 'ListView长列表封装'],
        ['cardHoc', '卡片弹窗HOC'],
        ['context', 'IOS高级功能控制']
      ],
      '/Learning/': [
        ['vuepress', 'VuePress教程'],
        ['publish','观察者模式&&发布-订阅模式'],
        ['bind','双向数据绑定'],
        ['loop','事件循环'],
      ],
      '/Java/': [
        ['Lombok', 'Lombok'],
        ['goodsProps', '宝贝属性详解'],
      ],
      /**
       *  // fallback,确保 fallback 侧边栏被最后定义。VuePress 会按顺序遍历侧边栏配置来寻找匹配的配置。
       */
      '/': [
        '', /* / */
        /*    'contact', /!* /contact.html *!/
            'about'    /!* /about.html *!/*/
      ]
    }

    /**
     * 侧边栏分组
     */
    /*[
      {
        title: '笔记',
        collapsable: true,//侧边栏的每个子组默认是可折叠的，你可以设置 collapsable: false 来让一个组永远都是展开状态。
        children: [
          ['/Notes/publish/','发布宝贝']
        ]
      },
      {
        title: 'React相关',
        children: [

				]
      }
    ],*/
  }
}
