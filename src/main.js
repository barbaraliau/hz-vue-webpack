import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import horizon from './horizon'

Vue.use(VueRouter)

const router = new VueRouter()
router.start(App, '#app')
