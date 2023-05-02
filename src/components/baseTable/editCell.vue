<template>
  <div class="fr f-ac" v-if="isEditRow || isEditCell">
    <component :is="`el-${type}`" v-bind="attrs" class="m-2 h-32" v-model="inputVal" @change="handleInput">
      <template v-if="children && children.length">
        <component :is="`el-${child.type}`" v-for="child in children" :disabled="child.disabled" v-bind="child.attrs"></component>
      </template>
    </component>
    <div v-if="isEditCell" class="ml-10 fr">
      <el-icon v-if="isEditCell" class="mr-10 success" @click.stop="handleConfirm">
        <Select />
      </el-icon>
      <el-icon class="danger" @click.stop="handleCancel">
        <CloseBold />
      </el-icon>
    </div>
  </div>
  <div class="fr f-ac f-jsb" v-else @click.stop="handleClick">
    <div class="line-1">{{ inputVal }}</div>
    <el-icon class="ml-10 info w-30">
      <Edit />
    </el-icon>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  row: {
    type: Object,
    default: () => ({}),
    description: '表格行数据'
  },
  prop: {
    type: String,
    required: true,
    description: '表格字段'
  },

  formatter: {
    type: [Function, Boolean],
    default: false,
    description: '格式化字段方法'
  },
  parser: {
    type: [Function, Boolean],
    default: false,
    description: '反格式化字段方法'
  },
  isEditCell: {
    type: Boolean,
    default: false,
    description: '是否编辑单元格'
  },
  isEditRow: {
    type: Boolean,
    default: false,
    description: '是否编辑行'
  },
  type: {
    type: String,
    default: 'input',
    description: '编辑类型'
  },
  attrs: {
    type: Object,
    default: () => ({}),
    description: '编辑属性'
  },
  children: {
    type: Array,
    default: () => [],
    description: '子组件'
  },
  editId: {
    type: String,
    required: true,
    description: '编辑id'
  }
})

const inputVal = ref('')

/*******
 * @ description: 格式化字段
 * @ return {*}
 ******/
function formatterVal() {
  inputVal.value = props.formatter ? props.formatter(props.row[props.prop]) : props.row[props.prop]
}

watch(
  () => props.row[props.prop],
  () => {
    formatterVal()
  },
  { immediate: true }
)

const emits = defineEmits(['confirm', 'update', 'updateField'])
/*******
 * @ description: 点击确认按钮
 * @ return {*}
 ******/
function handleConfirm() {
  emits('confirm', {
    id: props.row[props.editId],
    [props.prop]: props.parser ? props.parser(inputVal.value) : inputVal.value
  })
}

function handleClick() {
  emits('updateField', props.row[props.editId], props.prop)
}

/*******
 * @ description: 点击取消图标
 * @ return {*}
 ******/
function handleCancel() {
  emits('updateField', '', '')
}

/*******
 * @ description: 编辑行时的提交
 * @ param {*} val
 * @ return {*}
 ******/
function handleInput(val) {
  if (props.isEditRow) {
    emits('update', {
      id: props.row[props.editId],
      [props.prop]: props.parser ? props.parser(val) : inputVal.value
    })
  }
}
</script>
