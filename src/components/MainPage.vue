<template>
    <div class="main-wrapper">
        <router-link to="/change/0" >
            <div class="adder-button-wrapper default-button">
                Add new Todo
            </div>
        </router-link>
        <div class="todoshorts-inluces" v-for="(item,index) in mainData" :key="index">
            <TodoShort :todoData = "item" :todoId = "index"  />
        </div>

    </div>
</template>

<script>
    import TodoShort from "./subParts/MainPageTodo";

    import('../assets/scss/main.css')
    export default {
        name: "Main",
        components: {
            TodoShort
        },
        data: function () {
            return {
                mainData: {},
                notesPerPage: 2
            }
        },
        created() {
            this.loadTodos();
        },
        methods: {
            /**
             * Getting Todolist from localstorate,
             * essentially imitating getting data from server using axios
             */
            loadTodos() {
               let wholeTodos = JSON.parse(localStorage.getItem('todoListData'));
                let newTodos = {};
                for (let index in wholeTodos) {
                    let todoData = wholeTodos[index];
                    if (typeof todoData.list !== "undefined" ) {
                        newTodos = {};
                        let counter = 0;
                        for (let noteId in todoData.list) {
                            newTodos[noteId] = todoData.list[noteId];
                            counter++;
                            if (counter >= this.notesPerPage) {
                                break;
                            }
                        }
                        wholeTodos[index].list = newTodos;
                    }
                }
                this.mainData = wholeTodos;
            },
            deleteTodo(id) {
                delete this.mainData[id];
                this.$forceUpdate();
            }
        }
    }
</script>