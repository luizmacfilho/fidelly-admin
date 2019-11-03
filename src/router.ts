import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'notFound',
      component: () => import(/* webpackChunkName: "not_found" */ './components/404.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/Signup.vue'),
    },
    {
      path: '/password-reset',
      name: 'passwordReset',
      component: () => import(/* webpackChunkName: "passwordReset" */ './views/PasswordReset.vue'),
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
    },
    {
      path: '/store',
      name: 'store',
      component: () => import(/* webpackChunkName: "store" */ './views/Store.vue'),
    },
    {
      path: '/fidelly',
      name: 'fidelly',
      component: () => import(/* webpackChunkName: "fidelly" */ './views/Fidelly.vue'),
    },
  ],
});

export default router;
