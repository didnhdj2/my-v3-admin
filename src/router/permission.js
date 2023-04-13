import router from '@/router'
import { useUserStore } from '@/store/user'
import pinia from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { getAccessRoutes } from '@/router/match'
import { notfoundRoute } from '@/router/notfoundRoute'

const store = useUserStore(pinia)
NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/password']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const token = getToken()
  if (token) {
    /* 有token，不允许去登陆*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      let hasPermission = store.getPermission
      if (!hasPermission) {
        let roles = store.getRoles()
        if (!roles) {
          // 当前用户没有拉取user_info信息，则拉取
          roles = await store.getInfo()
        }

        if (roles && roles.length > 0) {
          // 有角色
          let { accessRoutes, menuData } = getAccessRoutes(roles)

          // 添加到路由
          store.setMenu(menuData)
          accessRoutes.forEach((item) => {
            router.addRoute('home', item)
          })
          // 添加nofound路由
          router.addRoute(notfoundRoute[0])
          store.setPermission()
          next({ ...to, replace: true })
        }
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
