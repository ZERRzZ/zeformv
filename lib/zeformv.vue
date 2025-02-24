<script setup lang="ts">
import { unref, useTemplateRef } from 'vue'
import { FormInstance } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'

import { ZeForm, ZeFormItem } from './types'
import CheckboxAll from './components/CheckboxAll.vue'

defineProps<{
  form: ZeForm
  items: ZeFormItem[]
}>()

const emit = defineEmits<{
  finish: []
  reset: []
}>()

const zeform = useTemplateRef<FormInstance>('zeform')

const handleSubmit = async () => {
  unref(zeform)
    ?.validate()
    .then(() => emit('finish'))
    .catch()
}

const handleReset = () => {
  unref(zeform)?.resetFields()
  emit('reset')
}

defineExpose({
  zeform
})
</script>

<template>
  <el-form ref="zeform" v-bind="form" :class="{ layout: !form.inline }">
    <el-form-item
      v-for="{ type, name, label, item, option, event = {}, options } in items"
      :key="name"
      :prop="name"
      :label="label"
      v-bind="item"
    >
      <el-input
        v-if="type === 'text' || type === 'password' || type === 'textarea'"
        clearable
        show-word-limit
        placeholder="请输入"
        :type="type"
        :rows="5"
        :show-password="type === 'password'"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      >
        <template v-slot:prepend>
          <slot :name="`${name}-prepend`" />
        </template>
        <template v-slot:append>
          <slot :name="`${name}-append`" />
        </template>
      </el-input>
      <el-input-number
        v-else-if="type === 'number'"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      />
      <el-radio-group
        v-else-if="type === 'radio' || type === 'radioB'"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      >
        <component
          v-for="{ value, label, ...o } in options"
          :is="type === 'radio' ? 'el-radio' : 'el-radio-button'"
          :key="value"
          :value="value"
          v-bind="o"
        >
          {{ label }}
        </component>
      </el-radio-group>
      <component
        v-else-if="type === 'select' || type === 'selectV'"
        :is="type === 'select' ? 'el-select' : 'el-select-v2'"
        clearable
        filterable
        placeholder="请选择"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      >
        <template #header>
          <slot :name="`${name}-header`"></slot>
        </template>
        <template v-for="{ label, value, ...o } in options">
          <el-option-group v-if="o.options" :key="label" :label="label">
            <el-option
              v-for="{ value, label, ...oo } in o.options"
              :key="value"
              :label="label"
              :value="value"
              v-bind="oo"
            >
              <slot :name="`${name}-select`" :item="{ value, label, ...oo }" />
            </el-option>
          </el-option-group>
          <el-option
            v-else
            :key="value"
            :label="label"
            :value="value"
            v-bind="o"
          >
            <slot :name="`${name}-select`" :item="{ label, value, ...o }" />
          </el-option>
        </template>
        <template #footer>
          <slot :name="`${name}-footer`"></slot>
        </template>
      </component>
      <el-checkbox-group
        v-else-if="type === 'checkbox'"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      >
        <el-checkbox
          v-for="{ value, label, ...o } in options"
          :key="value"
          :value="value"
          v-bind="o"
        >
          {{ label }}
        </el-checkbox>
      </el-checkbox-group>
      <CheckboxAll
        v-if="type === 'checkboxA'"
        v-model="form.model[name]"
        :option="option"
        :event="event"
        :options="options || []"
      />
      <el-switch
        v-else-if="type === 'switch'"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      />
      <el-time-picker
        v-else-if="type === 'time'"
        placeholder="请选择时间"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      />
      <el-date-picker
        v-else-if="type === 'date'"
        placeholder="请选择日期"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      />
      <el-tree-select
        v-else-if="type === 'treeSelect'"
        clearable
        filterable
        placeholder="请选择"
        :data="options"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      >
        <template #default="{ data }">
          <slot :name="`${name}-treeSelect`" :item="data"></slot>
        </template>
      </el-tree-select>
      <el-cascader
        v-else-if="type === 'cascader'"
        clearable
        filterable
        style="width: 100%"
        placeholder="请选择"
        :options="options"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      >
        <template #default="{ node, data }">
          <slot :name="`${name}-cascader`" :item="{ node, data }">
            <span>{{ data.label }}</span>
            <span v-if="!node.isLeaf">({{ data.children.length }})</span>
          </slot>
        </template>
      </el-cascader>
      <el-color-picker
        v-else-if="type === 'color'"
        v-model="form.model[name]"
        v-bind="option"
        v-on="event"
      />
      <el-upload
        v-else-if="type === 'upload'"
        :action="option?.action || ''"
        v-model:file-list="form.model[name]"
        v-bind="option"
        v-on="event"
      >
        <slot :name="`${name}-upload`">
          <div class="upload-content">
            <el-button type="primary">点击上传</el-button>
            <i
              v-if="form.model[name]"
              class="el-icon-success"
              style="color: lightgreen"
            />
          </div>
        </slot>
      </el-upload>
      <el-button
        v-else-if="type === 'button'"
        type="primary"
        v-bind="option"
        v-on="event"
      >
        {{ name }}
      </el-button>
      <el-button
        v-else-if="type === 'submit'"
        type="primary"
        :icon="Search"
        @click="handleSubmit"
        v-bind="option"
        v-on="event"
      >
        {{ name }}
      </el-button>
      <el-button
        v-else-if="type === 'reset'"
        :icon="Refresh"
        @click="handleReset"
        v-bind="option"
        v-on="event"
      >
        {{ name }}
      </el-button>
      <slot v-else-if="type === 'custom'" :name="`${name}-custom`"></slot>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.layout {
  display: flex;
  flex-flow: row wrap;
}

.layout > .el-form-item {
  width: 100%;
}
</style>

<style>
/* 无内容的不显示 */
.el-input-group__append:empty,
.el-input-group__prepend:empty,
.el-select-dropdown__header:empty,
.el-select-dropdown__footer:empty {
  display: none;
}
</style>
