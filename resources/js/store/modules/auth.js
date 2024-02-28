
const state = {
    user: null,
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    }
};

const actions = {
    setLoggedInUser({ commit }) {
        axios.get('/api/user')
            .then(response => {
                commit('setUser', response.data);
            })
            .catch(error => {
                console.log(error);
                commit('setUser', null);
            });
    },
};

const getters = {
    isLoggedIn: state => !!state.user,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
