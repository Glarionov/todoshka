<template>
    <div class="todo-short-part-wrapper ">
        <div class="vert-centered-outer">
            <div class="part-data-name-and-checkbox vert-centered-inner">
                <label><input type="checkbox" disabled :checked="partData.done"/> </label>
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
        name: "TodoShortPart"
    }
</script>

<style scoped>

</style>