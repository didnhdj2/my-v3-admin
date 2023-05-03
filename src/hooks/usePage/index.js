import { useFormFuncInject } from './use-form-func-inject'
import { useDataList } from './use-getTable-data'
import { useSearchData } from './use-search-data'
import { useModalData } from './use-add-edit-data'

function usePageData({ urlMap, searchConfig, modalConfig }) {
  /* ===========表头搜索=====start===== */
  const formFuncDict = useFormFuncInject(searchConfig.formInjectionKey)
  const { submit: formSubmit, reset: formReset, params } = useSearchData(formFuncDict)
  /* ===========表格=====start===== */
  const { listData, remove, total } = useDataList(urlMap, params)
  /* ===========表单=====start===== */
  const modalFuncDict = useFormFuncInject(modalConfig.formInjectionKey)
  const { init: initForm, modal, submit: modalSubmit, handleUpdate } = useModalData(params, modalFuncDict, urlMap)

  return {
    formSubmit,
    formReset,
    params,
    listData,
    remove,
    total,
    initForm,
    modalSubmit,
    handleUpdate,
    modal
  }
}

export { usePageData, useFormFuncInject, useDataList, useSearchData, useModalData }
