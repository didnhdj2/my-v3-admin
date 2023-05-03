import { postByUrl } from '@/https/apis/general'
import { unref } from 'vue'
/*******
 * @ description:获取数据列表
 * @ param {*} url
 * @ param {*} param
 * @ param {*} callback 获取后的回调
 * @ return {*}
 ******/

export function useRmdata(urlMap, params) {

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

  return { remove }
}
