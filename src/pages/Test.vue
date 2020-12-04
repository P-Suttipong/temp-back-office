<template>
  <div class="column justify-center items-center">
    <h1>Card Flip with Text</h1>
    <h3>Hover over the image below:</h3>

    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front flex items-center justify-center">
          <!-- <img
            src="~assets/img/cold.png"
            alt="Avatar"
            style="width:300px;height:300px;"
          /> -->
          <q-btn>TEST</q-btn>
        </div>
        <div class="flip-card-back">
          <h3>John Doe</h3>
          <q-btn>TEST</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      scrollPostion: null
    };
  },
  methods: {
    updateScroll() {
      this.scrollPostion = window.scrollY;
      console.log(this.scrollPostion);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  }
};
</script>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 300px;
  height: 300px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 1.5s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #303030;
  color: black;
}

.flip-card-back {
  background-color: #2980b9;
  color: white;
  transform: rotateY(180deg);
}
</style>
