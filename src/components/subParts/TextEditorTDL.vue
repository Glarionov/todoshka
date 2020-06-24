<template>
    <div class="text-editor-tdl-wrapper">
        <div class="changer-textarea-wrapper" v-if="changing">
            <img src="@/assets/images/undo.svg"
                 @click="undoTextEdition"
                 class="undo-text-edition"
                 :class="[{blocked: !canUndoText}]"
                 alt="undo" title="undo last text edition">
            <img src="@/assets/images/undo.svg"
                 class="redo-text-edition"
                 @click="redoTextEdition"
                 :class="[{blocked: !canRedoText}]"
                 alt="redo" title="redo last text edition">

            <div class="changer-textarea-wrapper"
            @keyup.enter = "pushTextState"
            >
            <textarea-autosize
                    :placeholder="placeHolder"
                    ref="myTextarea"
                    @change="handleTextChange"
                    @paste="handleTextChange"
                    @keyup.native="handleTextChange"
                    class="changer-textarea"
                    v-model="currentlyChangingTextValue"
                    :maxlength="maxNoteLength"
            />
                </div>
            <div class="text-editing-bottom-part">
                <span class="saving-button-wrapper" :class="{blocked: emptyText}" :title="saveButtonTitle">
                    <slot name="save" ref="saveButton"></slot>
                </span>
                <slot></slot>
                <div  class="characters-left-message">{{charactersLeftMessage}}</div>
            </div>
        </div>
    </div>
</template>

<script>

    /**
     *  Provides textarea expanding vertically by it's content,
     *  "undo" and "redo" commands for editor
     *  and field to show amount of characters left
     */
    export default {
        name: "TextEditorTDL",
        props: {
            currentlyChangingText: {
                type: String,
                default: ''
            },
            placeHolder: {
                type: String,
                default: 'add text here'
            },
            maxNoteLength: {
                type: Number,
                default: 200
            }
        },
        data: function () {
            return {
                changing: true,
                charactersLeftMessage: '',
                charactersLeftToStartAlert: 30,
                currentlyChangingTextValue: '',
                emptyText: true,
                doneText: [''],
                undoneText: []
            }
        },
        computed: {
            saveButtonTitle () {
                if (this.emptyText) {
                    return 'Add some text before saving it'
                }
                return '';
            },
            canUndoText() {
                return this.doneText.length > 1;
            },
            canRedoText() {
                return this.undoneText.length > 0;
            }
        },
        created() {
          this.currentlyChangingTextValue = this.currentlyChangingText;
          this.doneText = [this.currentlyChangingTextValue];
        },
        methods: {
            /**
             *  Adds new element in states array for undo-redo actions
             */
            pushTextState() {
                this.doneText.push(this.currentlyChangingTextValue);
            },
            undoTextEdition() {
                if (this.canUndoText) {
                    this.undoneText.push(this.currentlyChangingTextValue);
                    this.doneText.pop()
                    this.currentlyChangingTextValue = this.doneText[this.doneText.length - 1];
                }

            },
            redoTextEdition() {
                if (this.canRedoText) {
                    this.currentlyChangingTextValue = this.undoneText.pop();
                    this.doneText.push(this.currentlyChangingTextValue);
                }
            },
            checkEmptyText() {
              return this.emptyText;
            },
            getText() {
                return this.currentlyChangingTextValue;
            },
            startTextEditing() {
                this.handleTextChange();
                this.$refs.myTextarea.$el.focus();
            },
            clearTextEditing() {
                this.currentlyChangingTextValue = '';
                this.emptyText = true;
                this.doneText = [''];
                this.undoneText = [];
            },
            stopTextEditing() {
                this.changing = false;
            },
            /**
             * Handles text change after pressing key, pasting, etc.
             */
            handleTextChange() {
                let textLength = this.currentlyChangingTextValue.length;
                let charactersLeft = this.maxNoteLength - textLength;
                this.emptyText = !!(!textLength || !/\S/.test(this.currentlyChangingTextValue));

                let newCharactersLeftMessage = '';
                if (charactersLeft < this.charactersLeftToStartAlert) {
                    newCharactersLeftMessage += `${charactersLeft} characters left`;
                }
                this.charactersLeftMessage = newCharactersLeftMessage;
            }
        }
    }
</script>