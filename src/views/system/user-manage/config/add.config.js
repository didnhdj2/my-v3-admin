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
      field: 'username',
      type: 'input', // input,radio,datepicker,switch,select, slot, outSide-slot,'password', 'text', 'textarea'
      // isHidden:false,

      // 绑定到formItem的属性
      itemsAttr: {
        label: '账号:',
        rules: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        required: true
      },
      // 绑定到input的属性
      slotAttr: {
        placeholder: '请输入账号',
        style: {
          width: '350px'
        }
      }
    },
    {
      field: 'password',
      type: 'input',
      itemsAttr: {
        label: '密码:',
        rules: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        required: true
      },
      slotAttr: {
        placeholder: '请输入密码',
        style: {
          width: '350px'
        }
      }
    },
    {
      field: 'state',
      type: 'switch',
      default: 'normal',
      itemsAttr: {
        label: '开启预警:',
        rules: [],
        required: true
      },
      slotAttr: {
        'active-text': '正常',
        'active-value': 'normal',
        'inactive-text': '冻结',
        'inactive-value': 'freeze'
      }
    },
    {
      field: 'rebate',
      type: 'input',
      append: '%',
      default: 0,
      itemsAttr: {
        label: '返点百分比:',
        rules: []
      },
      slotAttr: {
        placeholder: '请输入返点百分比',
        style: {
          width: '350px'
        }
      }
    },
    {
      field: 'roleIds',
      type: 'select',
      itemsAttr: {
        label: '角色列表:',
        rules: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        required: true
      },
      slotAttr: {
        placeholder: '请输入订单数量',
        multiple: true,
        style: {
          width: '350px'
        }
      },
      options: []
    },
    {
      field: 'expireTime',
      type: 'datepicker',
      itemsAttr: {
        label: '有效期:',
        rules: [{ required: true, message: '请选择有效日期', trigger: 'blur' }],
        required: true
      },
      slotAttr: {
        placeholder: '请选择有效日期',
        'value-format': 'YYYY-MM-DD HH:mm:ss',
        type: 'date',
        style: {
          width: '350px'
        }
      }
    },
    {
      field: 'bossId',
      type: 'input',
      itemsAttr: {
        label: '上级id:',
        rules: []
      },
      slotAttr: {
        placeholder: '请输入上级id',
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
