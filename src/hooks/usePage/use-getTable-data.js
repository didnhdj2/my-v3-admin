import { getByUrl, postByUrl } from '@/https/apis/general'
import { unref, ref, watchEffect, isRef } from 'vue'
import { ElMessage } from 'element-plus'
/*******
 * @ description:获取数据列表
 * @ param {*} url
 * @ param {*} param
 * @ param {*} callback 获取后的回调
 * @ return {*}
 ******/

export function useDataList(urlMap, params, callback) {
  let listData = ref([])
  const total = ref(15)
  /*******
   * @ description: 请求数据
   * @ return {*}
   ******/
  async function getDataList() {
    const _params = unref(params)
    delete _params.trigger
    const res = await getByUrl(urlMap.list, _params)
    if (callback) {
      // 传入回调函数
      callback && callback(res)
    } else if (res.code == 0) {
      // 不传入回调函数，解析给默认
      listData.value = res.data
      total.value = res.total
    }
  }

  async function remove(data) {
    const param = unref(data)
    const res = await postByUrl(urlMap.delete, [param.id])
    if (res.code == 0) {
      ElMessage({
        message: res.data.message || '删除成功',
        type: 'success',
        duration: 5 * 1000
      })
      // 触发刷新
      params.value.trigger = Symbol()
    } else {
      ElMessage({
        message: res.data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
  }

  if (isRef(params)) {
    watchEffect(getDataList)
  } else {
    getDataList()
  }
  return { listData, remove, total }
}
