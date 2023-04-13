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
      <div class="frr pr-40 mb-16">
        <el-button type="primary" @click="addUser">新增</el-button>
      </div>
      <base-table :listData="listData" v-bind="contentTableConfig">
        <template #fundInfo="{ row }">
          <el-popover placement="top-start" :width="200" trigger="hover">
            <template #reference>余额：{{ regFenToYuan(row.fundInfo.balance) }}</template>
            <div>
              <div>渔币：{{ row.fundInfo.coin }}</div>
              <div>总资产：{{ row.fundInfo.totalAmount }}</div>
              <div>冻结资产：{{ row.fundInfo.freezeAmount }}</div>
            </div>
          </el-popover>
        </template>
        <template #roleInfoList="{ row }">
          {{
            row.roleInfoList
              .reduce((pre, cur) => {
                pre.push(cur.name)
                return pre
              }, [])
              .join('-')
          }}
        </template>
        <template #packageList="{ row }">
          <el-popover placement="bottom-end" :width="610" trigger="hover">
            <template #reference><span class="color-3c">查看详情</span></template>
            <el-table :data="row.packageList">
              <el-table-column width="140" align="center" property="packageCode" label="VIP" />
              <el-table-column width="80" align="center" property="isExpire" label="是否过期" :formatter="(a, b, c) => (c ? '是' : '否')" />
              <el-table-column width="190" align="center" property="beginTime" label="开始时间" />
              <el-table-column width="190" align="center" property="endTime" label="结束时间" />
            </el-table>
          </el-popover>
        </template>
        <template #handler="{ row }">
          <div>
            <el-button type="primary" @click="editItem(row)">修改</el-button>
            <el-button type="success" @click="showCharge(row.id)">充值</el-button>
            <el-button type="danger" @click="deleteItem(row.id)">删除</el-button>
          </div>
        </template>
      </base-table>
    </div>
    <!-- t弹窗 -->
    <my-modal ref="modal" :modalConfig="modalConfig" :modalAttr="modalAttr" :pageName="pageName" @finish="addFinish"></my-modal>
    <!-- 充值 -->
    <el-dialog title="充值" v-model="dialogVisible" width="500">
      <div class="fr f-ac">
        <div class="w-80">充值金额：</div>
        <el-input v-model="amount" style="width: 350px" />
      </div>
      <template #footer>
        <div class="frr pr-20">
          <el-button type="primary" @click="chargeUp">充值</el-button>
          <el-button plain class="mr-10" @click="dialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 翻页 -->
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
import { watch, ref, computed } from 'vue'
import { getHisTableConfig, getSearchConfig, getModalConfig } from './config'
import { page, remove, charge } from '@/https/apis/system/user-manager'
import { filterEmptyParams, regFenToYuan } from '@/utils'
import { useUserStore } from '@/store/user'

// ===========搜索=====start=====
const searchConfig = getSearchConfig()
const myform = ref(null)
const pageTotal = ref(0)
const originParam = {
  pageSize: 10,
  pageNo: 1,
  likeUsername: '',
  beginTime: '',
  endTime: '',
  state: ''
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
  if (data.likeUsername) {
    params.value['likeUsername'] = data.likeUsername
  }
  if (data.state) {
    params.value['state'] = data.state
  }
  if (data.createTime && data.createTime.length > 0) {
    params.value['beginTime'] = data.createTime[0]
    params.value['endTime'] = data.createTime[1].replace('00:00:00', '23:59:59')
  }
  getDataList(params.value)
}

async function getDataList(data) {
  let newParams = filterEmptyParams(data)
  let res = await page(newParams)
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

/*******
 * @ description: 显示充值弹窗
 * @ return {*}
 ******/
function showCharge(id) {
  chargeId.value = id
  dialogVisible.value = true
}

/*******
 * @ description: 充值
 * @ return {*}
 ******/
const amount = ref(0)
const chargeId = ref('')
const dialogVisible = ref(false)

async function chargeUp() {
  let data = {
    amount: amount.value,
    userId: chargeId.value
  }
  let res = await charge(data)
  if (res.code == 0) {
    ElMessage.success('充值成功！')
    getDataList()
  } else {
    ElMessage.error(res.message || '充值失败！')
  }
  dialogVisible.value = false
}

async function deleteItem(id) {
  let res = await remove([id])
  if (res.code == 0) {
    getDataList()
    ElMessage.success('删除成功！')
  } else {
    ElMessage.error(res.message || '删除失败！')
  }
}

// ================modal===============

const formData = ['id', 'username', 'password', 'state', 'rebate', 'expireTime', 'bossId']
const store = useUserStore()
const rolesList = store.originRoles
const pageName = 'admin/user'
const modal = ref(null)
const { modalAttr, ...modalConfig } = getModalConfig()

// 筛选选项
modalConfig.formItems.forEach((item) => {
  if (item.field == 'roleIds') {
    item.options = rolesList.reduce((pre, cur) => {
      pre.push({
        value: cur.id,
        label: cur.name
      })
      return pre
    }, [])
  }
})
/*******
 * @ description: 编辑用户
 * @ param {*} data
 * @ return {*}
 ******/
function editItem(data) {
  let _params = {}
  _params.roleIds = data.roleInfoList.map((item) => item.id)
  for (const key of formData) {
    _params[key] = data[key] || ''
  }
  modal.value.init(_params, '修改用户')
}

/*******
 * @ description: 结束弹窗
 * @ return {*}
 ******/
function addFinish() {
  getDataList()
}

/*******
 * @ description: 新增用户
 * @ return {*}
 ******/
async function addUser() {
  modal.value.init(false, '新增用户')
}
</script>
<style lang="scss" scoped>
.page-main {
  height: calc(100vh - 140px);
  ::v-deep(.el-button + .el-button) {
    margin-left: 4px;
  }
}
</style>
