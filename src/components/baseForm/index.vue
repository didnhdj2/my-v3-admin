<template>
  <div class="w_100">
    <el-form ref="baseForm" :model="formData" v-bind="formAttr">
      <el-row>
        <template v-for="(item, index) in formItems" :key="index">
          <el-col v-bind="item.colLayout ? item.colLayout : colLayout">
            <!-- 非表单子项的slot -->
            <template v-if="item.type === 'outSide-slot'">
              <slot :name="item.field"></slot>
            </template>
            <!-- 表单子项的slot -->
            <template v-else>
              <el-form-item v-if="!item.isHidden" v-bind="item.itemsAttr" :prop="item.field">
                <template v-if="['input', 'password', 'text', 'textarea'].includes(item.type)">
                  <div v-bind="item.divNode ? item.divNode : divNode">
                    <el-input v-model="formData[`${item.field}`]" :type="item.type" v-bind="item.slotAttr" :disabled="disabled">
                      <template #append v-if="item.append">{{ item.append }}</template>
                    </el-input>
                  </div>
                </template>
                <template v-else-if="item.type === 'select'">
                  <div v-bind="item.divNode ? item.divNode : divNode">
                    <el-select v-model="formData[`${item.field}`]" v-bind="item.slotAttr" :disabled="disabled">
                      <el-option
                        v-for="option in item.options"
                        :key="option.value"
                        :value="option.value"
                        :label="option.label"
                        :disabled="disabled"
                      ></el-option>
                    </el-select>
                  </div>
                </template>
                <template v-else-if="item.type === 'switch'">
                  <div v-bind="item.divNode ? item.divNode : divNode">
                    <el-switch v-model="formData[`${item.field}`]" v-bind="item.slotAttr" :disabled="disabled"></el-switch>
                  </div>
                </template>
                <template v-else-if="item.type === 'datepicker'">
                  <div v-bind="item.divNode ? item.divNode : divNode">
                    <el-date-picker v-model="formData[`${item.field}`]" v-bind="item.slotAttr" :disabled="disabled"></el-date-picker>
                  </div>
                </template>
                <template v-else-if="item.type === 'radio'">
                  <div v-bind="item.divNode ? item.divNode : divNode">
                    <el-radio-group v-model="formData[`${item.field}`]" v-bind="item.slotAttr" :disabled="disabled">
                      <el-radio v-for="option in item.options" :label="option.value" :key="option.value" :disabled="disabled">
                        {{ option.label }}
                      </el-radio>
                    </el-radio-group>
                  </div>
                </template>
                <template v-else-if="item.type === 'slot'">
                  <slot :name="item.field"></slot>
                </template>
              </el-form-item>
            </template>
          </el-col>
        </template>
        <!--  -->
        <el-col v-bind="btnLayout ? btnLayout : colLayout">
          <el-form-item label-width="0">
            <slot name="suffix"></slot>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  formItems: {
    type: Array,
    default: () => []
  },
  formAttr: {
    type: Object,
    default: () => ({ size: 'default', labelWidth: '140px' })
  },
  btnLayout: {
    type: [Object, String],
    default: ''
  },
  divNode: {
    type: Object,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // ≥1920px
      lg: 6, // ≥1200px
      md: 8, // ≥992px
      sm: 24, // ≥768px
      xs: 24 //
    })
  }
})

const baseForm = ref(null)
const formData = ref({})

/*******
 * @ description: 重置表单字段
 * @ return {*}
 ******/
function reset() {
  props.formItems.forEach((item) => {
    formData.value[item.field] = item.default || ''
  })
}
reset()

/*******
 * @ description: 回显表单数据
 * @ param {*} data
 * @ return {*}
 ******/
function updateData(data) {
  for (let item in data) {
    formData.value[item] = data[item]
  }
}

/*******
 * @ description:  提交表单
 * @ return {*}
 ******/
const emits = defineEmits(['submit'])
function submit() {
  emits('submit', formData.value)
}

/*******
 * @ description: 验证表单
 * @ return {*}
 ******/
function validateForm() {
  baseForm.value.validate((valid) => {
    if (valid) {
      submit()
    } else {
      return false
    }
  })
}

defineExpose({ reset, submit, updateData, validateForm })
</script>
