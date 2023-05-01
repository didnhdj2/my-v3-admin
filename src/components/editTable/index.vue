<template>
  <!-- 有数据 -->
  <div v-if="listData.length > 0">
    <el-table :data="listData" style="width: 100%" v-bind="tableAttr" v-on="tableMethod">
      <template v-for="propItem in tableItems" :key="propItem.prop + propItem.type">
        <el-table-column v-bind="propItem">
          <template #default="{ row, column, $index }" v-if="propItem.slotName">
            <slot :name="propItem.slotName" :row="row" :column="column" :index="$index" v-if="!propItem.editable">
              {{ row[propItem.prop] }}
            </slot>
            <editCell
              v-else
              :prop="propItem.prop"
              :row="row"
              :isEditCell="editRowId === row.id && editRowField === propItem.prop && !isEditRow"
              :isEditRow="isEditRow && row.id === editRowId"
              @confirm="confirm"
              @update="updateData"
              @updateField="updateField"
            ></editCell>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" width="260">
        <template #default="{ row }">
          <div class="fr">
            <div class="fr">
              <el-button type="primary" v-if="!(row.id == editRowId && isEditRow)" @click="handleEdit(row)">编辑</el-button>
              <div class="fr" v-else>
                <el-button type="primary" @click="handleSave()">保存</el-button>
                <el-button type="primary" @click="handleCancel()">取消</el-button>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <template #empty>
        <!-- 无数据状态-->
        <slot name="empty">
          <div class="h_50 fc f-ac-jc">
            <el-image :src="emptyImg" class="h-200 w-200"></el-image>
            <div class="mt-40 color-99">暂无数据</div>
          </div>
        </slot>
      </template>
    </el-table>
  </div>
</template>
<script setup>
import emptyImg from '@/assets/images/empty.png'
import editCell from './editCell.vue'

import { ref } from 'vue'
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

const isEditRow = ref(false)
const editRowId = ref(null)
const editRowField = ref(null)
const editRowData = ref({})

/*******
 * @ description: 编辑行
 * @ param {*} data
 * @ return {*}
 ******/
function handleEdit(data) {
  isEditRow.value = true
  editRowId.value = data.id
  editRowData.value = {}
}

/*******
 * @ description: 提交编辑行后的数据
 * @ return {*}
 ******/
function handleSave() {
  handleCancel()
}

/*******
 * @ description: 取消编辑行
 * @ return {*}
 ******/ 
function handleCancel() {
  isEditRow.value = false
  editRowId.value = ''
  editRowData.value = {}
}

function confirm(data) {
  editRowField.value = ''
  editRowId.value = ''
}

function updateData(data) {
  Object.assign(editRowData.value, data)
}

function updateField(id, field) {
  isEditRow.value = false
  editRowField.value = field
  editRowId.value = id
}

defineExpose({
  confirm,
  updateData,
  updateField
})
</script>
