<template>
    <div class="text-editor-tdl-wrapper">
        <div class="changer-textarea-wrapper" v-if="changing">
            <div class="changer-textarea-wrapper">
            <textarea-autosize
                    :placeholder="placeHolder"
                    ref="myTextarea"
                    @change="handleTextChangeBlur"
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
                <div class="characters-left-message">{{charactersLeftMessage}}</div>
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
                emptyText: true
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
            }
        },
        created() {
          this.currentlyChangingTextValue = this.currentlyChangingText;
        },
        methods: {
            enterClicked() {
                /*g*/console.log('this.$parent'); //todo remove it
                /*g*/console.log(this.$parent); //todo remove it
                // this.$parent.$refs.saveButton.click()
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
            },
            stopTextEditing() {
                this.changing = false;
                /*g*/console.log('this.changing'); //todo remove it
                /*g*/console.log(this.changing); //todo remove it
                // this.$parent.
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


                /*g*/console.log('charactersLeft'); //todo remove it
                /*g*/console.log(charactersLeft); //todo remove it
                if (charactersLeft < this.charactersLeftToStartAlert) {
                    newInfoMessage += `${charactersLeft} characters left`;
                } else {
                    console.log('b')
                }
                this.charactersLeftMessage = newInfoMessage;
            },
            handleTextChangeBlur() {
                console.log('hhbb')
            },
            changeTodoItem() {
                console.log('ctdi')
            }
        }
    }
</script>

<style scoped>

</style>