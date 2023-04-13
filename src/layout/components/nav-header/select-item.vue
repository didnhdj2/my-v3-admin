<template>
  <div class="page-main br-8 pos-r">
    <div class="fr f-ac-jc mb-4">
      <svg-icon name="svg-coins" size="40" class="mr-4"></svg-icon>
      <div class="fs-32 fw-700 ml-8">{{ data.amount }}</div>
      <span class="as-e ml-8">个</span>
    </div>
    <div>
      <span>人民币：</span>
      <span class="color-red">
        {{ data.name }}
      </span>
    </div>
    <svg-icon name="svg-checked" size="24px" v-if="isCheck" class="pos-a bottom_0 right_0"></svg-icon>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  isCheck: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang="scss" scoped>
.page-main {
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid #eeeeee;
  width: 275px;
  height: 104px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
