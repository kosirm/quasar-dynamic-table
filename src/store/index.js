import Vue from "vue";
import Vuex from "vuex";

import vuexDataTable from "../features/VuexDataTable/store";
Vue.use(Vuex);

export default function() {
  const Store = new Vuex.Store({
    strict: true,
    modules: {
      vuexDataTable
    }
  });

  return Store;
}
