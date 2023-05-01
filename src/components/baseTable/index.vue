<template>
  <!-- 有数据 -->
  <div class="">
    <el-table :data="listData" style="width: 100%" v-bind="tableAttr" v-on="tableMethod">
      <template v-for="propItem in tableItems" :key="propItem.prop + propItem.type">
        <el-table-column v-bind="propItem">
          <template #default="{ row, column, $index }" v-if="propItem.slotName">
            <slot :name="propItem.slotName" :row="row" :column="column" :index="$index">
              {{ row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
      <template #empty>
        <slot name="empty">
          <div class="fc f-ac-jc ptb-200">
            <el-image :src="emptyImage" class="h-200 w-200"></el-image>
            <div class="mt-40 color-99">暂无数据</div>
          </div>
        </slot>
      </template>
    </el-table>
  </div>
  <!-- 无数据状态 TODO待优化-->
</template>

<script setup>
import emptyImage from '@/assets/images/empty.png'
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
