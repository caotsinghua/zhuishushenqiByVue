// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import store from './store/index'
Vue.config.productionTip = false


import 'element-ui/lib/theme-default/index.css'
import '../static/css/animate.css'
Vue.use(ElementUI);
Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})