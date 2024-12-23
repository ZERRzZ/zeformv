<script setup lang="ts">
import { markRaw, reactive, useTemplateRef } from 'vue'
import { Lock, Search } from '@element-plus/icons-vue'

import { ZeForm, ZeFormItem, ZeFormV } from '../lib'

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

const form = reactive<ZeForm>({
  labelWidth: '120px',
  inline: false,
  model: {
    text: '',
    password: '',
    textarea: '',
    number: 0,
    radio: '1',
    radioB: '2',
    selectS: '1',
    selectG: '2',
    selectV: '1',
    checkbox: [],
    checkboxA: [],
    switch: false,
    time: [],
    date: [],
    treeSelect: '',
    cascader: '',
    color: '',
    upload: []
  },
  rules: {
    text: [{ required: true, message: 'input 必填哦' }]
  }
})

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
</script>

<template>
  <div class="box">
    <span class="title">表单项总览</span>
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
  </div>
</template>

<style scoped>
.box {
  width: 1000px;
  display: flex;
  flex-flow: column;
  gap: 1em;

  .title {
    font-weight: 800;
  }
}
</style>
