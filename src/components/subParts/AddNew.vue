<template>
    <div class="adder-button-wrapper">
        <div class="vert-centered-outer">
        <div class="vert-centered-inner">

            {{text}}
        </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
          text: String,
        },
        name: "AddNew"
    }
</script>

<style scoped>

</style>