import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    initialized: false,
  },
  mutations: {
    user(state: any, user: any) {
      state.user = user;
    },
    initialized(state) {
      state.initialized = true;
    },
  },
  actions: {},
});
