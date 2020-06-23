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
Vue.use(VuexUndoRedo );

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

      this.replaceState({
        myval: null, count: 0, todoListData: {}, todoListNewId: 1, currentlyEditingList: {
          name: '',
          list: {},
          itemNewId: 1
        },
        editingListId: 0
      });
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
    setListName(state, payload) {
      if (typeof payload.name !== "undefined") {
        state.currentlyEditingList.name = payload.name;
      }

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
        // state.currentlyEditingList.list[itemId] = payload.newData;

        state.currentlyEditingList.list[itemId] = Object.assign({}, payload.newData);

      }

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
        localStorage.setItem('todoListData', JSON.stringify(state.todoListData))
      }
    },
    updateLocalStoreTodoListData(state) {

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

      if (typeof storageListData === "undefined" || !storageListData) {
        storageListData = {};
      }

      storageListData[state.editingListId] = state.currentlyEditingList;
      // state.editingListId++;
      localStorage.setItem('todoListData', JSON.stringify(storageListData))
    },
    deleteCurrentlyEditingListFromLocalStorage(state) {
      let storageListData = JSON.parse(localStorage.getItem('todoListData'));
      delete storageListData[state.editingListId];
      localStorage.setItem('todoListData', JSON.stringify(storageListData))
    },
    getFromLocalStoreTodoListData(state) {
      state.todoListData = JSON.parse(localStorage.getItem('todoListData'));
    },
    deleteTodoItem(state, payload) {
      delete state.currentlyEditingList.list[payload.itemId];
    },
    changeDoneStatus(state, payload) {
      state.currentlyEditingList.list[payload.itemId].done = payload.status;
      state.currentlyEditingList = JSON.parse(JSON.stringify(state.currentlyEditingList))
    }
  },
  actions: {
        deleteTodoItemUsingStorage({commit}, payload) {
          commit('deleteTodoItem', payload);
          commit('updateLocalStoreTodoListData');
        },
    deleteNoteFromCurrentlyEditingList({commit}, payload) {
      commit('deleteTodoItem', payload);
    },
        incrementer({ commit }) {

    commit('increment')

        },
    pushMainState() {

    }
  },

})


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
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  });

Vue.filter('properShowNewLine', function (value) {
  return value.replace(/(?:\r\n|\r|\n)/g, '<br>')
})

  new Vue({
    // el: '#app',
    // components: { App },
    router,
    store,
    render: h => h(App),
    // subscriber
  }).$mount('#app');

