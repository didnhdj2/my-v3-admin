// 表格配置
/*******
tableItems:[] {Array} 表头配置
需要特殊处理的slot,formatter配置将不起作用
import
 ******/
import { h } from 'vue'
export const getTableConfig = ({ remove }) => ({
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
      visible: true,
      editable: true,
      editItem: {}
    },
    {
      label: '初始粉丝数',
      prop: 'oldFansNum',
      align: 'left',
      minWidth: '140',
      class: '',
      visible: true,
      editable: true,
      editItem: {
        type: 'input',
        formatter: (val) => val * 10,
        parser: (val) => val / 10
      }
    },
    {
      label: '当前粉丝数',
      prop: 'currentFansNum',
      align: 'left',
      // width: '80',
      minWidth: '140',
      class: '',
      visible: true,
      editable: true,
      editItem: {
        type: 'select',
        attrs: {},
        children: [
          {
            type: 'option',
            attrs: {
              label: 'item.label',
              value: 'item.value'
            },
            disabled: false
          }
        ]
      }
    }
  ],
  // 表格属性 所有el-table的属性都可以配置
  tableAttr: {
    border: true,
    'show-header': true
  },
  tableMethod: {},
  editableLine: true,
  btnSlot: {
    item: {
      label: '操作2',
      align: 'center',
      width: '160',
      minWidth: '80',
      class: '',
      fixed: 'right'
    },
    btnArr: [
      {
        attr: {
          btnText: '删除',
          type: 'danger',
          class: 'ml-6'
        },
        onClick: remove
      }
    ]
  },
  paginationConfig: {
    'page-sizes': [10, 20, 50, 100],
    small: 'small',
    background: true,
    layout: 'total, sizes, prev, pager, next, jumper'
  }
})
