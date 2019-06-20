import Vue from "vue";
import Router from "vue-router";
import Welcome from "./views/Welcome.vue";
import Home from "./views/Home.vue";
import CreateList from "./views/CreateList.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "welcome",
      component: Welcome
    },
    {
      path: "/my-list",
      name: "home",
      component: Home
    },
    {
      path: "/create-list",
      name: "create-list",
      component: CreateList
    }
  ]
});
