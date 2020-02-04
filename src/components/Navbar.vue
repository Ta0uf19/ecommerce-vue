<template>
    <nav class="navbar navbar-expand-lg bg-primary">
        <div  class="container-fluid" style="width: 80%">
            <div class="navbar-translate">
                <a class="navbar-brand">
                    <img src="/images/logo.png" width="120px" to="/dashboard">
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
                            <p>Panier <span class='badge badge-info'>{{products.length}}</span></p>
                        </template>
                        <div v-for="product in products" :key="product.id">
                            <b-dropdown-text>
                                <img :src="product.image" alt="item1" width="100px" />
                                <span class="item-name">{{product.name}}</span><br/>
                                <div class="small pull-right">
                                    <archive-icon size="1.5x" @click="removeProduct(product)"></archive-icon>
                                    <minus-circle-icon size="1x"></minus-circle-icon>{{ product.qty }}<plus-circle-icon size="1x"></plus-circle-icon>
                                    |
                                    <span class="item-price">{{product.price}} €</span>
                                </div>
                            </b-dropdown-text>
                            <b-dropdown-divider></b-dropdown-divider>
                        </div>
                        <b-dropdown-text>
                            <div class="small pull-left">
                                Sous total
                            </div>
                            <div class="pull-right font-weight-bolder">
                                {{ this.getTotalPrice() }} €
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
    import { mapGetters, mapState, mapActions } from 'vuex'
    import { ArchiveIcon, PlusCircleIcon, MinusCircleIcon } from 'vue-feather-icons'

    export default {
        name: "Navbar",
        components: {
            ArchiveIcon, PlusCircleIcon, MinusCircleIcon
        },
        computed: {
            isLoggedIn: function() {
                return this.$store.getters.isLoggedIn;
            },
            currentPage: function () {
                return this.$route.path;
            },
            ...mapState({
                products: state => state.cart.items
            })
        },
        methods: {
            ...mapGetters('cart', ['getTotalPrice']),
            ...mapActions('cart', ['removeProduct']),
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
