<template>
    <div class="main-wrapper">
        <router-link to="/change/0"><AddNew text="Добавить новую запись" /></router-link>
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
            // this.setExampleData();
          this.prepareData();
        },
        methods: {
            setExampleData(dataType = 'small') {

                /*g*/console.log('dataType'); //todo remove it
                /*g*/console.log(dataType); //todo remove it
                /*g*/console.log('exampleData'); //todo remove it
                /*g*/console.log(exampleData); //todo remove it

                localStorage.setItem('wholeList', JSON.stringify(exampleData))
            },
          prepareData() {
              console.log(this.$store)
              // localStorage.setItem('abc', this.$store.token + 'b')
              // localStorage.setItem('wholeList', JSON.stringify({a: 'b'}))

              this.$store.commit('increment');
              this.mainData = JSON.parse(localStorage.getItem('wholeList'));
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