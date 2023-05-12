/*******
配置说明
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
        insideSlot: [
          {
            slot: 'append',
            value: '搜索'
          }
        ]
      }
    },
    {
      field: 'like',
      type: 'radio-group',
      itemsAttr: {
        label: '抖音号',
        labelWidth: '90',
        rules: []
      },
      divNode: { class: 'fc ' },
      default: '抖音号',
      slotAttr: {
        placeholder: '请输入抖音号'
      },
      children: [
        {
          type: 'radio-button',
          slotAttr: {
            label: '抖音号'
          }
        },

        {
          type: 'radio-button',
          slotAttr: {
            label: '快手号'
          },
          events: {
            change: () => {}
          }
        }
      ]
    },
    {
      field: 'createTime',
      type: 'date-picker',
      itemsAttr: {
        label: '',
        labelWidth: '30',
        rules: []
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
    'validate-on-rule-change': false
  },
  cusName: 'searchForm',
  formInjectionKey: 'formInjectionKey',
  showBtn: true
})
