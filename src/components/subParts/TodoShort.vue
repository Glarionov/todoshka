<template>
    <div class="todo-short-wrapper">
        <div class="todo-short-top-part ">
            <div class="vert-centered-outer">
                <span class="todo-top-part-text vert-centered-inner">{{todoData.name}}</span>
            </div>


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
            TodoShortPart
        },
        props: {
            todoData: Object
        },
        name: "TodoShort"
    }
</script>

<style scoped>

</style>