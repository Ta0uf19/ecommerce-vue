<template>
    <div class="container-fluid" style="width: 80%">
        <b-row>
            <b-col cols="menu">
                <div class="card text-left" style="width: 20rem; margin-right: 20px;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="d-inline menu-title">
                                <filter-icon size="1.2x" class="mr-1"></filter-icon>
                                Filters
                            </div>
                        </li>

                    </ul>
                    <div class="card-body">
                        <div class="card-title mb-4">Marque</div>
                        <div>
                            <div class="card text-left" :class="(index % 2) === 0 ? 'pull-right' : ''" style="width: 45%;" v-for="(marque,index) in marqueFilter" v-bind:key="index">
                                <div class="card-body">
                                    <b-form-radio :value="marque.name" name="some-radios" v-model="filter.brand">
                                        <img :src="`./images/${marque.path}`">
                                    </b-form-radio>
                                </div>
                            </div>
                        </div>
                        <div class="card-title mb-4">Genre</div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" v-model="checkHomme">
                                Homme
                                <span class="form-check-sign">
                                  <span class="check"></span>
                                </span>
                            </label>
                        </div>

                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" v-model="checkFemme">
                                Femme
                                <span class="form-check-sign">
                                    <span class="check"></span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </b-col>
            <b-col>
                <div class="search input-holder mb-4">
                    <search-icon size="1.2x" class="mr-1"></search-icon>
                    <input class="search form-control form-control-lg" type="text" placeholder="Chercher des parfums" v-model="filter.search" v-on:keyup.enter="search">
                </div>
                <b-row class="mb-2">
                    <div class="ml-4">
                        <label class="text-muted">Environ {{ total }}  parfums trouvés</label>
                    </div>
                </b-row>
                <!-- product modal -->
                <product-modal></product-modal>
                <!--- products list -->
                <b-row class="justify-content-center">
                    <b-col cols="auto" v-for="(product,index) in products" :key="index">
                        <b-card
                                :img-src="`${product.attributes_produit.image[0]}`"
                                img-width="120px" img-top style="width: 248px; cursor: pointer;"
                        >
                            <b-badge href="#" variant="dark" class="pull-right">-{{ Math.floor(product.discount_produit) }} % </b-badge>
                            <b-card-text>
                                <p style="font-weight: 500; font-size: 14px; white-space: nowrap; overflow: hidden;text-overflow:ellipsis;">{{ product.libelle_produit }}</p>
                            </b-card-text>
                            <p class="text-muted" style="font-weight: 400; font-size: 14px; ">Eau de Parfum, {{ (product.attributes_produit.genre.slice(0,1)).toUpperCase() }}{{ (product.attributes_produit.genre.substring(1)) }}  </p>
                            <p style="font-weight: 800; font-size: 17px;" class="pull-right">À partir de {{ product.prixu_produit }} €</p>
                            <div class="col text-center">
                                <button type="button" class="btn btn-cart"  @click="$modal.show('modal-product', {id: product.num_produit})">Consulter le produit</button>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
                <infinite-loading ref="infiniteLoading" @infinite="loadMore" spinner="spiral"></infinite-loading>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import _ from 'lodash';
    import {FilterIcon, SearchIcon} from 'vue-feather-icons'
    import InfiniteLoading from 'vue-infinite-loading'
    import ProductModal from "./ProductModal";

    export default {
        name: "ProductSearch.vue",
        components: {
            FilterIcon, SearchIcon, InfiniteLoading, ProductModal
        },
        data() {
            return {
                marqueFilter: [
                    {name: "CHANEL", path: "641.png"},
                    {name: "BOSS", path: "695.png"},
                    {name: "SEPHORA", path: "sephora.png"},
                    {name: "DIOR", path: "dior.png"},
                    {name: "CLE", path: "cle.png"},
                    {name: "YVEZ", path: "yvez.PNG"},
                ],
                //checkedMarque: [],
                products: [],
                total: 0,
                filter: {
                    brand: null,
                    search: "",
                    gender: null,
                    type: null,
                },
                page: 0,
                checkHomme: true,
                checkFemme: true,
            }
        },
        methods: {
          async loadMore($state) {
              let _obj = {...this.filter, ...{page: this.page}};
            await this.axios.post('/produit', _obj).then(({data}) => {
                console.log(data);
                let resp = data;
                this.total = resp.total;
                if(resp.data.length>0) {
                    this.products = [...this.products, ...resp.data];
                    this.page = this.page + 1;

                    $state.loaded();
                }
                else {
                    $state.complete();
                }
            });
          },
          updateFilter(newFilter) {
            this.filter = {...this.filter, ...newFilter};
            this.debouncedReset();
          },
          reset() {
              this.page = 0;
              this.products = [];
              this.filterGendre();
              this.$refs.infiniteLoading.stateChanger.reset();
          },
          filterGendre() {
                if(this.checkHomme && this.checkFemme) {
                    this.filter.gender = null;
                } else {
                    this.filter.gender = (this.checkHomme) ? "homme" : "femme";
                }
          },
          search() {
            this.updateFilter();
          }
        },
        watch: {
            'filter.brand':function () {
                this.debouncedReset();
            },
            checkHomme: function () {
                this.debouncedReset();
            },
            checkFemme: function () {
                this.debouncedReset();
            }
        },
        created() {
            this.debouncedReset = _.debounce(this.reset, 600);
        }
    }
</script>

<style scoped>

</style>
