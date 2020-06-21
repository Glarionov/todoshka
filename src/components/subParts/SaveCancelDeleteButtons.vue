<template>
    <div class="list-save-cancel-delete-buttons" :class="extraClass">
        <div class="list-save-button default-button" v-on:click="saveListChanges">
            Save and exit
        </div>
        <div class="list-save-button default-button" v-on:click="saveListChanges(false)">
            Save
        </div>
        <div class="list-cancel-button default-button" v-on:click="cancelNameChanges">
            Cancel editing
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            extraClass: String
        },
        methods: {
            saveListChanges(closeEditor = true) {
              this.$parent.saveListChanges(closeEditor);
          }  ,
            cancelNameChanges() {
              this.$parent.cancelNameChanges();
            },
            cancelEditing() {

            }
        },
        name: "SaveCancelDeleteButtons"
    }
</script>

<style scoped>

</style>