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
          :filter="userId"
          no-data-label="No data"
        >
          <template v-slot:top-left>
            <p class="title">Users List</p>
          </template>

          <template v-slot:top-right>
            <div class="id-selecter">
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
            </div>
          </template>
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>

          <template v-slot:body-cell-enabled="props">
            <q-td :props="props">
              <div>
                <q-btn
                  :color="props.row.userEnabled == true ? 'green' : 'red'"
                  flat
                  >{{
                    props.row.userEnabled == true ? "Enable" : "Disable"
                  }}</q-btn
                >
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-setting="props">
            <q-td :props="props">
              <div>
                <q-btn
                  class="description-btn"
                  @click="openSetting(props.row)"
                  dense
                  flat
                  >setting</q-btn
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
          :filter="userId"
          :loading="loading"
          no-data-label="No Data"
        >
          <template v-slot:top-left>
            <p class="title">Users List</p>
          </template>

          <template v-slot:top-right>
            <div class="id-selecter">
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
            <p>ID:</p>
            <q-badge class="q-ml-md badge-id">{{ modal.id }}</q-badge>
          </div>

          <div class="row">
            <p>Username: {{ modal.username }}</p>
            <!-- <q-badge class="q-ml-md badge-id">{{ modal.imei }}</q-badge> -->
          </div>

          <div class="row">
            <p class="q-mt-xs q-mr-md">Status:</p>
            <q-btn
              :color="modal.userEnabled == true ? 'green' : 'red'"
              @click="toggleEnabledChange(modal)"
              class="toggle-btn"
              >{{ modal.userEnabled == true ? "Enable" : "Disable" }}</q-btn
            >
            <!-- <q-badge class="q-ml-md badge-id">{{ modal.imei }}</q-badge> -->
          </div>

          <q-form class="q-gutter-sm q-mt-xs modal-form">
            <div class="row justify-between">
              <div class="col-6  q-pr-sm">
                <p>Firstname</p>
                <q-input
                  square
                  filled
                  clearable
                  v-model="modal.firstname"
                  type="text"
                  placeholder="Firstname"
                />
              </div>
              <div class="col-6 q-pl-sm">
                <p>Lastname</p>
                <q-input
                  square
                  filled
                  clearable
                  v-model="modal.lastname"
                  type="text"
                  placeholder="Lastname"
                />
              </div>
            </div>

            <div>
              <p>Phone Number</p>
              <q-input
                square
                filled
                clearable
                mask="###-#######"
                v-model="modal.phoneNumber"
                placeholder="Phone Number"
              />
            </div>

            <div>
              <p>Line Key</p>
              <q-input
                square
                filled
                clearable
                v-model="modal.lineKey"
                type="text"
                placeholder="Line Key"
              />
            </div>

            <div>
              <p class="q-mt-md">Device List</p>
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label
                      >ID:TEMP00001 / Name: Device Name 1</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat icon="delete"></q-btn>
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label
                      >ID:TEMP00002 / Name: Device Name 2</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat icon="delete"></q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-input filled bottom-slots v-model="text" label="Device ID">
                <template v-slot:append>
                  <q-icon
                    v-if="text !== ''"
                    name="close"
                    @click="text = ''"
                    class="cursor-pointer"
                  />
                  <q-icon name="add_circle" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
          </q-form>
        </q-card-section>

        <q-card-section class="row justify-center">
          <q-btn rounded @click="openConfirm" color="primary">Editing save</q-btn>
        </q-card-section>
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
      userId: "",
      isOpenModal: false,
      text: "",
      openConfirmModal: false,
      toggleChangeId: "",
      toggleChangeValue: "",
      modal: {
        id: "",
        firstname: "",
        lastname: "",
        username: "",
        phoneNumber: "",
        userEnabled: "",
        lineKey: ""
      },
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 5
      },
      loading: false,
      isEnabled: true,
      columnsMobile: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: row => row.id,
          //   format: val => `${val}`,
          sortable: true
        },
        {
          name: "username",
          align: "center",
          label: "Username",
          field: "username",
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
          field: row => row.id,
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
          field: "username",
          sortable: true
        },
        {
          name: "phoneNumber",
          align: "center",
          label: "Phone Number",
          field: "phoneNumber",
          sortable: true
        },
        {
          name: "enabled",
          align: "center",
          label: "User Enabled",
          field: "userEnabled",
          sortable: true
        },
        {
          name: "setting",
          align: "center",
          label: "User Setting",
          sortable: true
        }
      ],
      pageUserData: []
    };
  },
  computed: {
    ...mapState({
      userData: state => state.device.userData,
      userListId: state => state.device.userListId
    }),
    userEnabled: {
      get() {
        console.log("this.userData.userEnabled", this.userData.userEnabled);
        return this.userData.userEnabled;
      },
      set(value) {
        this.$store.commit("CHANGE_USER_ENABLED", value);
      }
    }
  },
  methods: {
    async openConfirm() {
      this.openConfirmModal = true;
    },
    async openSetting(row) {
      this.modal = await {
        id: row.id,
        firstname: row.firstname,
        lastname: row.lastname,
        username: row.username,
        phoneNumber: row.phoneNumber,
        userEnabled: row.userEnabled,
        lineKey: row.lineKey
      };
      this.isOpenModal = true;
    },
    async toggleEnabledChange(user) {
      this.toggleChangeValue = !user.userEnabled;
      this.toggleChangeId = user.id;
      this.modal.userEnabled = !user.userEnabled;
      console.log(this.toggleChangeValue);
    },
    async confirmUpdate() {
      this.$store.commit("CHANGE_USER_ENABLED", {
        id: this.toggleChangeId,
        value: this.toggleChangeValue
      });
      this.isOpenModal = false;
    }
  },
  created() {
    this.pageUserData = this.userData;
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

.id-selecter {
}

.toggle-btn {
  height: 32px;
  width: 100px;
}

.title {
  padding-top: 20px;
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
  padding-left: 10px;
  padding-right: 10px;
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
