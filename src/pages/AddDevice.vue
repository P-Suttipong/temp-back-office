<template>
  <q-page class="column flex justify-center items-center">
    <div>
      <q-card class="add-device-form">
        <q-form class="q-gutter-sm q-mt-xs modal-form">
          <div class="row justify-center">
            <p class="title title-banner">Add New Device</p>
          </div>
          <!-- <div>
            <p class="data-title">Device ID</p>
            <q-input
              square
              filled
              clearable
              type="text"
              placeholder="Device ID"
            />
          </div> -->

          <div class="row justify-between">
            <div class="col-6  q-pr-sm">
              <p class="data-title">Device IMEI</p>
              <q-input
                v-model="imei"
                square
                filled
                clearable
                placeholder="Device IMEI"
              />
            </div>
            <div class="col-6 q-pl-sm">
              <p class="data-title">Device Name</p>
              <q-input
                v-model="name"
                square
                filled
                clearable
                type="text"
                placeholder="Device Name"
              />
            </div>
          </div>

          <div class="row justify-between">
            <div class="col-6  q-pr-sm">
              <p class="data-title">Min Temperature</p>
              <q-input
                v-model="minTemp"
                square
                filled
                clearable
                type="text"
                placeholder="Min"
              />
            </div>
            <div class="col-6 q-pl-sm">
              <p class="data-title">Max Temperature</p>
              <q-input
                v-model="maxTemp"
                square
                filled
                clearable
                type="text"
                placeholder="Max"
              />
            </div>
          </div>
          <div class="row justify-between">
            <p class="data-title q-mt-md">Send Line :</p>
            <q-toggle
              keep-color
              class=""
              size="lg"
              checked-icon="check"
              color="primary"
              unchecked-icon="clear"
              v-model="sendLine"
            />
          </div>

          <div>
            <p class="data-title">User ID</p>
            <q-input
              square
              filled
              clearable
              type="text"
              placeholder="User ID"
              v-model="userID"
            />
          </div>
        </q-form>
        <div class="q-pt-lg row justify-center">
          <q-btn @click="openConfirm" rounded class="add-btn">
            Add Device
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
              Comfirm Add Device ?
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
            ><p style="font-size: 18px;" class="q-mt-md q-px-xl">
              Device's IMEI has already add.
            </p></span
          >
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Ok" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="invalidModal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
          <span class="q-ml-sm"
            ><p style="font-size: 18px;" class="q-mt-md q-px-xl">
              {{ errorMessage }}
            </p></span
          >
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Ok" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: "add-device-page",
  data() {
    return {
      fourth: false,
      openConfirmModal: false,
      imei: "",
      name: "",
      maxTemp: "",
      minTemp: "",
      sendLine: false,
      userID: "",
      isEnabled: true,
      errorModal: false,
      errorMessage: false,
      invalidModal: false
    };
  },
  methods: {
    async openConfirm() {
      if (this.imei === "" || this.imei === null) {
        this.invalidModal = true;
        this.errorMessage = "Complete Device IMEI field !";
      } else if (this.name === "" || this.name === null) {
        this.invalidModal = true;
        this.errorMessage = "Complete Device name field !";
      } else if (this.minTemp === "" || this.minTemp === null) {
        this.invalidModal = true;
        this.errorMessage = "Complete Min Temperature field !";
      } else if (this.maxTemp === "" || this.maxTemp === null) {
        this.invalidModal = true;
        this.errorMessage = "Complete Max Temperature field !";
      } else {
        this.openConfirmModal = true;
      }
    },
    async confirmAdd() {
      let res = await this.$store.dispatch("addDevice", {
        imei: this.imei,
        name: this.name,
        maxTemp: this.maxTemp,
        minTemp: this.minTemp,
        sendLine: this.sendLine,
        userID: this.userID,
        isEnabled: true
      });
      if (res.status !== false) {
        this.imei = "";
        this.name = "";
        this.maxTemp = "";
        this.minTemp = "";
        this.sendLine = false;
        this.userID = "";
        this.isEnabled = true;
        this.invalidModal = true;
        this.errorMessage = "Add Device Complete";
      } else {
        this.errorModal = true;
      }
    }
  }
};
</script>

<style scoped>
.title {
  width: 280px;
  font-size: 28px;
}
.add-device-form {
  padding: 30px 80px 50px 80px;
}
.modal-form {
  width: 25vw;
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
    padding: 30px 80px 50px 80px;
  }
  .modal-form {
    width: 100%;
  }
}
</style>
