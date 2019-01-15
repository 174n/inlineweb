import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import User from "./views/User.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/user/:id?",
      name: "user",
      component: User
    },
    {
      path: "/editor",
      name: "editor",
      component: () =>
        import(/* webpackChunkName: "editor" */ "./views/Editor.vue")
    }
  ]
});
