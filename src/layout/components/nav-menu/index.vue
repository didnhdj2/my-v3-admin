<template>
  <div class="main">
    <div class="h-50 logo fr f-ac pl-30 color-white fs-18 bg-3c">
      <span>大熊助手</span>
    </div>
    <el-menu :default-active="currentPath" unique-opened>
      <template v-for="(item, index) in menuList" :key="item.path">
        <subItem v-if="item.children && item.children.length > 0" :data="item" :key="item.path" @changePath="changePath"></subItem>
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
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'

const store = useUserStore()
const menuList = store.getMenu
const route = useRoute()
const tagsViews = computed(() => store.tagsViewArr)
const currentPath = ref(route.path)

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

const changePath = (path) => {
  currentPath.value = path
}
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
