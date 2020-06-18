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

import VuexUndoRedo  from './assets/js/undoRedo';
import exampleData from "./assets/js/smallExampleData";
/*g*/console.log('exampleData'); //todo remove it
/*g*/console.log(exampleData); //todo remove it
Vue.use(VuexUndoRedo );
/*g*/console.log('VuexUndoRedo '); //todo remove it
/*g*/console.log(VuexUndoRedo ); //todo remove it

// new Vuex.Store({
//   state: {
//     myVal: null
//   },
//   mutations: {
//     emptyState() {
//       this.replaceState({ myval: null });
//     }
//   }
// });

const store = new Vuex.Store({
      data: function () {
      return {
        actionHistory: []
      }
    },
  state: {
    count: 1,
    mainData: {},
    myVal: null,
    todoListData: {},
    todoListNewId: 1,
    test: {}
  },
  mutations: {
    increment (state) {
      state.count++
    },
      SET_TOKEN(state, token) {
        state.token = token
      },
    emptyState() {
      this.replaceState({ myval: null, count: 0, todoListData: {}, todoListNewId: 1 });
    },
    saveTodoList(state, payload) {


      let newId;
      if (typeof payload.itemNewId === "undefined") {
        newId = state.todoListNewId;
        state.todoListNewId++;
      } else {
        newId = payload.itemNewId;
      }
      if (typeof payload.newData['itemNewId']  == "undefined" ) {
        payload.newData['itemNewId'] = 1;
      }
      state.todoListData[newId] = payload.newData;
      // localStorage.setItem('todoListData', JSON.stringify(state.todoListData))
    },
    saveTodoItem(state, payload) {
      if (typeof payload.listId !== "undefined") {
        let itemId;
        if (typeof payload.itemId === "undefined") {
          /*g*/console.log('state.todoListData'); //todo remove it
          /*g*/console.log(state.todoListData); //todo remove it
          /*g*/console.log('payload.listId'); //todo remove it
          /*g*/console.log(payload.listId); //todo remove it

          itemId = state.todoListData[payload.listId].itemNewId;
          state.todoListData[payload.listId].itemNewId++;
        } else {
          itemId = payload.itemId;
        }
        state.todoListData[payload.listId]['list'][itemId] = payload.newData;
        // state.todoListData[payload.listId]['1'] = payload.newData;
        // state.todoListData['1']['1'] = payload.newData;
        // state.todoListData['1']['nam'] = {'name': 'nnnnnnn'};
        // state.test['1']
        // state.test['1']['1']['a'] = 'b';

        /*g*/console.log('state.test'); //todo remove it
        /*g*/console.log(state.test); //todo remove it
        /*g*/console.log('itemId'); //todo remove it
        /*g*/console.log(itemId); //todo remove it
        /*g*/console.log('payload.newData'); //todo remove it
        /*g*/console.log(payload.newData); //todo remove it
        /*g*/console.log(' 2222222222222state.todoListData'); //todo remove it
        /*g*/console.log( state.todoListData); //todo remove it
        state.todoListNewId++;
        console.log('state.todoListData['+payload.listId+']['+itemId+']');
        localStorage.setItem('todoListData', JSON.stringify(state.todoListData))
        this.commit('updateLocalStoreTodoListData')
      }
    },
    updateLocalStoreTodoListData(state) {
      localStorage.setItem('todoListData', JSON.stringify(state.todoListData))
    },
    getFromLocalStoreTodoListData(state) {
      state.todoListData = JSON.parse(localStorage.getItem('todoListData'));
    },
    addTodoList({commit}) {
      /*g*/console.log('commit'); //todo remove it
      /*g*/console.log(commit); //todo remove it
      // commit({})
    },
  },
  actions: {
        incrementer({ commit }) {

    commit('increment')

        },
    addTodoList({commit}) {
          /*g*/console.log('commit'); //todo remove it
          /*g*/console.log(commit); //todo remove it
        // commit({})
    },


    async attempt({commit, state}, token) {
      console.log('token = '+ token);
      console.log(state
      )
      if (token) {
        commit('SET_TOKEN', token)
      }
    },
    pushMainState() {

    }
  },

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
    {path: '/', component: Main, meta: {title: 'Основной список'}},
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

