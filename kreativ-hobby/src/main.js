import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // assuming it's in JS too
import { init } from '@/components/cartFunctions.vue';

init(); // Initialize the cart

createApp(App)
  .use(router)
  .mount('#app')

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
