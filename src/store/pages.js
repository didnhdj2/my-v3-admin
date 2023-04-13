import { defineStore } from 'pinia'
import { filterEmptyParams } from '@/utils/index'
import { list, remove, get, edit } from '@/https/apis/general'
import { ElMessage } from 'element-plus'
export const usePageStore = defineStore('pages', {
  state: () => ({
    // 目录设置
    'user/douyin/monitor': {
      data: [], //数据列表
      total: 0, //总条数
      queryInfo: {
        currentPage: 1,
        pageSize: 10
      }
    }
  }),
  // getters
  getters: {
    getList: (state) => {
      return (pageName) => state[pageName]['data'] || []
    },
    getCount(state) {
      return (pageName) => state[pageName]['total'] || 0
    }
  },

  actions: {
    /*******
     * @ description: 页面数据---添加 & 修改
     * @ return {*}
     ******/
    async editData(params, pageName) {
      let new_params = filterEmptyParams(params)
      let res = await edit(new_params, pageName)
      if (res.code === 0) {
        ElMessage({
          message: res.message || '操作成功',
          type: 'success',
          duration: 4 * 1000
        })
        // this.listData({}, pageName)
      }
      return new Promise((resolve) => {
        resolve(true)
      })
    },

    /*******
     * @ description:  页面数据--删除
     * @ return {*}
     ******/
    async delData(params, pageName) {
      let res = await remove(params, pageName)
      if (res.code === 0) {
        ElMessage({
          message: res.message || '删除成功',
          type: 'error',
          duration: 5 * 1000
        })
        this.listData({}, pageName)
      }
    },

    /*******
     * @ description: 页面数据--获取单个
     * @ return {*}
     ******/
    getData() {},
    /*******
     * @ description:  页面数据--获取列表
     * @ return {*}
     ******/
    async listData(params, pageName) {
      let newParams = Object.assign(this[pageName]['queryInfo'], params)
      let new_params = filterEmptyParams(newParams)
      let res = await list(new_params, pageName)
      this[pageName]['data'] = res.data || []
      this[pageName]['total'] = res.data.totalCount || 0
      this[pageName]['queryInfo'] = new_params
    },

    /*******
     * @ description: 传递数据列表
     * @ param {*} data
     * @ param {*} pageName
     * @ return {*}
     ******/
    setData(data, pageName) {
      this[pageName]['data'] = data
    }
  }
})

export default usePageStore
