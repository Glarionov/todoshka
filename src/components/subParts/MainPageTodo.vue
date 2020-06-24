<template>
    <div class="todo-short-wrapper">
        <div class="todo-short-top-part">
            <div class="todo-top-part-text " ref="topPartText">
                {{todoData.name}}
            </div>
            <div class="todo-short-top-main-icons ">
                <router-link :to="'/change/' + todoId" class="top-short-changer">
                    <img src="@/assets/images/icons8-edit.svg" class="top-short-icon" alt="Edit post" title="Edit post">
                </router-link>
                <div class="top-short-deleter " v-on:click="deleteTodo">
                    <img src="@/assets/images/icons8-delete.svg" class="top-short-icon" alt="Delete post"
                         title="Delete post">
                </div>
            </div>
        </div>
        <div class="todo-short-bottom-part">
            <div class="todo-short-list-inludes" v-for="(item,index) in todoData.list" :key="index">
                <MainPageTodoNote :partData="item"/>
            </div>
        </div>
    </div>
</template>

<script>
    import MainPageTodoNote from "./MainPageTodoNote";

    export default {
        name: "MainPageTodo",
        components: {
            MainPageTodoNote,
        },
        props: {
            todoData: Object,
            todoId: String,
            itemId: Number
        },
        methods: {
            async deleteTodo() {
                let confirmResult = await this.$dialog
                    .confirm('Are you sure you want to delete it?')
                    .then(function () {
                        return true;
                    })
                    .catch(function () {
                        return false;
                    });

                if (confirmResult) {
                    let storageListData = JSON.parse(localStorage.getItem('todoListData'));
                    delete storageListData[this.todoId];
                    localStorage.setItem('todoListData', JSON.stringify(storageListData));
                    this.$parent.deleteTodo(this.todoId);
                }
            }
        }
    }
</script>