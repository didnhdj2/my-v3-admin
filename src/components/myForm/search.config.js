/*******
配置说明
{
  formItems:[]
  {
    field: prop的名称 slot名称
    type:
    - input： 'password', 'text', 'textarea'
    - radio,
    - datepicker,
    - switch,
    - select,
    - slot,
    - outSide-slot
    isHidden
    itemsAttr formItem的属性 label rules required
    slotAttr  slot的属性  input radio datepicker switch select 的属性，除了双向绑定值外，都可以配置
    optoons select radio时必填，为其选项
    colLayout  单项的布局配置,
    btnLayout  按钮的布局
  }

formAttr 表单属性,（除了ref 和 model外，其他均可配置）具体https://element-plus.gitee.io/zh-CN/component/form.html#form-%E5%B1%9E%E6%80%A7
itemStyle   表单子项的统一样式，绑定到formItem的style上，也可以在formItems中单独配置
colLayout: 统一 布局配置
}
******/

// 顶部搜索栏配置
export const getSearchConfig = () => ({
  formItems: [
    {
      field: 'path',
      type: 'input',
      itemsAttr: {
        label: '筛选搜索',
        labelWidth: '90',
        rules: []
      },
      slotAttr: {
        placeHolder: '请输入目录',
        size: 'default'
      }
    },
    {
      field: 'isShow',
      type: 'select',
      itemsAttr: {
        label: '',
        labelWidth: '30',
        rules: []
      },
      slotAttr: {
        placeHolder: '选择显示状态',
        size: 'default'
      },
      options: [
        { label: '全部', value: '' },
        { label: '显示', value: 1 },
        { label: '不显示', value: 0 }
      ]
    },
    {
      field: 'pan',
      type: 'select',
      itemsAttr: {
        label: '',
        labelWidth: '30',
        rules: []
      },
      slotAttr: {
        placeHolder: '选择网盘',
        size: 'default'
      },
      options: [
        { label: '菊次郎慕雁', value: '菊次郎慕雁' },
        { label: '我想学python', value: '我想学python' },
        { label: '如烟', value: '如烟' },
        { label: '慕雪', value: '慕雪' }
      ]
    }
  ],
  formAttr: {
    labelWidth: '100px',
    size: 'default'
  },
  // itemStyle: {},
  colLayout: {
    xl: 4, // ≥1920px
    lg: 4, // ≥1200px
    md: 4, // ≥992px
    sm: 12, // ≥768px
    xs: 24
  }
})
