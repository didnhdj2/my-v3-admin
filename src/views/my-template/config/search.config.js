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
      field: 'likeUnionId',
      type: 'input',
      itemsAttr: {
        label: '抖音号',
        labelWidth: '90',
        rules: []
      },
      slotAttr: {
        placeholder: '请输入抖音号',
        size: 'default'
      }
    },
    {
      field: 'createTime',
      type: 'datepicker',
      itemsAttr: {
        label: '',
        labelWidth: '30',
        rules: []
      },
      colLayout: {
        xl: 6, // ≥1920px
        lg: 9, // ≥1200px
        md: 12, // ≥992px
        sm: 24, // ≥768px
        xs: 24
      },
      slotAttr: {
        type: 'daterange',
        'range-separator': '至',
        'start-placeholder': '请选择',
        'end-placeholder': '请选择',
        'value-format': 'YYYY-MM-DD HH:mm:ss'
      }
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
    md: 6, // ≥992px
    sm: 24, // ≥768px
    xs: 24 //
  },
  cusName: 'searchForm',
  cusName: 'formINjectionKey'
})
