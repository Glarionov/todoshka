<template>
    <div class="todo-short-part-wrapper  rel-parent">
        <div class="vert-centered-outer ">
            <div class="part-data-name-and-checkbox vert-centered-inner">
                <label><input type="checkbox" :checked="partData.done"/> </label>
                {{partData.name}}

            </div>
            <div class="todo-short-top-main-icons vert-centered-inner ">
                <div class="top-short-changer ">
                    Редактировать
                </div>
                <div class="top-short-deleter ">
                    Удалить
                </div>
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