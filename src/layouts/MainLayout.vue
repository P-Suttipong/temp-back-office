<template>
  <q-layout view="lHh Lpr lFf">
    <div v-if="this.$q.platform.is.mobile && !this.$q.platform.is.ipad">
      <q-header elevated class="row justify-between mobile-header">
        <p class="header-title q-mt-lg q-ma-md">Cold Room BO.</p>
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
              <q-item v-ripple>
                <q-item-section avatar
                  ><q-img width="30px" src="~assets/img/cold.png"></q-img>
                </q-item-section>
                <q-item-section class="drawer-title">
                  Backoffice
                </q-item-section></q-item
              >
              <q-item
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

              <q-item @click="logout()" clickable v-ripple>
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

          <q-item class="logout" @click="logout()" clickable v-ripple>
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
  </q-layout>
</template>

<script>
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
    async logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
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
  background-color: #2c323f;
}
.drawer-right {
  color: white;
  background-color: #2c323f;
}

p {
  font-family: "prompt";
}
.header-title {
  font-size: 21px;
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
  background-color: white;
  color: black;
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
