import { provide } from 'vue'

/*******
 * @ description: 用于在组件之间传递方法的钩子函数
 * @ param { injectKey } 注入的key
 * @ return { clearValidate, submit, reset, updateData }
 ******/
export function useFormFuncInject(injectKey) {
  let funcDict = {}
  function injectFunc(data) {
    for (const func of data) {
      funcDict[func] = data[func]
    }
  }
  provide(injectKey, injectFunc)
  return funcDict
}
