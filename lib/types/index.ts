import { FormProps, FormItemProps } from 'element-plus'

/**
 * 表单配置
 */
export type ZeForm = Partial<FormProps> & { model: any }

/**
 * 表单项配置
 * @param type 类型
 * @param name 既是表单 name，prop，也是按钮 innerHTML
 * @param label 标签名
 * @param item 在 el-form-item 上的属性
 * @param option 在表单控件上的属性
 * @param event 在表单控件上的事件
 * @param options 表单控件的值集合，在特殊控件中使用
 */
export interface ZeFormItem {
  type: ZeFormTypes
  name: string
  label?: string
  item?: Partial<FormItemProps> & { style?: Partial<CSSStyleDeclaration> }
  option?: any
  event?: any
  options?: any[]
}

/**
 * 表单类型
 */
export type ZeFormTypes =
  | 'text'
  | 'password'
  | 'textarea'
  | 'number'
  | 'radio'
  | 'radioB'
  | 'select'
  | 'selectV'
  | 'checkbox'
  | 'checkboxA'
  | 'switch'
  | 'time'
  | 'date'
  | 'treeSelect'
  | 'cascader'
  | 'color'
  | 'upload'
  | 'button'
  | 'submit'
  | 'reset'
  | 'custom'
