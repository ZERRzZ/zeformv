<script setup lang="ts">
import { computed, ref, unref } from 'vue'

const { options } = defineProps<{
  option: any
  event: any
  options: any[]
}>()

const value = defineModel<string[]>()

const checkAll = ref(false)

const isIndeterminate = ref(false)

const ableOptions = computed(() => options.filter(o => !o.disabled))

const handleCheckAllChange = (val: boolean) => {
  value.value = val ? unref(ableOptions).map(o => o.value) : []
  isIndeterminate.value = false
}

const handleCheckChange = (val: string[]) => {
  checkAll.value = val.length === unref(ableOptions).length
  isIndeterminate.value =
    val.length > 0 && val.length < unref(ableOptions).length
  value.value = val
}
</script>

<template>
  <div class="checkbox-all">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      v-bind="option"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>
    <el-checkbox-group
      v-model="value"
      @change="handleCheckChange"
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
  </div>
</template>

<style scoped>
.checkbox-all {
  display: flex;
  align-items: center;
}

.el-checkbox:first-of-type {
  margin-right: 1em;
}
</style>
