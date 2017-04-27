import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        nightMode: true
    },
    mutations: mutations,
    actions: actions
})

export default store;