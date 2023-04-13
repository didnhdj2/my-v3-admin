export const baseRoutes = [
  {
    path: 'dash',
    component: '@/views/dash/dash',
    name: 'dash',
    meta: {
      title: '首页',
      icon: 'svg-graph'
    }
  },
  {
    path: 'password',
    name: 'password',
    isHidden: true,
    component: '@/views/system/password/password',
    meta: {
      title: '修改密码',
      icon: 'vg-key'
    }
  }
]
