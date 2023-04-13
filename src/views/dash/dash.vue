<template>
  <div class="page-main">{{ main }}</div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const main = ref('功能开发中，敬请期待...')
</script>
<style lang="scss" scoped>
.page-main {
}
</style>
