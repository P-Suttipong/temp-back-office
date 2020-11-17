<template>
  <q-page class=" window-width row justify-center items-center">
    <div class="column">
      <div class="row justify-center">
        <p class="login-title">ยินดีต้อนรับ</p>
      </div>
      <div class="row">
        <q-card bordered class="card-padding shadow-1">
          <div class="row justify-between">
            <div class="col-5 column items-center justify-center">
              <img
                class="login-image"
                src="~assets/img/placeholder-image.png"
              />
            </div>
            <div class="col-6">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    square
                    filled
                    clearable
                    v-model="email"
                    type="email"
                    label="email"
                  />
                  <q-input
                    square
                    filled
                    clearable
                    v-model="password"
                    type="password"
                    label="password"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  @click="login()"
                  unelevated
                  class="full-width"
                  color="light-blue-8"
                  size="lg"
                >
                  เข้าสู่ระบบ
                </q-btn>
              </q-card-actions>
              <!-- <q-card-section class="text-center q-pa-none">
                <p class="text-grey-6">ลืมรหัสผ่าน ?</p>
              </q-card-section> -->
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      console.log(this.email, this.password);
      await localStorage.setItem(
        "user",
        JSON.stringify({
          email: this.email,
          password: this.password
        })
      );
      this.$router.push("/");
    },
    async logout() {
      localStorage.removeItem("user");
    }
  }
};
</script>

<style scoped>
p {
  font-family: "prompt";
}
button {
  font-family: "prompt";
}
.card-padding {
  padding: 40px;
  width: 50vw;
}
.login-title {
  font-size: 32px;
}
.login-image {
  height: 230px;
  width: 20vw;
  object-fit: cover;
}
</style>
