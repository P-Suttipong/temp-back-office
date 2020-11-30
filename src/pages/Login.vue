<template>
  <q-page class="row justify-center items-center page">
    <div class="column">
      <div class="row justify-center">
        <p
          v-if="this.$q.platform.is.desktop || this.$q.platform.is.ipad"
          class="login-title"
        >
          Cold Room | Back Office
        </p>
        <div class="column items-center justify-center" v-else>
          <img class="login-image" src="~assets/img/coldroom.png" />
        </div>
      </div>
      <div class="row">
        <q-card bordered class="card-padding shadow-20">
          <div class="row justify-between">
            <div
              v-if="this.$q.platform.is.desktop || this.$q.platform.is.ipad"
              class="col-5 column items-center justify-center"
            >
              <img class="login-image" src="~assets/img/coldroom-reverse.png" />
            </div>
            <div class="col-6 col-mobile">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    square
                    filled
                    clearable
                    v-model="email"
                    type="email"
                    label="email"
                    class="login"
                    ><template v-slot:prepend>
                      <q-icon name="email" /> </template
                  ></q-input>
                  <q-input
                    square
                    filled
                    clearable
                    v-model="password"
                    class="login"
                    type="password"
                    label="password"
                    ><template v-slot:prepend>
                      <q-icon name="vpn_key" /> </template
                  ></q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  @click="login()"
                  unelevated
                  rounded
                  class="full-width"
                  color="light-blue-8"
                  size="lg"
                >
                  Login
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
      let passwordEncoder = btoa(this.password);
      console.log(passwordEncoder);
      this.$router.push("/");
    },
    async logout() {
      localStorage.removeItem("user");
    }
  }
};
</script>

<style scoped>
.page {
  /* background-color: #2c323f; */
  background: linear-gradient(180deg, #13151b 10%, #2c323f 55%, #fff 20%);
}

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
  text-shadow: 5px 5px 5px #1f1f1f;
  color: white;
  font-size: 48px;
  animation: slideInUp;
  animation-duration: 1s;
}

.login-image {
  height: 230px;
  width: 20vw;
  object-fit: contain;
}

/* Mobile */
@media only screen and (max-width: 420px) {
  .card-padding {
    padding: 5px;
    width: 90vw;
  }

  .login-image {
    padding-top: 8px;
    height: 210px;
    width: 50vw;
    object-fit: contain;
  }

  .login-title {
    color: white;
    font-size: 32px;
    animation: bounce;
    animation-duration: 2s;
  }

  .col-mobile {
    width: 88vw;
  }
}

/* Tablet Ipad */
@media only screen and (min-width: 500px) and (max-width: 1025px) {
  .card-padding {
    padding: 20px;
    width: 90vw;
  }
  .login-image {
    padding-top: 8px;
    height: 210px;
    width: 40vw;
    object-fit: fill;
  }
}
</style>
