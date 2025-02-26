<template>
  <el-card class="content">
    <div class="content_header">
      <div class="content_title">{{ contextConfig.title }}</div>
      <el-button @click="addUser" type="primary" icon="Plus">{{
        contextConfig.buttonTitle
      }}</el-button>
    </div>
    <el-table :data="props.userList" style="width: 100%">
      <template v-for="item in contextConfig.tableList" :key="item.prop">
        <el-table-column align="center" v-bind="item">
          <template #default="scope">
            <slot :name="item.prop" v-bind="scope"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        size="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="props.totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue"
import { throttle } from "lodash"

const currentPage = ref(1)
const pageSize = ref(10)

const props = defineProps(["totalCount", "userList", "contextConfig"])

const emit = defineEmits(["handleSizeChange", "handleCurrentChange"])

const handleSizeChange = throttle(() => {
  emit("handleSizeChange", pageSize.value)
}, 1000)

const handleCurrentChange = throttle(() => {
  emit("handleCurrentChange", currentPage.value)
}, 1000)

const addUser = throttle(() => {
  emit("handleModelShow")
}, 1000)
</script>

<style lang="less" scoped>
.content_header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 20px;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:global(.el-popconfirm__main) {
  font-size: 12px;
}
</style>
