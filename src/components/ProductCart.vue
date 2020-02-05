<template>
    <div class="container-fluid" style="width: 80%">
        <b-row>
            <b-col>
                <b-card>
                    <h5 class="mb-5 mt-2 font-weight-bold">Gestionnaire client</h5>
                    <b-row>
                        <b-col>
                            <b-button v-b-toggle.collapse-1 class="btn btn-outline-default" style="width: 100%;"><user-plus-icon size="1.5x" class="custom-class"></user-plus-icon> Ajouter un nouveau client</b-button>
                        </b-col>
                        <b-col class="mt-2">
                            <multiselect v-model="selectedUser" id="ajax" :custom-label="nomPrenom" track-by="id_client" placeholder="Chercher un client" open-direction="bottom" :options="users" :multiple="false" :searchable="true" :loading="isLoading" :internal-search="false" :clear-on-select="false" :close-on-select="true" :options-limit="300" :limit="3" :limit-text="limitText" :max-height="600" :show-no-results="false" :hide-selected="true" @search-change="asyncFind">
                                <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.nom_client }} {{ option.prenom_client }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
                            </multiselect>
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
                        <span class="font-weight-bold d-block" v-if="selectedUser != null">{{selectedUser.nom_client +' ' + selectedUser.prenom_client}}</span>
                    </div>
                    <div class="form-group">
                        <label>Adresse de livrasion</label>
                        <span class="font-weight-bold d-block" v-if="selectedUser != null">{{selectedUser.adresse_client}}</span>
                        <span class="font-weight-bold d-block" v-if="selectedUser != null">{{selectedUser.zip_code_client}}</span>
                    </div>
                    <div class="form-group">
                        <label>Téléphone</label>
                        <span class="font-weight-bold d-block" v-if="selectedUser != null">{{selectedUser.telephone_client}}</span>
                    </div>
                    <div class="form-group">
                        <label>Adresse electronique</label>
                        <span class="font-weight-bold d-block" v-if="selectedUser != null">{{selectedUser.email_client}}</span>
                    </div>
                    <div>
                        <b-btn href="#" class="btn btn-primary mb-3" style="width: 100%;" to="/cart" :disabled="selectedUser === null || totalItems() === 0" @click="order()">
                            <b-spinner small v-if="loading === true"></b-spinner>
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
    import { UserPlusIcon } from 'vue-feather-icons'
    import { mapGetters, mapState} from 'vuex';
    import Multiselect from 'vue-multiselect'


    export default {
        name: "ProductCart",
        components: {
            Cart, UserPlusIcon, Multiselect
        },
        data() {
            return {
                selectedUser: null,
                users: [],
                isLoading: false,
                loading: false,
            }
        },
        computed: {
            ...mapState({
                products: state => state.cart.items
            })
        },
        methods: {
            ...mapGetters('cart', {
                total: 'getTotalPrice',
                totalItems: 'getTotalItems'
            }),
            asyncFind (query) {
                //console.log(query);
                this.isLoading = true;
                this.axios.post('/client', {search: query}).then(response => {
                    this.users = response.data;
                    this.isLoading = false
                })
            },
            limitText (count) {
                return `and ${count} other countries`
            },
            nomPrenom ({ nom_client, prenom_client }) {
                return `${nom_client} ${prenom_client}`
            },
            // garbage code
            async order() {
                this.loading = true;
                let obj = {
                    id_client: this.selectedUser.id_client,
                    products: []
                };
                console.log(this.products);
                this.products.forEach(item => {
                    obj.products.push({id_produit: item.id, qty: item.qty})

                });
                // add order
                console.log(obj);

                await this.axios.post('/order/add', obj).then(({data}) => {
                    console.log(data);

                    this.$swal(`Votre commande est confirmé # ${data.num_cmd}`, "You are ready to start!", "success");
                    this.loading = false;
                });
            }
        },
    }
</script>

<style scoped>
li {
    display: inline !important;
}
ul { list-style-type: none !important; }

</style>
