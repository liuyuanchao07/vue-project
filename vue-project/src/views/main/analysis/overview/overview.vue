<template>
  <div class="home">
    <h2 ref="title">{{ num }}</h2>
    <button @click="hanlechange">click</button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue"
let title = ref<HTMLElement>()
let num = ref(0)

onMounted(() => {
  // console.log(title)
})

const hanlechange = () => {
  num.value++

  nextTick(() => {
    console.log(title.value.innerHTML)
  })
}
</script>

<style lang="less" scoped>
.home {
}
</style>
