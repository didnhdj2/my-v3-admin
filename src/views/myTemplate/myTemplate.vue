<template>
  <div class="page-main">
    <!-- 顶部搜索 -->
    <div class="pt-20">
      <myForm :searchFormConfig="searchConfig" :pageName="pageName"></myForm>
    </div>
    <!-- 中间操作按钮 -->
    <div class="mt-30 frr pr-20">
      <el-button type="primary" size="default" @click="popUp">添加目录</el-button>
    </div>
    <!-- 表格 -->
    <div class="mt-20">
      <my-table :contentTableConfig="contentTableConfig" :footConfig="footer" :pageName="pageName">
        <template #footer-left>
          <el-button type="primary" size="default">批量删除</el-button>
        </template>
      </my-table>
    </div>
    <!-- 弹窗 -->
    <!-- <my-modal ref="modal" :modalConfig="modalConfig" :modalAttr="modalAttr" :pageName="pageName"></my-modal> -->
  </div>
</template>

<script setup>
import { getModalConfig, getSearchConfig, getTableConfig } from './config'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const pageName = 'menu/setting'

const searchConfig = getSearchConfig()
const getAdmin = (row, column, cellValue, index) => {
  console.log('===row, column, cellValue,index===', row.role, column, cellValue, index)
  if (cellValue == 'admin') {
    return row.userCount
  }
  return row.role
}
const handleSelectionChange = (value) => {
  console.log('selectionChange', value)
}

// 表格的配置
const { footer, ...contentTableConfig } = getTableConfig({ getAdmin, handleSelectionChange })

// 弹窗的配置
const { modalAttr, ...modalConfig } = getModalConfig()
</script>
