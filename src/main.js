import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import {apolloProvider} from './apollo-vue'
import i18n from './i18n'


new Vue({
  store,
  vuetify,
  provide: apolloProvider.provide(),
  i18n,
  render: h => h(App)
}).$mount('#app')
