import { useFormFuncInject } from './use-form-func-inject'
import { useDataList } from './use-getTable-data'
import { useSearchData } from './use-search-data'
import { useModalData } from './use-add-edit-data'

function usePageData(getTableConfig, getSearchConfig) {
  /* ===========表头搜索=====start===== */
  const searchConfig = getSearchConfig()
  const funcDict = useFormFuncInject(searchConfig.formINjectionKey)
  const { submit, reset, params } = useSearchData(funcDict)

  /* ===========表格=====start===== */
  const { listData } = useDataList('1231', params)
  const { ...contentTableConfig } = getTableConfig()

  function handleUpdate(data) {
    console.log('====handleUpdate====', data.id)
  }

  /* ===========表单=====start===== */

  return {
    searchConfig,
    funcDict,
    submit,
    reset,
    params,
    listData,
    contentTableConfig,
    handleUpdate
  }
}

export { usePageData, useFormFuncInject, useDataList, useSearchData, useModalData }
