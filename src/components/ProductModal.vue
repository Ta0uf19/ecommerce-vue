<template>
    <modal name="modal-product" :adaptive="true" height="auto" :scrollable="true" width="1100"
           @before-open="beforeOpen">
        <div style="padding: 20px;">
            <div v-if="loading">
                <div class="text-center">
                    <b-spinner label="Loading..."></b-spinner>
                </div>
            </div>
            <div v-else>
                <button type="button" class="close" aria-label="Close" style="float:right"
                        @click="$modal.hide('modal-product')">
                    <span aria-hidden="true">&times;</span>
                </button>
                <b-row>
                    <b-col cols="6">
                        <lingallery :iid.sync="currentId" :width="490" :height="400" :items="images"/>
                    </b-col>
                    <b-col>
                        <span class="product-title">{{ product.libelle_produit }}</span>
                        <div class="product-price pull-right">À partir de {{ product.prixu_produit }} €</div>
                        <p class="text-muted" style="font-weight: 400; font-size: 14px;">Eau de Parfum, {{
                            (product.attributes_produit.genre.slice(0,1)).toUpperCase() }}{{
                            (product.attributes_produit.genre.substring(1)) }} </p>
                        <p class="font-weight-bold">Format</p>
                        <b-row class="mt-2">
                            <b-col>
                                <button type="button" class="btn btn-outline-primary btn-lg">Eau de parfum, {{
                                    product.attributes_produit.volume }}
                                </button>
                            </b-col>
                        </b-row>
                        <div class="mt-3">
                            <p style="font-weight: 600; font-size: 14px;">Description</p>
                            <p class="text-muted font-weight-light" style="font-size: 13px">
                                {{ product.desc_produit }}
                            </p>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mt-4" style="padding: 20px;">
                    <b-col>
                        <p class="font-weight-bold">COMPARATEUR DE PRIX <activity-icon size="1.5x" class="custom-class"></activity-icon></p>
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">Marchand</th>
                                <th scope="col">URL</th>
                                <th scope="col">Marque</th>
                                <th scope="col">Nom du produit</th>
                                <th scope="col">Prix</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="pr in similarProducts" :key="pr.num_produit">
                                <td v-if="pr.id_fournisseur.length>0">{{pr.id_fournisseur[0].nom_fournisseur}}</td>
                                <td v-else> - </td>
                                <td class="btn-link">{{pr.url_produit}}</td>
                                <td>{{pr.marque}}</td>
                                <td>
                                    <button type="button" class="btn-link">{{pr.libelle_produit}}</button>
                                </td>
                                <td><strong>{{pr.prixu_produit}} €</strong></td>
                                <td>
                                    <button type="button" class="btn btn-cart" @click="addToCart(pr)">Ajouter au panier</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </b-col>
                </b-row>
            </div>
        </div>
    </modal>
</template>

<script>
    import Lingallery from 'lingallery';
    import { ActivityIcon } from 'vue-feather-icons'
    import { mapActions } from 'vuex'

    export default {
        name: "ProductModal",
        components: {
            Lingallery, ActivityIcon
        },
        data() {
            return {
                loading: true,
                currentId: null,
                product: {},
                images: [],
                similarProducts: [], //<-----
            }
        },
        methods: {
            // rajouter la méthode addProductToCart depuis le state cart.
            ...mapActions('cart', ['addProductToCart']),
            beforeOpen(event) {
                this.reset();
                Promise.all([
                    this.fetchProduct(event.params.id),
                    this.fetchSimilarProducts(event.params.id)
                ]).then(() => {
                    //let productResponse = resp[0];
                    // stage Image to correct format
                    this.parseImage();

                    // insérer notre produit dans le comparateur
                    this.similarProducts.unshift(this.product);
                });
            },
            async fetchProduct(id) {
                this.loading = true;
                let returnPromise;
                await this.axios.get('/produit/' + id).then(({data}) => {
                    this.product = data;
                    returnPromise = data;
                    this.loading = false;
                });
                return returnPromise
            },
            async fetchSimilarProducts(id) {
                this.loading = true;
                let returnPromise;
                await this.axios.get('/produit/similar/' + id).then(({data}) => {
                    this.similarProducts = data;
                    returnPromise = data;
                    this.loading = false;
                });
                return returnPromise
            },
            parseImage() {
                let images = this.product.attributes_produit.image;
                images.forEach(image => {
                    let obj = {
                        src: image,
                        thumbnail: image,
                    };
                    this.images.push(obj);
                });
            },
            reset() {
                this.product = {};
                this.images = [];
                this.similarProducts = {};

            },
            addToCart(product) {
                this.$noty.success("Le produit est ajouté à votre panier.", {layout: 'topRight'});
                this.addProductToCart(product);
            }
        }
    }
</script>

<style scoped>
    .lingallery_thumbnails_content_elem img {
        /* border-color: #f57706!important; */
    }

    .lingallery_thumbnails_content {
        margin-top: 18px;
        text-align: center;
    }

    .v--modal {
        margin-top: 95px;
    }

    .v--modal-overlay {
        background: rgba(255, 255, 255, 0.62);
    }

    .v--modal-box.v--modal {
        padding: 20px !important;
    }

    td, th {
        vertical-align: middle;
        font-size: medium;
        text-align: center;
    }
    th {
        margin: 2rem 0rem 1rem;
        font-size: large;
    }
</style>
