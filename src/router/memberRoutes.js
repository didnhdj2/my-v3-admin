export const memberRouter = () => {
  return [
    {
      path: '/dy-tool',
      component: 'subView',
      name: 'dy-tool',
      meta: {
        title: '抖音工具',
        icon: 'svg-dy'
      },
      children: [
        {
          path: 'fans-monitor',
          component: '@/views/dy-tool/fans-monitor/dy-fans-monitor',
          name: 'dy-fans-monitor',
          meta: {
            title: '粉丝监控',
            icon: 'svg-cloud'
          }
        },
        {
          path: 'fans-monitor-history',
          component: '@/views/dy-tool/fans-monitor/history',
          name: 'dy-fans-monitor-history',
          isHidden: true,
          meta: {
            title: '监控历史',
            icon: 'svg-cloud'
          }
        },
      ]
    },

  ]
}
