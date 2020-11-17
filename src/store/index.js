import Vue from "vue";
import Vuex from "vuex";

import device from "./modules/device";

Vue.use(Vuex);

export default function() {
  const Store = new Vuex.Store({
    modules: {
      device
    },

    strict: process.env.DEBUGGING
  });

  return Store;
}
