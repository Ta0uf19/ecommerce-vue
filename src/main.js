import Vue from 'vue'
import App from './App.vue'

// import bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/styles/custom.scss'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// import axios configuration API

import axios from "./services/Api";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

// import VueRouter
import VueRouter from "vue-router";
Vue.use(VueRouter);
import router from './router/routes';

// import store
import { store } from './store/store'
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
