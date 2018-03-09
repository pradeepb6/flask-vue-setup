'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import Dashboard from './components/Dashboard.vue';
import Home from './components/Home.vue';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/dashboard'},
        {path: '/dashboard', component : Dashboard},
        {path: '/home', component: Home}
    ]
});

new Vue({
    // el: '#app',
    router,
    render: h => h(App)
}).$mount('#app');