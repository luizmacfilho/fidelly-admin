import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';

Vue.use(Vuex);

interface State {
  user: firebase.User|null;
  initialized: boolean;
  title: string;
}

export default new Vuex.Store<State>({
  state: {
    user: null,
    initialized: false,
    title: 'message.dashboard',
  },
  mutations: {
    user(state: State, user: firebase.User|null) {
      state.user = user;
    },
    initialized(state) {
      state.initialized = true;
    },
    title(state: State, title: string) {
      state.title = title;
    },
  },
  actions: {},
});
