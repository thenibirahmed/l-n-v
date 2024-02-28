import { createStore } from 'vuex';
import auth from './modules/auth'; // Import auth module

export default createStore({
  modules: {
    auth,
  },
});
