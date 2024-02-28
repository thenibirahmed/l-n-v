import './bootstrap';

import { createApp } from 'vue';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './components/App.vue';

import router from './router';

import store from './store';

import '../../public/assets/js/color-modes.js';
import '../../public/assets/dist/js/bootstrap.bundle.min.js';

createApp(App)
    .use(router)
    .use(Toast,{transition: "Vue-Toastification__fade"})
    .use(store)
    .mount('#app');
