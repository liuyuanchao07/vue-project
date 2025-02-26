<template>
  <el-dialog center width="400" title="新建用户" v-model="modelState">
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineExpose, ref } from "vue"

const modelState = ref(false)

const changeModelState = () => {
  modelState.value = true
}

defineExpose({
  changeModelState,
})
</script>

<style lang="less" scoped>
:global(.el-dialog__header.show-close) {
  padding-right: 0;
}
</style>
