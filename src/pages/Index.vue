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
          :loading="deviceTableLoading"
          :filter="searchUserId"
          no-data-label="No data"
        >
          <template v-slot:top-left>
            <p class="title title-banner">Device List</p>
          </template>

          <template v-slot:top-right>
            <div class="id-selecter">
              <q-btn-dropdown
                class="btn-selecter"
                rounded
                flat
                :label="searchUserId === '' ? 'Show All' : searchUserId"
              >
                <q-list v-for="item in userListId" :key="item">
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

          <template v-slot:body-cell-sendLine="props">
            <q-td :props="props">
              <div>
                <q-btn
                  flat
                  :color="props.row.sendLine == true ? 'green' : 'red'"
                  class="toggle-btn"
                  :icon-right="props.row.sendLine == true ? 'done' : 'close'"
                ></q-btn>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-enable="props">
            <q-td :props="props">
              <div>
                <q-btn
                  flat
                  :color="props.row.isEnabled == true ? 'green' : 'red'"
                  class="toggle-btn"
                  :icon-right="
                    props.row.isEnabled == true
                      ? 'radio_button_checked'
                      : 'radio_button_unchecked'
                  "
                ></q-btn>
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
                  icon="settings"
                  >setting</q-btn
                >
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-description="props">
            <q-td :props="props">
              <div>
                <q-btn
                  class="description-btn"
                  @click="openDescription(props.row)"
                  dense
                  flat
                  icon="description"
                  >Description</q-btn
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
            <p class="title title-banner">Devices List</p>
          </template>

          <template v-slot:top-right>
            <div class="id-selecter">
              <q-btn-dropdown outline rounded label="Select User ID">
                <q-list v-for="(item, index) in userListId" :key="index">
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
                  icon="settings"
                  dense
                  flat
                ></q-btn>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-description="props">
            <q-td :props="props">
              <div>
                <q-btn
                  class="description-btn-mobile"
                  icon="description"
                  @click="openDescription(props.row)"
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
      <q-card class="modal-card">
        <q-card-section class="row items-center q-pb-none">
          <div class="q-ml-sm text-h6">Setting</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-lg">
          <div class="row">
            <p class="q-mr-sm data-title">Device ID :</p>
            <p>{{ modal.deviceID }}</p>
            <!-- <q-badge class="q-ml-md badge-id">{{ modal.deviceId }}</q-badge> -->
          </div>

          <div class="row">
            <p class="q-mr-sm data-title">User Name :</p>
            <p>{{ modal.userName }}</p>
            <!-- <q-badge class="q-ml-md badge-id">{{ modal.imei }}</q-badge> -->
          </div>

          <div>
            <p class="data-title">IMEI</p>
            <q-input
              class="input-field"
              square
              filled
              clearable
              v-model="modal.imei"
              type="text"
            />
          </div>

          <q-form class="q-gutter-sm q-mt-xs modal-form">
            <div>
              <p class="data-title">Device Name</p>
              <q-input
                class="input-field"
                square
                filled
                clearable
                v-model="modal.deviceName"
                type="text"
                :rules="[
                  val => !!val || 'Field is required',
                  val => val.length <= 16 || 'Please use maximum 16 characters'
                ]"
              />
            </div>

            <div>
              <p class="data-title q-mb-lg">Temperature</p>
              <q-range
                v-model="settingTemp"
                color="positive"
                :min="-40"
                :max="40"
                :left-label-color="'primary'"
                :right-label-color="'negative'"
                :left-label-value="'Min: ' + settingTemp.min + '°C'"
                :right-label-value="'Max: ' + settingTemp.max + '°C'"
                label-always
              />
            </div>

            <!-- <div class="row justify-between">
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
            </div> -->

            <div class="row justify-between">
              <p class="data-title q-mt-md">Send Line :</p>
              <q-toggle
                keep-color
                class=""
                size="lg"
                v-model="modal.sendLine"
                checked-icon="check"
                color="primary"
                unchecked-icon="clear"
              />
            </div>

            <div class="row justify-between">
              <p class="data-title q-mt-md">Device Enable:</p>
              <q-toggle
                keep-color
                class=""
                size="lg"
                v-model="modal.isEnabled"
                checked-icon="check"
                color="primary"
                unchecked-icon="clear"
              />
            </div>
          </q-form>
        </q-card-section>

        <q-card-section
          v-if="this.$q.platform.is.desktop || this.$q.platform.is.ipad"
          class="row justify-center"
        >
          <q-btn rounded class="q-mr-xs" @click="openConfirm" color="primary"
            ><q-icon
              class="q-mr-sm"
              name="save"
              size="name"
              color="white"
            />editing save</q-btn
          >
        </q-card-section>
        <q-card-section v-else class="column justify-center">
          <q-btn rounded class="q-mb-sm" @click="openConfirm" color="primary"
            ><q-icon class="q-mr-sm" name="save" size="name" color="white" />
            editing save</q-btn
          >
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="descriptionModal">
      <q-card class="description-modal">
        <q-card-section class="row flex q-mb-lg q-pb-none">
          <div class="text-h5">Temperature</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="row justify-center">
            <q-img class="thermo" src="~assets/img/thermometer.png" />
            <div class="q-mt-sm q-ml-xl column items-center">
              <p class="max">MAX : {{ modal.maxTemp }} °C</p>
              <p class=" current-banner">
                <span class="current">{{ modal.currentTemp }}</span>
                <span class="degree-unit">°C</span>
              </p>
              <p class="min">MIN : {{ modal.minTemp }} °C</p>
            </div>
          </div>
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
import Vue from "vue";
import { mapState } from "vuex";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

