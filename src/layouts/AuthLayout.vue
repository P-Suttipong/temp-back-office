<template>
  <q-layout view="hHh lpR fFf">
    <!-- <q-header class="text-black login-header">
      <div class="row justify-between">
        <div>
          <q-avatar class="q-pl-md q-pt-md">
            <img src="~assets/img/cold.png" />
          </q-avatar>
        </div>
        <div>
          <q-toolbar-title class="authpage-title"
            >วัดอุณหภูมิห้องเย็น</q-toolbar-title
          >
        </div>
        <div class="row q-mt-sm">
          <q-btn flat class="q-ma-md btn q-mr-xl">
            เข้าสู่ระบบ
          </q-btn>
        </div>
      </div>
    </q-header> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="column footer items-end q-mr-sm"
      >Coppyright © 2020 Cold Room Backoffice</q-footer
    >
  </q-layout>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.footer {
  background-color: #030c1a;
  color: #767d88;
}
button {
  font-family: "prompt";
}
.btn {
  font-size: 18px;
}
body {
  font-family: "prompt";
}
.login-header {
  height: 10vh;
  background-color: #fff;
}
.authpage-title {
  font-family: "prompt";
  padding-left: 10vw;
  padding-top: 20px;
  font-size: 32px;
}
</style>
