<template>
  <div class="page-main">{{ main }}</div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const main = ref('not-found')
</script>
<style lang="scss" scoped>
.page-main {
}
</style>
