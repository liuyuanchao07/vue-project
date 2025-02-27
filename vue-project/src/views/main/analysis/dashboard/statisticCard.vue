<template>
  <el-card>
    <div class="dashboard_header">
      {{ props.item.title
      }}<el-tooltip :content="props.item.tooltip" placement="top" effect="light"
        ><el-icon><Warning /></el-icon
      ></el-tooltip>
    </div>
    <div class="dashboard_content">
      <el-statistic :value="outputValueNumber1" />
    </div>
    <div class="dashboard_footer">
      <div class="dashboard_footer_left">
        {{ props.item.subTitle }}
      </div>
      <div class="dashboard_footer_right">
        <el-statistic :value="outputValueNumber2" />
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue"
import { useTransition } from "@vueuse/core"
const props = defineProps(["item"])

const number1 = ref(0)
const number2 = ref(0)
const outputValueNumber1 = useTransition(number1, {
  duration: 1500,
})
const outputValueNumber2 = useTransition(number2, {
  duration: 1500,
})
number1.value = props.item.number2
number2.value = props.item.number2
</script>

<style lang="less" scoped>
.dashboard {
  &_header {
    height: 28px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    color: rgba(0, 0, 0, 0.45);
  }

  &_content {
    font-size: 26px;
    height: 56px;
    display: flex;
    align-items: flex-end;
    padding-bottom: 5px;
  }

  &_footer {
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;

    :deep(.el-statistic__content) {
      font-size: 15px;
    }
  }
}
</style>
