import Vue from "vue";
import Vuex from "vuex";
import createPersist from "vuex-localstorage";
import { EventBus } from "@/event-bus.js";

Vue.use(Vuex);

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
const basepath = "http://localhost:8000/";

const request = async (url, method, body) => {
  return await (await fetch(basepath + url, {
    method: method,
    body: JSON.stringify(body),
    headers
  })).json();
};

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
    }
  },

  // Actions
  actions: {
    async login({ commit }, { email, password }) {
      let token = (await request("api/auth/login", "POST", { email, password }))
        .access_token;
      if (token) {
        commit("setToken", token);
      } else {
        EventBus.$emit("form-error", "Incorrect username or password.");
      }
    },
    async register({ commit }, { email, name, password }) {
      let response = await request("api/auth/register", "POST", {
        email,
        name,
        password
      });
      if (response.token) {
        commit("setToken", response.token);
      } else {
        EventBus.$emit("form-error", Object.values(response).join(" "));
      }
    }
  }
});
