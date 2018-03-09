'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';

// let Vue = require('vue'),
//     VueRouter = require('vue-router'),
//     axios = require('axios'),
//     VueAxios = require('vue-axios');

import App from './App.vue';
import Dashboard from './components/Dashboard.vue';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/dashboard'},
        {path: '/dashboard', component : Dashboard},
        {path: '/home', component: {
            template: "<div>home</div>"
        }}
    ]
});

new Vue({
    // el: '#app',
    router,
    render: h => h(App)
}).$mount('#app');