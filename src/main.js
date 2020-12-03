import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBeY0recxqJ082lrHtZspRnucYTQ9HDFi0",
  authDomain: "secret-santa-d1f5d.firebaseapp.com",
  databaseURL: "https://secret-santa-d1f5d.firebaseio.com",
  projectId: "secret-santa-d1f5d",
  storageBucket: "secret-santa-d1f5d.appspot.com",
  messagingSenderId: "926636482560",
  appId: "1:926636482560:web:97a901680d38d0362638e5"
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
