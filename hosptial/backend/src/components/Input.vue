<template>
  <el-input
    v-model="input"
    :type="props.type"
    :placeholder="props.placeholder"
    @input="changeInput($event)"
  >
    <template #prefix v-if="props.iconPosition === 'prefix'">
      <el-icon><component :is="icon" /></el-icon>
    </template>
    <template #suffix v-if="props.iconPosition === 'suffix'">
      <el-icon><component :is="icon" /></el-icon>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, ref } from "vue";
const props = defineProps([
  "placeholder",
  "icon",
  "type",
  "modelValue",
  "iconPosition",
]);
const emit = defineEmits(["update:modelValue"]);
const input = ref<string>("");

watch(
  () => props.modelValue,
  (val) => {
    input.value = val;
  },
  {
    immediate: true,
    deep: true,
  }
);
const changeInput = () => {
  emit("update:modelValue", input.value);
};
</script>
