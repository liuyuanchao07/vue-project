<template>
  <div class="user">
    <el-card class="search">
      <el-form :model="userForm" ref="userFormRef" label-width="80px">
        <el-row :gutter="80">
          <el-col :span="8">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" placeholder="请输入查询的用户名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名" prop="realname">
              <el-input v-model="userForm.realname" placeholder="请输入查询的真实姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="userForm.phone" placeholder="请输入查询的手机号码" />
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
                <el-button :icon="Refresh" @click="resetForm(userFormRef)">重置</el-button>
                <el-button :icon="Search" @click="confirmForm" type="primary">查询</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="content">
      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="realname" label="真实姓名" width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import type { FormInstance } from "element-plus"
import { Refresh, Search } from "@element-plus/icons-vue"
import { getUsers } from "@/service/request"
import { ElLoading } from "element-plus"
import { throttle } from "lodash"

const userFormRef = ref<FormInstance>()
const totalCount = ref(0)
const userList = ref([])

const userForm = reactive({
  username: "",
  realname: "",
  phone: "",
  state: "",
  createDate: [],
})

const resetForm = (formEl: FormInstance) => {
  if (!formEl) return
  formEl.resetFields()
}

const confirmForm = throttle(() => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  })
  getUsers(userForm).then((res) => {
    totalCount.value = res.data.total
    userList.value = res.data.data
    loading.close()
    ElMessage({
      message: "登录成功",
      type: "success",
    })
  })
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
