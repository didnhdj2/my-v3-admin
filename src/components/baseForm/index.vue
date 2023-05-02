<template>
  <div class="w_100">
    <el-form ref="baseForm" :model="formData" v-bind="formAttr">
      <div class="fr fw">
        <template v-for="(item, index) in formItems" :key="index">
          <!-- 非表单子项的slot -->
          <template v-if="item.type === 'oSlot'">
            <slot :name="item.field"></slot>
          </template>
          <!-- 表单子项的slot -->
          <template v-else>
            <el-form-item v-if="!item.isHidden" v-bind="item.itemsAttr" :prop="item.field">
              <template v-if="item.type === 'slot'">
                <slot :name="item.field"></slot>
              </template>
              <template v-else-if="item.type === 'upload' || item.type == 'cascader'"></template>
              <template v-else>
                <div v-bind="item.divNode ? item.divNode : divNode">
                  <component
                    :is="item.isCus ? item.type : `el-${item.type}`"
                    v-model="formData[`${item.field}`]"
                    :disabled="disabled || item.disabled"
                    v-bind="item.slotAttr"
                    v-on="functionDict[item.field] || {}"
                  >
                    <!-- insideSlot必然存在，没有传入则为空数组 -->
                    <template #[iSlot.slot] v-for="iSlot in item.slotAttr.insideSlot">
                      <template v-if="iSlot.name">
                        <slot :name="iSlot.name"></slot>
                      </template>
                      <template v-else>
                        <div v-on="iSlot.events || {}">
                          {{ iSlot.value }}
                        </div>
                      </template>
                    </template>
                    <template v-if="item.children && item.children.length">
                      <component
                        :is="child.isCus ? child.type : `el-${child.type}`"
                        v-for="child in item.children"
                        :disabled="disabled || child.disabled"
                        v-bind="child.slotAttr"
                        v-on="child.events || {}"
                      ></component>
                    </template>
                  </component>
                </div>
              </template>
            </el-form-item>
          </template>
          <!-- </el-col> -->
        </template>
      </div>
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
  formINjectionKey: {
    desc: '表单注入的key',
    type: String,
    required: true
  },
  cusName: {
    desc: '表单的自定义名称',
    type: String,
    required: true
  }
})

/* -==============================================- */
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
 * @ description: 提交表单，返回校验后的数据
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
    if (key in parsers) {
      newObj[key] = parsers[key](formData.value[key])
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
 * @ description: 校验单个字段
 * @ param {*} field
 * @ return {*}
 ******/
async function validateField(field) {
  let res = await baseForm.value.validateField(field)
  return res
}

/*******
 * @ description: 通用处理函数
 * @ param {*} field 字段名
 * @ param {*} value 回调值
 * @ param {*} func 函数名
 * @ return {*}
 ******/
function handleFunc(field, value, func) {
  emits(
    'handleFunc',
    {
      field,
      value,
      func
    },
    props.cusName
  )
}

const parsers = {}
const formatters = {}

function regitFomatter() {
  props.formItems.forEach((item) => {
    if (item.formatter) {
      // 注册格式化函数
      formatters[item.field] = item.formatter
    }
    if (item.parse) {
      // 注册解析化函数
      parsers[item.field] = item.parse
    }
    if (item.slotAttr && !item.slotAttr.insideSlot) {
      // 注册插槽
      item.slotAttr.insideSlot = []
    }
  })
}

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
  })
  if (isInit) {
    // 初始化
    regitFomatter()
    // 注册事件函数
    regitFunc()
  }
}
reset(true)

/*******
 * @ description: 回显表单数据
 * @ param {*} data
 * @ return {*}
 ******/
function updateData(data, excludeList = []) {
  for (const key in data) {
    // 有值或者包含在includeKeys中
    if (!excludeList.includes(key) && (key in formData.value || props.includeKeys.includes(key))) {
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
 * @ description 通过依赖注入的方式导出方法,可以跨组件调用
 * @ return {*}
 ******/
if (props.injectionKey) {
  const injectForm = inject(props.injectionKey, null)
  injectForm && injectForm({ clearValidate, submit, reset, updateData, fetchData, regitFomatter, regitFunc, validateField })
}
//导出方法，只能父组件调用
defineExpose({ reset, clearValidate, submit, updateData, fetchData, regitFomatter, regitFunc, validateField })
</script>
