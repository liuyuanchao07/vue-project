<template>
  <div class="user">
    <UserSearch
      :searchConfig="searchConfig"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    />
    <UserContent
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @handleModelShow="handleModelShow"
      :totalCount="totalCount"
      :userList="userList"
      :contextConfig="contextConfig"
    >
      <template #name="scope">{{ scope.row.name }}</template>
      <template #realname="scope">{{ scope.row.realname }}</template>
      <template #cellphone="scope">{{ scope.row.cellphone }}</template>
      <template #enable="scope">
        <el-tag :type="scope.row.enable === 1 ? 'success' : 'danger'">{{
          scope.row.enable === 1 ? "启用" : "禁用"
        }}</el-tag>
      </template>
      <template #createAt="scope">{{ formatDate(scope.row.createAt) }}</template>
      <template #updateAt="scope">{{ formatDate(scope.row.updateAt) }}</template>
      <template #button="scope">
        <el-button @click="editRecord(scope.row)" icon="Edit" type="primary" size="small" link
          >编辑</el-button
        >
        <el-popconfirm title="确定要删除当前记录吗" @confirm="deleteRecord(scope.row.id)">
          <template #reference>
            <el-button icon="Delete" type="danger" size="small" link>删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </UserContent>
    <UserModel
      ref="modelRef"
      :modelConfig="modelConfig"
      :selectedPermissionId="selectedPermissionId"
      @clearSelectedPermissionId="clearSelectedPermissionId"
    >
      <template #treeList>
        <el-tree
          ref="treeRef"
          :data="permissionList"
          show-checkbox
          node-key="id"
          @check="getCheckedKeys"
          :props="{
            children: 'children',
            label: 'label',
          }"
        />
      </template>
    </UserModel>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue"
import { getUsers, getPermissionList } from "@/service/request"
import formatDate from "@/utils/formatDate"
import mapRecordToIds from "@/utils/mapRecordToIds"
import UserSearch from "@/views/main/system/user/userSearch.vue"
import UserContent from "@/views/main/system/user/userContent.vue"
import UserModel from "@/views/main/system/user/userModel.vue"
import searchConfig from "@/config/user-search"
import modelConfig from "@/config/user-model"
import contextConfig from "@/config/user-context"
import { throttle } from "lodash"

const totalCount = ref(0)
const userList = ref([])
const permissionList = ref([])
const selectedPermissionId = ref([])
const treeRef = ref()
const modelRef = ref<Instancetype<typeof UserModel>>()

const requestApi = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  })
  getUsers().then((res) => {
    totalCount.value = res.data.total
    userList.value = res.data.data
    loading.close()
  })
}

const clearSelectedPermissionId = () => {
  selectedPermissionId.value = []
}

const getCheckedKeys = (node, state) => {
  selectedPermissionId.value = [...state.checkedKeys, ...state.halfCheckedKeys]
}

const handleSizeChange = (pageSize) => {
  console.log(pageSize)
  requestApi()
}

const handleCurrentChange = (currentPage) => {
  console.log(currentPage)
  requestApi()
}

const handleModelShow = (record = "") => {
  modelRef.value.changeModelState(record)
}

const handleSearch = (params) => {
  console.log(params)
  requestApi()
}

const handleReset = () => {
  requestApi()
}

const deleteRecord = throttle((id) => {
  console.log(id)
}, 1000)

const editRecord = throttle((record) => {
  modelRef.value.changeModelState(record)
  nextTick(() => {
    selectedPermissionId.value = mapRecordToIds(record)
    treeRef.value.setCheckedKeys(selectedPermissionId.value)
  })
}, 1000)

onMounted(() => {
  requestApi()
  getPermissionList().then((res) => {
    permissionList.value = res.data.data
  })
})
</script>
