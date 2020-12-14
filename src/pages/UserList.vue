<template>
  <q-page>
    <!-- <div class="row justify-center">
      <p class="title">ข้อมูลผู้ใช้งาน</p>
    </div>

    <div class="row justify-center id-selecter">
      <q-input dense outlined rounded v-model="userId" label="Serach">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:append>
          <q-icon
            v-if="userId !== ''"
            name="close"
            @click="userId = ''"
            class="cursor-pointer"
          />
        </template>
      </q-input>
    </div> -->
    <div class="row justify-center ">
      <div
        v-if="this.$q.platform.is.desktop || this.$q.platform.is.ipad"
        class="q-pa-xl"
      >
        <q-table
          class="device-table"
          :data="userData"
          :columns="columns"
          :pagination="pagination"
          :loading="loading"
          :filter="userID"
          no-data-label="No data"
        >
          <template v-slot:top-left>
            <p class="title title-banner">Users List</p>
          </template>

          <template v-slot:top-right>
            <div class="id-selecter">
              <q-input dense outlined rounded v-model="userID" label="Serach">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
                <template v-slot:append>
                  <q-icon
                    v-if="userID !== ''"
                    name="close"
                    @click="userID = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </template>
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>

          <template v-slot:body-cell-enabled="props">
            <q-td :props="props">
              <div>
                <q-btn
                  :color="props.row.user_enable == true ? 'green' : 'red'"
                  flat
                >
                  <q-icon
                    :name="
                      props.row.user_enable == true
                        ? 'radio_button_checked'
                        : 'radio_button_unchecked'
                    "
                    class="q-ml-xs"
                    style="font-size: 19px;"
                  />
                </q-btn>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-setting="props">
            <q-td :props="props">
              <div>
                <q-btn
                  class="description-btn"
                  icon="settings"
                  @click="openSetting(props.row)"
                  dense
                  flat
                  >setting</q-btn
                >
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-device="props">
            <q-td :props="props">
              <div>
                <q-btn
                  class="description-btn"
                  icon="inbox"
                  @click="openDevicesModal(props.row)"
                  dense
                  flat
                  >Deivces</q-btn
                >
              </div>
            </q-td>
          </template>
        </q-table>
      </div>

      <!-- MOBILE TABLE -->
      <div
        v-if="this.$q.platform.is.mobile && !this.$q.platform.is.ipad"
        class="q-pa-md"
      >
        <q-table
          class="device-table"
          :data="userData"
          :columns="columnsMobile"
          :pagination="pagination"
          :filter="userID"
          :loading="loading"
          no-data-label="No Data"
        >
          <template v-slot:top-left>
            <p class="title title-banner">Users List</p>
          </template>

          <template v-slot:top-right>
            <div class="id-selecter">
              <q-input dense outlined rounded v-model="userID" label="Serach">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
                <template v-slot:append>
                  <q-icon
                    v-if="userID !== ''"
                    name="close"
                    @click="userID = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </template>
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>

          <template v-slot:body-cell-setting="props">
            <q-td :props="props">
              <div>
                <q-btn
                  class="description-btn-mobile"
                  @click="openSetting(props.row)"
                  icon="settings"
                  dense
                  flat
                ></q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <q-dialog v-model="isOpenModal">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="q-ml-sm text-h6">Description</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-lg">
          <div class="row">
            <p class="data-title">ID :</p>
            <q-badge class="q-ml-md badge-id">{{ modal.id }}</q-badge>
          </div>

          <div class="row q-mt-md">
            <p class="data-title q-mr-sm">Username :</p>
            <p>{{ modal.username }}</p>
            <!-- <q-badge class="q-ml-md badge-id">{{ modal.imei }}</q-badge> -->
          </div>

          <div class="row">
            <p class="q-mt-md q-mr-md data-title">Status :</p>
            <!-- <q-btn
              :color="modal.userEnabled == true ? 'green' : 'red'"
              @click="toggleEnabledChange(modal)"
              class="toggle-btn"
              :icon-right="modal.userEnabled == true ? 'done' : 'close'"
              >{{ modal.userEnabled == true ? "Enable" : "Disable" }}</q-btn
            > -->
            <q-toggle
              keep-color
              class=""
              size="lg"
              v-model="modal.userEnabled"
              checked-icon="check"
              color="primary"
              unchecked-icon="clear"
            />
            <!-- <q-badge class="q-ml-md badge-id">{{ modal.imei }}</q-badge> -->
          </div>

          <q-form class="q-gutter-sm q-mt-xs modal-form">
            <div class="row justify-between">
              <div class="col-6  q-pr-sm">
                <p class="data-title">Firstname</p>
                <q-input
                  class="input-field"
                  square
                  filled
                  clearable
                  v-model="modal.firstname"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-sm">
                <p class="data-title">Lastname</p>
                <q-input
                  class="input-field"
                  square
                  filled
                  clearable
                  v-model="modal.lastname"
                  type="text"
                />
              </div>
            </div>

            <div>
              <p class="data-title">Phone Number</p>
              <q-input
                class="input-field"
                square
                filled
                clearable
                mask="###-#######"
                v-model="modal.phoneNumber"
              />
            </div>

            <div>
              <p class="data-title">Line Key</p>
              <q-input
                class="input-field"
                square
                filled
                clearable
                v-model="modal.lineKey"
                type="text"
              />
            </div>
          </q-form>
        </q-card-section>

        <q-card-section
          v-if="this.$q.platform.is.desktop || this.$q.platform.is.ipad"
          class="row justify-center"
        >
          <q-btn
            rounded
            class="q-mr-xs"
            @click="openResetPassword"
            color="positive"
            ><q-icon
              class="q-mr-sm"
              name="replay"
              size="name"
              color="white"
            />Reset Password</q-btn
          >
          <q-btn rounded class="q-ml-xs" @click="openConfirm" color="primary"
            ><q-icon
              class="q-mr-sm"
              name="save"
              size="name"
              color="white"
            />editing save</q-btn
          >
        </q-card-section>
        <q-card-section v-else class="column justify-center">
          <q-btn
            rounded
            class="q-mr-xs"
            @click="openResetPassword"
            color="positive"
            ><q-icon
              class="q-mr-sm"
              name="replay"
              size="name"
              color="white"
            />Reset Password</q-btn
          >
          <q-btn rounded class="q-mt-sm" @click="openConfirm" color="primary"
            ><q-icon
              class="q-mr-sm"
              name="save"
              size="name"
              color="white"
            />editing save</q-btn
          >
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deviceModal">
      <q-card class="device-modal">
        <q-card-section class="row items-center q-pb-none">
          <div class="q-ml-sm text-h6">User's Devices</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-lg">
          <div class="row justify-between">
            <p class="q-mt-md data-title">Devices List</p>
            <q-icon
              @click="openAddDeviceModal"
              class="add-device-btn"
              name="add_circle"
            ></q-icon>
            <!-- <q-btn
              icon="add_circle"
              class="add-device-btn"
              style="font-size: 16px"
              flat
              @click="openAddDeviceModal"
            ></q-btn> -->
          </div>
          <div>
            <q-table
              :data="modal.deviceList"
              :columns="deviceListColumn"
              no-data-label="No Device Data !"
            >
              <template v-slot:body-cell-handler="props">
                <q-td :props="props">
                  <!-- <q-btn class="delete-icon" flat icon="delete" color="grey-8"></q-btn> -->
                  <q-icon
                    class="delete-icon"
                    @click="removeDevice(props.row)"
                    name="delete"
                  ></q-icon>
                </q-td>
              </template>
            </q-table>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="openAddDevice" persistent>
      <q-card class="addDevice-card">
        <q-card-section>
          <div class="row">
            <q-input
              dense
              outlined
              rounded
              v-model="searchID"
              label="Device ID"
              @input="searhDevice"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-section
          v-if="searchResult.name"
          class="text-grey-8 result-text row justify-center"
        >
          <div
            class="column items-center justify-center"
            v-if="searchResult.userName !== '-'"
          >
            <p class="col">
              <span class="text-bold">ID :</span> {{ searchResult.deviceID }}
            </p>
            <p class="col">
              Device has already
            </p>
          </div>
          <div class="column items-center justify-center" v-else>
            <p class="col">
              <span class="text-bold">ID :</span> {{ searchResult.deviceID }}
            </p>
            <p class="col">
              <span class="text-bold">NAME :</span>
              {{ searchResult.name }}
            </p>
          </div>
        </q-card-section>

        <q-card-section
          v-if="!searchResult.name"
          class="text-grey-8 result-text column items-center justify-center"
        >
          <p>Message :</p>
          <p v-if="searchID !== ''">Device's ID not found !</p>
          <p v-else>Please enter device ID</p>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn rounded label="Cancel" color="red" v-close-popup />
          <q-btn
            v-if="searchResult.name && searchResult.userName === '-'"
            label="Add"
            @click="addDevice"
            rounded
            color="green"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="openResetModal" persistent>
      <q-card class="addDevice-card">
        <q-card-section>
          <div class="column">
            <div class="row">
              <q-input
                type="password"
                dense
                outlined
                rounded
                :rules="[
                  val => val.length >= 6 || 'Please use minimum 6 characters'
                ]"
                v-model="newPassword"
                label="New Password"
              >
                <template v-slot:prepend>
                  <q-icon name="fiber_new" />
                </template>
              </q-input>
            </div>
            <div class="q-mt-sm row">
              <q-input
                type="password"
                dense
                outlined
                rounded
                :rules="[val => val.length >= 6 || 'Field is required']"
                v-model="confirmNewPassword"
                label="New Password"
                @input="checkPassword"
              >
                <template v-slot:prepend>
                  <q-icon name="security" />
                </template>
              </q-input>
            </div>
            <div class="q-mt-sm row justify-center">
              <p class="error-msg-reset">{{ errResetPassword }}</p>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            @click="
              (errResetPassword = ''),
                (newPassword = ''),
                (confirmNewPassword = '')
            "
            rounded
            label="Cancel"
            color="red"
            v-close-popup
          />
          <q-btn
            v-if="canReset"
            @click="resetPassword"
            label="Reset"
            rounded
            color="green"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="openConfirmModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <span class="q-ml-sm"
            ><p style="font-size: 18px" class="q-mt-md q-px-xl">
              Confirm Editing ?
            </p></span
          >
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Cancel" color="red" v-close-popup />
          <q-btn
            @click="confirmUpdate"
            flat
            label="Submit"
            color="green"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "userlist-page",
  data() {
    return {
      errResetPassword: "\xa0",
      userID: "",
      isOpenModal: false,
      val: true,
      text: "",
      openConfirmModal: false,
      deviceModal: false,
      openAddDevice: false,
      toggleChangeId: "",
      toggleChangeValue: "",
      searchID: "",
      openResetModal: false,
      newPassword: "",
      confirmNewPassword: "",
      canReset: false,
      modal: {
        id: "",
        firstname: "",
        lastname: "",
        username: "",
        phoneNumber: "",
        userEnabled: "",
        lineKey: "",
        deviceList: []
      },
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      loading: false,
      isEnabled: true,
      deviceListColumn: [
        {
          name: "id",
          label: "ID",
          align: "center",
          field: row => row.id
        },
        {
          name: "name",
          label: "Name",
          align: "center",
          field: row => row.name
        },
        {
          name: "handler",
          label: "Handler",
          align: "center",
          field: row => row
        }
      ],
      columnsMobile: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: row => row.userID,
          //   format: val => `${val}`,
          sortable: true
        },
        {
          name: "username",
          align: "center",
          label: "Username",
          field: "userName",
          sortable: true
        },
        {
          name: "setting",
          align: "center",
          label: "User Setting",
          sortable: true
        }
      ],
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: row => row.userID,
          //   format: val => `${val}`,
          sortable: true
        },
        {
          name: "firstname",
          align: "center",
          label: "Firstname",
          field: "firstname",
          sortable: true
        },
        {
          name: "lastname",
          align: "center",
          label: "LastName",
          field: "lastname",
          sortable: true
        },
        {
          name: "username",
          align: "center",
          label: "Username",
          field: "userName",
          sortable: true
        },
        {
          name: "phoneNumber",
          align: "center",
          label: "Phone Number",
          field: "phone",
          sortable: true
        },
        {
          name: "enabled",
          align: "center",
          label: "User Enabled",
          field: "user_enable",
          sortable: true
        },
        {
          name: "setting",
          align: "center",
          label: "User Setting",
          sortable: true
        },
        {
          name: "device",
          align: "center",
          label: "Device"
        }
      ],
      pageUserData: []
    };
  },
  computed: {
    ...mapState({
      userData: state => state.device.userData,
      userListId: state => state.device.userListId,
      searchResult: state => state.device.searchResult,
      addDeviceResult: state => state.device.addDeviceResult
    }),
    userEnabled: {
      get() {
        // console.log("this.userData.userEnabled", this.userData.userEnabled);
        return this.userData.userEnabled;
      },
      set(value) {
        this.$store.commit("CHANGE_USER_ENABLED", value);
      }
    }
  },
  methods: {
    async openResetPassword() {
      this.openResetModal = true;
    },
    checkPassword() {
      if (this.newPassword !== this.confirmNewPassword) {
        this.errResetPassword = "Password not match !";
      } else {
        this.errResetPassword = "\xa0";
        this.canReset = true;
      }
    },
    async resetPassword() {
      // console.log("RESET");
      this.$store.dispatch("resetPassword", {
        userID: this.modal.id,
        newPassword: this.newPassword
      })
    },
    async openDevicesModal(row) {
      // console.log(row);
      this.$store.commit("CLEAR_SEARCH_RESULT");
      this.modal.deviceList = row.deviceID;
      this.modal.userID = row.userID;
      this.deviceModal = true;
    },
    async openAddDeviceModal() {
      this.$store.commit("CLEAR_SEARCH_RESULT");
      this.searchID = "";
      this.openAddDevice = true;
    },
    async addDevice() {
      let res = await this.modal.deviceList.filter(
        device => device.id === this.searchID
      ).length;
      if (res === 0) {
        await this.$store.dispatch("addUserDevice", {
          userID: this.modal.userID,
          deviceID: this.searchResult.deviceID
        });
        // console.log("set modal");
        this.modal.deviceList = await this.addDeviceResult;
      }
    },
    async removeDevice(device) {
      let deviceList = this.modal.deviceList;
      let res = deviceList.filter(dvc => dvc.id !== device.id);
      // console.log(res);
      this.$store.commit("SET_USER_DEVICE", {
        userID: this.modal.userID,
        deviceID: res
      });
      this.$store.dispatch("removeUserDevice", {
        userID: this.modal.userID,
        deviceID: device.id
      });
      this.modal.deviceList = res;
    },
    async changeHandle(props) {
      // console.log(props);
    },
    async openConfirm() {
      this.openConfirmModal = true;
    },
    async openSetting(row) {
      // console.log(row);
      this.modal = await {
        id: row.userID,
        firstname: row.firstname,
        lastname: row.lastname,
        username: row.userName,
        phoneNumber: row.phone,
        userEnabled: row.user_enable,
        lineKey: row.lineKey,
        deviceList: row.deviceList
      };
      this.isOpenModal = true;
    },
    async confirmUpdate() {
      // console.log("Update");
      this.$store.dispatch("updateUser", {
        userID: this.modal.id,
        username: this.modal.username,
        firstname: this.modal.firstname,
        lastname: this.modal.lastname,
        phone: this.modal.phoneNumber,
        lineKey: this.modal.lineKey,
        user_enable: this.modal.userEnabled
      });
      this.isOpenModal = false;
    },
    async searhDevice() {
      // console.log(this.searchID.length);
      if (this.searchID.length !== 0) {
        this.$store.dispatch("searhDeviceByID", this.searchID);
      } else {
        this.$store.dispatch("searhDeviceByID", 0);
      }
    }
  },
  created() {
    this.pageUserData = this.userData;
  },
  mounted() {
    this.$store.dispatch("getUserList");
  }
};
</script>

