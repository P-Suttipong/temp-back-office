<template>
  <div class="fullscreen page text-white text-center q-pa-md flex flex-center">
    <div>
      <q-img width="300px" src="~assets/img/coldroom.png"></q-img>
      <div style="font-size: 10vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn class="q-mt-xl btn" color="primary" unelevated to="/" label="BACK" no-caps />
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404"
};
</script>

<style scoped>
.page {
  background-color: #2c323f;
}
.btn {
  padding: 0px 30px 0px 30px;
  border-radius: 50px;
  font-size: 20px;
}
</style>
