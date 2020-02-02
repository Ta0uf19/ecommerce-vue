import axios from "./Api";

class AuthService {
    login(user) {
        return axios.post('/login_check', {
                username: user.username,
                password: user.password
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();
