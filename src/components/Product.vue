<template>
    <div class="container-fluid" style="width: 70%">
        <b-row>
            <b-col>
                <b-button v-b-toggle.collapse-1 class="btn btn-outline-success col-3" style="width: 70%;">
                    Ajouter un nouveau produit
                </b-button>
            </b-col>
        </b-row>
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-body">
                        <form>
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Libellé</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Volume</th>
                                    <th scope="col">Prix</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(produit,index) in allProduits" :key="index">
                                    <td>{{produit.libelle_produit}}</td>
                                    <td>{{produit.type}}</td>
                                    <td>{{produit.attributes_produit.volume}}</td>
                                    <td>{{produit.prixu_produit}}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary"
                                                @click="$modal.show('admin-product-modal',{produit: produit , method : 'get'}) "><i
                                                class="fa fa-eye"></i></button>
                                        <button type="button" class="btn btn-warning"
                                                @click="$modal.show('admin-product-modal',{produit : produit , method : 'edit'}) "><i
                                                class="fa fa-edit"></i></button>
                                        <button type="button" class="btn btn-danger"
                                                @click="DeleteProduct(produit.num_produit, index)"><i class="fa fa-trash"></i>
                                        </button>
                                    </td>

                    </tr>
                    </tbody>
                    </table>
                    </form>
                    <admin-product-modal></admin-product-modal>
                    </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import AdminProductModal from "./AdminProductModal";

    export default {
        name: "Product",
        components: {
            AdminProductModal
        },

        data() {
            return {
                method:'',
                currentId: null,
                images: [],
                allProduits: [], // Main table of products
                clicked: false,
                link: null
            }
        },
        created: function () {
            this.beforeOpen();
        },
        methods: {
            beforeOpen() {
                console.log('before Open called');
                this.reset();
                Promise.all([
                    this.fetchallProduits(),
                ]).then(() => {
                });
            },

            async fetchallProduits() {
                this.loading = true;
                let returnPromise;
                let obj = {};

                await this.axios.get('/produit/all', obj).then(({data}) => {
                    this.allProduits = data.data;
                    console.log(data);
                    returnPromise = data;
                    this.loading = false;
                });
                return returnPromise
            },
            reset() {
                this.allProduits = {};
            },

            parseImage() {
                let images = this.product.attributes_produit.image;
                images.forEach(image => {
                    let obj = {
                        link: image,
                        thumbnail: image,
                    };
                    this.images.push(obj);
                });
            },
            DeleteProduct: function (id, index) {

                if (confirm("Do you really want to delete?")) {

                    this.axios.delete('/produit/' + id)
                        .then(({resp}) => {
                            this.allProduits.splice(index, 1);
                            console.log('laalaa' + resp);

                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            },

        }
    }

</script>

<style scoped>

    .top-buffer {
        margin-top: 20px;

    }

    table {
        border: 0px;
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
    }

    table caption {
        margin: .5em 0 .75em;
    }

    table tr {
        border: 0px;
        padding: .35em;
    }

    table tr:nth-child(even) {
        background: #f8f8f8;
    }

    table th,
    table td {
        vertical-align: middle;
        text-align: center;
    }

    table th {
        background: #999;
        color: #fff;
        font-size: .85em;
        letter-spacing: .1em;
        text-transform: uppercase;
    }

    table td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>