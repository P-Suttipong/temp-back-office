<template>
  <q-page class="column flex justify-center items-center">
    <div>
      <q-card class="add-device-form">
        <q-form class="q-gutter-sm q-mt-xs modal-form">
          <div class="row justify-center">
            <p class="title title-banner">Add New User</p>
          </div>
          <div class="row justify-between">
            <div class="col-xl-6 col-sm-12">
              <div>
                <p class="data-title">Username*</p>
                <q-input
                  v-model="username"
                  square
                  filled
                  clearable
                  type="text"
                  placeholder="Username"
                  :rules="[val => !!val || 'Field is required']"
                />
              </div>

              <div class="row justify-between">
                <div class="col-6  q-pr-sm">
                  <p class="data-title">Password*</p>
                  <q-input
                    v-model="password"
                    square
                    filled
                    clearable
                    type="password"
                    placeholder="Password"
                    :rules="[val => !!val || 'Field is required']"
                  />
                </div>
                <div class="col-6 q-pl-sm">
                  <p class="data-title">Confirm*</p>
                  <q-input
                    v-model="confirmPassword"
                    square
                    filled
                    clearable
                    type="password"
                    placeholder="Confirm Password"
                    :rules="[val => !!val || 'Field is required']"
                  />
                </div>
              </div>

              <div class="row justify-between">
                <div class="col-6  q-pr-sm">
                  <p class="data-title">Firstname*</p>
                  <q-input
                    v-model="firstname"
                    square
                    filled
                    clearable
                    type="text"
                    placeholder="Firstname"
                    :rules="[val => !!val || 'Field is required']"
                  />
                </div>
                <div class="col-6 q-pl-sm">
                  <p class="data-title">Lastname*</p>
                  <q-input
                    v-model="lastname"
                    square
                    filled
                    clearable
                    type="text"
                    placeholder="Lastname"
                    :rules="[val => !!val || 'Field is required']"
                  />
                </div>
              </div>

              <div>
                <p class="data-title">Phone Number*</p>
                <q-input
                  v-model="phone"
                  square
                  filled
                  clearable
                  type="text"
                  mask="###-###-####"
                  placeholder="Phone Number"
                  :rules="[val => !!val || 'Field is required']"
                />
              </div>

              <div>
                <p class="data-title">Line Key</p>
                <q-input
                  v-model="lineKey"
                  square
                  filled
                  clearable
                  type="text"
                  placeholder="Line Key"
                />
              </div>
            </div>
            <div class="col-xl-5 col-sm-12">
              <div class="row justify-between">
                <p class="q-mt-md data-title">Device List</p>
                <q-btn
                  icon="add_circle"
                  class="add-device-btn text-grey-8"
                  flat
                  @click="openAddDeviceModal"
                ></q-btn>
              </div>
              <div>
                <q-table
                  :data="deviceID"
                  :columns="deviceListColumn"
                  no-data-label="No Device Data !"
                >
                  <template v-slot:body-cell-delete="props">
                    <q-td :props="props">
                      <q-btn
                        @click="deleteDevice(props.row)"
                        flat
                        icon="delete"
                        color="grey-8"
                      ></q-btn>
                    </q-td>
                  </template>
                </q-table>
              </div>
            </div>
          </div>
        </q-form>
        <div class="q-pt-lg row justify-center">
          <q-btn @click="openConfirm" rounded class="add-btn">
            Add User
          </q-btn>
        </div>
      </q-card>
    </div>

    <q-dialog v-model="openConfirmModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <span class="q-ml-sm"
            ><p style="font-size: 18px" class="q-mt-md q-px-xl">
              Comfirm register user ?
            </p></span
          >
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Cancel" color="red" v-close-popup />
          <q-btn
            @click="confirmAdd"
            flat
            label="Submit"
            color="green"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="errorModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <span class="q-ml-sm"
            ><p style="font-size: 18px" class="q-mt-md q-px-xl">
              {{ errorMessage }}
            </p></span
          >
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="OK" color="red" v-close-popup />
        </q-card-actions>
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
            @click="addToDeviceList"
            rounded
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
  name: "add-user-page",
  data() {
    return {
      searchID: "",
      username: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      phone: "",
      lineKey: "",
      deviceID: [],
      text: "",
      errorMessage: "",
      openConfirmModal: false,
      openAddDevice: false,
      errorModal: false,
      result: [],
      searchDevice: "",
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
          field: row => row.imei
        },
        {
          name: "delete",
          label: "Delete",
          align: "center",
          field: row => row
        }
      ]
    };
  },
  computed: {
    ...mapState({
      searchResult: state => state.device.searchResult
    })
  },
  methods: {
    async addToDeviceList() {
      this.deviceID.push({
        id: this.searchResult.deviceID,
        imei: this.searchResult.imei
      });
      // console.log(this.deviceID);
    },
    async openConfirm() {
      if (this.username === "" || this.username === null) {
        this.errorModal = true;
        this.errorMessage = "Complete Username field !";
      } else if (this.password === "" || this.password === null) {
        this.errorModal = true;
        this.errorMessage = "Complete Password field !";
      } else if (this.password !== this.confirmPassword) {
        this.errorModal = true;
        this.errorMessage = "Password and Confirmpassword don't match";
      } else if (this.firstname === "" || this.firstname === null) {
        this.errorModal = true;
        this.errorMessage = "Complete Firstname field !";
      } else if (this.lastname === "" || this.lastname === null) {
        this.errorModal = true;
        this.errorMessage = "Complete Lastname field !";
      } else if (this.phone === "" || this.phone === null) {
        this.errorModal = true;
        this.errorMessage = "Complete Phone Number field !";
      } else {
        this.openConfirmModal = true;
      }
    },
    async openAddDeviceModal() {
      this.openAddDevice = true;
      this.searchID = "";
      this.$store.commit("CLEAR_SEARCH_RESULT");
    },
    async confirmAdd() {
      // console.log("confirm");
      let res = await this.$store.dispatch("register", {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        phone: this.phone,
        lineKey: this.lineKey,
        deviceID: this.deviceID
      });
      // console.log("REGISTER", res);
      if (
        res.username === "Duplicate username" ||
        res.username === "Check Username"
      ) {
        this.errorModal = true;
        this.errorMessage = "Username has already register";
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        this.firstname = "";
        this.lastname = "";
        this.phone = "";
        this.lineKey = "";
        this.deviceID = [];
      } else if (res.status === true) {
        this.errorModal = true;
        this.errorMessage = "Add User Complete";
      } else {
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        this.firstname = "";
        this.lastname = "";
        this.phone = "";
        this.lineKey = "";
        this.deviceID = [];
      }
    },
    async deleteDevice(item) {
      // console.log(item);
      let res = this.deviceID.filter(res => res.id !== item.id);
      this.deviceID = res;
      // console.log(res);
    },
    async searhDevice() {
      if (this.searchID.length !== 0) {
        this.$store.dispatch("searhDeviceByID", this.searchID);
      } else {
        this.$store.dispatch("searhDeviceByID", 0);
      }
    }
  }
};
</script>

<style scoped>
.title {
  width: 270px;
  font-size: 28px;
}

.result-text {
  font-size: 16px;
}

.add-device-form {
  padding: 30px 80px 50px 80px;
  margin-top: 50px;
  margin-bottom: 50px;
}
.modal-form {
  width: 50vw;
}

.addDevice-card {
  padding: 10px 50px 10px 50px;
}

/* Mobile */
@media only screen and (max-width: 420px) {
  .add-device-form {
    padding: 10px 10px 30px 10px;
    margin: 15px 10px 30px 10px;
  }
  .modal-form {
    width: 100%;
  }
}

/* Tablet Ipad */
@media only screen and (min-width: 500px) and (max-width: 1025px) {
  .add-device-form {
    padding: 30px 60px 50px 60px;
    margin: 15px 30px 30px 30px;
  }
  .modal-form {
    width: 100%;
  }
}
</style>
