import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import User from "./views/User.vue";
import store from "./store";

Vue.use(Router);

const noAuth = function(to, from, next) {
  if (!store.state.user) {
    next();
  } else {
    next("/");
  }
};

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
      component: Login,
      beforeEnter: noAuth
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      beforeEnter: noAuth
    },
    {
      path: "/user/:id?",
      name: "user",
      component: User
    },
    {
      path: "/editor/:id?",
      name: "editor",
      component: () =>
        import(/* webpackChunkName: "editor" */ "./views/Editor.vue")
    }
  ]
});
