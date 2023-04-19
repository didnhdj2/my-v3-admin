// 表格配置
/*******
tableItems:[] {Array} 表头配置
需要特殊处理的slot,formatter配置将不起作用
import
 ******/
import { regFenToYuan } from '@/utils'
import { h } from 'vue'
export const getTableConfig = () => ({
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
      label: '抖音号',
      prop: 'unionId',
      align: 'left',
      // width: '80',
      minWidth: '110',
      showOverflowTooltip: true,
      class: '',
      fixed: null,
      visible: true
    },
    {
      label: '预警',
      prop: 'warning',
      formatter: (a, b, c) => {
        if (!c) {
          return h(
            ElTag,
            {
              class: 'ml-2',
              type: 'success'
            },
            { default: () => '安全' }
          )
        } else {
          return h(
            ElTag,
            {
              class: 'ml-2',
              type: 'danger'
            },
            {
              default: () => '预警'
            }
          )
        }
      },
      align: 'left',
      // width: '80',
      minWidth: '80',
      class: '',
      visible: true
    },
    {
      label: '昵称',
      prop: 'nickname',
      align: 'left',
      // width: '80',
      showOverflowTooltip: true, //超过了一行显示省略号，鼠标移动到上面显示全部内容
      minWidth: '110',
      class: '',
      visible: true
    },
    {
      label: '初始粉丝数',
      prop: 'oldFansNum',
      align: 'left',
      minWidth: '140',
      class: '',
      visible: true
    },
    {
      label: '当前粉丝数',
      prop: 'currentFansNum',
      align: 'left',
      // width: '80',
      minWidth: '140',
      class: '',
      visible: true
    },
    {
      label: '直播状态',
      prop: 'liveStatus',
      formatter: (row, column, cellValue) => {
        if (cellValue == 0) {
          return '未开播'
        } else {
          return '正在直播'
        }
      },
      align: 'center',
      // width: '80',
      minWidth: '100',

      class: '',
      visible: true
    },
    {
      label: '在线人数',
      prop: 'liveUserCount',
      align: 'left',
      // width: '80',
      minWidth: '100',
      class: '',
      visible: true
    },
    {
      label: '涨粉数量',
      prop: 'fansCount',
      align: 'left',
      // width: '80',
      minWidth: '100',
      class: '',
      visible: true
    },
    {
      label: '备注',
      prop: 'remark',
      // slotName: 'remark',
      align: 'left',
      // width: '80',
      minWidth: '140',
      class: '',
      visible: true
    },
    {
      label: '订单编号',
      prop: 'orderNo',
      align: 'left',
      // width: '80',
      minWidth: '100',
      showOverflowTooltip: true,
      class: '',
      visible: true
    },
    {
      label: '订单来源',
      prop: 'source',
      // slotName: 'source',
      align: 'left',
      // width: '80',
      minWidth: '140',
      class: '',
      visible: true
    },
    {
      label: '订单数量',
      prop: 'number',
      // slotName: 'number',
      align: 'left',
      // width: '80',
      minWidth: '100',
      class: '',
      visible: true
    },
    {
      label: '订单单价',
      prop: 'price',
      // slotName: 'price',
      formatter: (a, b, c) => {
        if (c == null) {
          return '0.00'
        }
        return regFenToYuan(c)
      },
      align: 'left',
      // width: '80',
      minWidth: '100',
      class: '',
      visible: true
    },
    {
      label: '收款金额',
      prop: 'payAmount',
      // slotName: 'payAmount',
      formatter: (a, b, c) => {
        if (c == null) {
          return '0.00'
        }
        return regFenToYuan(c)
      },
      align: 'left',
      // width: '80',
      minWidth: '100',
      class: '',
      visible: true
    },

    {
      label: '消费金额',
      prop: 'expendAmount',
      align: 'left',
      formatter: (a, b, c) => {
        if (c == null) {
          return '0.00'
        }
        return regFenToYuan(c)
      },
      // width: '80',
      minWidth: '100',
      class: '',
      visible: true
    },
    {
      label: '退款金额',
      prop: 'refundAmount',
      align: 'left',
      formatter: (a, b, c) => {
        if (c == null) {
          return '0.00'
        }
        return regFenToYuan(c)
      },
      // width: '80',
      minWidth: '100',
      class: '',
      visible: true
    },
    {
      label: '盈利',
      prop: 'incomeAmount',
      align: 'left',
      formatter: (a, b, c) => {
        if (c == null) {
          return '0.00'
        }
        return regFenToYuan(c)
      },
      // width: '80',
      minWidth: '80',
      class: '',
      visible: true
    },
    {
      label: '开启预警',
      prop: 'enableWarn',
      slotName: 'enableWarn',
      align: 'center',
      // width: '80',
      minWidth: '120',
      class: '',
      visible: true
    },
    {
      label: '订单数据',
      prop: 'dataSet',
      slotName: 'dataSet',
      align: 'center',
      // width: '80',
      minWidth: '120',
      class: '',
      visible: true
    },

    {
      label: '操作',
      prop: 'operations', //
      align: 'center',
      slotName: 'handler',
      width: '160',
      minWidth: '80',
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
