import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import {apolloProvider} from './apollo-vue'


new Vue({
  store,
  vuetify,
  provide: apolloProvider.provide(),
  render: h => h(App)
}).$mount('#app')
