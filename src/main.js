import Vue from 'vue'
import App from './App.vue'

import VuePageTransition from 'vue-page-transition'
Vue.use(VuePageTransition);

import VModal from 'vue-js-modal'
Vue.use(VModal);

import VueJWT from 'vuejs-jwt'
Vue.use(VueJWT);

// import bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/styles/custom.scss'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import VueSwal from 'vue-swal'
Vue.use(VueSwal);

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

// notification
import Notifications from 'vue-notification'
Vue.use(Notifications);

// vuenoty
import VueNoty from 'vuejs-noty'
Vue.use(VueNoty, {theme: 'sunset'});

//vue-moment
import moment from 'moment'
Vue.prototype.moment = moment ;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
