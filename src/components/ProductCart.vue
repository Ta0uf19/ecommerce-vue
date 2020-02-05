<template>
    <div class="container">
        <b-row>
            <b-col>
                <b-card>
                    <h5 class="mb-5 mt-2 font-weight-bold">Gestionnaire client</h5>
                    <b-row>
                        <b-col>
                            <b-button v-b-toggle.collapse-1 class="btn btn-outline-default" style="width: 100%;"><user-plus-icon size="1.5x" class="custom-class"></user-plus-icon> Ajouter un nouveau client</b-button>
                        </b-col>
                        <b-col>
                            <b-button v-b-toggle.collapse-1 class="btn btn-outline-default pull-right" style="width: 100%;"><search-icon size="1.5x" class="custom-class"></search-icon> Chercher un client</b-button>
                        </b-col>
                    </b-row>
                    <b-collapse id="collapse-1" class="mt-2">
                        <b-card>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-group">
                                            <label>Nom</label>
                                            <input type="password" class="form-control" i placeholder="Nom">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <label>Prénom</label>
                                            <input type="password" class="form-control" i placeholder="Prénom">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Adresse</label>
                                    <input type="password" class="form-control" i placeholder="Adresse">
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-group">
                                            <label>Pays</label>
                                            <input type="password" class="form-control" i placeholder="Pays">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <label>Zip code</label>
                                            <input type="password" class="form-control" i placeholder="ZipCode">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Telephone</label>
                                    <input type="password" class="form-control" i placeholder="Téléphone">
                                </div>
                                <button type="submit" class="btn btn-default pull-right">Ajouter</button>
                        </b-card>
                    </b-collapse>
                    <hr>
                    <h5 class="mb-5 mt-2 font-weight-bold">Informations relatives au client</h5>
                    <div class="form-group">
                        <label>Nom et prénom</label>
                        <input type="password" class="form-control" i placeholder="Nom & prénom">
                    </div>
                    <div class="form-group">
                        <label>Adresse de livrasion</label>
                        <input type="password" class="form-control" i placeholder="Nom">
                    </div>
                    <div>
                        <b-btn href="#" class="btn btn-primary mb-3" style="width: 100%;" to="/cart">
                            Passer la commande
                        </b-btn>
                    </div>
                </b-card>
            </b-col>
            <b-col cols="4">
                <b-card>
                    <h5 class="mb-5 mt-2 font-weight-bold">Résumé de la commande</h5>
                    <!-- cart component -->
                    <cart></cart>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Cart from "./Cart";
    import { SearchIcon } from 'vue-feather-icons'
    import { UserPlusIcon } from 'vue-feather-icons'
    import { mapGetters } from 'vuex';


    export default {
        name: "ProductCart",
        components: {
            Cart,
            SearchIcon, UserPlusIcon
        },
        methods: {
            ...mapGetters('cart', {
                products: 'getItems',
                total: 'getTotalPrice'
            })
        }
    }
</script>

<style scoped>
li {
    display: inline !important;
}
ul { list-style-type: none !important; }
</style>
