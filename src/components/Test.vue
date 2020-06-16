<template>
    <div class="abc" >abc
        <Test2 />
    </div>
</template>

<script>
    import Test2 from './Test2';
    export default {
        components: {
            Test2
        },
        methods: {
          t1() {
              console.log('t1')
          }
        },
        name: "Test"
    }
</script>

<style scoped>

</style>