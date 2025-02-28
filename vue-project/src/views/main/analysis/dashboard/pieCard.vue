<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <slot name="header"></slot>
      </div>
    </template>
    <div class="pie_content" style="width: 100%; height: 300px" ref="chartRef"></div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue"
import * as echarts from "echarts"
const chartRef = ref(null)
const props = defineProps(["option"])

onMounted(() => {
  const myChart = echarts.init(chartRef.value)
  myChart.setOption(props.option)
})
</script>

<style lang="less" scoped>
.card-header {
  font-size: 18px;
}
</style>
