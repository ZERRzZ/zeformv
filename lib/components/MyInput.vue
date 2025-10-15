<script setup lang="ts">
import { getCurrentInstance, h } from 'vue'
import type { ComponentInstance } from 'vue'
import { ElInput } from 'element-plus'

/**
 * 属性
 * 事件
 * 插槽
 * 方法
 * 类型
 */

const vm = getCurrentInstance()

/* eslint-disable @typescript-eslint/no-explicit-any */
const changeRef = (exposed: Record<string, any> | null) =>
  vm && (vm.exposed = exposed)

defineExpose({} as ComponentInstance<typeof ElInput>)
</script>

<template>
  <div>
    <h1>自定义 Input</h1>
    <component :is="h(ElInput, { ...$attrs, ref: changeRef }, $slots)" />
  </div>
</template>

<style scoped lang="css"></style>
