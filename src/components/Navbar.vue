<template>
    <nav class="navbar navbar-expand-lg bg-primary">
        <div class="container">
            <div class="navbar-translate">
                <a class="navbar-brand" href="#pablo">Primary color</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#example-navbar-primary" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-bar bar1"></span>
                    <span class="navbar-toggler-bar bar2"></span>
                    <span class="navbar-toggler-bar bar3"></span>
                </button>
            </div>

            <div class="collapse navbar-collapse" id="example-navbar-primary">
                <ul class="navbar-nav ml-auto">
                    <li :class="currentPage.includes('dashboard') ? 'nav-item active' : 'nav-item'">
                        <router-link class="nav-link" to="/dashboard">
                            <i class="now-ui-icons objects_globe"></i>
                            <p>Dashboard</p>
                        </router-link>
                    </li>

                    <li :class="currentPage.includes('login') ? 'nav-item active' : 'nav-item'" v-if="isLoggedIn">
                        <a class="nav-link" @click="logout">
                            <i class="now-ui-icons ui-1_settings-gear-63"></i>
                            <p>Logout</p>
                        </a>
                    </li>

                    <li :class="currentPage.includes('login') ? 'nav-item active' : 'nav-item'"  v-else>
                        <router-link class="nav-link" to="/login">
                            <i class="now-ui-icons users_single-02"></i>
                            <p>Login</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
        computed: {
            isLoggedIn: function() {
                return this.$store.getters.isLoggedIn;
            },
            currentPage: function () {
              return this.$route.path;
            }
        },
        mounted() {
            console.log(this.$route.path);
        },
        methods: {
            logout: function() {
                this.$store.dispatch("logout").then(() => {
                    this.$router.push("/login");
                });
            }
        }
    }
</script>

<style scoped>

</style>
