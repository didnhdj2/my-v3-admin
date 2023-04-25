


interface IformItems{
  field: string,
  type:"input" | "color-picker"|"cascader"|"checkbox"|"cascader-panel"|"autocomplete"|"date-picker"|"input-number"|"radio-group"|"radio"|"rate"|"select"|"option"|"select-v2"|"slider"|"switch"|"time-picker"|"time-select"|"transfer"|"upload"
  itemsAttr: ItemsAttr

}
type Isize = 'left' | 'right' | 'top'

interface IformAttr<T>{
model:object
rules?:T[]
inline?:boolean
labelPosition?:Isize
labelWidth?:string|number
labelSuffix?:string
hideRequiredAsterisk?:boolean
requireAsteriskPosition?:boolean
showMessage?:boolean
inlineMessage?:boolean
statusIcon?:boolean
validateOnRuleChange?:boolean
size?:Isize
disabled?:boolean
scrollToError?:boolean
scrollIntoViewOptions?: object| boolean
}

interface IslotAttr {
  placeholder?: string
  style?: object
  disabled?: boolean
}

interface ItemsAttr{
  prop:string
  label?:string
  labelWidth?:string|number
  required?:boolean
  rules?: object
  error?:string
  showMessage?:boolean
  inlineMessage?:boolean
  size?:Isize
  for?:string
  validateStatus?:'' | 'error' | 'validating' | 'success'
}
interface Iform <T>{
  formItems: IformItems[]
  formAttr: IformAttr<T>

}


