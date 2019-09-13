import * as firebase from 'firebase/app';
import { adminConfig } from '@/firebase';
import router from '@/router';
import 'firebase/auth';
import store from '@/store';
import { Route } from 'vue-router';

// Initialize Firebase
firebase.initializeApp(adminConfig);

let guardInitialized = false;
const routesWithoutSession = ['/login', '/signup', '/password-reset'];

firebase.auth().onAuthStateChanged((user) => {
  checkUserSession(user);
  store.commit('user', user);
  store.commit('initialized');
  if (!guardInitialized) {
    router.beforeEach((to, from, next) => {
      const change = checkUserSession(store.state.user, to);
      if (!change) {
        next();
      }
    });
    guardInitialized = true;
  }
});


function checkUserSession(user: firebase.User|null, route?: Route) {
  let change = false;
  if (user) {
    if (shouldRedirectToDashboard(route)) {
      router.push('/');
      change = true;
    }
  } else if (!shouldRedirectToDashboard(route)) {
    router.push('/login');
    change = true;
  }
  return change;
}

function shouldRedirectToDashboard(route?: Route) {
  const r = route || router.currentRoute;
  return routesWithoutSession.includes(r.path);
}
