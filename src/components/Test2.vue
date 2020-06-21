<template>
    <div class="def" v-if="show">
        <div class="hij" @click="test2">
            tt={{tt}}
            <div class="hider" @click="hide">hide</div>
        </div>
        <div class="klm">
            klm
            <slot>slot</slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Test2",
        data: () => {
          return {
              show: true,
          }
        },
        props: {
          tt: String
        },
        methods: {
            hide() {
              this.show = false;
            },
            test2() {
                console.log('t2')
                this.$parent.t1();
            }
        }
    }
</script>

<style scoped>
.hij {
    background: pink;
    margin: 10px;
    width: 88px;
    height: 88px;
}
    .klm {
        background: yellow;
        margin: 10px;
        width: 88px;
        height: 88px;
    }

</style>