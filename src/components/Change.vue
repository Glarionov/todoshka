<template>
    <div class="change-wrapper">
        <div class="change-body">
            <div class="add-new-includer">

                <AddNew text="Добавить новый пункт" v-on:click="addNewItem" />
               <div class="add-new-text-block">

                </div>
            </div>
            <div class="change-header">
                <div class="creating-new" v-if="$route.params.id">Создание новой записи</div>
                <div class="editing-todo" v-else>Изменение записи {{$route.params.id}}</div>
            </div>

            <div class="change-under-header" v-if="todoData">
                {{todoData}}

                    <div class="todo-short-wrapper">
        <div class="todo-short-top-part ">
            <div class="vert-centered-outer">
                <span class="todo-top-part-text vert-centered-inner">{{todoData.name}}</span>
            </div>


        </div>
        <div class="todo-short-bottom-part">
            <div class="todo-short-list-inludes"  v-for="(item,index) in todoData.list" :key="index">
                <TodoFullPart :partData="item" />
            </div>
        </div>
    </div>
            </div>
        </div>
         {{ $route.params.id }}
    </div>
</template>

<script>
    import TodoFullPart from "./subParts/TodoFullPart";
    import AddNew from "./subParts/AddNew";

    export default {
                components: {
            TodoFullPart,
                    AddNew
        },
        data: function() {
            return {
                todoData: {}
            }
        },
        created() {
            let listId = 0;
            if (this.$route.params.id) {
                listId = this.$route.params.id
                this.loadData(listId)
            } else {
/*g*/console.log('listId'); //todo remove it
/*g*/console.log(listId); //todo remove it
            }
        },
        methods: {
            loadData: function (id) {
                let mainData = JSON.parse(localStorage.getItem('wholeList'));
                /*g*/console.log('mainData'); //todo remove it
                /*g*/console.log(mainData); //todo remove it
                this.todoData = mainData[id];
            },
                      addNewItem () {
              console.log('ggg')
    }


        },
        name: "Change"
    }
</script>

<style scoped>

</style>