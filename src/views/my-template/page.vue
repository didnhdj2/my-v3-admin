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
    <!-- <base-table :listData="listData" v-bind="contentTableConfig">
      <template #dataSet="{ row }">
        <el-popover placement="bottom-end" :width="610" trigger="hover">
          <template #reference><span class="color-3c">查看详情</span></template>
          <div>
            <span>订单来源:</span>
            <span>{{ row.source }}</span>
          </div>
        </el-popover>
      </template>
      <template #enableWarn="{ row }">
        <el-switch
          v-model="row.enableWarn"
          active-text="开"
          inactive-text="关"
          :before-change="
            () => {
              beforeChange({ id: row.id, enableWarn: !row.enableWarn })
            }
          "
        ></el-switch>
      </template>
      <template #handler="{ row }">
        <el-button type="danger" @click="deleteItem(row.id)">删除</el-button>
        <el-button type="danger" @click="handleStart(row, false)">编辑</el-button>
        <el-button type="success" @click="handleStart(row)">{{ row.state == 1 ? '开始' : '完结' }}</el-button>
      </template>
    </base-table> -->
    <!-- 分页 -->
    <!-- <div class="mb-10 fr f-je" v-if="pageTotal > 1">
      <el-pagination
        v-model:current-page="params.pageNo"
        v-model:page-size="params.pageSize"
        :page-sizes="[10, 20, 30]"
        :layout="'total,  prev, pager, next,'"
        :page-count="pageTotal"
      ></el-pagination>
    </div> -->

    <!-- t弹窗 -->
    <!-- <my-modal ref="modal" :modalConfig="mConfig" :modalAttr="modalAttr" :pageName="pageName" @handleRest="handleRest" @finish="addFinish">
      <template #price>
        <el-input v-model="formData.price" class="w-350" placeholder="请输入订单单价" @input="handleInputChange" />
      </template>
      <template #payAmount>
        <el-input v-model="formData.payAmount" class="w-350" placeholder="请输入收款金额" @input="handleInputChange" />
      </template>
    </my-modal> -->
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { getModalConfig, getTableConfig, getSearchConfig } from './config'
import { onGoList, edit, remove } from '@/https/apis/dy-tool/fans-monitor'
import { ElMessage } from 'element-plus'
import { regFenToYuan } from '@/utils'
// 路由
const pageName = 'user/douyin/monitor'
// ===========表格=====start=====

const listData = ref([])
const { ...contentTableConfig } = getTableConfig()

/*******
 * @ description: 获取数据
 * @ return {*}
 ******/
async function getDataList() {
  let res = await onGoList()
  if (res.code == 0) {
    listData.value = res.data
    if (res.data && res.data.length == 0) {
      intervalTime += 3 * 1000
    } else {
      intervalTime = 2 * 1000
    }
  }
}
// TODO 开一个定时器
let intervalTime = 2 * 1000
let intervalId
function startGetDataLoop() {
  getDataList() // 执行一次 getData 函数
  reSetInterval()
}

function reSetInterval() {
  intervalId && clearInterval(intervalId) // 停止之前的定时器
  intervalId = setInterval(getDataList, intervalTime) // 设置定时器循环执行
}
// 退出前 清理定时器
onBeforeUnmount(() => {
  clearInterval(intervalId)
})

// 调用此函数以启动定时循环执行 getData 函数
// startGetDataLoop()

// enableWarn switch
const loading = ref(false)
/*******
 * @ description: switch 变化
 * @ param {*} id
 * @ param {*} enableWarn
 * @ return {*}
 ******/
const beforeChange = async (data) => {
  handleEdit(data)
  startGetDataLoop()
  return true
}

/*******
 * @ description: 编辑输入框
 * @ param {*} params
 * @ return {*}
 ******/
async function handleEdit(params) {
  let res = await edit(params)
  if (res.code == 0) {
    startGetDataLoop()
  }
}

/*******
 * @ description: 删除一条
 * @ param {*} id
 * @ return {*}
 ******/
async function deleteItem(id) {
  let res = await remove([id])
  if (res.code == 0) {
    ElMessage.success('删除成功！')
  } else {
    ElMessage.error(res.message || '删除失败！')
  }
  startGetDataLoop()
}

/*******
 * @ description: 开始或结束
 * @ param {*} data
 * @ return {*}
 ******/
function handleStart(data, isStart = true) {
  if (data.state == 1) {
    handleEdit({
      id: data.id,
      state: 3
    })
  } else if (data.state == 3) {
    submitData(data, isStart)
  }
  // submitData(data)
}
// ===========表格====end========

// ===========弹窗的配置====start========
const formData = ref({
  payAmount: '',
  price: ''
})

const mConfig = ref()
const modal = ref(null)
const { modalAttr, ...modalConfig } = getModalConfig()

const submitModalConfig = JSON.parse(JSON.stringify(modalConfig))
const submitEditConfig = JSON.parse(JSON.stringify(modalConfig))
submitModalConfig.formItems.splice(0, 2)

/*******
 * @ description: 结束
 * @ param {*} data
 * @ return {*}
 ******/
function submitData(data, isStart) {
  let fieldArr = { id: data.id }
  if (isStart) {
    submitModalConfig.formItems.forEach((item) => {
      fieldArr[item.field] = ''
    })
    for (const key in fieldArr) {
      if (data[key]) {
        fieldArr[key] = data[key]
        if (key in formData.value) {
          formData.value[key] = regFenToYuan(data[key])
        }
      }
    }
    fieldArr['state'] = 4
    mConfig.value = submitModalConfig
    modal.value.init(fieldArr, '结束监控')
  } else {
    submitEditConfig.formItems.forEach((item) => {
      fieldArr[item.field] = ''
    })
    for (const key in fieldArr) {
      if (data[key]) {
        fieldArr[key] = data[key]
        if (key in formData.value) {
          formData.value[key] = regFenToYuan(data[key])
        }
      }
    }
    mConfig.value = submitEditConfig
    modal.value.init(fieldArr, '编辑信息')
  }
}

/*******
 * @ description: 新增监控
 * @ return {*}
 ******/
function handleAdd() {
  mConfig.value = modalConfig
  modal.value.init(false, '新增监控')
}

/*******
 * @ description: 新增变化
 * @ return {*}
 ******/
function handleInputChange() {
  let data = {}
  for (let key in formData.value) {
    data[key] = formData.value[key] * 100
  }
  data['state'] = 3
  modal.value.init(data)
}

/*******
 * @ description: 重置新增
 * @ return {*}
 ******/
function handleRest() {
  for (let key in formData.value) {
    formData.value[key] = ''
  }
}

/*******
 * @ description: 结束弹窗
 * @ return {*}
 ******/
function addFinish() {
  getDataList()
}

console.log('===============form================')
const searchConfig = getSearchConfig()

function handleSubmit() {}
</script>

<style lang="scss" scoped>
.page-main {
  .w-350 {
    width: 350px;
  }
}
</style>
