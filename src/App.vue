<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import '@/assets/styles/index.scss'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ref } from 'vue'
const zIndex = ref(3000)
const size = ref('default')
</script>
