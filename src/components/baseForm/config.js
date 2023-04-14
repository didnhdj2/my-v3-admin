export const formConfig = () => ({
  formItems: [
    {
      itemsAttr: {},
      colLayout: {},
      type: '', //组件类型
      field: '', //字段名
      divNode: '',
      itemsAttr: {},
      slotAttr: {},
      isHidden: false,
      default: '', //默认值
      options: [
        {
          label: '',
          value: ''
        }
      ],
      events: [] //特定插槽绑定的事件，具体参考el-plus的各个组件事件
    }
  ],
  formAttr: {},
  divNode: {},
  colLayout: {},
  injectionKey: 'formINjectionKey' //依赖注入的key
})
