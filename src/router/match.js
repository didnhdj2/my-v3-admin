import layout from '@/layout'
import subView from '@/components/subView'
import { isExternal } from '@/utils'
import mypath from 'path'
import { adminRoutes } from '@/router/adminRoutes'
import { memberRouter } from '@/router/memberRoutes'
import { agentRoutes } from '@/router/agentRoutes'
import { baseRoutes } from '@/router/baseRoutes'

let moduals = import.meta.glob('/src/views/**/*.vue')

/*******
 * @ description: 处理路由和菜单
 * @ param {*} menuArray
 * @ return {*}
 ******/
export function getHandledRoutes(menuArray) {
  const menuList = []
  const routeList = []
  menuArray.forEach((element) => {
    let item = handleRouter(element)
    let menu = handleMenu(element, '/')
    routeList.push(item)
    menuList.push(menu)
  })
  return { menuList, routeList }
}

/*******
 * @ description: 递归处理路由
 * @ param {*} route
 * @ return {*}
 ******/
function handleRouter(route) {
  if (route.children && route.children.length > 0) {
    route.children.forEach((el) => {
      handleRouter(el)
    })
  }
  if (route.component) {
    if (route.component == 'layout') {
      route.component = layout
    } else if (route.component == 'subView') {
      route.component = subView
    } else {
      route.component = matchComponents(route.component)
    }
    return route
  }
}

/*******
 * @ description: 匹配组件
 * @ param {*} path
 * @ return {*}
 ******/
function matchComponents(path) {
  let newpath = String(path).replace('@', '/src') + '.vue'
  if (newpath in moduals) {
    return moduals[newpath]
  }
}

/*******
 * @ description: 处理菜单
 * @ param {*} menu
 * @ param {*} base
 * @ return {*}
 ******/
function handleMenu(menu, base) {
  menu.path = matchMenu(menu.path, base)
  if (menu.children && menu.children.length > 0) {
    menu.children.forEach((el) => {
      handleMenu(el, menu.path)
    })
  }

  return menu
}

/*******
 * @ description: 匹配是否是外链
 * @ param {*} _path
 * @ param {*} base
 * @ return {*}
 ******/
function matchMenu(_path, base = '/') {
  if (isExternal(_path)) {
    return _path
  }
  return mypath.resolve(base, _path)
}

/*******
 * @ description: 匹配路由 & 菜单
 * @ param {*} roles
 * @ return {*}
 ******/
export function getAccessRoutes(roles) {
  let accessRoutes = []
  let menuData = []
  let temArr = baseRoutes
  if (import.meta.env.MODE === 'dev') {
    // 开发环境
    temArr = temArr.concat(adminRoutes().concat(agentRoutes().concat(memberRouter())))
  } else {
    // 生产环境
    if (roles.includes('ADMIN')) {
      // 有管理员角色
      temArr = temArr.concat(adminRoutes())
    }
    if (roles.includes('AGENT')) {
      // 有代理角色
      temArr = temArr.concat(agentRoutes())
    }
    if (roles.includes('MEMBER')) {
      // 有会员角色
      temArr = temArr.concat(memberRouter())
    }
  }

  let { routeList, menuList } = getHandledRoutes(temArr)
  accessRoutes = accessRoutes.concat(routeList)
  menuData = menuData.concat(menuList)
  // 汇总路由和菜单
  return { accessRoutes, menuData }
}
