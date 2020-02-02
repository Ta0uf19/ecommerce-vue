import Api from "./Api";

class AuthService {
    login(user) {
        return Api().post('/login_check', {
                username: user.username,
                password: user.password
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();
