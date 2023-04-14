<template>
  <!-- 有数据 -->
  <div class="h_100" v-if="listData.length > 0">
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
  </div>
  <!-- 无数据状态 TODO待优化-->
  <div class="h_100" v-else>暂无数据</div>
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
