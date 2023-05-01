<template>
  <div class="fr f-ac" v-if="isEditRow || isEditCell">
    <!-- <el-input v-model="inputVal" @change="handleInput"></el-input>-->
    <!-- <el-switch v-model="inputVal" @change="handleInput"></el-switch> -->
    <!-- <el-date-picker v-model="inputVal" type="date" value-format="YYYY-MM-DD" @change="handleInput"></el-date-picker> -->
    <el-select v-model="inputVal" class="m-2" placeholder="Select" size="large" @change="handleInput">
      <el-option v-for="item in 3" :key="item" :label="item" :value="item" />
    </el-select>
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
    <div class="line-1">{{ row[prop] }}</div>
    <el-icon class="ml-10 info w-30">
      <Edit />
    </el-icon>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
const props = defineProps({
  row: {
    type: Object,
    default: () => ({})
  },
  prop: {
    type: String,
    required: true
  },
  formatter: {
    type: [Function, Boolean],
    default: false
  },
  parser: {
    type: [Function, Boolean],
    default: false
  },
  isEditCell: {
    type: Boolean,
    default: false
  },
  isEditRow: {
    type: Boolean,
    default: false
  }
})

const inputVal = ref('')

/*******
 * @ description: 格式化字段
 * @ return {*}
 ******/
function parseVal() {
  if (props.parser) {
    inputVal.value = props.parser(props.row[props.prop])
  } else {
    inputVal.value = props.row[props.prop]
  }
}

watch(
  () => props.row[props.prop],
  () => {
    parseVal()
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
    id: props.row.id,
    [props.prop]: props.formatter ? props.formatter(inputVal.value) : inputVal.value
  })
}

function handleClick() {
  emits('updateField', props.row.id, props.prop)
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
      id: props.row.id,
      [props.prop]: props.formatter ? props.formatter(val) : inputVal.value
    })
  }
}
</script>
