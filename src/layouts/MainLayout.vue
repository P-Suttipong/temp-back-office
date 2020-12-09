<template>
  <q-layout @click="checkIdle" view="lHh Lpr lFf">
    <div v-if="this.$q.platform.is.mobile && !this.$q.platform.is.ipad">
      <q-header elevated class="row justify-between mobile-header">
        <div class="row">
          <q-img
            width="35px"
            height="30px"
            class="q-ml-md q-mt-lg"
            src="~assets/img/cold.png"
          ></q-img>
          <p class="header-title q-mt-lg q-pl-md">Cold Room</p>
        </div>
        <q-btn
          class="menu-btn"
          @click="drawerRight = !drawerRight"
          icon="menu"
          flat
        ></q-btn>
        <q-drawer
          side="right"
          v-model="drawerRight"
          show-if-above
          :width="250"
          :breakpoint="500"
        >
          <q-scroll-area class="fit drawer-right">
            <q-list class="q-ml-sm q-mt-sm menu-list">
              <!-- <q-item v-ripple>
                <q-item-section avatar
                  ><q-img width="30px" src="~assets/img/cold.png"></q-img>
                </q-item-section>
                <q-item-section class="drawer-title">
                  Backoffice
                </q-item-section></q-item
              > -->
              <q-item
                class="q-mt-md"
                :active="deviceMenuActive"
                active-class="is-active"
                @click="deviceMenuSelected()"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="inbox" />
                </q-item-section>

                <q-item-section class="drawer-text">
                  Devices List
                </q-item-section>
              </q-item>

              <q-item
                :active="userMenuActive"
                active-class="is-active"
                @click="userMenuSelected()"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="account_box" />
                </q-item-section>

                <q-item-section class="drawer-text">
                  Users List
                </q-item-section>
              </q-item>

              <q-item
                :active="addDeviceMenuActive"
                active-class="is-active"
                @click="addDeviceMenuSelected()"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="library_add" />
                </q-item-section>

                <q-item-section class="drawer-text">
                  Add New Device
                </q-item-section>
              </q-item>

              <q-item
                :active="addUserMenuActive"
                active-class="is-active"
                @click="addUserMenuSelected()"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="person_add" />
                </q-item-section>

                <q-item-section class="drawer-text">
                  Add New User
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item @click="handlerLogout()" clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="cancel" />
                </q-item-section>

                <q-item-section class="drawer-text">
                  Log Out
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-drawer>
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
    >
      <q-scroll-area class="fit drawer-header">
        <q-list padding>
          <q-item v-ripple>
            <q-item-section avatar
              ><q-img width="35px" src="~assets/img/cold.png"></q-img>
            </q-item-section>
            <q-item-section class="drawer-title">
              Cold Room Backoffice
            </q-item-section></q-item
          >
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
              Devices List
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
              Users List
            </q-item-section>
          </q-item>

          <q-item
            :active="addDeviceMenuActive"
            active-class="active"
            @click="addDeviceMenuSelected()"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="library_add" />
            </q-item-section>

            <q-item-section class="drawer-text">
              Add New Device
            </q-item-section>
          </q-item>

          <q-item
            :active="addUserMenuActive"
            active-class="active"
            @click="addUserMenuSelected()"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="person_add" />
            </q-item-section>

            <q-item-section class="drawer-text">
              Add New User
            </q-item-section>
          </q-item>

          <q-separator class="separator" />

          <q-item class="logout" @click="handlerLogout()" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="cancel" />
            </q-item-section>

            <q-item-section class="drawer-text">
              Log Out
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="column footer items-end q-mr-sm"
      >Coppyright © 2020 Cold Room Backoffice</q-footer
    >
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      drawerRight: false,
      dialogMenu: false,
      deviceMenuActive: true,
      userMenuActive: false,
      addDeviceMenuActive: false,
      addUserMenuActive: false,
      drawer: false,
      miniState: true,
      deviceBtn: "is-active",
      userBtn: "non-active"
    };
  },
  computed: {
    ...mapState({
      loginAt: state => state.device.loginAt
    })
  },
  methods: {
    deviceMenuSelected() {
      if (this.deviceMenuActive != true) {
        this.deviceMenuActive = true;
        this.userMenuActive = false;
        this.addDeviceMenuActive = false;
        this.addUserMenuActive = false;
        this.$router.push("/");
      }
    },
    userMenuSelected() {
      if (this.userMenuActive != true) {
        this.deviceMenuActive = false;
        this.userMenuActive = true;
        this.addDeviceMenuActive = false;
        this.addUserMenuActive = false;
        this.$router.push("/userlist");
      }
    },
    addDeviceMenuSelected() {
      if (this.addDeviceMenuActive != true) {
        this.deviceMenuActive = false;
        this.userMenuActive = false;
        this.addDeviceMenuActive = true;
        this.addUserMenuActive = false;
        this.$router.push("/adddevice");
      }
    },
    addUserMenuSelected() {
      if (this.addUserMenuActive != true) {
        this.deviceMenuActive = false;
        this.userMenuActive = false;
        this.addDeviceMenuActive = false;
        this.addUserMenuActive = true;
        this.$router.push("/adduser");
      }
    },
    async handlerLogout() {
      let res = await this.$store.dispatch("logout");
      if (res) {
        this.$router.push("/login");
      }
    },
    async checkIdle() {
      let date = Date.now();
      // console.log("DATE NOW", date);
      // console.log("LOGIN AT", this.loginAt);
      if (date - this.loginAt > 1500000) {
        this.$store.dispatch("logout");
        this.$router.push("/login");
      }
    }
  },
  mounted() {
    if (this.$route.path === "/") {
      this.deviceMenuActive = true;
      this.userMenuActive = false;
      this.addDeviceMenuActive = false;
      this.addUserMenuActive = false;
    } else if (this.$route.path === "/userlist") {
      this.deviceMenuActive = false;
      this.userMenuActive = true;
      this.addDeviceMenuActive = false;
      this.addUserMenuActive = false;
    } else if (this.$route.path === "/adddevice") {
      this.deviceMenuActive = false;
      this.userMenuActive = false;
      this.addDeviceMenuActive = true;
      this.addUserMenuActive = false;
    } else if (this.$route.path === "/adduser") {
      this.deviceMenuActive = false;
      this.userMenuActive = false;
      this.addDeviceMenuActive = false;
      this.addUserMenuActive = true;
    }
  }
};
</script>

