import { defineStore } from 'pinia'
import {
  getToken as LgetToken,
  setToken as LsetToken,
  removeToken as LremoveToken,
  getUserInformation,
  setUserInfo,
  removeUserInfo
} from '@/utils/auth'

import { login as userLogin, getUserInfo } from '@/https/apis/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      fundInfo: {},
      username: ''
    },
    originRoles: [],
    roles: false,
    token: '',
    permission: false,
    menuData: [],
    isCollapse: false,
    tagsViewArr: [],
    showVip: false
  }),

  /*******
   * @ description: 设置用户信息
   * @ param {*} userInfo
   * @ return {*}
   ******/

  getters: {
    getPermission(state) {
      return state.permission
    },
    /*******
     * @ description: 获取菜单信息
     * @ return {*}
     ******/
    getMenu(state) {
      return state.menuData
    }
  },
  actions: {
    setUser(userInfo) {
      let userDict = {}
      userDict.fundInfo = userInfo.fundInfo || {}
      userDict.username = userInfo.username || ''
      this.user = userDict
    },
    /*******
     * @ description: 设置token
     * @ param {*} token
     * @ return {*}
     ******/
    setToken(token) {
      LsetToken(token)
      this.token = token
    },

    /*******
     * @ description: 设置角色
     * @ param {*} rolesList
     * @ return {*}
     ******/
    setRoles(rolesList) {
      let role = []
      this.originRoles = rolesList
      rolesList &&
        rolesList.forEach((item) => {
          role.push(item.code)
        })
      this.roles = role
    },

    getRoles() {
      if (!this.roles) {
        this.handleGetUserInfo()
      }
      return this.roles
    },

    /*******
     * @ description: 获取token
     * @ return {*}
     ******/
    getToken() {
      if (this.token) {
        return this.token
      } else {
        let token = LgetToken()
        if (token) {
          this.token = token
          return token
        }
      }
      return ''
    },

    /*******
     * @ description: 删除token
     * @ return {*}
     ******/
    removeToken() {
      this.token = ''
      LremoveToken()
    },

    /*******
     * @ description: 获取用户信息
     * @ return {*}
     ******/
    async getInfo() {
      let res = await getUserInfo()
      if (res.code == 0) {
        this.handleSetUserInfo(res.data)
        return new Promise((resolve, reject) => {
          resolve(this.roles)
        })
      }
    },

    /*******
     * @ description: 登录
     * @ param {*} data
     * @ return {*}
     ******/
    async login(data) {
      let res = await userLogin(data)
      if (res.code == 0) {
        this.setToken(res.data.tokenInfo.tokenValue || '')
        this.handleSetUserInfo(res.data.userInfo)
        return new Promise((resolve, reject) => {
          resolve(res)
        })
      }
    },

    logout() {
      this.removeToken()
      removeUserInfo()
    },

    /*******
     * @ description: 分发储存用户信息逻辑
     * @ param {*} data
     * @ return {*}
     ******/
    handleSetUserInfo(data) {
      if (data && data.roleInfoList) {
        setUserInfo(data)
        this.setUser(data)
        this.setRoles(data.roleInfoList)
      }
    },

    /*******
     * @ description: 分发获取用户信息逻辑
     * @ return {*}
     ******/
    handleGetUserInfo() {
      let userInfo = getUserInformation()
      if (userInfo && userInfo.roleInfoList) {
        this.setUser(userInfo)
        this.setRoles(userInfo.roleInfoList)
      }
    },

    /*******
     * @ description: 是否已匹配路由
     * @ return {*}
     ******/
    setPermission() {
      this.permission = true
    },

    /*******
     * @ description: 设置菜单信息
     * @ param {*} menuList
     * @ return {*}
     ******/
    setMenu(menuList) {
      this.menuData = menuList
    },

    setIsCollapse() {
      this.isCollapse = !this.isCollapse
    },

    /*******
     * @ description: 添加tags
     * @ param {*} tags
     * @ return {*}
     ******/
    setTagsViewArr(tags) {
      let flag = false
      this.tagsViewArr.forEach((item) => {
        if (item.path == tags.path) {
          flag = true
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
      if (!flag) {
        if (this.tagsViewArr.length > 5) {
          this.tagsViewArr.shift()
        }
        this.tagsViewArr.push(tags)
      }
    },
    /*******
     * @ description: 删除tags
     * @ param {*} path
     * @ return {*}
     ******/
    delTagsViewArr(path) {
      let index = this.tagsViewArr.findIndex((item) => {
        return item.path == path
      })
      if (index != -1) {
        this.tagsViewArr.splice(index, 1)
      }
    }
  }
})

export default useUserStore
