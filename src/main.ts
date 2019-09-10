import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueI18n from 'vue-i18n';
import { messages } from './messages';
import './registerServiceWorker';
import './firebase/admin';
import './plugins';

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: navigator.language,
  fallbackLocale: 'en-US',
  messages,
});

/**
 * Watch the issue, when finished, replace (window as any).$i18n to this.$i18n
 * and remove the following code.
 * Issue: https://github.com/kazupon/vue-i18n/issues/574
 */
(window as any).$i18n = i18n;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
