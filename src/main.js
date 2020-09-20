import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue'

const Login = require('./assets/js/components/login.vue');
const Jobs = require('./assets/js/components/jobs.vue');
const ApplyJobs = require('./assets/js/components/apply-jobs.vue');

const routes = [{
        name: 'login',
        path: '/',
        component: Login
    },
    {
        name: 'jobs',
        path: '/jobs',
        component: Jobs
    },
    {
        name: 'applyJobs',
        path: '/apply-jobs',
        component: ApplyJobs
    },
    {
        path: '*',
        redirect: '/',
    }
];
var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');