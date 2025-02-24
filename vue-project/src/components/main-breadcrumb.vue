<template>
  <div class="breadcrumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="item.url" v-for="(item, index) in props.breadcrumb" :key="index">{{
        item.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue"
import { defineProps } from "vue"
const props = defineProps(["breadcrumb"])
</script>

<style lang="less" scoped>
.el-breadcrumb {
  font-size: 12px;
}
</style>
