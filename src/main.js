import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false
import Vuex from 'vuex'

Vue.use(Vuex)
import TextareaAutosize from 'vue-textarea-autosize'

Vue.use(TextareaAutosize)

import VuejsDialog from 'vuejs-dialog';
// import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components

// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

// Tell Vue to install the plugin.
Vue.use(VuejsDialog);

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
    test: {},
    currentlyEditingList: {},
    baseEditingList: {},
    editingListId: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
      SET_TOKEN(state, token) {
        state.token = token
      },
    emptyState() {
      /*g*/console.log('this.baseEditingList'); //todo remove it
      /*g*/console.log(this.baseEditingList); //todo remove it

      this.replaceState({
        myval: null, count: 0, todoListData: {}, todoListNewId: 1, currentlyEditingList: {}
      });
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

      // this.commit('updateLocalStoreTodoListData')
      // localStorage.setItem('todoListData', JSON.stringify(state.todoListData))
    },
    getAndUpdateItemId(state, payload) {
      if (typeof payload.listId !== "undefined") {
        let itemId = state.todoListData[payload.listId].itemNewId;
        state.todoListData[payload.listId].itemNewId++;
        return itemId;
      }
    },
    setCurrentlyEditingList(state, payload) {
      if (typeof payload.listId !== "undefined") {
        state.editingListId =  payload.listId;
        let storageListData = JSON.parse(localStorage.getItem('todoListData'));
        if (typeof storageListData[payload.listId] !== "undefined") {
          state.currentlyEditingList = storageListData[payload.listId];
        }
      } else {
        state.currentlyEditingList = {
          name: '',
          list: {},
          itemNewId: 1
        };
      }
      this.baseEditingList = JSON.parse(JSON.stringify(state.currentlyEditingList));
    },
    saveCurrentlyEditingListNoteInVuex(state, payload) {
      let itemId;
      if (typeof payload.newData !== "undefined") {
        if (typeof payload.itemId === "undefined") {
          itemId = state.currentlyEditingList.itemNewId;
          state.currentlyEditingList.itemNewId++;
          //todo localshotra!
        } else {
          itemId = payload.itemId;
        }
        /*g*/console.log('=payload'); //todo remove it
        /*g*/console.log(payload); //todo remove it
        // state.currentlyEditingList.list[itemId] = payload.newData;
        state.currentlyEditingList.list[itemId] = Object.assign({}, payload.newData);
        /*g*/console.log('----state.currentlyEditingList'); //todo remove it
        /*g*/console.log(state.currentlyEditingList); //todo remove it

      }

    },
    saveCurrentlyEditingListInVuex(state, payload) {
      /*g*/console.log('state.currentlyEditingList'); //todo remove it
      /*g*/console.log(state.currentlyEditingList); //todo remove it
      /*g*/console.log('payload'); //todo remove it
      /*g*/console.log(payload); //todo remove it
    },

    saveTodoItem(state, payload) {
      if (typeof payload.listId !== "undefined") {
        let itemId;
        if (typeof payload.itemId === "undefined") {
          itemId = state.todoListData[payload.listId].itemNewId;
          state.todoListData[payload.listId].itemNewId++;
        } else {
          itemId = payload.itemId;
        }
        state.todoListData[payload.listId]['list'][itemId] = payload.newData;
        state.todoListNewId++;
        console.log('state.todoListData['+payload.listId+']['+itemId+']');
        localStorage.setItem('todoListData', JSON.stringify(state.todoListData))
      }
    },
    updateLocalStoreTodoListData(state) {

      /*g*/console.log('JSON.stringify(state.todoListData)'); //todo remove it
      /*g*/console.log(JSON.stringify(state.todoListData)); //todo remove it
      localStorage.setItem('todoListData', JSON.stringify(state.todoListData))
    },
    saveCurrentlyEditingToLocalStorage(state) {

      if (!state.editingListId) {
        let newListId = localStorage.getItem('newListId');

        if (!newListId) {
          state.editingListId = 1;
        } else {
          state.editingListId = parseInt(newListId);
        }
        let newId = state.editingListId + 1;
        localStorage.setItem('newListId', newId + '');
      }
      let storageListData = JSON.parse(localStorage.getItem('todoListData'));

      storageListData[state.editingListId] = state.currentlyEditingList;
      // state.editingListId++;
      localStorage.setItem('todoListData', JSON.stringify(storageListData))
    },
    deleteCurrentlyEditingListFromLocalStorage(state) {
      let storageListData = JSON.parse(localStorage.getItem('todoListData'));
      delete storageListData[state.editingListId];
      localStorage.setItem('todoListData', JSON.stringify(storageListData))
    },
    // deleteListFromLocalStorage(state, payload) {
    //   if (typeof  payload.listId !== "undefined") {
    //     let storageListData = JSON.parse(localStorage.getItem('todoListData'));
    //     delete storageListData[payload.listId ];
    //     localStorage.setItem('todoListData', JSON.stringify(storageListData))
    //   }

    // },

    getFromLocalStoreTodoListData(state) {
      state.todoListData = JSON.parse(localStorage.getItem('todoListData'));
    },
    addTodoList({commit}) {
      /*g*/console.log('commit'); //todo remove it
      /*g*/console.log(commit); //todo remove it
      // commit({})
    },
    deleteTodoItem(state, payload) {
      /*g*/console.log('||||state.todoListData'); //todo remove it
      /*g*/console.log(state.todoListData); //todo remove it
      delete state.currentlyEditingList.list[payload.itemId];
      /*g*/console.log('_____state.todoListData'); //todo remove it
      /*g*/console.log(state.todoListData); //todo remove it
    },
    changeDoneStatus(state, payload) {
      /*g*/console.log('payload'); //todo remove it
      /*g*/console.log(payload); //todo remove it
      state.currentlyEditingList.list[payload.itemId].done = payload.status;
      /*g*/console.log('state.currentlyEditingList'); //todo remove it
      /*g*/console.log(state.currentlyEditingList); //todo remove it

    }
  },
  actions: {
        deleteTodoItemUsingStorage({commit}, payload) {
          /*g*/console.log('payload'); //todo remove it
          /*g*/console.log(payload); //todo remove it
          commit('deleteTodoItem', payload);
          commit('updateLocalStoreTodoListData');
        },
    deleteNoteFromCurrentlyEditingList({commit}, payload) {
      commit('deleteTodoItem', payload);
    },
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

