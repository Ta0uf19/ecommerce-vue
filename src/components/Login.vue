<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <h4 class="card-title text-center">Login</h4>
                    <b-alert show variant="danger" v-if="authStatus === 'error'">{{ error }}</b-alert>
                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="form-group row">
                                <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input v-model="username" type="text" id="email_address" class="form-control" name="email-address" required autofocus placeholder="Enter email">
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input v-model="password" type="password" id="password" class="form-control" name="password" required  placeholder="Password">
                                </div>
                            </div>

                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    <b-spinner small v-if="authStatus === 'loading'"></b-spinner>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Login.vue",
        data() {
            return {
                username: "",
                password: "",
                isLoading: false,
                error: null,
            };
        },
        computed: {
            authStatus: function() {
                return this.$store.getters.authStatus;
            }
        },
        methods: {
            login: function() {
                let username = this.username;
                let password = this.password;
                this.$store
                    .dispatch("login", { username, password })
                    .then(() => this.$router.push("/dashboard"))
                    .catch((err) => {
                        let response = err.response;
                        console.log(response.data.message);
                        if(response.status === 401) {
                            this.error  = response.data.message;
                        }
                    });
            }
        }
    }
</script>

<style scoped>

</style>
