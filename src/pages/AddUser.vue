<template>
  <q-page class="column flex justify-center items-center">
    <div>
      <q-card class="add-device-form">
        <q-form class="q-gutter-sm q-mt-xs modal-form">
          <div class="row justify-center">
            <p class="title">Add New User</p>
          </div>
          <div class="row justify-between">
            <div class="col-xl-6 col-sm-12">
              <div>
                <p class="data-title">Username</p>
                <q-input
                  square
                  filled
                  clearable
                  type="text"
                  placeholder="Username"
                />
              </div>

              <div class="row justify-between">
                <div class="col-6  q-pr-sm">
                  <p class="data-title">Password</p>
                  <q-input
                    square
                    filled
                    clearable
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div class="col-6 q-pl-sm">
                  <p class="data-title">Confirm</p>
                  <q-input
                    square
                    filled
                    clearable
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div class="row justify-between">
                <div class="col-6  q-pr-sm">
                  <p class="data-title">Firstname</p>
                  <q-input
                    square
                    filled
                    clearable
                    type="text"
                    placeholder="Firstname"
                  />
                </div>
                <div class="col-6 q-pl-sm">
                  <p class="data-title">Lastname</p>
                  <q-input
                    square
                    filled
                    clearable
                    type="text"
                    placeholder="Lastname"
                  />
                </div>
              </div>

              <div>
                <p class="data-title">Phone Number</p>
                <q-input
                  square
                  filled
                  clearable
                  type="text"
                  mask="###-###-####"
                  placeholder="Phone Number"
                />
              </div>

              <div>
                <p class="data-title">Line Key</p>
                <q-input
                  square
                  filled
                  clearable
                  type="text"
                  placeholder="Line Key"
                />
              </div>
            </div>
            <div class="col-xl-5 col-sm-12">
              <p class="data-title">Device List</p>
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
              Comfirm Add User ?
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
  </q-page>
</template>

<script>
export default {
  name: "add-user-page",
  data() {
    return {
      text: "",
      openConfirmModal: false
    };
  },
  methods: {
    async openConfirm() {
      this.openConfirmModal = true;
    },
    confirmAdd() {}
  }
};
</script>

<style scoped>
.title {
  padding-bottom: 10px;
  font-size: 28px;
}

.add-device-form {
  padding: 30px 80px 50px 80px;
  margin-top: 50px;
  margin-bottom: 50px;
}
.modal-form {
  width: 50vw;
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