<style scoped>
.drawer-header {
  color: white;
  /* background-color: #2c323f; */
  background: url("~assets/img/left_banner.jpg");
}
.drawer-right {
  color: white;
  /* background-color: #2c323f; */
  background: url("~assets/img/left_banner.jpg");
}

.footer {
  background-color: white;
  color: #000;
}

p {
  font-family: "prompt";
}
.header-title {
  font-size: 22px;
}
.drawer-text {
  font-family: "prompt";
}
.drawer-title {
  font-size: 15px;
  font-weight: bold;
  font-family: "prompt";
}
.menu-btn {
  padding-left: 30vw;
}
.menu-list {
  width: 100vw;
}
.is-active {
  color: white;
  padding: 10px;
  border-radius: 50px 0px 0px 50px;
  margin-right: 20px;
  background-color: #0288d1;
}
.active {
  color: white;
  border-radius: 0px 50px 50px 0px;
  margin-right: 10px;
  background-color: #0288d1;
}
.logo-img {
  object-fit: fill;
  height: 50px;
  padding: 20px;
}

.mobile-header {
  height: 80px;
  background: url("~assets/img/left_banner.jpg");
  color: white;
}

.logout:hover {
  background-color: rgba(255, 0, 0, 0.3);
}

@media only screen and (max-width: 400px) {
  .menu-btn {
    padding-left: 20vw;
  }
}

@media only screen and (min-height: 830px) {
}
</style>
