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
modalAttr
}
******/

// 弹窗配置
export const getModalConfig = () => ({
  // 字段配置
  formItems: [
    {
      field: 'name',
      type: 'input', // input,radio,datepicker,switch,select, slot, outSide-slot,'password', 'text', 'textarea'
      // isHidden:false,

      // 绑定到formItem的属性
      itemsAttr: {
        label: '机构名称:',
        rules: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        required: true
      },
      // 绑定到input的属性
      slotAttr: {
        maxlength: 30,
        'show-word-limit': true, // 显示字数限制
        // style: 'width:70%',
        placeHolder: '建议不超过15个字，最多输入30个字'
      }
    },
    {
      field: 'hotline',
      type: 'input',
      itemsAttr: {
        label: '客服热线:',
        placeHolder: '请输入客服热线',
        rules: [{ required: true, message: '请输入客服热线', trigger: 'blur' }],
        required: true,
        maxlength: 11,
        'show-word-limit': true // 显示字数限制
        // style: 'width:70%'
      }
    },
    {
      field: 'logo',
      type: 'slot',
      itemsAttr: {
        label: '机构logo:',
        rules: [{ required: true, message: '请选择logo图片', trigger: 'blur' }]
      }
    },
    {
      field: 'introduction',
      type: 'slot',
      itemsAttr: {
        label: '机构简介:',
        rules: [{ required: true, message: '请选择logo图片', trigger: 'blur' }]
      }
    },
    {
      field: 'title',
      type: 'outSide-slot'
    },
    {
      field: 'enableComment',
      type: 'radio',
      itemsAttr: {
        label: '评论审核设置:',
        placeHolder: '',
        rules: [],
        style: 'text-align:left;'
      },
      options: [
        { label: '开启', value: true },
        { label: '关闭', value: false }
      ]
    },
    {
      field: 'cancelTime',
      type: 'slot',
      itemsAttr: {
        label: '自动取消订单时间:'
      }
    },
    {
      field: 'btn',
      type: 'submit'
    }
  ],
  //
  formAttr: {
    labelWidth: '120px'
  },
  itemStyle: {
    'text-align': 'left'
  },
  // 弹窗配置
  modalAttr: {
    width: '30%',
    center: true,
    destroyOnClose: true
  },
  // 统一 布局配置
  colLayout: {
    span: 24
  }
})
