<template>
  <q-page>
    <div class="row justify-center">
      <p class="title">รายการอุปกรณ์</p>
    </div>

    <div class="row justify-center">
      <!-- <q-input outlined v-model="userId" label="User ID">
        <template v-slot:append>
          <q-icon
            v-if="userId !== ''"
            name="close"
            @click="userId = ''"
            class="cursor-pointer"
          />
          <q-icon name="search" />
        </template>
      </q-input> -->
      <q-btn-dropdown label="Select User ID">
        <q-list v-for="item in userListId" :key="item.index">
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label @click="searcByhUserId(item)">{{
                item
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
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
          no-data-label="ไม่มีข้อมูลที่ต้องการ"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>

          <template v-slot:body-cell-setting="props">
            <q-td :props="props">
              <div>
                <q-btn
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
          no-data-label="ไม่มีข้อมูลที่ต้องการ"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>

          <template v-slot:body-cell-setting="props">
            <q-td :props="props">
              <div>
                <q-btn
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
            <p>Device ID:</p>
            <q-badge class="q-ml-md badge-id">{{ modal.deviceId }}</q-badge>
          </div>

          <div class="row">
            <p>IMEI: {{ modal.imei }}</p>
            <!-- <q-badge class="q-ml-md badge-id">{{ modal.imei }}</q-badge> -->
          </div>

          <div class="row">
            <p>Current Temperature: {{ modal.currentTemp }}°C</p>
            <!-- <q-badge class="q-ml-md badge-id"
              >{{ modal.currentTemp }}°C</q-badge
            > -->
          </div>

          <q-form class="q-gutter-sm q-mt-xs modal-form">
            <div>
              <p>Device Name</p>
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
                <p>Min Temperature</p>
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
                <p>Max Temperature</p>
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
              <p>Send Line</p>
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
          <q-btn color="primary">บันทึกการตั้งค่า</q-btn>
        </q-card-section>
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
    async searcByhUserId(id) {
      this.loading = true;
      if (id === "แสดงทั้งหมด") {
        this.searchUserId = "";
      } else {
        this.searchUserId = id;
      }
      console.log(this.searchUserId)
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
        sendLine: row.sendLine
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

.title {
  padding-top: 32px;
  font-size: 32px;
}
.device-table {
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
    padding-top: 30px;
    font-size: 20px;
  }
  .device-table {
    width: 90vw;
  }
  .modal-form {
    width: 100%;
  }
}

/* Tablet Ipad */
@media only screen and (min-width: 500px) and (max-width: 1025px) {
  .title {
    padding-top: 15px;
    font-size: 32px;
  }
  .device-table {
    width: 85vw;
  }
  .modal-form {
    width: 100%;
  }
}
</style>
