<template>
    <div class="main-wrapper">
        <router-link to="/change/0" ><AddNew text="Add new Todo" /></router-link>
        <div class="todoshorts-inluces" v-for="(item,index) in mainData" :key="index">
            <TodoShort :todoData = "item" :todoId = "index"  />
        </div>

    </div>
</template>

<script>
    import AddNew from "./subParts/AddNew";
    import TodoShort from "./subParts/TodoShort";

    import('../assets/scss/test.css')
    import exampleData from '../assets/js/smallExampleData';

    //store.commit('increment')


    export default {
        created() {



            // this.$store.commit('saveTodoList',
            //     {
            //         newData: {
            //             name: 'Починить машину',
            //             list:
            //                 {
            //                     1:
            //                     {
            //                         name: 'Починить колесо',
            //                         done: false
            //                     },
            //     2:
            //                     {
            //                         name: 'Починить двигатель',
            //                         done: true
            //                     }
            //
            //                 }
            //         }
            //     }
            //
            // );



            // this.$store.commit('saveTodoItem', {listId: 1, newData: {name: 'fixer'}});



          this.prepareData();
        },
        methods: {
            setExampleData(dataType = 'small') {


                /*g*/console.log('dataType'); //todo remove it
                /*g*/console.log(dataType); //todo remove it
                localStorage.setItem('todoListData', JSON.stringify(exampleData))
            },
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
          prepareData() {
              // localStorage.setItem('abc', this.$store.token + 'b')
              // localStorage.setItem('wholeList', JSON.stringify({a: 'b'}))

              // this.$store.commit('increment');
              this.loadTodos();
              // this.mainData = JSON.parse(localStorage.getItem('todoListData'));
          },
            deleteTodo(id) {
                delete this.mainData[id];
                this.$forceUpdate();
            }
        },
        components: {
            AddNew,
            TodoShort
        },
        name: "Main",
        data: function () {
            return {
                mainData: {},
                notesPerPage: 2
            }
        }
    }
</script>

<style scoped>

</style>