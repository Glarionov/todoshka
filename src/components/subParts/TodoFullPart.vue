<template>
        <div class="todo-full-part-wrapper" :style="shortPartWrapperStyle"
        >
                <div class="part-data-name-and-checkbox">
                    <div class="part-data-checkbox-wrapper">
                        <label><input class="part-data-checkbox" type="checkbox" v-model="partData.done"/> </label>
                    </div>


                    <div class="text-or-textarea-part" @keyup.ctrl.enter="saveTodoItemChanges">
                        <TextEditorTDL  v-if="changing" ref="noteTextEditor"
                                        :currentlyChangingText="currentlyChangingText"
                                        placeHolder="Set note text here"
                        >
                            <template v-slot:save>
                                <div class="save-item-editing text-save-button todo-text-edit-button default-button" v-on:click="saveTodoItemChanges">Save</div>
                            </template>

                            <div class="cancel-item-editing todo-text-edit-button default-button" v-on:click="stopTextEditing">Cancel</div>
                        </TextEditorTDL>
                        <div class="simple-text" v-else>
                            {{partData.name}}
                        </div>
                    </div>
<!--                    <textarea ref="tt" @keyup="cctt" :style="ts"/>-->

                </div>

                <div class="todo-short-top-main-icons" v-if="!changing" >
                    <img src="@/assets/images/icons8-edit.svg"
                         v-on:click="toggleChanging"
                         class="top-short-icon top-short-changer" alt="Edit item" title="Edit item">
                        <img src="@/assets/images/icons8-delete.svg"  v-on:click="deleteTodoItem" class="top-short-deleter top-short-icon"  alt="Delete item" title="Delete item">
                </div>

    </div>

</template>

<script>
    import {TimelineLite} from 'gsap'
    import { setResizeListeners } from "../../assets/js/auto-resize";
    import TextEditorTDL from "./TextEditorTDL";

    export default {
        mounted() {
            setResizeListeners(this.$el, ".js-autoresize");
        },
        components: {
            TextEditorTDL
        },
        data: function () {
            return {
                gsapObject: new TimelineLite(),
                changing: false,
                // currentlyChangingText: '',
                shortPartWrapperStyle: {},
                changerTextAreaStyle: {},
                notChangingHeight: 33,
                changingHeight: 100,
                maxNoteLength: 30,
                currentlyChangingText: 'abc',
                charactersLeftMessage: '',
                charactersLeftToStartAlert: 20,
                ts: {
                    height: '10px'
                }
            }
        },
        props: {
            listId: Number,
          partData: Object,
            itemId: Number
        },
        computed: {
            isOverflowing() {
                let element = this.$refs.cartList;
                return (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth)
            },
            // currentlyChangingText: {
            //     get: function () {
            //         return this.value;
            //     },
            //     set: function (aModifiedValue) {
            //         this.$emit("input", aModifiedValue.substring(0, this.maxNoteLength));
            //     }
            // }
        },
        methods: {
            cctt() {
                this.$refs.tt.height = this.$refs.tt.scrollHeight;
                // if (this.$refs.tt.scrollHeight - hn > 0) {
                    this.ts.height = this.$refs.tt.scrollHeight + 'px';
                // }
                // this.ts.height = this.$refs.tt.scrollHeight + 'px';
                this.$forceUpdate();
            },
            confirmedDelete() {
                console.log('confirmed')
            },
            saveTodoItemChanges() {
                if (this.$refs.noteTextEditor.checkEmptyText()) {
                    this.$dialog.alert('Add some text before saving');
                } else {
                    this.changing = false;
                    this.$store.commit('saveCurrentlyEditingListNoteInVuex', { itemId: this.itemId, newData: {name: this.$refs.noteTextEditor.currentlyChangingTextValue}});
                }

                },

            async deleteTodoItem() {



                // this.$dialog.alert('Алерт').then(function(dialog) {
                //     /*g*/console.log('dialog'); //todo remove it
                //     /*g*/console.log(dialog); //todo remove it
                //     console.log('Closed');
                // });

                let confirmResult =  await this.$dialog
                    .confirm('Delete item?')
                    .then(function() {
                        return true;
                    })
                    .catch(function() {
                        return false;
                    });

                if (confirmResult) {
                    // delete this.$store.state.currentlyEditingList.list[this.itemId];

                    // await this.$store.dispatch('deleteTodoItemUsingStorage', {'listId': this.listId, 'itemId': this.itemId});
                    await this.$store.dispatch('deleteNoteFromCurrentlyEditingList', {itemId: this.itemId});
                    this.$parent.$forceUpdate();
                }


                // /*g*/console.log('-this.$parent.todoData.list'); //todo remove it
                // /*g*/console.log(this.$parent.todoData.list); //todo remove it
                // delete this.$parent.todoData.list[this.itemId];
                // /*g*/console.log('--this.$parent.todoData.list'); //todo remove it
                // /*g*/console.log(this.$parent.todoData.list); //todo remove it
            },
            stopTextEditing() {
                this.changing = false;
            },
            toggleChanging() {

                this.currentlyChangingText = this.partData.name;

                this.changing = true;
                let animationVars = {duration: 0.2};
                    animationVars.height = this.changingHeight;
                    this.$forceUpdate();

                    this.$nextTick(function () {
                        this.$refs.noteTextEditor.startTextEditing();
                    })
            }
            ,
            autoResizeTextArea() {
                this.changerTextAreaStyle.height = 'auto';
                let sss = this.$refs.shortPartWrapperRef.scrollHeight;
                this.changerTextAreaStyle.borderWidth = 0;

                // let sss = this.$refs.shortPartWrapperRef.offsetHeight;
                // let sss = this.$refs.shortPartWrapperRef.clientHeight;

                this.changerTextAreaStyle.height = `${sss}px`;
                // this.changerTextAreaStyle.offsetHeight = `${sss}px`;
                // this.$refs.shortPartWrapperRef.height = `${this.$refs.shortPartWrapperRef.scrollHeight}`;
            },
            handleTextChange() {
                let charactersLeft = this.maxNoteLength - this.currentlyChangingText.length;
                let newInfoMessage = '';

                if (charactersLeft < this.charactersLeftToStartAlert) {
                    newInfoMessage += `${charactersLeft} characters left`;
                } else {
                    console.log('b')
                }
                this.charactersLeftMessage = newInfoMessage;
            },
            handleTextChangeBlur() {

            }
        },

        name: "TodoFullPart"
    }
</script>

<style scoped>

</style>