import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import TextareaAutosize from 'vue-textarea-autosize'
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import VuexUndoRedo  from './assets/js/undoRedo';
import store from './assets/js/store'
import router from "./assets/js/router";

Vue.use(VueRouter)
Vue.use(TextareaAutosize)
Vue.use(VuejsDialog);
Vue.use(VuexUndoRedo );
Vue.config.productionTip = false

Vue.filter('properShowNewLine', function (value) {
  return value.replace(/(?:\r\n|\r|\n)/g, '<br>')
})

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');

