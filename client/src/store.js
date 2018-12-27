import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const types = {
  SET_AUTHENTICIATED: "SET_AUTHENTICIATED",
  SET_USER: "SET_USER"
};

const state = {
  isAuthenticated: false,
  user: {}
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
};

//是否授權
const mutations = {
  [types.SET_AUTHENTICIATED](state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },
  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {};
  }
};

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICIATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
  loggedOut: ({ commit }) => {
    commit(types.SET_AUTHENTICIATED, false);
    commit(types.SET_USER, null);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
