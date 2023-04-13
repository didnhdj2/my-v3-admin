<template>
  <el-sub-menu :index="data.path" data-menu="1" @click.stop="handleSubUrl($event, data)">
    <template #title>
      <svg-icon data-menu="1" :name="data.meta.icon"></svg-icon>
      <span data-menu="1" class="ml-12">{{ data.meta.title }}</span>
    </template>
    <template v-for="item in data.children">
      <menuItem v-if="!item.isHidden" :item="item"></menuItem>
    </template>
  </el-sub-menu>
</template>

<script setup>
import menuItem from './menuItem.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['changePath'])
/*******
 * @ description: 点击子菜单时，跳转到子菜单的第一个页面
 * @ param {*} data
 * @ return {*}
 ******/
const handleSubUrl = (e, data) => {
  if (e.target.dataset?.menu != 1) {
    return
  }
  if (data.children && data.children.length > 0 && !data.children[0].isOnDevelop) {
    router.push({ path: data.children[0].path })
    // 通知父组件切换激活菜单
    emit('changePath', data.children[0].path)
  }
}
</script>
<style lang="scss" scoped>
.main {
}
</style>
