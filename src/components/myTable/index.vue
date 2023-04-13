<template>
  <div>
    <base-table :listData="dataList" :listCount="dataCount" v-bind="contentTableConfig" v-model:page="pageInfo">
      <template #handler="scope">
        <slot name="handler">
          <div class="handle-btns">
            <el-button :icon="Edit" size="small" type="" link @click="handleEditClick(scope.row)">编辑</el-button>
            <el-button :icon="Delete" size="small" type="" link @click="handleDeleteClick(scope.row)">删除</el-button>
          </div>
        </slot>
      </template>
    </base-table>
    <div :class="footConfig.className || 'frr mt-20'" v-if="footConfig.show">
      <div>
        <slot name="footer-left"></slot>
      </div>
      <el-pagination
        v-model:current-page="pageInfo.currentPage"
        v-model:page-size="pageInfo.pageSize"
        :page-sizes="footConfig.pageSizes || [10, 20, 30]"
        :layout="footConfig.layout || 'total, sizes, prev, pager, next, jumper'"
        :page-count="dataCount"
        v-bind="footConfig.pageAttrs"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'
import { usePageStore } from '@/store/pages'
import BaseTable from '@/components/baseTable'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    require: true
  },
  footConfig: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['newBtnClick', 'editBtnClick'])

const store = usePageStore()

// 1.双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(
  pageInfo,
  (val) => {
    console.log('===val===', val)
    getPageData(val)
  },
  { deep: true }
)

// 2.发送网络请求
const getPageData = (queryInfo = {}) => {
  store.listData(queryInfo, props.pageName)
}
getPageData(pageInfo.value)

// 3.从vuex中获取数据
const dataList = computed(() => store.getList(props.pageName))
const dataCount = computed(() => store.getCount(props.pageName))

// 5.删除/编辑/新建操作
const handleDeleteClick = (item) => {
  store.delData({ id: item.id }, props.pageName)
}

const handleEditClick = (item) => {
  emits('editBtnClick', item)
}
</script>
