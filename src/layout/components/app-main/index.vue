<template>
  <div class="main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.main {
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
  min-height: calc(100vh - 110px);
}
</style>
