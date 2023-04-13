<template>
  <div>
    <slot name="header"></slot>
    <base-form ref="myform" v-bind="searchFormConfig" @submit="handleSubmit">
      <template #suffix>
        <slot name="mysuffix ">
          <el-button type="primary" @click="submit">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </slot>
      </template>
    </base-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseForm from '@/components/baseForm'
import usePageStore from '@/store/pages'
const props = defineProps({
  searchFormConfig: {
    type: Object,
    reuqired: true
  },
  pageName: {
    type: String,
    required: true
  }
})

const myform = ref(null)
const store = usePageStore()

// 点击提交按钮
function submit() {
  myform.value.submit()
}
// 点击重置按钮
function handleReset() {
  myform.value.reset()
}

// 处理表单提交
function handleSubmit(data) {
  store.listData(data, props.pageName)
}
</script>
