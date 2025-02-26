<template>
  <el-card class="content">
    <div class="content_header">
      <div class="content_title">用户列表</div>
      <el-button @click="addUser" type="primary" icon="Plus">新建用户</el-button>
    </div>
    <el-table :data="props.userList" style="width: 100%">
      <el-table-column align="center" prop="name" label="姓名" width="120" />
      <el-table-column align="center" prop="realname" label="真实姓名" width="120" />
      <el-table-column align="center" prop="cellphone" label="手机号码" width="120" />
      <el-table-column align="center" prop="enable" label="状态" width="120">
        <template #default="scope">
          <el-tag :type="scope.row.enable === 1 ? 'success' : 'danger'">{{
            scope.row.enable === 1 ? "启用" : "禁用"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createAt" label="创建时间">
        <template #default="scope">
          {{ formatDate(scope.row.createAt) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateAt" label="更新时间">
        <template #default="scope">
          {{ formatDate(scope.row.updateAt) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="130">
        <template #default="scope">
          <el-button @click="editRecord(scope.row)" icon="Edit" type="primary" size="small" link
            >编辑</el-button
          >
          <el-popconfirm title="确定要删除当前记录吗" @confirm="deleteRecord(scope.row.id)">
            <template #reference>
              <el-button icon="Delete" type="danger" size="small" link>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
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
import formatDate from "@/utils/formatDate"
const currentPage = ref(1)
const pageSize = ref(10)

const props = defineProps(["totalCount", "userList"])

const emit = defineEmits(["handleSizeChange", "handleCurrentChange", "handleModelShow"])

const handleSizeChange = throttle(() => {
  emit("handleSizeChange", pageSize.value)
}, 1000)

const handleCurrentChange = throttle(() => {
  emit("handleCurrentChange", currentPage.value)
}, 1000)

const deleteRecord = throttle((id) => {
  console.log(id)
}, 1000)

const addUser = throttle(() => {
  emit("handleModelShow")
}, 1000)

const editRecord = throttle((record) => {
  emit("handleModelShow", record)
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
