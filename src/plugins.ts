import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import VueApexCharts from 'vue-apexcharts';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import 'typeface-roboto/index.css';


Vue.use(Vuetify, {
  iconfont: 'mdi',
});
Vue.use(VueI18n);
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);
