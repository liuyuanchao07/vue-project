<template>
  <el-row class="login-container">
    <el-col :span="6">
      <el-card :body-style="{ padding: '15px 30px' }">
        <div class="link">
          <el-link type="primary" @click="handleChange">{{
            formType ? "返回登录" : "注册账号"
          }}</el-link>
        </div>
        <el-form :model="ruleForm" ref="ruleFormRef" :rules="rules" status-icon>
          <el-form-item prop="phone">
            <Input
              placeholder="手机号"
              icon="User"
              type="number"
              v-model="ruleForm.phone"
              iconPosition="prefix"
            />
          </el-form-item>
          <el-form-item prop="password">
            <Input
              placeholder="密码"
              icon="Lock"
              type="password"
              v-model="ruleForm.password"
              iconPosition="prefix"
            />
          </el-form-item>
          <el-form-item v-if="formType" prop="code">
            <el-input
              placeholder="验证码"
              :prefix-icon="Lock"
              v-model="ruleForm.code"
            >
              <template #append>
                <span @click="validateCodeChange">{{
                  validateCode.validText
                }}</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="submitForm(ruleFormRef)"
              type="primary"
              :style="{ width: '100%' }"
              >{{ formType ? "注册账号" : "登录" }}</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { throttle } from "lodash";
import showMessage from "../../components/ElMessage";
import customLoading from "../../components/ElLoading";
import Input from "../../components/Input.vue";
import { getCode, userAuth, login } from "../../http/api";
import { Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

let formType = ref(false);
interface RuleForm {
  phone: string;
  password: string;
  code: string;
}

interface ValidateCode {
  validText: string;
  time: number;
  timer: null | number;
}

const ruleForm = reactive<RuleForm>({
  phone: "",
  password: "",
  code: "",
});

const validateCode = reactive<ValidateCode>({
  validText: "获取验证码",
  time: 60,
  timer: null,
});

const ruleFormRef = ref<FormInstance>();

const handleChange = () => {
  formType.value = !formType.value;
};

const validateCodeChange = throttle(() => {
  ruleFormRef.value
    .validateField("phone")
    .then((valid) => {
      if (valid) {
        if (validateCode.timer) {
          return false;
        }

        validateCode.timer = setInterval(() => {
          validateCode.time--;
          validateCode.validText = `剩余${validateCode.time}秒`;
          if (validateCode.time === 0) {
            clearInterval(validateCode.timer);
            validateCode.timer = null;
            validateCode.validText = "获取验证码";
            validateCode.time = 60;
          }
        }, 1000);

        const loading = customLoading();
        getCode({
          tel: ruleForm.phone,
        })
          .then((res) => {
            showMessage({
              type: "success",
              message: "验证码已发送",
            });
            loading.close();
          })
          .catch((err) => {
            showMessage({
              message: "验证码发送失败",
            });
            loading.close();
          });
      }
    })
    .catch((error) => {
      showMessage({
        message: error.phone[0].message,
      });
    });
}, 1000);

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (formType.value) {
        // 注册页面
        userAuth(ruleForm).then((res) => {
          showMessage({
            type: "success",
            message: "注册成功",
          });
          formType.value = false;
        });
      } else {
        // 登录页面
        login(ruleForm).then((res) => {
          localStorage.setItem("token", res.data.items[0].token);
          localStorage.setItem(
            "userInfo",
            JSON.stringify(res.data.items[0].userInfo)
          );
          showMessage({
            type: "success",
            message: "登录成功",
          });

          router.push("/main");
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const rules = reactive<FormRules<RuleForm>>({
  phone: [
    {
      required: true,
      message: "手机号不能为空",
      trigger: "change",
    },
    { min: 11, max: 11, message: "请输入11位手机号", trigger: "change" },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "change",
    },
    { min: 7, max: 10, message: "请输入7-10位位密码", trigger: "change" },
  ],
});
</script>

<style lang="less" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.link {
  text-align: right;
  margin-bottom: 10px;
}
</style>
