<template>
    <div class="change-wrapper">

        <div class="change-header">
            <div class="creating-new" v-if="newList">Creating new Todo</div>
            <div class="editing-todo" v-else>Editing Todo №{{$route.params.id}}</div>
        </div>
        <div class="change-body">
            <SaveCancelDeleteButtons />
            <div class="add-new-includer">

            </div>


            <div class="change-under-header" v-if="todoData">

                    <div class="todo-short-wrapper">
        <div class="todo-short-top-part ">
                <div class="name-changer-textarea-wrapper"  @keyup.ctrl.enter="saveNewListName" v-if="nameChanging">

                    <TextEditorTDL  ref="todoRenamer"
                                    :currentlyChangingText="currentlyChangingName"
                                    :maxNoteLength=50
                                    placeHolder="Set new Todo name here">
                        <template v-slot:save>
                            <div class="default-button text-save-button todo-text-edit-button" v-on:click="saveNewListName">Save</div>
                        </template>

                        <div class="default-button cancel-item-editing todo-text-edit-button" v-on:click="cancelListNameChanging">Cancel</div>
                    </TextEditorTDL>

                </div>

                <span class="todo-top-part-text vert-centered-inner" v-else>{{this.$store.state.currentlyEditingList.name}}</span>
            <div class="todo-short-top-name-icons" v-if="!nameChanging" >

                <div class="top-name-changer" v-on:click="openNameEditing">

                    <img src="@/assets/images/icons8-edit.svg"

                         class="top-short-icon " >
                    <span class="renamer">rename</span>
                </div>
                <div class="top-todolist-deleter"  v-on:click="deleteThisTodo">
                    <img src="@/assets/images/icons8-delete.svg"  class="top-short-deleter top-short-icon">
                    <span class="deleter">delete</span>
                </div>

            </div>
        </div>



        <div class="todo-change-page-bottom-part">

            <div class="todo-bottom-left-part">

                <div class="new-item-adder" v-if="scrollablePage" @keyup.ctrl.enter="saveNewNote">
                    <TextEditorTDL  ref="noteTextAdder"
                                    :currentlyChangingText="newTodoItemName"

                                    placeHolder="Type new note text here and press 'Add' button">
                        <template v-slot:save>
                        <div class="default-button text-save-button" v-on:click="saveNewNote">Add</div>
                        </template>

                    </TextEditorTDL>
                </div>

