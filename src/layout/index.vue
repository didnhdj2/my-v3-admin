<template>
  <div class="main">
    <el-container>
      <el-aside class="bg-0" :width="state ? '160px' : '50px'">
        <nav-menu></nav-menu>
      </el-aside>
      <el-container>
        <el-header>
          <nav-header></nav-header>
        </el-header>
        <el-main class="pos-r">
          <appMain></appMain>
          <el-popover placement="left" :width="610" trigger="hover">
            <template #reference>
              <span class="color-3c"><svg-icon name="svg-feedback" size="40" class="pos-f icon-feedback"></svg-icon></span>
            </template>
          </el-popover>
          <svg-icon name="svg-cus-server" size="40" class="pos-f icon-server"></svg-icon>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import appMain from './components/app-main'
import navHeader from './components/nav-header'
import navMenu from './components/nav-menu'
import { ref } from 'vue'
const state = ref(true)
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  .el-container {
    height: 100%;
  }

  .icon-server {
    bottom: 120px;
    right: 6px;
  }
  .icon-feedback {
    bottom: 60px;
    right: 6px;
  }
  .el-aside {
    --el-aside-color: black;
  }
}
</style>
