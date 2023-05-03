<template>
  <div class="page-main">
    <!-- 顶部筛选-->
    <div class="pt-20">
      <base-form ref="myform" v-bind="searchConfig" @submit="formSubmit" @reset="formReset"></base-form>
    </div>
    <!-- 添加按钮 -->
    <div class="frr">
      <el-button type="primary" @click="initForm">添加</el-button>
    </div>
    <!-- 表格 -->
    <div class="fc f-jsb">
      <div class="">
        <base-table :listData="listData" v-bind="contentTableConfig" @update="handleUpdate"></base-table>
      </div>
      <!-- 页码 -->
      <div class="mt-30 frr" v-if="total > params.pageSize">
        <el-pagination
          :total="total"
          v-model:current-page="params.pageNo"
          v-model:page-size="params.pageSize"
          v-bind="pageConnfig"
        ></el-pagination>
      </div>
      <!-- 表单 -->
    </div>
    <base-modal ref="modal" v-bind="modalConfig" :modalAttr="modalAttr" @submit="modalSubmit"></base-modal>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { paginationCommon } from '@/common/paginationConfig'
import { getTableConfig, getSearchConfig, getModalConfig } from './config'
import { usePageData } from '@/hooks/usePage'
const urlMap = {
  list: '/api/list',
  add: '/api/add',
  update: '/api/update',
  delete: '/api/delete'
}
/* ===========表头搜索=====start===== */
const searchConfig = getSearchConfig()
/* 分页配置 */
const pageConnfig = computed(() => {
  return paginationConfig || paginationCommon
})
/* ===========表单=====start===== */
const { modalAttr, ...modalConfig } = getModalConfig()
/* 通用hooks */
const { formSubmit, formReset, params, listData, remove, modal, total, initForm, modalSubmit, handleUpdate } = usePageData({
  urlMap,
  searchConfig,
  modalConfig
})
/* ===========表格=====start===== */
const { paginationConfig, ...contentTableConfig } = getTableConfig({ remove })
</script>