<!--                <div class="todo-short-list-inludes"  v-for="(item,index) in todoData.list" :key="index">-->
                <div class="todo-short-list-inludes"  v-for="(item,index) in this.$store.state.currentlyEditingList.list" :key="index">
                    <TodoFullPart :partData="item" :listId="listId" :itemId="parseInt(index)"/>
                </div>
            </div>
            <div class="undo-redo-buttons">
                <div class="default-button undo-button" @click="undoLastAction" :class="{ blocked: !canUndo}">Undo</div>
                <div class="default-button redo-button" @click="redoLastAction" :class="{ blocked: !canRedo}">Redo</div>
            </div>
        </div>
    </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TodoFullPart from "./subParts/TodoFullPart";
    import AddNew from "./subParts/AddNew";
    import TextEditorTDL from "./subParts/TextEditorTDL"

    /*g*/console.log('AddNew'); //todo remove it
    /*g*/console.log(AddNew); //todo remove it
    import SaveCancelDeleteButtons from "./subParts/SaveCancelDeleteButtons";

    //heroku config:set NPM_CONFIG_PRODUCTION=false YARN_PRODUCTION=false todo remove

    export default {
                components: {
            TodoFullPart,
                    // AddNew,
                    SaveCancelDeleteButtons,
                    TextEditorTDL
        },
        data: function() {
            return {
                todoData: {},
                adderStyle: {},
                newTodoItemName: '',
                listId: 0,
                nameChanging: false,
                currentlyChangingName: '',
                currentlyChangingNewNoteText: '',
                newList: false

            }
        },
        created() {


            this.$store.commit('getFromLocalStoreTodoListData');
            if (this.$route.params.id && this.$route.params.id !== '0') {
                // this.$store.state.editingListId = parseInt(this.$route.params.id);
                this.$store.commit('setCurrentlyEditingList', {listId: this.$route.params.id});
                /*g*/console.log('th000000000is.lsistId'); //todo remove it
                /*g*/console.log(this.$store.state.editingListId); //todo remove it
                // this.loadData(this.$store.state.editingListId)
            } else {
                this.nameChanging = true;
                this.newList = true;
                // this.$store.commit('setCurrentlyEditingList', {});
                this.$store.commit('emptyState');

                /*g*/console.log('t11111111111his.listId'); //todo remove it
                /*g*/console.log(this.$store.state.editingListId); //todo remove it
            }
            // this.done = [];
        },
        computed: {
            scrollablePage: () => {
                return true;
            },
            canRedo() {
                return this.undone.length ;
            },
            canUndo() {
                return this.done.length > 1;
            }
        },
        methods: {
            saveListChanges(closeEditor = true) {
                console.log('SAVE')
                // let saveData = {newData: this.todoData};
                // if (this.itemNewId) {
                //     saveData['itemNewId'] = this.itemNewId;
                // }

                // this.$store.commit('saveTodoList',saveData);
                let needRedirect = false;
                /*g*/console.log('this.$store.state.editingListId'); //todo remove it
                /*g*/console.log(this.$store.state.editingListId); //todo remove it
                if (typeof this.$store.state.editingListId === "undefined" || !this.$store.state.editingListId) {
                    needRedirect = true;
                }
                this.$store.commit('saveCurrentlyEditingToLocalStorage');
                // this.$store.commit('updateLocalStoreTodoListData');
                /*g*/console.log('needRedirect'); //todo remove it
                /*g*/console.log(needRedirect); //todo remove it
                if (closeEditor) {
                    this.$router.push('/');
                } else {
                    if (needRedirect) {
                        /*g*/console.log('this.$store.state.editingListId'); //todo remove it
                        /*g*/console.log(this.$store.state.editingListId); //todo remove it
                        this.$router.push( '/change/' + this.$store.state.editingListId)
                    }
                }

            },
            async cancelNameChanges() {
                console.log('CANCEL')

                 let confirmed = await this.$dialog
                    .confirm('Cancel editing?')
                    .then(function() {
                        return true;
                    });

                if (confirmed) {
                    await this.$router.push('/');
                }

            },
            loadData: function (id) {
                let mainData = JSON.parse(localStorage.getItem('todoListData'));


                /*g*/
                console.log('mainData'); //todo remove it
                /*g*/
                console.log(mainData); //todo remove it
                /*g*/console.log('id'); //todo remove it
                /*g*/console.log(id); //todo remove it
                // this.todoData = mainData[id];
                // this.$store.commit('saveTodoList',{itemNewId: id, newData: this.todoData});
            },
            openNameEditing() {

                this.currentlyChangingName = this.$store.state.currentlyEditingList.name;
                this.nameChanging = true;
                this.$nextTick(function () {
                    this.$refs.todoRenamer.startTextEditing();
                })

            },
            async deleteThisTodo() {
                let confirmResult =  await this.$dialog
                    .confirm('Are you sure you want to delete whole Todo?')
                    .then(function() {
                        return true;
                    })
                    .catch(function() {
                        return false;
                    });

                if (confirmResult) {
                    this.$store.commit('deleteCurrentlyEditingListFromLocalStorage');
                    await this.$router.push('/');
                }
            },
            addNewItem() {
                this.adderStyle.height = '50px';
                this.$forceUpdate();
            }
            ,
            saveNewNote() {

                if (this.$refs.noteTextAdder.checkEmptyText()) {
                    this.$dialog.alert('Add some text before saving');
                } else {
                    // this.$store.state.currentlyEditingList.itemNewId++;
                    this.$store.commit('saveCurrentlyEditingListNoteInVuex',
                        {
                            // itemId: itemId,
                            newData:
                            {name: this.$refs.noteTextAdder.getText(), done: false}})
                    this.newTodoItemName = '';
                    this.$refs.noteTextAdder.clearTextEditing();
                    this.$forceUpdate();
                }
            },
            handelNameChange() {

            },
            saveNewListName() {
                if (this.$refs.todoRenamer.checkEmptyText()) {
                    this.$dialog.alert('Todo name can\'t be empty ');
                } else {
                    this.$store.commit('setListName', {name: this.$refs.todoRenamer.getText()});
                    this.nameChanging = false;
                }
            },
            cancelListNameChanging() {
                this.nameChanging = false;
            },
            undoLastAction() {

                if (this.canUndo) {
                    this.undo();
                    this.$forceUpdate();
                }

            },
            redoLastAction() {
                if (this.canRedo) {
                    this.redo();
                    this.$forceUpdate();
                }
            }
        },
        name: "Change"
    }
</script>

<style scoped>

</style>