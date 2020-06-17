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


const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      state.count++
    },
      SET_TOKEN(state, token) {
        state.token = token
      },
  },
  actions: {
    async attempt({commit, state}, token) {
      console.log('token = '+ token);
      console.log(state
      )
      if (token) {
        commit('SET_TOKEN', token)
      }
    }
  }
})

console.log(store
)
console.log(VueRouter
)
console.log(Test
)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/t1', component: Test },
    {path: '/t2', component: Test2},
    {path: '/main', component: Main, meta: {title: 'Основной список'}},
    {path: '/change/:id', component: Change, meta: {title: 'Изменение записи'}},

  ],

});

  router.beforeEach((to, from, next) => {
    /* It will change the title when the router is change*/
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  });

// new Vue({
//   render: h => h(App),
//    router,
//   store
// }).$mount('#app')

store.dispatch('attempt', localStorage.getItem('abc')).then(() => {
  new Vue({
    // el: '#app',
    // components: { App },
    router,
    store,
    render: h => h(App),
    // subscriber
  }).$mount('#app');
})

