## baseForm 表单组件使用说明

配置说明

```ts
const form = {
  formItems:[
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
    itemsAttr //formItem的属性 label rules required
    slotAttr  //slot的属性  input radio datepicker switch select 的属性，除了双向绑定值外，都可以配置
    optoons //select radio时必填，为其选项
    colLayout  //单项的布局配置,
    btnLayout  //按钮的布局
  }
  ]


formAttr //表单属性,（除了ref 和 model外，其他均可配置）具体https://element-plus.gitee.io/zh-CN/component/form.html#form-%E5%B1%9E%E6%80%A7
itemStyle   //表单子项的统一样式，绑定到formItem的style上，也可以在formItems中单独配置
colLayout:// 统一 布局配置

}
```
