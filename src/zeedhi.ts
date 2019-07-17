import Vue from 'vue';
import * as appControllers from './controllers';
import { Loader } from './zeedhi/loader';
import ZdButton from './zeedhi-components/components/ZdButton.vue';
import ZdContainer from './zeedhi-components/components/ZdContainer.vue';
import ZdFlex from './zeedhi-components/components/ZdFlex.vue';
import ZdLayout from './zeedhi-components/components/ZdLayout.vue';
import ZdTextField from './zeedhi-components/components/ZdTextField.vue';

Loader.setControllers(appControllers);

Vue.component('ZdButton', ZdButton);
Vue.component('ZdContainer', ZdContainer);
Vue.component('ZdFlex', ZdFlex);
Vue.component('ZdLayout', ZdLayout);
Vue.component('ZdTextField', ZdTextField);
