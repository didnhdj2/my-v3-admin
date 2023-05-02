<template>
  <div class="page-main">
    <!-- 顶部筛选-->
    <div class="pt-20">
      <base-form ref="myform" v-bind="searchConfig" @submit="handleSubmit">
        <template #suffix>
          <div class="fr">
            <el-button type="primary" @click="submit">查询</el-button>
            <!-- <el-button @click="handleReset">重置</el-button> -->
          </div>
        </template>
      </base-form>
    </div>
    <!-- 表格 -->
    <base-table :listData="listData" v-bind="contentTableConfig" class="h_40" @update="handleUpdate"></base-table>
  </div>
</template>

<script setup>
import data from './page.json'
import { ref } from 'vue'
import { getTableConfig, getSearchConfig } from './config'

// ===========表格=====start=====
const listData = ref(data.data)
const { ...contentTableConfig } = getTableConfig()

function handleUpdate(data) {
  console.log('====handleUpdate====', data.id)
}

// ===========表格====end========

const searchConfig = getSearchConfig()

function handleSubmit() {}

const table = ref(null)
</script>

<style lang="scss" scoped>
.page-main {
  .w-350 {
    width: 350px;
  }
}
</style>
