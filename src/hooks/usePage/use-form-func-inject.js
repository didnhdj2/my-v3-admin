import { provide, ref } from 'vue'
import { deepCopy } from '@/utils'
/*******
 * @ description: 用于在组件之间传递方法的钩子函数
 * @ param { injectKey } 注入的key
 * @ return { clearValidate, submit, reset, updateData }
 ******/
export function useFormFuncInject(injectKey) {
  const funcDict = ref({})
  function injectFunc(data) {
    funcDict.value = deepCopy(data)
  }
  provide(injectKey, injectFunc)
  return funcDict
}
