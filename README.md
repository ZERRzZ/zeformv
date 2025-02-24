# 简介

基于 element plus 的二次封装，使用 JSON 来配置表单，主打一个简便。

# 快速上手

```html
<ZeFormV :form="form" :items="items" @finish="handleFinish" />
```

```ts
const form = reactive<ZeForm>({
  labelWidth: '120px',
  model: {
    text: '',
    password: ''
  },
  rules: {
    text: [{ required: true, message: 'input 必填哦' }]
  }
})

const items = reactive<ZeFormItem[]>([
  { type: 'text', name: 'text', label: '用户名' },
  { type: 'password', name: 'password', label: '密码' },
  { type: 'submit', name: '提交' }
])

const handleFinish = () => {
  console.log(form.model)
}

const handleReset = () => {
  console.log('reset')
}
```

# API

## form

配置表单标签 `<Form>` ，属性值同 element plus。

## items

```ts
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
```

## @finish，@reset

配置 `type === 'submit'` `type === 'reset'` 时使用。

## ref 使用

```html
<ZeFromV ref="zeformv" />
```

```ts
const handleClick = () => {
  // 同原生的 ref
  console.log(zeformv.value?.zeform)
}
```

## 使用 slot 实现自定义 input 框 prepend

```html
<ZeFormV>
  <template #text-prepend>
    <el-button>prepend</el-button>
  </template>
</ZeFormV>
```

以上的插槽命名规则是表单项 `name` 加上插槽的作用位置名称。

其他的还有 `-append` `-header` `-footer`，在 `Element Plus` 中有用到插槽的地方这里都能这么用。

另一中是带有数据的插槽，像 `-select` `-treeSelect` `-cascader`，一般用于自定义列表项。

```html
<template #selectG-select="{ item }">
  <span>{{ item.label }}: {{ item.value }}</span>
</template>
```

# 表单项总览

```html
<ZeFormV
  ref="zeformv"
  :form="form"
  :items="items"
  @finish="handleFinish"
  @reset="handleReset"
>
  <template #selectG-select="{ item }">
    <span>{{ item.label }}: {{ item.value }}</span>
  </template>
  <template #treeSelect-treeSelect="{ item }">
    <span>{{ item.label }}: {{ item.value }}</span>
  </template>
  <template #cascader-cascader="{ item }">
    <span>{{ item.data.label }}: {{ item.data.value }}</span>
  </template>
</ZeFormV>
```

```ts
const zeformv = useTemplateRef<InstanceType<typeof ZeFormV>>('zeformv')

const options1 = [
  { label: 'option 1', value: '1' },
  { label: 'option 2', value: '2' },
  { label: 'option 3', value: '3' }
]

const options2 = [
  {
    label: 'group 1',
    options: [
      { label: 'option 1', value: '1' },
      { label: 'option 2', value: '2' }
    ]
  }
]

const options3 = [
  {
    label: 'level 1',
    value: '1',
    children: [
      { label: 'level 1-1', value: '1-1' },
      { label: 'level 1-2', value: '1-2' }
    ]
  }
]

const items = reactive<ZeFormItem[]>([
  {
    type: 'text',
    name: 'text',
    label: 'text',
    item: { style: { width: '50%' } },
    option: { prefixIcon: markRaw(Search) }
  },
  {
    type: 'password',
    name: 'password',
    label: 'password',
    item: { style: { width: '50%' } },
    option: { prefixIcon: markRaw(Lock) }
  },
  {
    type: 'textarea',
    name: 'textarea',
    label: 'textarea',
    option: { maxlength: 100 }
  },
  { type: 'number', name: 'number', label: 'number' },
  { type: 'radio', name: 'radio', label: 'radio', options: options1 },
  { type: 'radioB', name: 'radioB', label: 'radioB', options: options1 },
  { type: 'select', name: 'selectS', label: 'selectS', options: options1 },
  { type: 'select', name: 'selectG', label: 'selectG', options: options2 },
  { type: 'select', name: 'selectV', label: 'selectV', options: options2 },
  { type: 'checkbox', name: 'checkbox', label: 'checkbox', options: options1 },
  {
    type: 'checkboxA',
    name: 'checkboxA',
    label: 'checkboxA',
    options: options1
  },
  { type: 'switch', name: 'switch', label: 'switch' },
  {
    type: 'time',
    name: 'time',
    label: 'time',
    item: { style: { width: '50%' } },
    option: { isRange: true }
  },
  {
    type: 'date',
    name: 'date',
    label: 'date',
    item: { style: { width: '50%' } },
    option: { type: 'daterange' }
  },
  {
    type: 'treeSelect',
    name: 'treeSelect',
    label: 'treeSelect',
    option: { showCheckbox: true, multiple: true },
    options: options3
  },
  {
    type: 'cascader',
    name: 'cascader',
    label: 'cascader',
    option: { props: { multiple: true } },
    options: options3
  },
  { type: 'color', name: 'color', label: 'color' },
  { type: 'upload', name: 'upload', label: 'upload' },
  {
    type: 'button',
    name: '按钮',
    item: { style: { width: '80px' } },
    event: {
      click: () => {
        console.log(zeformv.value?.zeform)
      }
    }
  },
  {
    type: 'submit',
    name: '查询',
    item: { style: { width: '100px' } }
  },
  {
    type: 'reset',
    name: '重置',
    item: { style: { width: '100px' } }
  }
])

const handleFinish = () => {
  console.log(form.model)
}

const handleReset = () => {
  console.log('reset')
}
```
