<<<<<<< HEAD
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import store from './store/index'
import infiniteScroll from 'vue-infinite-scroll'
Vue.config.productionTip = false



import 'element-ui/lib/theme-default/index.css'
import '../static/css/animate.css'
import '../static/css/reset.css'
Vue.use(ElementUI);
Vue.use(infiniteScroll);

// axios.defaults.withCredentials=true;
Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
=======
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import store from './store/index'
import infiniteScroll from 'vue-infinite-scroll'
Vue.config.productionTip = false


import 'element-ui/lib/theme-default/index.css'
import '../static/css/animate.css'
Vue.use(ElementUI);
Vue.use(infiniteScroll);
Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
>>>>>>> 2e62cf3712471af45e55247baf5ad9afea432150
})