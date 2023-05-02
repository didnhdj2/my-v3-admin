<template>
  <div class="page-main">
    <!-- 顶部筛选-->
    <div class="pt-20">
      <base-form ref="myform" v-bind="searchConfig"></base-form>

      <div class="fr">
        <el-button type="primary" @click="submit">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <base-table :listData="listData" v-bind="contentTableConfig" class="h_40" @update="handleUpdate"></base-table>
  </div>
</template>

<script setup>
import data from './page.json'
import { ref } from 'vue'
import { getTableConfig, getSearchConfig } from './config'
import { useDataList, useFormFuncInject, useSearchData } from '@/hooks/usePage'

/* ===========表头搜索=====start===== */
const searchConfig = getSearchConfig()
const funcDict = useFormFuncInject(searchConfig.formINjectionKey)
const { submit, reset, params } = useSearchData(funcDict)
/* ===========表头搜索=====end===== */

/* ===========表格=====start===== */
const { listData, getDataList } = useDataList('1231', params)
const { ...contentTableConfig } = getTableConfig()

function handleUpdate(data) {
  console.log('====handleUpdate====', data.id)
}
/* ===========表格====end======== */
</script>

<style lang="scss" scoped>
.page-main {
  .w-350 {
    width: 350px;
  }
}
</style>
