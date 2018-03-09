'use strict';

let Vue = require('vue'),
    VueRouter = require('vue-router'),
    axios = require('axios'),
    VueAxios = require('vue-axios');

var app = require('App.vue').default;
var Dashboard = require('./components/Dashboard.vue').default;

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
    template: `
    <div id="app">
        <div class="body-wrapper">
            <div class="row">
                <router-link to="/home">Go to home</router-link>
                <router-view></router-view>
            </div>
        </div>
    </div>
  `
}).$mount('#app');