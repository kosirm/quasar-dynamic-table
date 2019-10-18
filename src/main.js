import Vue from "vue";
import router from "./router/index.js";
import store from "./store/index.js";
import App from "./App";

// import Quasar, * as All from "quasar/dist/quasar.umd.js";
import Quasar from "quasar/dist/quasar.umd.js";
import "quasar/dist/quasar.css";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate, {
  validity: true
});

console.log("quasar", Quasar);
Vue.config.productionTip = false;
// console.log("quasar", All);
// Vue.use(Quasar, {
//   components: All,
//   directives: All,
//   plugins: {
//     ...All
//   }
// });
Vue.use(Quasar);
const Router = router({ store });

console.log(`router => ${Router}, store=> ${store}`);
new Vue({
  el: "#app",
  store,
  router: Router,
  render: h => h(App)
});
