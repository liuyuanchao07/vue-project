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
    />
    <UserModel ref="modelRef" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getUsers } from "@/service/request"
import { ElLoading } from "element-plus"
import UserSearch from "@/views/main/system/user/userSearch.vue"
import UserContent from "@/views/main/system/user/userContent.vue"
import UserModel from "@/views/main/system/user/userModel.vue"
import searchConfig from "@/config/user-search"

const totalCount = ref(0)
const userList = ref([])
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

onMounted(() => {
  requestApi()
})
</script>
