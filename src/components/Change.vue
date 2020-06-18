<template>
    <div class="change-wrapper">
        <div class="change-body">
            <div class="add-new-includer">
                <div class="add-new-text-block">

                </div>
                <div class="button-includer" v-on:click="addNewItem">
                    <AddNew text="Добавить новый пункт"  />
                </div>

                <div class="text-for-new">
                    <input type="text" :style="adderStyle" v-model="newTodoItemName">
                </div>


                <div class="button-includer" v-on:click="sendNewItem">
                    <AddNew text="OK"  />
                </div>

                <div class="eboy" v-on:click="eboy">
                    eeeeeeboy
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
                todoData: {},
                adderStyle: {},
                newTodoItemName: '',
                listId: 0
            }
        },
        created() {

            this.$store.commit('getFromLocalStoreTodoListData');
            if (this.$route.params.id) {
                this.listId = parseInt(this.$route.params.id)
                /*g*/console.log('this.listId'); //todo remove it
                /*g*/console.log(this.listId); //todo remove it
                this.loadData(this.listId)
            } else {
                /*g*/console.log('this.listId'); //todo remove it
                /*g*/console.log(this.listId); //todo remove it
            }
        },
        methods: {
            loadData: function (id) {
                let mainData = JSON.parse(localStorage.getItem('todoListData'));


                /*g*/
                console.log('mainData'); //todo remove it
                /*g*/
                console.log(mainData); //todo remove it
                this.todoData = mainData[id];
                this.$store.commit('saveTodoList',{itemNewId: id, newData: this.todoData});
            },
            addNewItem() {
                console.log('ggg')
                this.adderStyle.height = '50px';
                this.$forceUpdate();
            }

            ,
            eboy() {
                console.log('eeeeeeeeeeee')
            }
            ,
            sendNewItem() {
                /*g*/console.log('this.newTodoItemName'); //todo remove it
                /*g*/console.log(this.newTodoItemName); //todo remove it
                /*g*/console.log('this.listId'); //todo remove it
                /*g*/console.log(this.listId); //todo remove it\

                this.$store.commit('saveTodoItem', {listId: this.listId, newData: {name: this.newTodoItemName}});
            }

        },
        name: "Change"
    }
</script>

<style scoped>

</style>