<template>
  <div class="user">
    <UserSearch @handleSearch="handleSearch" @handleReset="handleReset" />
    <userContent
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :totalCount="totalCount"
      :userList="userList"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getUsers } from "@/service/request"
import { ElLoading } from "element-plus"
import UserSearch from "@/views/main/system/user/userSearch.vue"
import userContent from "@/views/main/system/user/userContent.vue"

const totalCount = ref(0)
const userList = ref([])

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
