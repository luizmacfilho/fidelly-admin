import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'not_found',
      component: () => import(/* webpackChunkName: "not_found" */ './components/404.vue'),
    },
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/Signup.vue'),
    },
    {
      path: '/password_reset',
      name: 'password_reset',
      component: () => import(/* webpackChunkName: "password_reset" */ './views/PasswordReset.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
    },
    {
      path: '/store',
      name: 'store',
      component: () => import(/* webpackChunkName: "store" */ './views/Store.vue'),
    },
  ],
});
