import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'


Vue.config.productionTip = false
export const bus = new Vue();
let app = null;

// firebase auth init da vidimo jel netko logiran 

firebase.auth().onAuthStateChanged(() => {
  // init app if not already created
  if(!app) {
   app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
  
  
})

