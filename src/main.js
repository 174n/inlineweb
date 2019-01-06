import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueTruncate from "vue-truncate-filter";
Vue.use(VueTruncate);

import Paginate from "vuejs-paginate";
Vue.component("paginate", Paginate);

Vue.filter("capitalize", v => {
  if (!v) return "";
  v = v.toString();
  return v.charAt(0).toUpperCase() + v.slice(1);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
