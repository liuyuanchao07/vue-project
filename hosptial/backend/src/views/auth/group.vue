<template>
  <div class="wrapper">
    <el-button @click="dialogVisible = !dialogVisible" type="primary"
      >新增</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="昵称" width="180" />
      <el-table-column prop="permissionsName" label="菜单权限">
        <template #default="scope">
          <el-tag
            style="margin-right: 5px"
            :key="index"
            v-for="(item, index) in scope.row.permissionsName"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      title="添加权限"
      width="400px"
      :before-close="beforeClose"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="60px"
        label-position="left"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请填写权限名称" />
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <el-tree
            ref="treeRef"
            :default-checked-keys="defaultKeys"
            :default-expanded-keys="[2]"
            :data="permissionList"
            show-checkbox
            node-key="id"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confrim(ruleFormRef)">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import type { FormRules } from "element-plus";
import { userGetMenu, userSetMenu, menuList } from "../../http/api";
import axios from "axios";
const dialogVisible = ref<boolean>(false);

interface RuleForm {
  name: string;
  permissions: string;
}

const ruleForm = reactive<RuleForm>({
  name: "",
  permissions: "",
});

const paginationData = reactive({
  pagaeNum: 1,
  pageSize: 10,
});

let permissionList = ref([]);
let tableData = ref([]);
let ruleFormRef = ref();
let treeRef = ref();
const defaultKeys = [4, 5];

const rules = reactive<FormRules<RuleForm>>({
  name: [
    {
      required: true,
      message: "名称不能为空",
      trigger: "change",
    },
  ],
});

const beforeClose = () => {
  dialogVisible.value = false;
  ruleFormRef.value.resetFields();
  treeRef.value.setCheckedKeys(defaultKeys);
};

const handleEdit = (row) => {
  dialogVisible.value = true;
  nextTick(() => {
    Object.assign(ruleForm, { name: row.name, permissions: row.permissions });
    treeRef.value.setCheckedKeys(ruleForm.permissions);
  });
};

const confrim = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      userSetMenu({
        name: ruleForm.name,
        id: "1",
        permissions: JSON.stringify(treeRef.value.getCheckedKeys() as number[]),
      }).then((res) => {
        menuList(paginationData).then((res) => {
          tableData.value = res.data.list;
          dialogVisible.value = false;
        });
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

onMounted(() => {
  axios
    .all([userGetMenu(), menuList(paginationData)])
    .then(
      axios.spread((response1, response2) => {
        permissionList.value = response1.data.items;
        tableData.value = response2.data.list;
      })
    )
    .catch((error) => {
      // 处理错误
    });
});
</script>

<style lang="less" scoped></style>
