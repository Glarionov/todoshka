import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        count: 1,
        mainData: {},
        todoListNewId: 1,
        currentlyEditingList: {},
        editingListId: 0
    },
    mutations: {
        emptyState() {
            this.replaceState({
                count: 0, todoListNewId: 1, currentlyEditingList: {
                    name: '',
                    list: {},
                    itemNewId: 1
                },
                editingListId: 0
            });
        },
        setCurrentlyEditingList(state, payload) {
            if (typeof payload.listId !== "undefined" && typeof payload.currentlyEditingList !== "undefined") {
                state.editingListId =  payload.listId;
                state.currentlyEditingList = JSON.parse(JSON.stringify(payload.currentlyEditingList));
            }
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
                } else {
                    itemId = payload.itemId;
                }
                state.currentlyEditingList.list[itemId] = Object.assign({}, payload.newData);
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
            localStorage.setItem('todoListData', JSON.stringify(storageListData))
        },
        deleteCurrentlyEditingListFromLocalStorage(state) {
            let storageListData = JSON.parse(localStorage.getItem('todoListData'));
            delete storageListData[state.editingListId];
            localStorage.setItem('todoListData', JSON.stringify(storageListData))
        },
        deleteTodoItem(state, payload) {
            delete state.currentlyEditingList.list[payload.itemId];
        },
        changeDoneStatus(state, payload) {
            state.currentlyEditingList.list[payload.itemId].done = payload.status;
            state.currentlyEditingList = JSON.parse(JSON.stringify(state.currentlyEditingList))
        }
    }
})

export default store;