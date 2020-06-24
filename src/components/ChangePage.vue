<template>
    <div class="change-wrapper">
        <div class="change-header">
            <div class="creating-new" v-if="newList">Creating new Todo</div>
            <div class="editing-todo" v-else>Editing Todo №{{$route.params.id}}</div>
        </div>
        <div class="change-body">
            <span class="top-buttons-wrapper" ref="topButtons">
                <SaveCancelDeleteButtons/>
            </span>
            <div class="change-under-header" v-if="todoData">
                <div class="todo-short-wrapper">
                    <div class="todo-short-top-part ">
                        <div class="name-changer-textarea-wrapper" @keyup.ctrl.enter="saveNewListName"
                             v-if="nameChanging">

                            <TextEditorTDL ref="todoRenamer"
                                           :currentlyChangingText="currentlyChangingName"
                                           :maxNoteLength="maxNameLength"
                                           placeHolder="Set new Todo name here">
                                <template v-slot:save>
                                    <div class="default-button text-save-button todo-text-edit-button"
                                         v-on:click="saveNewListName">Save
                                    </div>
                                </template>

                                <div class="default-button cancel-item-editing todo-text-edit-button"
                                     v-on:click="cancelListNameChanging">Cancel
                                </div>
                            </TextEditorTDL>

                        </div>

                        <span class="todo-top-part-text vert-centered-inner" v-else>{{this.$store.state.currentlyEditingList.name}}</span>
                        <div class="todo-short-top-name-icons" v-if="!nameChanging">

                            <div class="top-name-changer" v-on:click="openNameEditing">

                                <img src="@/assets/images/icons8-edit.svg"

                                     class="top-short-icon ">
                                <span class="renamer">rename</span>
                            </div>
                            <div class="top-todolist-deleter" v-on:click="deleteThisTodo">
                                <img src="@/assets/images/icons8-delete.svg" alt="delete" class="top-short-deleter top-short-icon">
                                <span class="deleter">delete</span>
                            </div>

                        </div>
                    </div>

                    <div class="todo-change-page-bottom-part">
                        <div class="todo-bottom-left-part">
                            <div class="new-item-adder" @keyup.ctrl.enter="saveNewNote">
                                <TextEditorTDL ref="noteTextAdder"
                                               :currentlyChangingText="newTodoItemName"
                                               placeHolder="Type new note text here and press 'Add' button">
                                    <template v-slot:save>
                                        <div class="default-button text-save-button" v-on:click="saveNewNote">Add</div>
                                    </template>

                                </TextEditorTDL>
                            </div>

                            <div class="todo-short-list-inludes"
                                 v-for="(item,index) in this.$store.state.currentlyEditingList.list" :key="index">
                                <ChangePageNote :partData="item" :listId="parseInt(listId)" :itemId="parseInt(index)"/>
                            </div>
                            <div class="bottom-buttons" v-if="showBottomButtons">
                                <SaveCancelDeleteButtons extraClass="bottom-buttons"/>
                            </div>
                        </div>
                        <div class="undo-redo-buttons"
                        >
                            <div class="default-button undo-button"
                                 @click="undoLastAction" :class="{ blocked: !canUndo}">Undo
                            </div>
                            <div class="default-button redo-button"
                                 @click="redoLastAction" :class="{ blocked: !canRedo}">Redo
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    import ChangePageNote from "./subParts/ChangePageNote";
    import TextEditorTDL from "./subParts/TextEditorTDL"
    import SaveCancelDeleteButtons from "./subParts/SaveCancelDeleteButtons";

    export default {
        name: "Change",
        components: {
            ChangePageNote,
            SaveCancelDeleteButtons,
            TextEditorTDL
        },
        data: function () {
            return {
                todoData: {},
                adderStyle: {},
                newTodoItemName: '',
                listId: 0,
                nameChanging: false,
                currentlyChangingName: '',
                currentlyChangingNewNoteText: '',
                newList: false,
                showBottomButtons: false,
                maxNameLength: 70
            }
        },
        computed: {
            canRedo() {
                return this.undone.length;
            },
            canUndo() {
                return this.done.length > 1;
            }
        },

        created() {
            window.addEventListener('scroll', this.handleScroll)
            this.$store.commit('emptyState');

            // Adding current TodoList data from localstorage to vuex by url
            if (this.$route.params.id && this.$route.params.id !== '0') {
                this.listId = this.$route.params.id;
                let wrongPage = false;
                let storageListData = JSON.parse(localStorage.getItem('todoListData'));
                let currentlyEditingList;
                if (typeof storageListData[this.listId] !== "undefined") {
                    currentlyEditingList = storageListData[this.listId];
                } else {
                    wrongPage = true;
                }
                this.$store.commit('setCurrentlyEditingList', {
                    listId: this.$route.params.id,
                    currentlyEditingList: currentlyEditingList
                });
                if (wrongPage) {
                    this.$router.push('/');
                }
            } else {
                this.newList = true;
            }
        },
        mounted() {
            if (this.newList) {
                this.openNameEditing();
            }
        },
        methods: {
            handleScroll() {
                /*
                    If user scrolled far enough to hide top save/cancel buttons -
                    Adds extra one to the bottom, so user could exit page
                    without scrolling to top
                */
                if (typeof this.$refs['topButtons'] !== "undefined") {
                    let topForms = this.$refs['topButtons'].getBoundingClientRect();
                    this.showBottomButtons = topForms.y + topForms.height < 0;
                }

            },
            checkIfNameIsNotEmpty() {
                if (typeof this.$refs.todoRenamer !== "undefined" && this.$refs.todoRenamer.checkEmptyText()
                    || typeof this.$refs.todoRenamer === "undefined" && this.$store.state.currentlyEditingList.name.length === 0
                ) {
                    this.$dialog.alert('Todo name can\'t be empty ');
                    return false;
                }
                return true;
            },
            saveListChanges(closeEditor = true) {
                if (this.checkIfNameIsNotEmpty()) {
                    let needRedirect = false;
                    if (typeof this.$store.state.editingListId === "undefined" || !this.$store.state.editingListId) {
                        needRedirect = true;
                    }
                    this.$store.commit('saveCurrentlyEditingToLocalStorage');
                    if (closeEditor) {
                        this.$router.push('/');
                    } else {
                        if (needRedirect) {
                            /**
                             * Changing page status from "creating new" to "change existing"
                             */
                            this.$router.push('/change/' + this.$store.state.editingListId)
                            this.newList = false;
                        }
                    }
                }
            },
            async cancelTodoChanges() {
                let confirmed = await this.$dialog
                    .confirm('Cancel editing?')
                    .then(function () {
                        return true;
                    });

                if (confirmed) {
                    await this.$router.push('/');
                }
            },
            openNameEditing() {
                this.currentlyChangingName = this.$store.state.currentlyEditingList.name;
                this.nameChanging = true;
                this.$nextTick(function () {
                    this.$refs.todoRenamer.startTextEditing();
                })
            },
            async deleteThisTodo() {
                let confirmResult = await this.$dialog
                    .confirm('Are you sure you want to delete whole Todo?')
                    .then(function () {
                        return true;
                    })
                    .catch(function () {
                        return false;
                    });

                if (confirmResult) {
                    this.$store.commit('deleteCurrentlyEditingListFromLocalStorage');
                    await this.$router.push('/');
                }
            },
            saveNewNote() {
                if (this.$refs.noteTextAdder.checkEmptyText()) {
                    this.$dialog.alert('Add some text before saving');
                } else {
                    this.$store.commit('saveCurrentlyEditingListNoteInVuex',
                        {
                            newData:
                                {
                                    name: this.$refs.noteTextAdder.getText(),
                                    done: false
                                }
                        })
                    this.newTodoItemName = '';
                    this.$refs.noteTextAdder.clearTextEditing();
                    this.$forceUpdate();
                }
            },
            cancelListNameChanging() {
                this.nameChanging = false;
            },
            saveNewListName() {
                if (this.checkIfNameIsNotEmpty()) {
                    this.$store.commit('setListName', {name: this.$refs.todoRenamer.getText()});
                    this.cancelListNameChanging();
                }
            },
            undoLastAction() {
                if (this.canUndo) {
                    this.undo();
                }
            },
            redoLastAction() {
                if (this.canRedo) {
                    this.redo();
                }
            }
        }
    }
</script>