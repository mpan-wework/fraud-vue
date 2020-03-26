import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css/normalize.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './main.css';

Vue.config.productionTip = false;

Promise.resolve().then(async () => {
  const $vm = new Vue({
    router,
    store,
    render: (h) => h(App),
  });
  $vm.$mount('#app');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).$vm = $vm;
});
