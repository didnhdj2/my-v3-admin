<template>
  <div class="my-modal">
    <el-dialog :title="title" v-model="dialogVisible" v-bind="modalAttr" @close="handleClose">
      <base-form v-bind="modalConfig" ref="myModal" @submit="submit">
        <template v-for="item in slotArr" :key="item.filed" #[item.field]>
          <slot :name="item.field"></slot>
        </template>
      </base-form>
      <slot name="footer">
        <div class="fr f-ac-jc">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
        </div>
      </slot>
    </el-dialog>
  </div>
</template>

<script setup>
import baseForm from '@/components/baseForm'
import { computed, nextTick, ref } from 'vue'
import usePageStore from '@/store/pages'

const props = defineProps({
  modalConfig: {
    type: Object,
    default: () => ({ span: 24 })
  },
  modalAttr: {
    type: Object,
    default: () => ({
      width: {
        type: String,
        default: '50%'
      }
    })
  },
  pageName: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handleRest', 'finish'])

const dialogVisible = ref(false)
const myModal = ref(null)
const slotArr = computed(() => {
  return props.modalConfig.formItems.filter((element) => {
    return element.type == 'slot' || element.type == 'outSide-slot'
  })
})
// 点击原来的按钮触发事件
function handleConfirmClick() {
  myModal.value.validateForm()
}
// 关闭表单
function close() {
  dialogVisible.value = false
  handleClose()
}
function handleClose() {
  myModal.value.reset()
  emit('handleRest')
}

const title = ref('新增')
// 初始化表单
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

// 提交表单数据
const store = usePageStore()
async function submit(data) {
  await store.editData(data, props.pageName)
  close()
  emit('finish')
}

// 导出方法
defineExpose({ init, close })
</script>