export default {
  name: "index",
  components: {},
  data() {
    return {
      fourth: false,
      enable: false,
      progress: 0,
      settingTemp: {
        min: -30,
        max: 30
      },
      options: {
        chart: {
          height: 500,
          type: "radialBar"
        },
        colors: ["#20E647"],
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#333",
              startAngle: -90,
              endAngle: 90
            },
            dataLabels: {
              name: {
                show: true,
                color: "#000",
                fontSize: "13px"
              },
              value: {
                fontSize: "30px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            gradientToColors: ["#87D4F9"],
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "butt"
        },
        labels: ["asdasdsa"]
      },
      series: [44],
      isOpenModal: false,
      openConfirmModal: false,
      searchUserId: "",
      descriptionModal: false,
      modal: {
        deviceID: "",
        imei: "",
        deviceName: "",
        currentTemp: "",
        maxTemp: "",
        minTemp: "",
        sendLine: "",
        userName: "",
        isEnabled: "",
        userID: ""
      },
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      loading: false,
      columnsMobile: [
        {
          name: "device-id",
          required: true,
          label: "Device ID",
          align: "center",
          field: row => row.deviceID,
          sortable: true
        },
        {
          name: "username",
          label: "User Name",
          align: "center",
          field: row => row.userName
        },
        {
          name: "setting",
          align: "center",
          label: "Settings",
          field: "setting",
          sortable: true
        },
        {
          name: "description",
          align: "center",
          label: "Description",
          field: "description"
        }
      ],
      columns: [
        {
          name: "device-id",
          required: true,
          label: "Device ID",
          align: "left",
          field: row => row.deviceID,
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
          field: "name",
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
          name: "userName",
          align: "center",
          label: "User Name",
          field: "userName",
          sortable: true
        },
        {
          name: "sendLine",
          align: "left",
          label: "Send Line",
          field: "sendLine"
        },
        {
          name: "enable",
          align: "center",
          label: "Enable",
          field: "isEnabled"
        },
        {
          name: "setting",
          align: "center",
          label: "Setting",
          field: "setting"
        },
        {
          name: "description",
          align: "center",
          label: "Description",
          field: "description"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      deviceData: state => state.device.deviceList,
      userListId: state => state.device.userListId,
      loginAt: state => state.device.loginAt,
      deviceTableLoading: state => state.device.deviceTableLoading
    }),
    pagesNumber() {
      return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
    },
    barColor() {
      if (this.barValue > 0.7) {
        return "negative";
      } else if (this.barValue < 0.3) {
        return "info";
      } else {
        return "positive";
      }
    },
    barValue() {
      if (
        this.modal.currentTemp > this.modal.minTemp &&
        this.modal.currentTemp < this.modal.maxTemp
      ) {
        let range = this.modal.maxTemp - this.modal.minTemp;
        let value = this.modal.maxTemp - this.modal.currentTemp;
        return (range - value) / range;
      }
      return 0;
    }
  },
  methods: {
    async openConfirm() {
      this.openConfirmModal = true;
    },
    async confirmUpdate() {
      this.$store.dispatch("updateDevice", {
        deviceID: this.modal.deviceID,
        name: this.modal.deviceName,
        imei: this.modal.imei,
        currentTemp: this.modal.currentTemp,
        maxTemp: this.settingTemp.max,
        minTemp: this.settingTemp.min,
        sendLine: this.modal.sendLine,
        userID: this.modal.userID,
        isEnabled: this.modal.isEnabled
      });
      // this.$store.dispatch("getDeviceList");
      this.isOpenModal = false;
    },
    async searcByhUserId(id) {
      this.loading = true;
      if (id === "Show All") {
        this.searchUserId = "";
      } else {
        this.searchUserId = id;
      }
      this.loading = false;
    },
    async openSetting(row) {
      this.modal = await {
        deviceID: row.deviceID,
        deviceName: row.name,
        imei: row.imei,
        currentTemp: row.currentTemp,
        maxTemp: row.maxTemp,
        minTemp: row.minTemp,
        sendLine: row.sendLine,
        userName: row.userName,
        isEnabled: row.isEnabled,
        userID: row.userID
      };
      this.settingTemp = {
        min: row.minTemp,
        max: row.maxTemp
      };
      this.isOpenModal = true;
    },
    async openDescription(row) {
      this.progress = 0;
      this.descriptionModal = true;
      this.modal = await {
        deviceID: row.deviceID,
        deviceName: row.name,
        imei: row.imei,
        currentTemp: row.currentTemp,
        maxTemp: row.maxTemp,
        minTemp: row.minTemp,
        sendLine: row.sendLine,
        userName: row.userName,
        isEnabled: row.isEnabled,
        userID: row.userID
      };
      this.interval = setInterval(() => {
        if (this.progress <= this.barValue) {
          this.progress = this.progress + 0.05;
        }
      }, 50);
    }
  },
  mounted() {
    this.$store.dispatch("getDeviceList");
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

.thermo {
  width: 100px;
  height: 200px;
  position: relative;
  animation: pulse 1.5s;
}

.description-text {
  color: white;
  padding: 4px 10px 4px 10px;
  border-radius: 5px;
  font-family: "prompt";
  font-weight: 500;
  font-size: 15px;
}

.degree-unit {
  margin-left: 8px;
  font-size: 20px;
}

.current {
  font-size: 48px;
  font-weight: bold;
}

.current-banner {
  padding: 0px 15px 0px 15px;
  border-radius: 10px;
  color: white;
  background-color: #2c323f;
}

.min {
  font-size: 24px;
  font-weight: bold;
  color: #31ccec;
}

.max {
  font-size: 24px;
  font-weight: bold;
  color: #c10015;
}

.description-btn {
  width: 140px;
  border-radius: 50px;
  background-color: #0288d1;
  color: white;
}

.description-btn:hover {
  width: 140px;
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
  background-color: #2c323f;
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
  padding-left: 10px;
  padding-right: 10px;
  height: 22px;
  font-size: 16px;
}

.search-by-id {
  border-radius: 30px;
}

.description-modal {
  max-width: 700px;
  width: 25vw;
  min-width: 450px;
  padding: 10px 30px 20px 30px;
}

.temp-bar {
  width: 18vw;
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
  .description-text {
    color: white;
    padding: 4px 10px 4px 10px;
    border-radius: 5px;
    font-family: "prompt";
    font-weight: 500;
    font-size: 14px;
  }
  .description-modal {
    max-width: 700px;
    width: 90vw;
    min-width: 300px;
    padding: 10px 3px 20px 3px;
  }
  .temp-bar {
    width: 150px;
  }
  .modal-card {
    min-width: 90vw;
  }
  .thermo {
    margin-top: 20px;
    width: 60px;
    height: 120px;
  }
  .current {
    font-size: 30px;
    font-weight: bold;
  }

  .current-banner {
    padding: 0px 15px 0px 15px;
    border-radius: 10px;
    color: white;
    background-color: #2c323f;
  }

  .min {
    font-size: 20px;
    font-weight: bold;
    color: #31ccec;
  }

  .max {
    font-size: 20px;
    font-weight: bold;
    color: #c10015;
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
  .modal-card {
    width: 500px;
  }
  .description-modal {
    max-width: 700px;
    width: 50vw;
    min-width: 300px;
    padding: 10px 3px 20px 3px;
  }
  .thermo {
    margin-top: 20px;
    width: 80px;
    height: 160px;
  }
}
</style>
