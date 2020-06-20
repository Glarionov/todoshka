<template>
    <div class="ab" v-if="true">
        <div class="todo-short-part-wrapper  rel-parent" :style="shortPartWrapperStyle" ref="shortPartWrapperRef">
            <div class="vert-centered-outer todo-item-text">
                <div class="part-data-name-and-checkbox vert-centered-inner">
                    <label><input type="checkbox" :checked="partData.done"/> </label>
                    <div class="text-or-textarea-part">
                        <div class="changer-textarea-wrapper" v-if="changing">
                            <textarea class="changer-textarea" name="" id="" v-model="currentlyChangingText"></textarea>
                        </div>
                        <div class="simple-text" v-else>
                            {{partData.name}}
                        </div>
                    </div>


                </div>
                <div class="todo-short-top-main-icons vert-centered-inner ">
                    <div class="top-short-changer" v-on:click="toggleChanging">
                        Редактировать
                    </div>
                    <div class="top-short-deleter " v-on:click="deleteTodoItem">
                        Удалить
                    </div>
                </div>

            </div>

        </div>
    </div>

</template>

<script>
    import {TimelineLite} from 'gsap'

    export default {
        data: function () {
            return {
                gsapObject: new TimelineLite(),
                changing: false,
                currentlyChangingText: '',
                shortPartWrapperStyle: {},
                notChangingHeight: 33,
                changingHeight: 100
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
            }
        },
        methods: {
            deleteTodoItem() {
                /*g*/console.log('listId'); //todo remove it
                /*g*/console.log(this.listId); //todo remove it
                /*g*/console.log('itemId'); //todo remove it
                /*g*/console.log(this.itemId); //todo remove it

                /*g*/console.log('((((((((((((9his.$parent.todoData.list'); //todo remove it
                /*g*/console.log(this.$parent.todoData.list); //todo remove it
                delete this.$parent.todoData.list[this.itemId];
                this.$parent.$forceUpdate();
                this.$store.dispatch('deleteTodoItemUsingStorage', {'listId': this.listId, 'itemId': this.itemId});
                // /*g*/console.log('-this.$parent.todoData.list'); //todo remove it
                // /*g*/console.log(this.$parent.todoData.list); //todo remove it
                // delete this.$parent.todoData.list[this.itemId];
                // /*g*/console.log('--this.$parent.todoData.list'); //todo remove it
                // /*g*/console.log(this.$parent.todoData.list); //todo remove it
            },
            toggleChanging() {
                const {shortPartWrapperRef} = this.$refs
                this.changing = !this.changing;
                let animationVars = {duration: 0.2};
                if (this.changing) {
                    this.currentlyChangingText = this.partData.name;
                    animationVars.height = this.changingHeight;
                } else {
                    animationVars.height = this.notChangingHeight;
                }

                this.gsapObject.to(shortPartWrapperRef, animationVars);

                /*g*/console.log('this.shortPartWrapperStyle.height'); //todo remove it
                /*g*/console.log(this.shortPartWrapperStyle.height); //todo remove it
            }
        },
        name: "TodoFullPart"
    }
</script>

<style scoped>

</style>