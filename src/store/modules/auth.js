/**
 * State auth
 */
import AuthService from "../../services/AuthService";
const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: null,
};

const getters = {
    isLoggedIn: state => !!state.token,
    authStatus(state) {
        return state.status;
    }
};

const mutations = {
    auth_request(state) {
        state.status = 'loading';
    },
    auth_success(state, {token, user}) {
        state.status = 'success';
        state.token = token;
        //console.log(user);
        state.user = user;
    },
    auth_error(state) {
        state.status = 'error';
    },
    logout(state) {
        state.status = '';
        state.token = ''
    },
};

const actions = {
    login({ commit }, user) {
        commit('auth_request');
        return new Promise((resolve, reject) => {
            AuthService.login(user).then(resp => {
                    const token = resp.data.token;
                    localStorage.setItem('token', token);

                    //
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const buff = new Buffer(base64, 'base64');
                    const payloadinit = buff.toString('ascii');
                    const user = JSON.parse(payloadinit);
                    //console.log(user);

                    commit('auth_success', {token , user});
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    reject(err)
                })
        })
    },
    logout({ commit }) {
        return new Promise((resolve) => {
            commit('logout');
            localStorage.removeItem('token');
            //delete this.axios.defaults.headers.common['Authorization'];
            resolve()
        })
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
