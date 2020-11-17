<template>
  <q-layout view="lHh Lpr lFf">
    <div v-if="this.$q.platform.is.mobile && !this.$q.platform.is.ipad">
      <q-header elevated class="row justify-between">
        <p class="header-title q-ma-md">ระบบควมคุมห้องเย็น</p>
        <q-btn-dropdown flat dropdown-icon="menu">
          <q-list class="menu-list">
            <q-item clickable v-close-popup @click="deviceMenuSelected()">
              <q-item-section>
                <q-item-label class="drawer-text">อุปกรณ์</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="userMenuSelected()">
              <q-item-section>
                <q-item-label class="drawer-text">ข้อมูลผู้ใช้งาน</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="logout()">
              <q-item-section>
                <q-item-label class="drawer-text">ออกจากระบบ</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-header>
    </div>

    <q-drawer
      v-if="this.$q.platform.is.desktop || this.$q.platform.is.ipad"
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="300"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            :active="deviceMenuActive"
            active-class="active"
            @click="deviceMenuSelected()"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section class="drawer-text">
              อุปกรณ์
            </q-item-section>
          </q-item>

          <q-item
            :active="userMenuActive"
            active-class="active"
            @click="userMenuSelected()"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="account_box" />
            </q-item-section>

            <q-item-section class="drawer-text">
              ข้อมูลผู้ใช้งาน
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item @click="logout()" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="cancel" />
            </q-item-section>

            <q-item-section class="drawer-text">
              ออกจากระบบ
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      dialogMenu: false,
      deviceMenuActive: true,
      userMenuActive: false,
      drawer: false,
      miniState: true
    };
  },
  methods: {
    deviceMenuSelected() {
      this.deviceMenuActive = true;
      this.userMenuActive = false;
      this.$router.push("/");
    },
    userMenuSelected() {
      this.deviceMenuActive = false;
      this.userMenuActive = true;
      this.$router.push("/userlist");
    },
    async logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
p {
  font-family: "prompt";
}
.header-title {
  font-size: 20px;
}
.drawer-text {
  font-family: "prompt";
}
.menu-list {
  width: 200px;
}
.active {
  /*  */
}
</style>
