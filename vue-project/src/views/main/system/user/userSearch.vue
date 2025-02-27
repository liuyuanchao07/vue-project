<template>
  <el-card class="search">
    <el-form :model="userForm" ref="userFormRef" label-width="80px">
      <el-row :gutter="80">
        <template v-for="item in props.searchConfig.formItems" :key="item.name">
          <template v-if="item.type === 'input'">
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.name">
                <el-input v-model.trim="userForm[item.prop]" :placeholder="item.placeholder" />
              </el-form-item>
            </el-col>
          </template>
          <template v-if="item.type === 'select'">
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.name">
                <el-select v-model="userForm[item.prop]" :placeholder="item.placeholder">
                  <el-option
                    :key="option.value"
                    v-for="option in item.options"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </template>
          <template v-if="item.type === 'date-picker'">
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.name">
                <el-date-picker
                  v-model="userForm[item.prop]"
                  type="daterange"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </el-col>
          </template>
        </template>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="24">
          <el-form-item>
            <div class="search_button_group">
              <el-button icon="Refresh" @click="resetForm(userFormRef)">重置</el-button>
              <el-button icon="Search" @click="confirmForm" type="primary">查询</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits, defineProps } from "vue"
import type { FormInstance } from "element-plus"
import { throttle } from "lodash"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

const userFormRef = ref<FormInstance>()

const props = defineProps(["searchConfig"])

const userForm = reactive({})

props.searchConfig.formItems.forEach((item) => {
  userForm[item.prop] = ""
})

const emit = defineEmits(["handleSearch", "handleReset"])

// 重置
const resetForm = throttle((formEl: FormInstance) => {
  if (!formEl) return
  formEl.resetFields()
  emit("handleReset")
}, 1000)

// 查询
const confirmForm = throttle(() => {
  emit("handleSearch", userForm)
}, 1000)
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 20px;
  font-size: 16px;
  padding: 10px 20px;

  &_button_group {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  .el-row:last-child .el-form-item {
    margin-bottom: 0;
  }
}
</style>
