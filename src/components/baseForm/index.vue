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
                    <el-input
                      v-model="formData[`${item.field}`]"
                      :type="item.type"
                      v-bind="item.slotAttr"
                      :disabled="disabled"
                      v-on="functionDict[item.field]"
                    >
                      <template #append v-if="item.append">{{ item.append }}</template>
                    </el-input>
                  </div>
                </template>
                <template v-else-if="item.type === 'select'">
                  <div v-bind="item.divNode ? item.divNode : divNode">
                    <el-select
                      v-model="formData[`${item.field}`]"
                      v-bind="item.slotAttr"
                      :disabled="disabled"
                      v-on="functionDict[item.field]"
                    >
                      <el-option v-for="option in item.options" :key="option.value" v-bind="option" :disabled="disabled"></el-option>
                    </el-select>
                  </div>
                </template>
                <template v-else-if="item.type === 'switch'">
                  <div v-bind="item.divNode ? item.divNode : divNode">
                    <el-switch
                      v-model="formData[`${item.field}`]"
                      v-bind="item.slotAttr"
                      :disabled="disabled"
                      v-on="functionDict[item.field]"
                    ></el-switch>
                  </div>
                </template>
                <template v-else-if="item.type === 'datepicker'">
                  <div v-bind="item.divNode ? item.divNode : divNode">
                    <el-date-picker
                      v-model="formData[`${item.field}`]"
                      v-bind="item.slotAttr"
                      :disabled="disabled"
                      v-on="functionDict[item.field]"
                    ></el-date-picker>
                  </div>
                </template>
                <template v-else-if="item.type === 'radio'">
                  <div v-bind="item.divNode ? item.divNode : divNode">
                    <el-radio-group
                      v-model="formData[`${item.field}`]"
                      v-bind="item.slotAttr"
                      :disabled="disabled"
                      v-on="functionDict[item.field]"
                    >
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
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
const props = defineProps({
  formItems: {
    type: Array,
    default: () => [],
    desc: '表单项'
  },
  formAttr: {
    type: Object,
    default: () => ({ size: 'default', labelWidth: '140px' }),
    desc: '表单的默认属性'
  },
  divNode: {
    type: Object,
    default: () => ({}),
    desc: '表单项的div节点默认属性'
  },
  disabled: {
    type: Boolean,
    default: false,
    desc: '是否禁用表单'
  },
  includeKeys: {
    type: Array,
    default: () => [],
    desc: '不在表单中的，回显时需要包含的额外字段'
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // ≥1920px
      lg: 6, // ≥1200px
      md: 8, // ≥992px
      sm: 24, // ≥768px
      xs: 24 //
    }),
    desc: '表单项的布局'
  },
  formINjectionKey: {
    desc: '表单注入的key',
    type: String,
    required: true
  }
})

const baseForm = ref(null)
const formData = ref({})
const functionDict = {} //
/*******
 * @ description: 注册事件函数
 * @ return {*}
 ******/
function regitFunc() {
  props.formItems.forEach((item) => {
    item.events &&
      item.events.length > 0 &&
      item.events.forEach((func) => {
        if (functionDict[item.field]) {
          functionDict[item.field][func] = ($event) => {
            handleFunc(item.field, $event, func)
          }
        } else {
          functionDict[item.field] = {
            [func]: ($event) => {
              handleFunc(item.field, $event, func)
            }
          }
        }
      })
  })
}

/*******
 * @ description: 提交表单
 * @ return {*}
 ******/
const emits = defineEmits(['submit'])
async function submit() {
  let res = await baseForm.value.validate()
  if (res) {
    let newObj = fetchData()
    return newObj
  }
}

/*******
 * @ description: 返回不校验的数据
 * @ return {*}
 ******/
function fetchData() {
  let newObj = {}
  // 格式化数据
  for (const key in formData.value) {
    if (key in reformatters) {
      newObj[key] = reformatters[key](formData.value[key])
    } else {
      newObj[key] = formData.value[key]
    }
  }
  return newObj
}

/*******
 * @ description: 清除验证
 * @ return {*}
 ******/
function clearValidate() {
  baseForm.value.clearValidate()
}

/*******
 * @ description: 通用处理函数
 * @ param {*} field 字段名
 * @ param {*} value 回调值
 * @ param {*} func 函数名
 * @ return {*}
 ******/
function handleFunc(field, value, func) {
  emits('handleFunc', {
    field,
    value,
    func
  })
}

const reformatters = {}
const formatters = {}

/*******
 * @ description: 重置表单字段，初始化则注册格式化函数
 * @ param {*} isInit 是否初始化
 * @ param {*} extraField 额外字段，不修改值
 * @ return {*}
 ******/
function reset(isInit, extraField = {}) {
  props.formItems.forEach((item) => {
    if (!(item.field in extraField)) {
      formData.value[item.field] = item.default || ''
    }

    if (isInit) {
      // 初始化
      if (item.formatter) {
        // 注册格式化函数
        formatters[item.field] = item.formatter
      }
      if (item.reformatter) {
        // 注册反格式化函数
        reformatters[item.field] = item.reformatter
      }
      // 注册事件函数
      regitFunc()
    }
  })
}
reset(true)

/*******
 * @ description: 回显表单数据
 * @ param {*} data
 * @ return {*}
 ******/
function updateData(data) {
  for (const key in data) {
    // 有值或者包含在includeKeys中
    if (key in formData.value || props.includeKeys.includes(key)) {
      if (key in formatters) {
        // 格式化数据
        formData.value[key] = formatters[key](data[key])
      } else {
        formData.value[key] = data[key]
      }
    }
  }
}

/*******
 * @ description 通过依赖注入的方式导出方法
 * @ return {*}
 ******/
if (props.injectionKey) {
  const injectForm = inject(props.injectionKey, null)
  injectForm && injectForm({ clearValidate, submit, reset, updateData, fetchData })
}
//导出方法
defineExpose({ reset, clearValidate, submit, updateData, fetchData })
</script>
