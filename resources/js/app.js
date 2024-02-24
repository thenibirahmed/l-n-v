import './bootstrap';

import { createApp } from 'vue';

import App from './components/App.vue';

import router from './router';

import '../../public/assets/js/color-modes.js';
import '../../public/assets/dist/js/bootstrap.bundle.min.js';

createApp(App).use(router).mount('#app');
