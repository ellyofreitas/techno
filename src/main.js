// import 'dotenv/config';
import Vue from 'vue';

import { toMoney } from '@/filters/format';
import Alert from '@/components/Alert.vue';

import App from './App.vue';
import store from './store';
import router from './router';

Vue.component('Alert', Alert);

Vue.config.productionTip = false;
Vue.filter('toMoney', toMoney);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
