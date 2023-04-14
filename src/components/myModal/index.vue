<template>
  <div class="my-modal">
    <el-dialog :title="title" v-model="dialogVisible" v-bind="modalAttr" @close="handleClose">
      <base-form v-bind="$attrs" ref="myModal">
        <template v-for="item in slotArr" :key="item.filed" #[item.field]>
          <slot :name="item.field"></slot>
        </template>
      </base-form>
      <template #footer>
        <slot name="footer">
          <div class="fr f-ac-jc">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
          </div>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import baseForm from '@/components/baseForm'
import { computed, nextTick, ref } from 'vue'

const props = defineProps({
  modalAttr: {
    type: Object,
    default: () => ({
      width: {
        type: String,
        default: '50%'
      }
    })
  }
})

const emit = defineEmits(['handleClose'])

const dialogVisible = ref(false)
const myModal = ref(null)
const slotArr = computed(() => {
  return props.modalConfig.formItems.filter((element) => {
    return element.type == 'slot' || element.type == 'outSide-slot'
  })
})
// 点击原来的按钮触发事件
/*******
 * @ description: 提交表单
 * @ return {*}
 ******/
function handleConfirmClick() {
  myModal.value.submit()
}
// 关闭表单
function close() {
  dialogVisible.value = false
  handleClose()
}

/*******
 * @ description: 重置表单并通知父组件
 * @ return {*}
 ******/
function handleClose() {
  myModal.value.reset()
  emit('handleClose')
}

const title = ref('新增')
/*******
 * @ description: 初始化表单
 * @ param {*} data
 * @ param {*} cus_title 自定义标题
 * @ return {*}
 ******/
function init(data, cus_title) {
  // 避免不传参数时undefined报错
  dialogVisible.value = true
  let saveData = {}
  if (data) {
    saveData = data
    if (data.id) {
      title.value = '编辑'
    }
  }
  if (cus_title) {
    title.value = cus_title
  }
  // 解包回显参数
  nextTick(() => {
    myModal.value.updateData({ ...saveData })
  })
}

// 导出方法
defineExpose({ init, close })
</script>
