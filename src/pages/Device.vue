<template>
  <q-page>
    <!-- <div class="row justify-center">
      <p class="title">รายการอุปกรณ์</p>
    </div> -->

    <!-- <div class="row justify-center id-selecter">
      <q-btn-dropdown outline rounded label="Select User ID">
        <q-list v-for="item in userListId" :key="item.index">
          <q-item clickable v-close-popup>
            <q-item-section @click="searcByhUserId(item)">
              <q-item-label>{{ item }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div> -->
    <div class="row justify-center ">
      <div
        v-if="this.$q.platform.is.desktop || this.$q.platform.is.ipad"
        class="q-pa-xl"
      >
        <q-table
          class="device-table"
          :data="deviceData"
          :columns="columns"
          :pagination="pagination"
          :loading="loading"
          :filter="searchUserId"
          no-data-label="No data"
        >
          <template v-slot:top-left>
            <p class="title">Devices List</p>
          </template>

          <template v-slot:top-right>
            <div class="id-selecter">
              <q-btn-dropdown
                class="btn-selecter"
                rounded
                flat
                :label="searchUserId === '' ? 'Show All' : searchUserId"
              >
                <q-list v-for="item in userListId" :key="item.index">
                  <q-item-section clickable v-close-popup>
                    <q-item-section @click="searcByhUserId(item)">
                      <q-item-label class="item-label cursor-pointer">{{
                        item
                      }}</q-item-label>
                    </q-item-section>
                  </q-item-section>
                </q-list>
              </q-btn-dropdown>
            </div>
          </template>

          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>

          <template v-slot:body-cell-setting="props">
            <q-td :props="props">
              <div>
                <q-btn
                  class="description-btn"
                  @click="openSetting(props.row)"
                  dense
                  flat
                  >description</q-btn
                >
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
      <div
        v-if="this.$q.platform.is.mobile && !this.$q.platform.is.ipad"
        class="q-pa-md"
      >
        <q-table
          class="device-table"
          :data="deviceData"
          :columns="columnsMobile"
          :pagination="pagination"
          :filter="searchUserId"
          :loading="loading"
          no-data-label="No data"
        >
          <template v-slot:top-left>
            <p class="title">Devices List</p>
          </template>

          <template v-slot:top-right>
            <div class="id-selecter">
              <q-btn-dropdown outline rounded label="Select User ID">
                <q-list v-for="item in userListId" :key="item.index">
                  <q-item-section clickable v-close-popup>
                    <q-item-section @click="searcByhUserId(item)">
                      <q-item-label class="item-label cursor-pointer">{{
                        item
                      }}</q-item-label>
                    </q-item-section>
                  </q-item-section>
                </q-list>
              </q-btn-dropdown>
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
                  icon="description"
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
            <p class="q-mr-sm data-title">Device ID :</p>
            <p>{{ modal.deviceId }}</p>
            <!-- <q-badge class="q-ml-md badge-id">{{ modal.deviceId }}</q-badge> -->
          </div>

          <div class="row">
            <p class="q-mr-sm data-title">User ID :</p>
            <p>{{ modal.userId }}</p>
            <!-- <q-badge class="q-ml-md badge-id">{{ modal.imei }}</q-badge> -->
          </div>

          <div class="row">
            <p class="q-mr-sm data-title">IMEI :</p>
            <p>{{ modal.imei }}</p>
            <!-- <q-badge class="q-ml-md badge-id">{{ modal.imei }}</q-badge> -->
          </div>

          <div class="row">
            <p class="q-mr-sm data-title">
              Current Temperature :
            </p>
            <p>{{ modal.currentTemp }}°C</p>
            <!-- <q-badge class="q-ml-md badge-id"
              >{{ modal.currentTemp }}°C</q-badge
            > -->
          </div>

          <q-form class="q-gutter-sm q-mt-xs modal-form">
            <div>
              <p class="data-title">Device Name</p>
              <q-input
                square
                filled
                clearable
                v-model="modal.deviceName"
                type="text"
                placeholder="Device Name"
              />
            </div>

            <div class="row justify-between">
              <div class="col-6  q-pr-sm">
                <p class="data-title">Min Temperature</p>
                <q-input
                  square
                  filled
                  clearable
                  v-model="modal.minTemp"
                  type="text"
                  placeholder="Min"
                />
              </div>
              <div class="col-6 q-pl-sm">
                <p class="data-title">Max Temperature</p>
                <q-input
                  square
                  filled
                  clearable
                  v-model="modal.maxTemp"
                  type="text"
                  placeholder="Max"
                />
              </div>
            </div>
            <div>
              <p class="data-title">Send Line</p>
              <q-input
                square
                filled
                clearable
                v-model="modal.sendLine"
                type="text"
                placeholder="Send Line"
              />
            </div>
          </q-form>
        </q-card-section>

        <q-card-section class="row justify-center">
          <q-btn rounded @click="openConfirm" color="primary">editing save</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="openConfirmModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <span class="q-ml-sm"
            ><p style="font-size: 18px" class="q-mt-md q-px-xl">
              Comfirm Editing ?
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
  name: "device",
  data() {
    return {
      isOpenModal: false,
      openConfirmModal: false,
      searchUserId: "",
      modal: {
        deviceId: "",
        imei: "",
        deviceName: "",
        currentTemp: "",
        maxTemp: "",
        minTemp: "",
        sendLine: "",
        userId: ""
      },
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 5
      },
      loading: false,
      columnsMobile: [
        {
          name: "device-id",
          required: true,
          label: "Device ID",
          align: "center",
          field: row => row.deviceId,
          //   format: val => `${val}`,
          sortable: true
        },
        {
          name: "userID",
          align: "left",
          label: "User ID",
          field: "userId",
          sortable: true
        },
        {
          name: "setting",
          align: "center",
          label: "Description",
          field: "setting",
          sortable: true
        }
      ],
      columns: [
        {
          name: "device-id",
          required: true,
          label: "Device ID",
          align: "left",
          field: row => row.deviceId,
          //   format: val => `${val}`,
          sortable: true
        },
        {
          name: "IMEI",
          align: "center",
          label: "IMEI",
          field: "imei",
          sortable: true
        },
        {
          name: "name",
          align: "center",
          label: "Name",
          field: "deviceName",
          sortable: true
        },
        {
          name: "current-temp",
          align: "center",
          label: "Current Temperature (°C)",
          field: "currentTemp",
          sortable: true
        },
        {
          name: "max-temp",
          align: "center",
          label: "Max Temperature (°C)",
          field: "maxTemp",
          sortable: true
        },
        {
          name: "min-temp",
          align: "center",
          label: "Min Temperature (°C)",
          field: "minTemp",
          sortable: true
        },
        {
          name: "userID",
          align: "left",
          label: "User ID",
          field: "userId",
          sortable: true
        },
        {
          name: "send-line",
          align: "left",
          label: "Send Line",
          field: "sendLine",
          sortable: true
        },
        {
          name: "setting",
          align: "center",
          label: "Description",
          field: "settin",
          sortable: true
        }
      ]
    };
  },
  computed: {
    ...mapState({
      deviceData: state => state.device.deviceData,
      userListId: state => state.device.userListId
    }),
    pagesNumber() {
      return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
    }
  },
  methods: {
    async openConfirm() {
      this.openConfirmModal = true;
    },
    async confirmUpdate() {
      this.isOpenModal = false;
    },
    async searcByhUserId(id) {
      this.loading = true;
      if (id === "Show All") {
        this.searchUserId = "";
      } else {
        this.searchUserId = id;
      }
      console.log(this.searchUserId);
      this.loading = false;
    },
    async openSetting(row) {
      this.modal = await {
        deviceId: row.deviceId,
        deviceName: row.deviceName,
        imei: row.imei,
        currentTemp: row.currentTemp,
        maxTemp: row.maxTemp,
        minTemp: row.minTemp,
        sendLine: row.sendLine,
        userId: row.userId
      };
      this.isOpenModal = true;
      console.log(this.modal.deviceId);
    }
  },
  async beforeCreate() {
    this.$store.dispatch("fetchUserListId");
    console.log(this.userListId);
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

.id-selecter {
  padding: 0px;
}

.btn-selecter {
  border: solid 1px #c2c2c2;
  width: 220px;
}

.item-label {
  padding: 10px;
  padding-left: 20px;
  font-family: "prompt";
}

.item-label:hover {
  color: #0288d1;
}

.title {
  padding-top: 20px;
  font-size: 28px;
}

.data-title {
  font-family: "prompt";
  font-weight: bolder;
  font-size: 15px;
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
