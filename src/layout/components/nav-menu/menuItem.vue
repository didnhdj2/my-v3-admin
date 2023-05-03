<template>
  <template v-if="item.isOnDevelop">
    <el-menu-item :index="item.path" @click="handleClick(item)">
      <svg-icon :name="item.meta.icon"></svg-icon>
      <template #title>
        <span class="ml-12">{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
  <template v-else>
    <appLink :to="item.path">
      <el-menu-item :index="item.path" @click="handleClick(item)">
        <svg-icon :name="item.meta.icon"></svg-icon>
        <template #title>
          <span class="ml-12">{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </appLink>
  </template>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import appLink from './appLink.vue'
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
function handleClick(item) {
  if (item.isOnDevelop) {
    ElMessage.error('该功能正在开发中,敬请期待')
  }
}
</script>
