import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false
import Vuex from 'vuex'

Vue.use(Vuex)
import Test from './components/Test.vue'
import Test2 from './components/Test2.vue'
import Main from './components/Main.vue'
import Change from './components/Change.vue'

console.log(VueRouter
)
console.log(Test
)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/t1', component: Test },
    {path: '/t2', component: Test2},
    {path: '/main', component: Main},
    {path: '/change', component: Change},

  ]
});

new Vue({
  render: h => h(App),
   router
}).$mount('#app')
