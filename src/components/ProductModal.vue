<template>
    <modal name="modal-product" :adaptive="true" height="auto" :scrollable="true" width="1100" @before-open="beforeOpen">
       <div style="padding: 20px;">
           <div v-if="loading">
               <div class="text-center">
                   <b-spinner label="Loading..."></b-spinner>
               </div>
           </div>
           <div v-else>
               <button type="button" class="close" aria-label="Close" style="float:right" @click="$modal.hide('modal-product')">
                   <span aria-hidden="true">&times;</span>
               </button>
               <b-row>
                   <b-col cols="6">
                       <lingallery :iid.sync="currentId" :width="490" :height="400" :items="images"/>
                   </b-col>
                   <b-col>
                       <span class="product-title">{{ product.libelle_produit }}</span>
                       <div class="product-price pull-right">{{ product.prixu_produit }} €</div>
                       <p class="text-muted" style="font-weight: 400; font-size: 14px;">Eau de Parfum, {{ (product.attributes_produit.genre.slice(0,1)).toUpperCase() }}{{ (product.attributes_produit.genre.substring(1)) }}  </p>
                       <p class="font-weight-bold">Format</p>
                       <b-row class="mt-2">
                           <b-col>
                               <button type="button" class="btn btn-outline-primary btn-lg">Eau de parfum, 50ml</button>
                           </b-col>
                           <b-col>
                               <button type="button" class="btn btn-outline-primary btn-lg">Eau de parfum, 100ml</button>
                           </b-col>
                       </b-row>
                       <div class="pull-right">
                           <button type="button" class="btn btn-cart" >Ajouter au panier</button>
                       </div>
                   </b-col>
               </b-row>
               <b-row class="mt-4">
                   <b-col cols="4">
                       <p style="font-weight: 600; font-size: 14px;">Description</p>
                       <p class="text-muted font-weight-light" style="font-size: 13px">
                           {{ product.desc_produit }}
                       </p>
                   </b-col>
                   <b-col>
                       <p class="font-weight-bold">COMPARATEUR DE PRIX</p>
                       <table class="table">
                           <thead>
                           <tr>
                               <th scope="col">Marchand</th>
                               <th scope="col">Marque</th>
                               <th scope="col">Nom du produit</th>
                               <th scope="col">Prix</th>
                               <th scope="col">Action</th>
                           </tr>
                           </thead>
                           <tbody>
                           <tr>
                               <th scope="row">
                                   <img src="/images/641.png"/>
                               </th>
                               <td>Mark</td>
                               <td>Otto</td>
                               <td>@mdo</td>
                               <td> <button type="button" class="btn btn-cart" >Ajouter au panier</button></td>
                           </tr>
                           <tr>
                               <th scope="row">
                                   <img src="/images/695.png"/>
                               </th>
                               <td>Jacob</td>
                               <td>Thornton</td>
                               <td>@fat</td>
                               <td> <button type="button" class="btn btn-cart" >Ajouter au panier</button></td>
                           </tr>
                           <tr>
                               <th scope="row">
                                   <img src="/images/641.png"/>
                               </th>
                               <td>Larry</td>
                               <td>the Bird</td>
                               <td>@twitter</td>
                               <td> <button type="button" class="btn btn-cart" >Ajouter au panier</button></td>
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
    export default {
        name: "ProductModal",
        components: {
            Lingallery
        },
        data() {
            return {
                loading: true,
                currentId: null,
                product: {},
                images: [],
            }
        },
        methods: {
            beforeOpen(event) {
                this.reset();
                // receive product id from productsearch.vue
                //console.log(event.params.id);
                Promise.all([
                    this.fetchProduct(event.params.id)
                ]).then(() => {
                    //let productResponse = resp[0];
                    // stage Image to correct format
                    this.parseImage();
                });
            },
            async fetchProduct(id) {
                this.loading = true;
                let returnPromise;
                await this.axios.get('/produit/'+id).then(({data}) => {
                    this.product = data;
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
</style>
