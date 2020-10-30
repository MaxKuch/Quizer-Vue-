import Vue from 'vue'
import { formatDistanceToNow } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.filter('distanceToNow', function (date){
  if(!date) return ''
  return formatDistanceToNow(new Date(date), {
    locale: ruLocale,
    addSuffix: true
  })
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

