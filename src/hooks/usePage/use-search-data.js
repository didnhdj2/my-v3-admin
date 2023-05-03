import { ref } from 'vue'
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

  async function submit() {
    const data = await funcDict.value.submit()
    params.value = Object.assign({}, param, data)
  }

  function reset() {
    funcDict.value.reset()
    params.value = param
  }
  return { submit, reset, params }
}