<style scoped>
header {
  font-family: "prompt";
}
p {
  font-family: "prompt";
}

button {
  font-family: "prompt";
}

.error-msg-reset {
  font-size: 14px;
  font-weight: 100;
  color: red;
}

.toggle-btn {
  height: 32px;
  width: 120px;
}

.delete-icon {
  font-size: 24px;
  color: grey;
  cursor: pointer;
  transition: 0.3s;
}

.delete-icon:hover {
  color: #c10015;
  font-size: 26px;
}

.add-device-btn {
  font-size: 30px;
  /* margin-top: 12px; */
  color: #757575;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  top: 12px;
}

.add-device-btn:hover {
  font-size: 35px;
  color: #0288d1;
  top: 10px;
}

.title {
  font-size: 28px;
}
.device-table {
  padding-left: 20px;
  padding-right: 20px;
  width: 80vw;
}
.modal-form {
  width: 25vw;
}
.badge-id {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  height: 22px;
  font-size: 16px;
}

.search-by-id {
  border-radius: 30px;
}

.description-btn {
  width: 120px;
  border-radius: 50px;
  background-color: #0288d1;
  color: white;
}

.description-btn:hover {
  width: 120px;
  cursor: pointer;
  border-radius: 50px;
  background-color: #2c323f;
  color: white;
  animation: pulse;
  animation-duration: 1s;
}

.description-btn-mobile {
  width: 60px;
  font-size: 12px;
  border-radius: 50px;
  background-color: #0288d1;
  color: white;
}

.description-btn-mobile:hover {
  width: 60px;
  font-size: 12px;
  border-radius: 50px;
  background-color: #2c323f;
  color: white;
}

.device-modal {
  width: 50vw;
}

.addDevice-card {
  padding: 10px 50px 10px 50px;
}

/* Mobile */
@media only screen and (max-width: 420px) {
  .title {
    padding-top: 0px;
    font-size: 20px;
  }
  .device-table {
    padding-left: 0px;
    padding-right: 0px;
    width: 90vw;
  }
  .modal-form {
    width: 100%;
  }
  .id-selecter {
    padding-bottom: 10px;
  }
}

/* Tablet Ipad */
@media only screen and (min-width: 500px) and (max-width: 1025px) {
  .title {
    padding-top: 0px;
    font-size: 28px;
  }
  .device-table {
    padding-left: 15px;
    padding-right: 15px;
    width: 85vw;
  }
  .modal-form {
    width: 100%;
  }
}
</style>
