<template>
    <div class="todo-full-part-wrapper" :style="shortPartWrapperStyle"
    >
        <div class="part-data-name-and-checkbox">
            <div class="part-data-checkbox-wrapper">
                <label><input class="part-data-checkbox"
                              @click="changeDoneStatus"
                              type="checkbox" v-model="partData.done"/> </label>
            </div>

            <div class="text-or-textarea-part" @keyup.ctrl.enter="saveTodoNoteChanges">
                <TextEditorTDL v-if="textEditing" ref="noteTextEditor"
                               :currentlyChangingText="currentlyChangingText"
                               placeHolder="Set note text here"
                >
                    <template v-slot:save>
                        <div class="save-item-editing text-save-button todo-text-edit-button default-button"
                             v-on:click="saveTodoNoteChanges">Save
                        </div>
                    </template>

                    <div class="cancel-item-editing todo-text-edit-button default-button" v-on:click="stopTextEditing">
                        Cancel
                    </div>
                </TextEditorTDL>
                <div class="simple-text" v-html="$options.filters.properShowNewLine(partData.name)" v-else>
                </div>
            </div>
        </div>

        <div class="todo-short-top-main-icons" v-if="!textEditing">
            <img src="@/assets/images/icons8-edit.svg"
                 v-on:click="startTextEditing"
                 class="top-short-icon top-short-changer" alt="Edit note" title="Edit note">
            <img src="@/assets/images/icons8-delete.svg" v-on:click="deleteTodoItem"
                 class="top-short-deleter top-short-icon" alt="Delete note" title="Delete note">
        </div>
    </div>
</template>

<script>
    import {setResizeListeners} from "../../assets/js/auto-resize";
    import TextEditorTDL from "./TextEditorTDL";

    export default {
        name: "ChangePageNote",
        mounted() {
            setResizeListeners(this.$el, ".js-autoresize");
        },
        components: {
            TextEditorTDL
        },
        data: function () {
            return {
                textEditing: false,
                shortPartWrapperStyle: {},
                changerTextAreaStyle: {},
                currentlyChangingText: '',
            }
        },
        props: {
            listId: Number,
            partData: Object,
            itemId: Number
        },
        methods: {
            saveTodoNoteChanges() {
                if (this.$refs.noteTextEditor.checkEmptyText()) {
                    this.$dialog.alert('Add some text before saving');
                } else {
                    this.textEditing = false;
                    this.$store.commit('saveCurrentlyEditingListNoteInVuex',
                        {
                            itemId: this.itemId, newData:
                                {
                                    name: this.$refs.noteTextEditor.currentlyChangingTextValue,
                                    done: this.partData.done
                                }
                        });
                }
            },
            async deleteTodoItem() {
                let confirmResult = await this.$dialog
                    .confirm('Delete item?')
                    .then(function () {
                        return true;
                    })
                    .catch(function () {
                        return false;
                    });

                if (confirmResult) {
                    await this.$store.commit('deleteTodoItem', {itemId: this.itemId});
                    this.$parent.$forceUpdate();
                }
            },
            stopTextEditing() {
                this.textEditing = false;
            },
            startTextEditing() {
                this.currentlyChangingText = this.partData.name;
                this.textEditing = true;
                this.$forceUpdate();
                this.$nextTick(function () {
                    this.$refs.noteTextEditor.startTextEditing();
                })
            },
            changeDoneStatus() {
                this.$store.commit('changeDoneStatus', {itemId: this.itemId, status: !this.partData.done})
            }
        },
    }
</script>