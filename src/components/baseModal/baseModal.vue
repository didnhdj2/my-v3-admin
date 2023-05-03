<template>
  <div class="my-modal">
    <el-dialog :title="title" v-model="dialogVisible" v-bind="modalAttr" @close="handleClose">
      <base-form v-bind="$attrs" ref="myModal">
        <template v-for="item in slotArr($attrs)" :key="item.field" #[item.field]>
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

/*******
 * @ description: 暴露给父组件的插槽数组
 * @ param {*}
 * @ return {*}
 ******/
const slotArr = computed(() => {
  return (attrs) => {
    return attrs.formItems.reduce((preArr, item) => {
      if (item.slotArr && item.slotArr.insideSlot && item.slotArr.insideSlot.length) {
        item.slotArr.insideSlot.forEach((element) => {
          if (element.name) {
            preArr.push(element.name)
          }
        })
      }
      if (item.type == 'slot' || item.type == 'oSlot') {
        preArr.push(item.field)
      }
      return preArr
    }, [])
  }
})

/*******
 * @ description: 提交表单
 * @ return {*}
 ******/
function handleConfirmClick() {
  myModal.value && myModal.value.submit()
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
  myModal.value && myModal.value && myModal.value.reset()
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
    myModal.value && myModal.value.updateData({ ...saveData })
  })
}

// 导出方法
defineExpose({ init, close })
</script>
