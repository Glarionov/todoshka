<template>
    <div class="abc" >
        <div class="long">
<div class="short">

</div>
        </div>
        <Test2 tt="'aaa'">
        <div class="ctclicker" @click="cctt">CT</div>
    </Test2>
        <Test2 tt="'bbb'"/>
    </div>
</template>

<script>
    import Test2 from './Test2';
    export default {
        components: {
            Test2
        },
        data: () => {
          return {
              ts: {}
          }
        },
        methods: {
          t1() {
              console.log('t1')
          },
            cctt() {
                console.log('ct')
                // this.$refs.tt.height = this.$refs.tt.scrollHeight;
                // this.ts.height = this.$refs.tt.scrollHeight + 'px';
                // this.$forceUpdate();
            }
        },
        name: "Test"
    }
</script>

<style scoped>

    .long {
        background: pink;
        width: 100px;
        height: 2000px;
    }

    .short {
        width: 100px;
        height: 100px;
        background: red;
        position: sticky;
    }
</style>