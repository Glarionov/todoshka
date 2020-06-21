<template>
    <div class="todo-short-part-wrapper ">
                <div class="part-data-checkbox-wrapper">
                    <label><input class="part-data-checkbox" type="checkbox" disabled :checked="partData.done"/> </label>
                </div>
        <div class="part-data-name-and-expander">
            <div class="part-data-name" ref="cartList">
<!--                isOverflowing={{overFlown}}-->
                {{partData.name}}

            </div>

            <div class="expand-text" v-if="overFlown">
                Expand text
            </div>

        </div>



    </div>
</template>

<script>
    export default {
        data: () => {
          return {
              isMounted: false,
              overFlown: false
          }
        },
        mounted() {
            this.isMounted =  true
            this.$forceUpdate();
            this.checkOverflow();
            this.$forceUpdate();

        },
        updated: () => {
            // this.checkOverflow(); q
        },
        methods: {
          checkOverflow() {
              let element = this.$refs.cartList;
              if (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth) {
                  this.overFlown = true;
              } else {
                  this.overFlown = false;
              }

          }

        },
        computed: {
            isOverflowing() {
                if(!this.isMounted)
                    return 'notMounted';
                if (typeof this.$refs.cartList !== "undefined") {
                    let element = this.$refs.cartList;
                    if (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth) {
                        return 'Good';
                    } else {
                        return 'Bad1';
                    }

                }
                return 'UNDEF';

            }
        },
        props: {
          partData: Object
        },

        name: "TodoShortPart"
    }
</script>

<style scoped>

</style>