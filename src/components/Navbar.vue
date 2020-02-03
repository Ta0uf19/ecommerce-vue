<template>
    <nav class="navbar navbar-expand-lg bg-primary">
        <div  class="container-fluid" style="width: 80%">
            <div class="navbar-translate">
                <a class="navbar-brand">
                    <img src="/images/logo.png" width="120px">
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#example-navbar-primary" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-bar bar1"></span>
                    <span class="navbar-toggler-bar bar2"></span>
                    <span class="navbar-toggler-bar bar3"></span>
                </button>
            </div>

            <div class="collapse navbar-collapse" id="example-navbar-primary">
                <ul class="navbar-nav ml-auto">
                    <li :class="currentPage.includes('dashboard') ? 'nav-item active' : 'nav-item'" v-if="isLoggedIn">
                        <router-link class="nav-link" to="/dashboard">
                            <i class="now-ui-icons objects_globe"></i>
                            <p>Dashboard</p>
                        </router-link>
                    </li>

<!--                    <li :class="currentPage.includes('cart') ? 'nav-item active' : 'nav-item'" v-if="isLoggedIn">-->

                    <b-nav-item-dropdown v-if="isLoggedIn">
                        <template v-slot:button-content>
                            <i class="now-ui-icons shopping_cart-simple"></i>
                            <p>Panier <span class='badge badge-info'>2</span></p>
                        </template>
                        <b-dropdown-text>
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item2.jpg" alt="item1" />
                            <span class="item-name">Angel</span><br/>
                            <div class="small pull-right">
                                Quantité : <input class="form-control form-control-sm" type="text" value="1" style="width: 50px; display: inline-block;">
                                |
                                <span class="item-price">355 €</span>
                            </div>
                        </b-dropdown-text>
                        <b-dropdown-text>
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item2.jpg" alt="item1" />
                            <span class="item-name">Kindle, 6" Glare-Free</span><br/>
                            <div class="small pull-right">
                                Quantité : <input class="form-control form-control-sm" type="text" value="1" style="width: 50px; display: inline-block;">
                                |
                                <span class="item-price">355 €</span>
                            </div>
                        </b-dropdown-text>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-text>
                            <div class="small pull-left">
                                Sous total
                            </div>
                            <div class="pull-right font-weight-bolder">
                                45 €
                            </div>
                        </b-dropdown-text>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-text>
                                <b-btn href="#" class="btn btn-primary pull-left" style="width: 100%;" to="/cart">Passer la commande</b-btn>
                        </b-dropdown-text>
                    </b-nav-item-dropdown>
                    <li :class="currentPage.includes('login') ? 'nav-item active' : 'nav-item'" v-if="isLoggedIn">
                        <a class="nav-link" @click="logout">
                            <i class="now-ui-icons ui-1_settings-gear-63"></i>
                            <p>Déconnexion</p>
                        </a>
                    </li>
                    <li :class="currentPage.includes('login') ? 'nav-item active' : 'nav-item'"  v-else>
                        <router-link class="nav-link" to="/login">
                            <i class="now-ui-icons users_single-02"></i>
                            <p>Connexion</p>
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
.navbar {
    margin-bottom: 80px;
}
</style>
