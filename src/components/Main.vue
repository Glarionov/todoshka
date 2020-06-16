<template>
    <div class="main-wrapper">
        <AddNew />
        <div class="todoshorts-inluces" v-for="(item,index) in mainData" :key="index">
            <TodoShort :todoData = "item"  />
        </div>

    </div>
</template>

<script>
    import AddNew from "./subParts/AddNew";
    import TodoShort from "./subParts/TodoShort";

    import('../assets/scss/test.css')
    export default {
        components: {
            AddNew,
            TodoShort
        },
        name: "Main",
        data: function () {
            return {
                mainData: [
                    {
                        name: 'Починить машину',
                        list: [
                            {
                                name: 'Починить колесо',
                                done: false
                            },
                            {
                                name: 'Починить двигатель',
                                done: true
                            }
                        ]
                    },
                    {
                        name: 'Погладить животных',
                        list: [
                            {
                                name: 'Погладить собачку',
                                done: false
                            },
                            {
                                name: 'Погладить котика',
                                done: true
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>