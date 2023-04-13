<template>
  <div class="page-main fr f-je">
    <div class="left-box fc f-ac-jc">
      <!-- <div class="fs-40 color-white mb-26 mt--60 fw-b">大熊助手</div> -->
      <login></login>
    </div>
  </div>
</template>

<script setup>
import login from './login'
</script>
<style lang="scss" scoped>
.page-main {
  --color-primary: #171e6f;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-primary);
  background-image: url('@/assets/images/login.png');
  background-repeat: no-repeat;
  background-size: contain;
  .left-box {
    width: 40vw;

    .mt--60 {
      margin-top: -30px;
      letter-spacing: 0.5em;
    }
  }
}
</style>
