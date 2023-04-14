import { getByUrl } from '@/https/apis/general'
import { unref, ref, watchEffect, isRef } from 'vue'
/*******
 * @ description:获取数据列表
 * @ param {*} url
 * @ param {*} param
 * @ param {*} callback 获取后的回调
 * @ return {*}
 ******/

export async function useDataList(url, param, callback) {
  let listData = ref([])
  async function getDataList() {
    const res = await getByUrl(unref(url), unref(param))
    if (res.code == 0) {
      listData.value = res.data
    }
    callback && callback(res)
  }
  if (isRef(url) || isRef(param)) {
    watchEffect(getDataList)
  } else {
    getDataList()
  }
  return listData
}
