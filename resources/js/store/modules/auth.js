
const state = {
    user: localStorage.getItem('user') || null
};

const mutations = {
    setUser(state, user) {
        state.user = user;

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
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
    logoutUser( { commit } ) {
        commit('setUser', null);
    }
};

const getters = {
    isLoggedIn(state){
        return state.user !== null && state.user !== undefined
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
