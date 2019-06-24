import Vue from 'vue';
import ZdButton from './zeedhi-components/ZdButton.vue';
import ZdIcon from './zeedhi-components/ZdIcon.vue';
import ZdForm from './zeedhi-components/ZdForm.vue';
import ZdTextField from './zeedhi-components/ZdTextField.vue';
import * as appControllers from './controllers';
import { Loader } from './zeedhi/loader';

Loader.setControllers(appControllers);

Vue.component('ZdButton', ZdButton);
Vue.component('ZdIcon', ZdIcon);
Vue.component('ZdForm', ZdForm);
Vue.component('ZdTextField', ZdTextField);
