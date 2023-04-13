<template>
  <div class="page-main fc f-jsb">
    <!-- 顶部搜索 -->
    <div>
      <div class="pt-20">
        <base-form ref="myform" v-bind="searchConfig" @submit="handleSubmit">
          <template #suffix>
            <div class="fr">
              <el-button type="primary" @click="submit">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </div>
          </template>
        </base-form>
      </div>
      <!-- 表格 -->
      <base-table :listData="listData" v-bind="contentTableConfig"></base-table>
    </div>
    <div class="mb-10 fr f-je" v-if="pageTotal > 1">
      <el-pagination
        v-model:current-page="params.pageNo"
        v-model:page-size="params.pageSize"
        :page-sizes="[10, 20, 30]"
        :layout="'total,  prev, pager, next,'"
        :page-count="pageTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { getHisTableConfig, getSearchConfig } from './config'
import { history } from '@/https/apis/dy-tool/fans-monitor'
import { filterEmptyParams } from '@/utils'
// ===========搜索=====start=====
const searchConfig = getSearchConfig()
const myform = ref(null)
const pageTotal = ref(0)
const originParam = {
  pageSize: 10,
  pageNo: 1,
  likeUnionId: '',
  beginTime: '',
  endTime: ''
}
const params = ref({})
params.value = {
  ...originParam
}
const listData = ref([])
// 点击提交按钮
function submit() {
  myform.value.submit()
}
// 点击重置按钮
function handleReset() {
  myform.value.reset()
  params.value = {
    ...originParam
  }
  getDataList(params.value)
}

// 页码变化和翻页
watch(
  () => params.value.pageNo + params.value.pageSize,
  () => {
    getDataList(params.value)
  }
)

// 处理表单提交
function handleSubmit(data) {
  if (data.likeUnionId) {
    params.value['likeUnionId'] = data.likeUnionId
  }
  if (data.createTime && data.createTime.length > 0) {
    params.value['beginTime'] = data.createTime[0]
    params.value['endTime'] = data.createTime[1].replace('00:00:00', '23:59:59')
  }
  getDataList(params.value)
}

async function getDataList(data) {
  let newParams = filterEmptyParams(data)
  let res = await history(newParams)
  if (res.code == 0) {
    listData.value = res.data?.list || []
    pageTotal.value = res.data?.totalPage || 1
    params.value.pageNo = res.data?.pageNo || 1
    params.value.pageSize = res.data?.pageSize || 1
  }
}
getDataList(params.value)
// ===========表格=====start=====

const { ...contentTableConfig } = getHisTableConfig()
</script>
<style lang="scss" scoped>
.page-main {
  height: calc(100vh - 140px);
}
</style>
