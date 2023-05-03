<template>
  <div>
    <div class="fr f-ac f-jsb pl-20 pr-50 h-50 bb bg-3c color-white">
      <div @click="handleFold">
        <el-icon class="mr-18" size="28" v-if="state">
          <Fold></Fold>
        </el-icon>
        <el-icon class="mr-18" size="28" v-else>
          <Expand></Expand>
        </el-icon>
      </div>
      <div class="fr f-ac">
        <div class="mr-30 fr f-ac">
          <svg-icon name="svg-bircoin" class="mr-4"></svg-icon>
          <span>渔币</span>
          <span class="ml-10">{{ Ycoin }}</span>
        </div>
        <div class="mr-30 fr f-ac">
          <svg-icon name="svg-coins" class="mr-4"></svg-icon>
          <span>余额</span>
          <span class="ml-10">{{ balance }}</span>
        </div>
        <div class="mr-30 fr f-ac" @click="goCharge">
          <span>充值</span>
        </div>
        <div class="mr-30 fr f-ac" @click="showBuyVip">
          <span>购买vip</span>
        </div>
        <div class="fr f-ac">
          <el-dropdown>
            <span class="user color-white fr f-ac">
              {{ user }}
              <el-icon class="ml-4">
                <ArrowDown></ArrowDown>
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <appLink :to="'/password'">
                    <span>
                      <svg-icon name="svg-user-center" class="mr-4"></svg-icon>
                      个人中心
                    </span>
                  </appLink>
                </el-dropdown-item>
                <el-dropdown-item>
                  <appLink :to="'/password'">
                    <span>
                      <svg-icon name="svg-key" class="mr-4"></svg-icon>
                      修改密码
                    </span>
                  </appLink>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="handleLogout">
                    <svg-icon name="svg-LogOut" class="mr-4"></svg-icon>
                    退出登陆
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="bl h-40">
      <div class="pl-30 h-40 f-ac fr">
        <div class="plr-10 h-38 fr f-ac tags" v-for="item in tagsViews" :class="[item.isActive && 'bg-ea']">
          <!-- <svg-icon :name="item.icon"></svg-icon> -->
          <span class="ml-6 fs-13 poiter" @click="handlePush(item.path)">{{ item.name }}</span>
          <svg-icon name="svg-close" class="ml-8 close" @click="handleDel(item.path)"></svg-icon>
        </div>
      </div>
    </div>

    <!-- 充值弹窗 -->
    <select-charge ref="charge"></select-charge>
    <!-- 购买vip -->
    <el-dialog title="会员充值" v-model="vip" width="600px" @close="close" :close-on-click-modal="false" append-to-body>
      <div class="fr">
        <div>购买月数</div>
        <el-input-number v-model="month" :min="1" :max="12" />
      </div>
      <div>vip仅可在购买有效期内使用</div>
      <template #footer>
        <div class="fr f-ac-jc">
          <el-button plain size="large" @click="close">取消</el-button>
          <el-button type="primary" class="mr-16" size="large" :loading="btnLoading" @click="goBuyVip">去支付</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import appLink from '../nav-menu/appLink'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { buyVip } from '@/https/apis/user'
import { useUserStore } from '@/store/user'
import selectCharge from './select-charge.vue'

const router = useRouter()
const route = useRoute()
const store = useUserStore()
const user = computed(() => store.user.username)
const balance = computed(() => store.user.fundInfo.balance)
const Ycoin = computed(() => store.user.fundInfo.coin)
const tagsViews = computed(() => store.tagsViewArr)
const state = computed(() => store.isCollapse)

/*******
 * @ description: 菜单折叠
 * @ return {*}
 ******/
function handleFold() {
  store.setIsCollapse()
}
// TODO 1、购买套餐弹窗
//  2、 生成二维码 vueQr <vue-qr  text="Hello world!" :size="200"></vue-qr>
//  3、 轮询支付结果
/*******
 * @ description: 退出登陆逻辑
 * @ return {*}
 ******/
const handleLogout = () => {
  store.logout()
  store.$reset()
  router.push('/login')
}

/*******
 * @ description: 删除tags
 * @ param {*} path
 * @ return {*}
 ******/
function handleDel(path) {
  store.delTagsViewArr(path)
  if (tagsViews.value.length === 0) {
    router.push('/')
  } else {
    router.push(tagsViews.value[tagsViews.value.length - 1].path)
  }
}
/*******
 * @ description: 点击tags跳转
 * @ param {*} path
 * @ return {*}
 ******/
function handlePush(path) {
  let now_path = route.path
  if (now_path !== path) {
    router.push(path)
  }
}

// ==============充值=================

const charge = ref(null)
/*******
 * @ description: 发起充值
 * @ return {*}
 ******/
function goCharge() {
  charge && charge.value.init()
}

// =============vip==========
const vip = computed(() => store.showVip)
const month = ref(0)

/*******
 * @ description: 关闭弹窗
 * @ return {*}
 ******/
function close() {
  store.showVip = false
}

function showBuyVip() {
  store.showVip = true
}
/*******
 * @ description: 购买vip
 * @ return {*}
 ******/
async function goBuyVip() {
  let res = await buyVip({
    month: month.value
  })
  if (res.code == 0) {
    store.showVip = false
    ElMessage.success({
      message: '购买成功',
      duration: 5 * 1000
    })
  }
}
</script>
<style lang="scss" scoped>
.user {
  &:focus-visible {
    outline: none;
  }
}
.purple {
  color: #877bff;
}

.tags {
  &:hover {
    background-color: #ccd6e1;
  }
  .close {
    &:hover {
      color: #063772;
    }
  }
}
</style>
