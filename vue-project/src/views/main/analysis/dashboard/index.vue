<template>
  <div class="dashboard">
    <div class="dashboard_statistic">
      <el-row :gutter="12">
        <el-col :span="6" v-for="(item, index) in statisticData" :key="index">
          <StatisticCard :item="item" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getStatisticData } from "@/service/request"
import StatisticCard from "@/views/main/analysis/dashboard/statisticCard.vue"
const statisticData = ref([])

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

<style lang="less" scoped></style>
