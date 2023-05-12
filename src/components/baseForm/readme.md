## <center>baseForm 表单组件使用说明</center>

> 提供了表单的配置式编写方式，只需要编写配置文件，即可生成对应的表单，包含了表单验证，表单格式化，表单反格式化，表单事件等功能

### 特点

- **灵活的插槽** 包含表单内插槽和表单外插槽，样式布局都具有极大的灵活性
- **内置多种组件**，包含大部分**element-plus**表单组件，并统一子组件事件回调出口，方便时间分发和处理
- **表单验证** 可配置自定义表单验证规则，支持自定义验证函数
- **格式化** 支持自定义提交时格式化函数和回显时反格式化函数，轻松处理数据转换

[配置示例](../../../src/views/my-template/config/search.config.js)

### 配置项

| 配置项               |         描述         |  类型  | 必填 | 默认值 |
| :------------------- | :------------------: | :----: | :--: | :----: |
| **formItems**        |        表单项        |  数组  |  否  |   []   |
| **formAttr**         | el-form 上绑定的属性 |  对象  |  否  |   {}   |
| **cusName**          |   自定义 form 名称   | 字符串 |  是  |   -    |
| **formInjectionKey** | 注入子组件使用的 key | 字符串 |  是  |   -    |
| **showBtn**          |     显示底部按钮     | 布尔值 |  否  | false  |
| **divNode**          |  全局 item 节点样式  |  数组  |  否  |   {}   |
| **includeKeys**      | 回显时包含的额外字段 |  数组  |  否  |   []   |
| **disabled**         |     是否禁用表单     | 布尔值 |  否  | false  |

> 以下是具体配置项

#### formItems

| formItem      |        描述         |   类型    | 必填 | 默认值 |
| :------------ | :-----------------: | :-------: | :--: | :----: |
| **field**     |      字段名称       |  字符串   |  是  |   -    |
| **type**      |     item 的类型     |  字符串   |  是  |   -    |
| **itemsAttr** | formItem 绑定的属性 |   对象    |  否  |   {}   |
| **slotAttr**  |   组件绑定的属性    |   对象    |  否  |   {}   |
| **default**   |       默认值        |    any    |  否  | false  |
| **children**  |    子组件的配置     | formItems |  否  |   {}   |
| **divNode**   |    item 节点样式    |   对象    |  否  |   {}   |
| **disabled**  |   是否禁用表单项    |  布尔值   |  否  | false  |

> type 类型包括：

- "input"
- "color-picker"
- "checkbox"
- "autocomplete"
- "date-picker"
- "input-number"
- "radio-group"
- "radio"
- "rate"
- "select"
- "option"
- "slider"
- "switch"
- "time-picker"
- "time-select"
- "transfer"

#### formAttr

具体见 **element-plus** [表格属性](https://element-plus.gitee.io/zh-CN/component/form.html#form-attributes)

#### cusName

> 表单名称，当同一个页面内有多个表单时，可以通过配置该字段来区分不同的表单事件回调

#### formInjectionKey

> 表单注入子组件使用的 key

#### showBtn

> 是否显示表单确认和取消按钮

#### divNode

> 全局的表单项节点样式配置，可在每个 formItem 单独配置
