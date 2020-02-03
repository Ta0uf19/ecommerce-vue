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
                                    <b-form-checkbox value="orange">
                                            <img :src="`./images/${marque.path}`">
                                    </b-form-checkbox>
                                </div>
                            </div>
                        </div>
                        <div class="card-title mb-4">Genre</div>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" value="">
                                Homme
                                <span class="form-check-sign">
                                  <span class="check"></span>
                                </span>
                            </label>
                        </div>

                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox">
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
                    <input class="search form-control form-control-lg" type="text" placeholder="Chercher des parfums" v-model="filter.search">
                </div>
                <b-row class="mb-2">
                    <div class="ml-4">
                        <label class="text-muted">5 Results</label>
                    </div>
                </b-row>
                <b-row class="justify-content-center">
                    <b-col cols="auto" v-for="(product,index) in products" :key="index">
                        <b-card
                                :img-src="`${product.attributes_produit.image[0]}`"
                                img-width="120px" img-top style="width: 248px;cursor: pointer;"
                        >
                            <b-card-text>
                                <p style="font-weight: 500; font-size: 14px;">{{ product.libelle_produit }}</p>
                            </b-card-text>
                            <p class="text-muted" style="font-weight: 400; font-size: 14px;">Eau de Parfum, Femme</p>
                            <p style="font-weight: 800; font-size: 17px;" class="pull-right">À partir de 55,00 €</p>
                            <div class="col text-center">
                                <button type="button" class="btn btn-primary">Consulter le produit</button>
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

    export default {
        name: "ProductSearch.vue",
        components: {
            FilterIcon, SearchIcon, InfiniteLoading
        },
        data() {
            return {
                marqueFilter: [
                    {name: "Channel", path: "641.png"},
                    {name: "Channel", path: "695.png"},
                    {name: "Channel", path: "sephora.png"},
                    {name: "Channel", path: "dior.png"},
                    {name: "Channel", path: "cle.png"},
                    {name: "Channel", path: "yvez.PNG"},
                ],
                productMock: ["Yves-Saint-Laurent-Libre-EdP-50ml.jpg",
                    "Valentino-Donna-EdP-100ml.jpg","Thierry-Mugler-Alien-EdP-60ml.jpg",
                    "Giorgio-Armani-Acqua-Di-Gio-Profumo-EdP-125ml.jpg",
                    "Thierry-Mugler-Alien-EdP-60ml.jpg",
                    "Viktor-Rolf-Flowerbomb-EdP-100ml.jpg"],

                products: [],
                total: 0,
                filter: {
                    brand: null,
                    search: null,
                    gender: null,
                    type: null,
                    page: 0,
                }
            }
        },
        methods: {
          async loadMore($state) {
            await this.axios.post('/produit', this.filter).then(({data}) => {
                console.log(data);
                let resp = data;
                this.total = resp.total;
                if(resp.data.length>0) {
                    this.products = [...this.products, ...resp.data];
                    this.filter.page = this.filter.page + 1;

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
              this.filter.page = 0;
              this.products = [];
              this.$refs.infiniteLoading.stateChanger.reset();
          }
        },
        watch: {
            filter: {
                deep:true,
                handler() {
                    this.updateFilter();
                }
            }
        },
        created() {
            this.debouncedReset = _.debounce(this.reset, 600);
        }
    }
</script>

<style scoped>

</style>
