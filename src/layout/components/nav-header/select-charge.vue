<template>
  <div class="my-modal">
    <el-dialog :title="title" v-model="dialogVisible" width="600px" @close="close" :close-on-click-modal="false" append-to-body>
      <div class="fc f-ac-jc" v-if="hasChargeCode">
        <div>
          <span class="fs-14 fw-700">充值金额:</span>
          <span class="color-red fs-14 fw-700 ml-4">
            {{ orderData.topUpAmountQrInfo.name }}
          </span>
        </div>
        <vue-qr :text="chargeCode" :size="200" :level="2"></vue-qr>
        <div>
          <el-countdown
            title="请在2分钟内扫码支付"
            :value="new Date(expireTime)"
            @finish="overTime"
            value-style="color:red;text-align:center"
            class="fc f-ac-jc"
          />
        </div>
      </div>
      <div class="fr f-ac fw" v-else>
        <div class="mb-10" v-for="(item, index) in data" :key="item.id" :class="[index % 2 == 1 && 'ml-10']">
          <selectItem :data="item" :is-check="index === currentIndex" @click="currentIndex = index"></selectItem>
        </div>
      </div>
      <template #footer>
        <div class="fr f-ac-jc" v-if="hasChargeCode">
          <el-button plain size="large" @click="cancelOrderById">取消支付</el-button>
        </div>
        <div class="fr f-ac-jc" v-else>
          <el-button plain size="large" @click="handleClose">取消</el-button>
          <el-button type="primary" class="mr-16" size="large" :loading="btnLoading" @click="getChargeCode">去支付</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { getList } from '@/https/apis/common/pay'
import { createOrder, cancelOrder, orderGet } from '@/https/apis/user'
import selectItem from './select-item.vue'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import { useUserStore } from '@/store/user'

const store = useUserStore()
const dialogVisible = ref(false)

/*******
 * @ description: 关闭表单
 * @ return {*}
 ******/
function handleClose() {
  dialogVisible.value = false
  hasChargeCode.value = false
  btnLoading.value = false
  // 清除定时器
  stateIntel.value && clearInterval(stateIntel.value)
}

function close() {
  if (!orderState.value && hasChargeCode.value) {
    cancelOrderById()
  }
}

const title = ref('选择充值面额')
// 初始化表单
function init() {
  dialogVisible.value = true
  if (data.value.length == 0) {
    getDenominations()
  }
}
// 当前选中的面额
const currentIndex = ref(0)
const data = ref([])
// 二维码文本
const chargeCode = ref('')
// 是否有二维码
const hasChargeCode = ref(false)
// 二维码过期时间
const expireTime = ref(0)
// 订单状态定时器
const stateIntel = ref(null)
// 订单数据
const orderData = ref({})
// 支付按钮loading
const btnLoading = ref(false)
const orderState = ref(false)
/*******
 * @ description: 充值二维码生成
 * @ return {*}
 ******/
async function getChargeCode() {
  let topUpTypeId = data.value[currentIndex.value].id
  btnLoading.value = true
  if (topUpTypeId) {
    let res = await createOrder({ topUpTypeId })
    if (res.code == 0) {
      orderState.value = false
      orderData.value = res.data
      chargeCode.value = res.data.topUpAmountQrInfo.qr
      hasChargeCode.value = true
      expireTime.value = res.data.orderInfo.expireTime
      title.value = '渔币充值'
      stateIntel.value = setInterval(() => {
        getOrderstate()
      }, 1000 * 2)
    }
  }
  btnLoading.value = false
}

/*******
 * @ description: 取消支付订单
 * @ return {*}
 ******/
async function cancelOrderById() {
  // 先关闭窗口
  handleClose()
  let res = await cancelOrder({ id: orderData.value.orderInfo.id })
  if (res.code == 0) {
    orderState.value
    ElMessage.success('订单已取消')
  }
}

/*******
 * @ description: 查询订单状态
 * @ return {*}
 ******/
async function getOrderstate() {
  let param = {
    orderId: orderData.value.orderInfo.id
  }
  let res = await orderGet(param)
  if (res.code == 0) {
    if (res.data.state == 'cancel') {
      orderState.value
      handleClose()
    }
    if (res.data.state == 'finish') {
      ElMessage.success({
        message: '支付成功',
        duration: 5 * 1000
      })
      orderState.value
      handleClose()
      await store.getInfo()
    }
  }
}

/*******
 * @ description: 超时未支付
 * @ return {*}
 ******/
function overTime() {
  handleClose()
  ElMessage.error('支付超时')
}

/*******
 * @ description: 获取面额
 * @ return {*}
 ******/
async function getDenominations() {
  let res = await getList()
  if (res.code == 0) {
    data.value = res.data
  }
}

// 组件销毁时清除定时器
onBeforeUnmount(() => {
  clearInterval(stateIntel.value)
})

getDenominations()
// 导出方法
defineExpose({ init, close })
</script>
