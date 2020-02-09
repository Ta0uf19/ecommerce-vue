import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
    key: 'price-query',
    storage: window.localStorage
});

import auth from "./modules/auth";
import cart from "./modules/cart";

export const store = new Vuex.Store({
    modules: {
        auth, cart
    },
    plugins: [vuexPersist.plugin]
});
