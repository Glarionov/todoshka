<template>
    <div class="todo-short-wrapper">
        <div class="todo-short-top-part   rel-parent">
            <div class="vert-centered-outer ">
                <span class="todo-top-part-text vert-centered-inner">{{todoData.name}}</span>
            </div>
<!--            <div class="rel-parent todo-short-top-main-icons-wrapper">-->
                <div class="todo-short-top-main-icons vert-centered-outer ">
                    <div class="vert-centered-inner">
                        <router-link :to="'/change/' + todoId">
                        <div class="top-short-changer ">
                            Редактировать
                        </div>
                            </router-link>
                        <div class="top-short-deleter ">
                            Удалить
                        </div>
                    </div>

                </div>
<!--            </div>-->




        </div>
        <div class="todo-short-bottom-part">
            <div class="todo-short-list-inludes"  v-for="(item,index) in todoData.list" :key="index">
                <TodoShortPart :partData="item" />
            </div>
        </div>
    </div>
</template>

<script>
    import TodoShortPart from "./TodoShortPart";
    export default {
        components: {
            TodoShortPart,
        },
        props: {
            todoData: Object,
            todoId: Number
        },
        name: "TodoShort"
    }
</script>

<style scoped>

</style>