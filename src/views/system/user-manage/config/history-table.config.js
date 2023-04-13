// 表格配置
/*******
tableItems:[] {Array} 表头配置
需要特殊处理的slot,formatter配置将不起作用
import
 ******/
import { regFenToYuan } from '@/utils'
import { h } from 'vue'
export const getHisTableConfig = () => ({
  // 表头配置
  tableItems: [
    {
      type: 'index', //index
      label: '序号',
      minWidth: '55',
      align: 'center',
      fixed: 'left'
    },
    {
      //所有el-table-column的属性都可以配置
      label: '用户名',
      prop: 'username',
      align: 'center',
      // width: '80',
      minWidth: '110',
      showOverflowTooltip: true,
      class: '',
      fixed: null,
      visible: true
    },
    {
      label: '账号状态',
      prop: 'state',
      formatter: (a, b, c) => {
        if (c == 'normal') {
          return h(
            ElTag,
            {
              class: 'ml-2',
              type: 'success'
            },
            { default: () => '正常' }
          )
        } else {
          return h(
            ElTag,
            {
              class: 'ml-2',
              type: 'danger'
            },
            {
              default: () => '冻结'
            }
          )
        }
      },
      align: 'center',
      // width: '80',
      minWidth: '120',
      class: '',
      visible: true
    },
    {
      label: '返点',
      prop: 'rebate',
      align: 'center',
      // width: '80',
      formatter: (row, column, cellValue) => {
        if (cellValue) {
          return cellValue + '%'
        } else {
          return '--'
        }
      },
      minWidth: '80',
      class: '',
      visible: true
    },
    {
      label: '代理',
      prop: 'bossName',
      align: 'center',
      formatter: (row, column, cellValue) => {
        if (cellValue) {
          return cellValue
        } else {
          return '--'
        }
      },
      minWidth: '140',
      class: '',
      visible: true
    },
    {
      label: '到期时间',
      prop: 'expireTime',
      align: 'center',
      // width: '80',
      minWidth: '140',
      class: '',
      visible: true
    },
    {
      label: '资产信息',
      prop: 'fundInfo',
      slotName: 'fundInfo',
      align: 'center',
      // width: '80',
      minWidth: '100',

      class: '',
      visible: true
    },
    {
      label: '角色列表',
      prop: 'roleInfoList',
      slotName: 'roleInfoList',
      align: 'center',
      // width: '80',
      minWidth: '160',
      class: '',
      visible: true
    },
    {
      label: '套餐',
      prop: 'packageList',
      slotName: 'packageList',
      align: 'center',
      // width: '80',
      minWidth: '100',
      class: '',
      visible: true
    },
    {
      label: '创建时间',
      prop: 'createTime',
      align: 'center',
      // width: '80',
      minWidth: '180',
      class: '',
      visible: true
    },
    {
      label: '操作',
      prop: 'operations', //
      align: 'center',
      slotName: 'handler',
      width: '220',
      minWidth: '220',
      class: '',
      fixed: 'right',
      visible: true
    }
  ],
  // 表格属性 所有el-table的属性都可以配置
  tableAttr: {
    border: true
  },
  tableMethod: {}
})
