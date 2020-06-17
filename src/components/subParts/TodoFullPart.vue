<template>
    <div class="todo-short-part-wrapper ">
        <div class="vert-centered-outer">
            <div class="part-data-name-and-checkbox vert-centered-inner">
                <label><input type="checkbox" :checked="partData.done"/> </label>
                {{partData.name}}
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
          partData: Object
        },
        name: "TodoFullPart"
    }
</script>

<style scoped>

</style>