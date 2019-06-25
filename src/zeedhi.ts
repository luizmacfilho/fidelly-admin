import Vue from 'vue';
import ZdButton from './zeedhi-components/components/ZdButton.vue';
import ZdTextField from './zeedhi-components/components/ZdTextField.vue';
import * as appControllers from './controllers';
import { Loader } from './zeedhi/loader';

Loader.setControllers(appControllers);

Vue.component('ZdButton', ZdButton);
Vue.component('ZdTextField', ZdTextField);
