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
    disabled: false,
    btnLayout  按钮的布局
    events: [] //特定插槽绑定的事件，具体参考el-plus的各个组件事件
    parse: ''
    fomatter: ''
  }

formAttr 表单属性,（除了ref 和 model外，其他均可配置）具体https://element-plus.gitee.io/zh-CN/component/form.html#form-%E5%B1%9E%E6%80%A7
itemStyle   表单子项的统一样式，绑定到formItem的style上，也可以在formItems中单独配置
colLayout: 统一 布局配置
modalAttr
injectionKey: 'formINjectionKey'  //依赖注入的key
}
******/

// 弹窗配置
export const getModalConfig = () => ({
  // 字段配置
  formItems: [
    {
      field: 'searchKeyword',
      type: 'input', // input,radio,datepicker,switch,select, slot, outSide-slot,'password', 'text', 'textarea'
      // isHidden:false,

      // 绑定到formItem的属性
      itemsAttr: {
        label: '监控账号:',
        rules: [{ required: true, message: '请输入监控账号', trigger: 'blur' }],
        required: true
      },
      // 绑定到input的属性
      slotAttr: {
        placeholder: '抖音号码/抖音首页地址',
        style: {
          width: '350px'
        }
      }
    },
    {
      field: 'enableWarn',
      type: 'switch',
      default: true,
      itemsAttr: {
        label: '开启预警:',
        rules: []
      },
      slotAttr: {
        'active-text': '开启',
        'inactive-text': '关闭'
      }
    },
    {
      field: 'source',
      type: 'input',
      itemsAttr: {
        label: '订单来源:',
        rules: []
      },
      slotAttr: {
        placeholder: '请输入订单来源',
        style: {
          width: '350px'
        }
      }
    },
    {
      field: 'number',
      type: 'input',
      itemsAttr: {
        label: '订单数量:',
        rules: []
      },
      slotAttr: {
        placeholder: '请输入订单数量',
        style: {
          width: '350px'
        }
      }
    },
    {
      field: 'price',
      type: 'slot',
      itemsAttr: {
        label: '订单单价:',
        rules: []
      },
      slotAttr: {
        placeholder: '请输入订单单价',
        style: {
          width: '350px'
        }
      }
    },
    {
      field: 'payAmount',
      type: 'slot',
      itemsAttr: {
        label: '收款金额:',
        rules: []
      },
      slotAttr: {
        placeholder: '请输入收款金额',
        style: {
          width: '350px'
        }
      }
    },
    {
      field: 'remark',
      type: 'input',
      itemsAttr: {
        label: '备注:',
        rules: []
      },
      slotAttr: {
        placeholder: '请输入备注',
        style: {
          width: '350px'
        }
      }
    }
  ],
  //
  formAttr: {
    labelWidth: '120px'
  },
  // 弹窗配置
  modalAttr: {
    width: '550px',
    center: true,
    destroyOnClose: true
  },
  // 统一 布局配置
  colLayout: {
    span: 24
  }
})
