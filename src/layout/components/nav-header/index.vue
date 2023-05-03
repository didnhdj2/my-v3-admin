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
    <!-- 第二行 tag -->
    <div class="bl h-40">
      <div class="pl-30 h-40 f-ac fr">
        <div class="plr-10 h-38 fr f-ac tags" v-for="item in tagsViews" :class="[item.isActive && 'bg-ea']">
          <!-- <svg-icon :name="item.icon"></svg-icon> -->
          <span class="ml-6 fs-13 poiter" @click="handlePush(item.path)">{{ item.name }}</span>
          <svg-icon name="svg-close" class="ml-8 close" @click="handleDel(item.path)"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import appLink from '../nav-menu/appLink'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const route = useRoute()
const store = useUserStore()
const user = computed(() => store.user.username)
const tagsViews = computed(() => store.tagsViewArr)
const state = computed(() => store.isCollapse)

/*******
 * @ description: 菜单折叠
 * @ return {*}
 ******/
function handleFold() {
  store.setIsCollapse()
}

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
</script>
<style lang="scss" scoped>
.user {
  &:focus-visible {
    outline: none;
  }
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
