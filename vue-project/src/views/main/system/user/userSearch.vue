<template>
  <el-card class="search">
    <el-form :model="userForm" ref="userFormRef" label-width="80px">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model.trim="userForm.name" placeholder="请输入查询的用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model.trim="userForm.realname" placeholder="请输入查询的真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model.trim="userForm.cellphone" placeholder="请输入查询的手机号码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="状态" prop="state">
            <el-select v-model="userForm.state" placeholder="请选择查询的状态">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createDate">
            <el-date-picker
              v-model="userForm.createDate"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
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
import { reactive, ref, defineEmits } from "vue"
import type { FormInstance } from "element-plus"
import { throttle } from "lodash"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

const userFormRef = ref<FormInstance>()

const userForm = reactive({
  name: "",
  realname: "",
  cellphone: "",
  state: "",
  createDate: "",
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
