<template>
    <div class="def">
        def
        <div class="hij" @click="test2">
            hij
        </div>
    </div>
</template>

<script>
    export default {
        name: "Test2",
        methods: {
            test2() {
                console.log('t2')
                this.$parent.t1();
            }
        }
    }
</script>

<style scoped>

</style>