import { postByUrl } from '@/https/apis/general'
import { ref, unref } from 'vue'
import { ElMessage } from 'element-plus'
/*******
 * @ description:
 * @ param {*} url
 * @ param {*} param
 * @ param {*} callback
 * @ return {*}
 ******/
export function useModalData(params, modalFuncDict, urlMap) {
  const modal = ref(null)

  function init(data) {
    modal.value && modal.value.init(data)
  }

  function submit(val) {
    handleUpdate(val)
    modal.value && modal.value.close()
  }

  async function handleUpdate(data) {
    const _params = unref(data)
    let url = _params.id ? urlMap.update : urlMap.add
    const res = await postByUrl(url, _params)
    if (res.code == 0) {
      // 触发刷新
      params.value.trigger = Symbol()
      modal.value && modal.value.close()
    } else {
      ElMessage({
        message: res.data.message || '操作失败',
        type: 'error',
        duration: 5 * 1000
      })
    }
  }

  return { init, modal, submit, handleUpdate }
}
