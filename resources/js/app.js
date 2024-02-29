import './bootstrap';

import { createApp } from 'vue';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useToast } from "vue-toastification";

import store from './store';
import router from './router';
import App from './components/App.vue';

import '../../public/assets/js/color-modes.js';
import '../../public/assets/dist/js/bootstrap.bundle.min.js';

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            store.dispatch('logoutUser');
            router.push('/auth/login');
            useToast().error('You have been logged out.');
        }
        return Promise.reject(error);
    }
);

createApp(App)
    .use(store)
    .use(router)
    .use(Toast,{transition: "Vue-Toastification__fade"})
    .mount('#app');
