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
  let params = ref({
    pageNo: 1,
    pageSize: 10
  })

  async function submit(data) {
    params.value = Object.assign({}, param, data)
  }

  function reset() {
    params.value = { ...param }
  }
  return { submit, reset, params }
}
