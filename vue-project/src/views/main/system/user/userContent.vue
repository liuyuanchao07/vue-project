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
        <template v-if="item.type === 'normal'">
          <el-table-column align="center" v-bind="item" />
        </template>
        <template v-if="item.type === 'state'">
          <el-table-column align="center" v-bind="item">
            <template #default="scope">
              <el-tag :type="scope.row.enable === 1 ? 'success' : 'danger'">{{
                scope.row.enable === 1 ? "启用" : "禁用"
              }}</el-tag>
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'timer'">
          <el-table-column align="center" v-bind="item">
            <template #default="scope">
              {{ formatDate(scope.row[item.prop]) }}
            </template>
          </el-table-column>
        </template>
        <template v-if="item.type === 'button'">
          <el-table-column align="center" v-bind="item">
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
        </template>
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
import formatDate from "@/utils/formatDate"
const currentPage = ref(1)
const pageSize = ref(10)

const props = defineProps(["totalCount", "userList", "contextConfig"])

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
