// 表格配置
/*******
tableItems:[] {Array} 表头配置
需要特殊处理的slot,formatter配置将不起作用

 ******/
export const getTableConfig = ({ handleSelectionChange }) => ({
  // 表头配置
  tableItems: [
    {
      type: 'selection', //
      label: '选择'
    },
    {
      type: 'index', //index
      label: '序号'
    },
    {
      //所有el-table-column的属性都可以配置
      label: '网盘编号',
      prop: 'menu_no',
      //slotName: 'role', //需要特殊处理的slot,formatter配置将不起作用
      align: 'center',
      // width: '80',
      minWidth: '80',
      class: '',
      fixed: null,
      visible: true
    },
    {
      label: '网盘',
      prop: 'pan',
      align: 'center',
      // width: '80',
      showOverflowTooltip: true, //超过了一行显示省略号，鼠标移动到上面显示全部内容
      minWidth: '80',
      class: '',
      visible: true
    },
    {
      label: '路径',
      prop: 'path',
      align: 'center',
      width: '160',
      minWidth: '80',
      class: '',
      visible: true
    },
    {
      label: '目录',
      prop: 'menu',
      align: 'center',
      // width: '80',
      minWidth: '80',
      class: '',
      visible: true
    },
    {
      label: '显示状态',
      prop: 'isShow',
      slotName: 'state',
      align: 'center',
      // width: '80',
      minWidth: '80',
      class: '',
      visible: true
    },
    {
      label: '排序',
      prop: 'sort',
      align: 'center',
      // width: '80',
      minWidth: '80',
      class: '',
      visible: true
    },
    {
      label: '更新时间',
      prop: 'date',
      align: 'center',
      // width: '80',
      minWidth: '80',
      class: '',
      visible: true
    },
    {
      label: '操作',
      prop: 'operations', //
      align: 'center',
      slotName: 'handler',
      width: '280',
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
  tableMethod: {
    select: (selection, row) => {
      console.log('===selection, row===', selection, row)
    },
    'selection-change': handleSelectionChange
  },

  // 页脚配置
  footer: {
    className: ['fr f-jsb mt-30'],
    show: true,
    //pageSizes: [], //每页显示条数
    layout: '', // 'total, sizes, prev, pager, next, jumper'
    pageAttrs: {
      'prev-text': '上一页',
      'next-text': '下一页'
    }
  }
})
