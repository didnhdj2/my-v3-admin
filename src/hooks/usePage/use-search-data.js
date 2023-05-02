import { unref, ref, watchEffect, isRef } from 'vue'
/*******
 * @ description:
 * @ param {*} url
 * @ param {*} param
 * @ param {*} callback
 * @ return {*}
 ******/
const param = {
  pageNo: 1,
  pageSize: 10
}
export function useSearchData(funcDict) {
  let params = ref({})

  function submit() {
    const data = funcDict.value.submit()
    params.value = data
  }

  function reset() {
    funcDict.value.reset()
  }
  return { submit, reset, params }
}
