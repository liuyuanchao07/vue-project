<template>
  <div class="dashboard">
    <div class="dashboard_statistic">
      <el-row :gutter="12">
        <el-col :span="6" v-for="(item, index) in statisticData" :key="index">
          <StatisticCard :item="item" />
        </el-col>
      </el-row>
    </div>
    <div class="dashboard_echart">
      <el-row :gutter="12">
        <el-col :span="7">
          <PieCard :option="optionPie">
            <template #header>分类商品数量(饼图)</template>
          </PieCard>
        </el-col>
        <el-col :span="10"
          ><PieCard :option="optionColumnar">
            <template #header>不同城市的商品销量</template>
          </PieCard>
        </el-col>
        <el-col :span="7">
          <PieCard :option="optionRose">
            <template #header>分类商品数量(玫瑰图)</template>
          </PieCard>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getStatisticData } from "@/service/request"
import type { EChartsOption } from "echart"
import StatisticCard from "@/views/main/analysis/dashboard/statisticCard.vue"
import PieCard from "@/views/main/analysis/dashboard/pieCard.vue"
const statisticData = ref([])

const optionPie: EChartsOption = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "horizontal",
    left: "left",
    itemWidth: 20,
    itemHeight: 10,
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "60%",
      data: [
        { value: 1048, name: "衣服" },
        { value: 735, name: "裤子" },
        { value: 580, name: "鞋子" },
        { value: 484, name: "家具" },
        { value: 300, name: "床品" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
}

const optionRose: EChartsOption = {
  legend: {
    top: "bottom",
  },
  legend: {
    orient: "horizontal",
    left: "left",
    itemWidth: 20,
    itemHeight: 10,
  },
  series: [
    {
      name: "Nightingale Chart",
      type: "pie",
      radius: "55%",
      roseType: "area",
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: 40, name: "衣服" },
        { value: 38, name: "裤子" },
        { value: 32, name: "鞋子" },
        { value: 30, name: "家具" },
        { value: 28, name: "床品" },
      ],
    },
  ],
}

const optionColumnar: EChartsOption = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ["city", "2022", "2023", "2024"],
      ["大连", 43.3, 85.8, 93.7],
      ["沈阳", 83.1, 73.4, 55.1],
      ["武汉", 86.4, 65.2, 82.5],
      ["成都", 72.4, 53.9, 39.1],
    ],
  },
  xAxis: { type: "category" },
  yAxis: {},
  series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
}

onMounted(() => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  })
  getStatisticData().then((res) => {
    statisticData.value = res.data.data
    loading.close()
  })
})
</script>

<style lang="less" scoped>
.dashboard_echart {
  margin-top: 20px;
}

.card-header {
  font-size: 18px;
}
</style>
