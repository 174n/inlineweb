import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueTruncate from "vue-truncate-filter";
Vue.use(VueTruncate);

import Paginate from "vuejs-paginate";
Vue.component("paginate", Paginate);

import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

Vue.filter("capitalize", v => {
  if (!v) return "";
  v = v.toString();
  return v.charAt(0).toUpperCase() + v.slice(1);
});

Vue.filter("eurodate", v => {
  if (!v) return "";
  v = v.toString();
  return v
    .split(" ")[0]
    .split("-")
    .reverse()
    .join(".");
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
