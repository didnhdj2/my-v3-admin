<template>
  <div class="main">
    <div class="h-50 lh-50 pl-30 color-white fs-18 bg-3c">
      <span>{{ state ? '大熊助手' : '大熊' }}</span>
    </div>
    <el-menu :default-active="route.path" unique-opened :collapse="!state" :collapse-transition="false">
      <template v-for="(item, index) in menuList" :key="item.path">
        <subItem v-if="item.children && item.children.length > 0" :data="item" :key="item.path"></subItem>
        <template v-else>
          <menuItem v-if="!item.isHidden" :item="item" :key="item.path + index"></menuItem>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import menuItem from './menuItem.vue'
import subItem from './subItem.vue'
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'

const store = useUserStore()
const menuList = store.getMenu
const route = useRoute()
const state = computed(() => store.isCollapse)
store.isCollapse = true
watch(
  () => route.path,
  (val) => {
    let tags = {
      name: route.meta.title,
      icon: route.meta.icon,
      path: route.fullPath,
      isActive: true
    }
    store.setTagsViewArr(tags)
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.main {
  .logo {
    border-bottom: solid 1px var(--el-menu-border-color);
  }

  --el-menu-bg-color: #ffffff;
  --el-menu-text-color: #000000;
  --el-menu-hover-bg-color: #cfcfcf;
  .el-menu {
    border-right: none;
  }

  .el-sub-menu {
    --el-menu-bg-color: #f4f4f4;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
