import Vue from "vue";
import Vuex from "vuex";
import createPersist from "vuex-localstorage";
import { EventBus } from "@/event-bus.js";
import router from "./router";

Vue.use(Vuex);

import request from "./request";

export default new Vuex.Store({
  // Plugins
  plugins: [
    createPersist({
      namespace: "v0.0.1",
      initialState: {
        token: ""
      },
      expires: 7 * 24 * 60 * 60 * 1e3
    })
  ],

  // State
  state: {},

  // Mutations
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    removeUserData(state) {
      state.token = null;
      state.user = null;
      router.push("/");
    },
    updateEditorTitle(state, title) {
      state.editorTitle = title;
    },
    updateEditorAuthor(state, author) {
      state.editorAuthor = author;
    }
  },

  // Actions
  actions: {
    // LogIn
    async login({ commit, dispatch }, { email, password }) {
      let token = (await request("api/auth/login", "POST", { email, password }))
        .access_token;
      if (token) {
        commit("setToken", token);
        dispatch("getUser");
        router.push("/");
        location.reload();
      } else {
        EventBus.$emit("form-error", "Incorrect username or password.");
      }
    },
    // Register
    async register({ commit, dispatch }, { email, name, password }) {
      let response = await request("api/auth/register", "POST", {
        email,
        name,
        password
      });
      if (response.token) {
        commit("setToken", response.token);
        dispatch("getUser");
        router.push("/");
        location.reload();
      } else {
        EventBus.$emit("form-error", Object.values(response).join(" "));
      }
    },
    // Get User
    async getUser({ commit }) {
      let response = await request("api/auth/me", "POST");
      if (response.message !== "Unauthenticated.") {
        commit("setUser", response);
      } else {
        commit("removeUserData");
      }
    },
    //LogOut
    async logout({ commit }) {
      let response = await request("api/auth/logout", "POST");
      if (response.message === "Successfully logged out") {
        await commit("removeUserData");
      }
    }
  }
});
