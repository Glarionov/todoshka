<template>
    <div class="main-wrapper">
        <router-link to="/change/0"><AddNew text="Добавить новую запись" /></router-link>
        <div class="todoshorts-inluces" v-for="(item,index) in mainData" :key="index">
            {{item}}
            {{index}}
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

            console.log('eeeeeeeeeeeeeeeee' +
                '')


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
                /*g*/console.log('exampleData'); //todo remыыove it
                /*g*/console.log(exampleData); //todo remove it

                localStorage.setItem('todoListData', JSON.stringify(exampleData))
            },
          prepareData() {
              // console.log(this.$store)
              // localStorage.setItem('abc', this.$store.token + 'b')
              // localStorage.setItem('wholeList', JSON.stringify({a: 'b'}))

              // this.$store.commit('increment');
              this.mainData = JSON.parse(localStorage.getItem('todoListData'));
              /*g*/console.log('44444444444this.$store.todoListData'); //todo remove it
              /*g*/console.log(this.$store.state.todoListData); //todo remove it
          }
        },
        components: {
            AddNew,
            TodoShort
        },
        name: "Main",
        data: function () {
            return {
                mainData: {}
            }
        }
    }
</script>

<style scoped>

</style>