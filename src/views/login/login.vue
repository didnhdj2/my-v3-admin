<template>
  <div class="cd mr-20 br-12 plr-20 pt-20 pb-40">
    <el-form ref="formRef" :label-width="0" :model="formValue" size="large" class="form">
      <el-form-item prop="username" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
        <el-input
          v-model="formValue.username"
          placeholder="输入账号"
          :prefix-icon="Cellphone"
          validate-event
          class="text-l fs-16"
          style="--el-input-text-color: #fff; --el-input-placeholder-color: #fff"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]"
      >
        <el-input
          v-model="formValue.password"
          type="password"
          :prefix-icon="Lock"
          show-password
          class="text-l"
          placeholder="输入密码"
          style="--el-input-text-color: #fff; --el-input-placeholder-color: #fff"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="code"
        :rules="[
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
        ]"
      >
        <div class="fr f-jsb w_100">
          <el-input
            v-model="formValue.code"
            class="text-l"
            placeholder="输入验证码"
            style="--el-input-text-color: #fff; --el-input-placeholder-color: #fff"
          />
          <img :src="codeUrl" class="w-100 h-40" object-fit="cover" @click="handleImgClick" />
        </div>
      </el-form-item>
    </el-form>
    <div class="pl-6 fr f-jsb mt-16">
      <el-checkbox label="记住密码" v-model="remember" />
      <div class="poiter color-cc">忘记密码？</div>
    </div>
    <div class="plr-20 mt-20">
      <div class="bg-white br-22 h-44 lh-44 color-17" @click="getLogin">登陆</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { getCaptcha } from '@/https/apis/user'
import { Cellphone, Lock } from '@element-plus/icons-vue'
const router = useRouter()
const store = useUserStore()

let password = localStorage.getItem('password') || ''
let username = localStorage.getItem('username') || ''
if (import.meta.env.DEV) {
  password = '123456'
  username = 'admin'
}
// 表格字段
const formValue = reactive({
  username,
  password,
  code: '',
  uid: ''
})

/*******
 * @ description: 请求验证码
 * @ return {*}
 ******/

const codeUrl = ref('null')
const Head = 'data:image/*;base64,'
function captcha() {
  getCaptcha().then((res) => {
    if (res.code == 0) {
      codeUrl.value = Head + res.data.code
      formValue.uid = res.data.uid
      if (import.meta.env.DEV) {
        formValue.code = res.data.verifyCode
      }
    }
  })
}

// 获取验证码
captcha()

/*******
 * @ description: 重新获取验证码
 * @ return {*}
 ******/
function handleImgClick() {
  captcha()
}

const formRef = ref(null)
const remember = ref(false)
/*******
 * @ description: 登录
 * @ return {*}
 ******/
function getLogin() {
  if (remember.value) {
    localStorage.setItem('username', formValue.username)
    localStorage.setItem('password', formValue.password)
  }
  formRef.value.validate((valid) => {
    if (valid) {
      store.login(formValue).then((res) => {
        if (res.code == 0) {
          router.push({ path: '/' })
        }
      })
    }
  })
}
</script>
<style lang="scss" scoped>
.cd {
  width: 380px;
  box-sizing: border-box;
  border: 1px solid #4b4a4a;
  box-shadow: 0px 24px 63px 0px rgba(0, 0, 0, 0.28);
  background-color: #171e6f02;
  backdrop-filter: blur(8px);
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
  .form {
    ::v-deep(.el-input__wrapper) {
      border: none;
      color: white;
      background-color: transparent;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
      border-bottom: 1px solid #666;
      cursor: default;
      .el-input_inner {
        cursor: default !important;
        color: var(--el-color-white);
      }
    }
  }
}
</style>
