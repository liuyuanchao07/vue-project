<template>
  <el-dialog
    center
    width="400"
    :title="isNewRecord ? props.modelConfig.newTitle : props.modelConfig.editTitle"
    v-model="modelState"
    @closed="closeModel"
  >
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px">
      <template v-for="item in props.modelConfig.formItems" :key="item.name">
        <template v-if="item.type === 'input'">
          <template v-if="item.prop === 'password'">
            <template v-if="isNewRecord">
              <el-form-item :label="item.label" :prop="item.prop" :placeholder="item.placeholder">
                <el-input v-model.trim="ruleForm[item.prop]" />
              </el-form-item>
            </template>
          </template>
          <template v-else>
            <el-form-item :label="item.label" :prop="item.prop" :placeholder="item.placeholder">
              <el-input v-model.trim="ruleForm[item.prop]" />
            </el-form-item>
          </template>
        </template>
        <template v-if="item.type === 'select'">
          <template v-if="item.prop === 'roleId'">
            <el-form-item :label="item.label" :prop="item.prop">
              <el-select v-model="ruleForm[item.prop]" :placeholder="item.placeholder">
                <el-option
                  v-for="item in roleList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.label"
                />
              </el-select>
            </el-form-item>
          </template>
          <template v-if="item.prop === 'departmentId'">
            <el-form-item :label="item.label" :prop="item.prop">
              <el-select v-model="ruleForm[item.prop]" :placeholder="item.placeholder">
                <el-option
                  v-for="item in departmenetList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.label"
                />
              </el-select>
            </el-form-item>
          </template>
        </template>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModel">取消</el-button>
        <el-button type="primary">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineExpose, ref, reactive, onMounted, defineProps } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import { getRoleList, getDepartmentList } from "@/service/request"

const modelState = ref(false)
const ruleFormRef = ref<FormInstance>()
const isNewRecord = ref(false)
const roleList = ref([])
const departmenetList = ref([])

// interface RuleForm {
//   name: string
//   realname: string
//   password: string
//   cellphone: string
//   roleId: string
//   departmentId: string
// }

const props = defineProps(["modelConfig"])

const ruleForm = reactive({})

props.modelConfig.formItems.forEach((item) => {
  ruleForm[item.prop] = ""
})

const rules = reactive<FormRules<RuleForm>>({
  realname: [{ required: true, message: "请输入真实姓名", trigger: "change" }],
})

const changeModelState = (record) => {
  modelState.value = true

  if (record) {
    isNewRecord.value = false
    for (const key in record) {
      if (key in ruleForm) {
        ruleForm[key] = record[key]
      }
    }
  } else {
    isNewRecord.value = true
  }
}

const closeModel = () => {
  modelState.value = false
  ruleFormRef.value.resetFields()
  for (const key in ruleForm) {
    ruleForm[key] = ""
  }
}

onMounted(async () => {
  const roleListResult = await getRoleList()
  const departmentListResult = await getDepartmentList()
  roleList.value = roleListResult.data.data
  departmenetList.value = departmentListResult.data.data
})

defineExpose({
  changeModelState,
})
</script>

<style lang="less" scoped>
:global(.el-dialog__header.show-close) {
  padding-right: 0;
}
</style>
