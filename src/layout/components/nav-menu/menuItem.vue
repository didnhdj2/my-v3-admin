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
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
const store = useUserStore()
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
const route = useRoute()
const router = useRouter()
</script>
<style lang="scss" scoped>
.main {
}
</style>
