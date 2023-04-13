<template>
  <el-table :data="listData" style="width: 100%" v-bind="tableAttr" v-on="tableMethod">
    <template v-for="propItem in tableItems" :key="propItem.prop + propItem.type">
      <el-table-column v-bind="propItem">
        <template #default="scope" v-if="propItem.slotName">
          <slot :name="propItem.slotName" :row="scope.row">
            {{ scope.row[propItem.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup>
const props = defineProps({
  listData: {
    type: Array,
    required: true
  },
  tableMethod: {
    type: Object,
    default: () => ({})
  },
  tableAttr: {
    type: Object,
    default: () => ({})
  },
  tableItems: {
    type: Array,
    required: true
  }
})
</script>
