<template>
  <!-- 有数据 -->
  <div v-if="listData.length > 0">
    <el-table :data="listData" style="width: 100%" v-bind="tableAttr" v-on="tableMethod">
      <template v-for="propItem in tableItems" :key="propItem.prop + propItem.type">
        <el-table-column v-bind="propItem">
          <!-- 插槽或者可编辑列 -->
          <template #default="{ row, column, $index }" v-if="propItem.slotName || propItem.editable">
            <!-- 编辑列 -->
            <editCell
              v-if="propItem.editable"
              :prop="propItem.prop"
              :row="row"
              :editId="editId"
              :isEditCell="editRowId === row[editId] && editRowField === propItem.prop && !isEditRow"
              :isEditRow="isEditRow && row[editId] === editRowId"
              v-bind="propItem.editItem"
              @confirm="confirm"
              @update="updateData"
              @updateField="updateField"
            ></editCell>
            <!-- 插槽列 -->
            <slot :name="propItem.slotName" :row="row" :column="column" :index="$index" v-else>
              {{ row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
      <!-- 单独配置的按钮列 -->
      <el-table-column label="操作" width="160" v-bind="btnSlot.item">
        <template #default="{ row }">
          <div class="fr">
            <div class="fr f-1" v-if="editableLine">
              <!-- 编辑行时自带的插槽 -->
              <el-button type="primary" v-if="!(row[editId] == editRowId && isEditRow)" @click="handleEdit(row)">编辑</el-button>
              <el-button-group v-else class="fr">
                <el-button type="success" @click="handleSave()" :icon="Select"></el-button>
                <el-button @click="handleCancel()" :icon="CloseBold"></el-button>
              </el-button-group>
            </div>
            <!-- 自定义的按钮 -->
            <template v-if="btnSlot.btnArr && btnSlot.btnArr.length > 0">
              <el-button
                v-for="btn in btnSlot.btnArr"
                v-bind="btn.attr"
                @click="
                  (val) => {
                    btn.onClick(val, row)
                  }
                "
              >
                {{ btn.attr.btnText }}
              </el-button>
            </template>
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
import { CloseBold, Select } from '@element-plus/icons-vue'
import { ref } from 'vue'
const props = defineProps({
  listData: {
    type: Array,
    required: true,
    description: '表格数据'
  },
  tableMethod: {
    type: Object,
    default: () => ({}),
    description: '表格方法'
  },
  tableAttr: {
    type: Object,
    default: () => ({}),
    description: '表格属性'
  },
  tableItems: {
    type: Array,
    required: true,
    description: '表格列'
  },

  editableLine: {
    type: Boolean,
    default: false,
    description: '是否可编辑行'
  },
  btnSlot: {
    type: Object,
    default: () => ({}),
    description: '按钮插槽'
  },
  editId: {
    type: String,
    default: 'id',
    description: '编辑行的id'
  }
})

const isEditRow = ref(false) //是否编辑行
const editRowId = ref(null) //编辑的id
const editRowField = ref(null) //编辑单元格的字段
const editRowData = ref({}) //编辑行的数据

const emits = defineEmits(['update'])

/*******
 * @ description: 编辑行
 * @ param {*} data
 * @ return {*}
 ******/
function handleEdit(data) {
  isEditRow.value = true
  editRowId.value = data[props.editId]
  editRowData.value = {}
}

/*******
 * @ description: 提交编辑行后的数据
 * @ return {*}
 ******/
function handleSave() {
  emits('update', editRowData.value)
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

/*******
 * @ description: 确认修改单元格
 * @ param {*} data
 * @ return {*}
 ******/
function confirm(data) {
  emits('update', data)
  editRowField.value = ''
  editRowId.value = ''
}

/*******
 * @ description: 编辑行时，更新数据
 * @ param {*} data
 * @ return {*}
 ******/
function updateData(data) {
  editRowData.value = Object.assign(editRowData.value, data)
}

/*******
 * @ description: 编辑单个单元格时
 * @ param {*} id
 * @ param {*} field
 * @ return {*}
 ******/
function updateField(id, field) {
  isEditRow.value = false
  editRowField.value = field
  editRowId.value = id
}
</script>
