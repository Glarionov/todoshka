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
                    @keyup.native.space="enterClicked()"
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
    import {TimelineLite} from "gsap";

    export default {
        name: "TextEditorTDL",
        data: function () {
            return {
                changing: true,
                gsapObject: new TimelineLite(),

                charactersLeftMessage: '',
                charactersLeftToStartAlert: 30,
                currentlyChangingTextValue: '',
                emptyText: true,
                doneText: [],
                undoneText: []
            }
        },
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
                default: 100
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
            enterClicked() {
                /*g*/console.log('this.$parent'); //todo remove it
                /*g*/console.log(this.$parent); //todo remove it
                // this.$parent.$refs.saveButton.click()
            },
            checkEmptyText() {
              return this.emptyText;
            },
            getText() {
                return this.currentlyChangingTextValue.replace(/(?:\r\n|\r|\n)/g, '<br>');
            },
            startTextEditing() {
                this.handleTextChange();
                this.$refs.myTextarea.$el.focus();
            },
            clearTextEditing() {
                this.currentlyChangingTextValue = '';
                this.emptyText = true;
            },
            stopTextEditing() {
                this.changing = false;
            },
            pushTextState() {
                this.doneText.push(this.currentlyChangingTextValue);
            },
            handleTextChange() {
                let textLength = this.currentlyChangingTextValue.length;

                if (textLength) {
                    if (/\S/.test(this.currentlyChangingTextValue)) {
                        this.emptyText = false;
                    } else {
                        this.emptyText = true;
                    }

                } else {
                    this.emptyText = true;
                }

                let charactersLeft = this.maxNoteLength - textLength;
                let newInfoMessage = '';

                if (charactersLeft < this.charactersLeftToStartAlert) {
                    newInfoMessage += `${charactersLeft} characters left`;
                } else {
                    console.log('b')
                }
                this.charactersLeftMessage = newInfoMessage;
            }
        }
    }
</script>

<style scoped>

</style>