<template>
    <modal name="order-modal" :adaptive="true" height="auto" :scrollable="true"
           @before-open="beforeOpen">
            <div class="modal-content">
                <!--Header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$modal.hide('order-modal')">
                        <span aria-hidden="true" class="white-text">×</span>
                    </button>
                </div>
                <!--Body-->
                <div class="text-center">
                    <h2>
                        <strong>Commande #{{order.num_cmd}}</strong>
                    </h2>
                    <h3>
                        <strong>Le {{moment(order.date_cmd).lang("fr").format('LLLL')}}</strong>
                    </h3>
                </div>
                <div class="modal-body">
                    <hr>
                    <div class="text-center">
                        <h4>
                            <strong>Informations client</strong>
                        </h4>
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="col">Nom</th>
                                    <td align="left">{{client.nom_client}}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Prénom</th>
                                    <td align="left">{{client.prenom_client}}</td>
                                </tr>
                                <tr>
                                    <th>Téléphone</th>
                                    <td align="left">{{client.telephone_client}}</td>
                                </tr>
                                <tr>
                                    <th>E-mail</th>
                                    <td align="left">{{client.email_client}}</td>
                                </tr>
                                <tr>
                                    <th>Adresse</th>
                                    <td align="left">{{client.adresse_client}},<br> {{client.country_client}} </td>
                                </tr>
                                <tr></tr>
                            </tbody>
                        </table>
                    </div>

                    <hr>
                    <div class="text-center">
                        <h4>
                            <strong>Liste des produits commandés</strong>
                        </h4>
                        <table>
                            <thead>
                                <th>Libellé</th>
                                <th>URL</th>
                                <th>Prix unitaire</th>
                                <th>Quantité</th>
                                <th>Prix total</th>
                            </thead>
                            <tr v-for="(item,index) in order.items" :key="index">
                                <td>{{item.produit.libelle_produit}}</td>
                                <td>{{item.produit.url_produit}}</td>
                                <td>{{item.produit.prixu_produit}}</td>
                                <td>{{item.qty}}</td>
                                <th>{{item.prix}}</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <th>Total :</th>
                                <th>{{order.montant_cmd}}</th>
                            </tr>
                        </table>
                    </div>

                </div>

            </div>
    </modal>
</template>

<script>

    export default {
        name: "OrderModal",
        data(){
            return{
                order:{},
                client:{}
            }
        },

        methods: {
            beforeOpen(event) {
                this.order=event.params.order;
                this.client=event.params.client;
                console.log(event.params.order);
                console.log(event.params.client);
            },
        }
    }

</script>

<style scoped>
h2{
    align-content: center;
    horiz-align: center;
}
</style>
