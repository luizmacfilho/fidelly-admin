import Vue from 'vue';
import ZdButton from './zeedhi-components/ZdButton.vue';
import * as appControllers from './controllers';
import { Loader } from './zeedhi/loader';

Loader.setControllers(appControllers);

Vue.component('ZdButton', ZdButton);
