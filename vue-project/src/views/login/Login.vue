<template>
  <div class="home">
    <h2>home{{ counterStore.counter }}-{{ counterStore.doubleCounter }}</h2>
    <button @click="addCouter">click</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from "../../store/counter"
const counterStore = useCounterStore()

const addCouter = () => {
  counterStore.changeCounterAction(123)
}
</script>

<style lang="less" scoped>
.home {
}
</style>
