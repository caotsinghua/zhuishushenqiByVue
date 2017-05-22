<<<<<<< HEAD
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        nightMode: true,
        tabIndex: 0,
        logged:false
    },
    mutations: mutations,
    actions: actions
})

=======
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        nightMode: true,
        tabIndex: 0
    },
    mutations: mutations,
    actions: actions
})

>>>>>>> 2e62cf3712471af45e55247baf5ad9afea432150
export default store;