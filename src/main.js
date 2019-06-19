import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueResource from "vue-resource";
import store from "./store";
import Vuetify from "vuetify";
import "./registerServiceWorker";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueResource);

Vue.http.options.root = "https://shopping-list-server.herokuapp.com";

Vue.filter("toUpper", value => value.toUpperCase());

export const EventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
