<template>
    <modal name="order-modal" :adaptive="true" height="auto" :scrollable="true"
           @before-open="beforeOpen">
            <div class="modal-content">
                <!--Header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="white-text">×</span>
                    </button>
                </div>
                <!--Body-->
                <div class="text-center">
                    <h2>
                        <strong>commande N°: {{order.num_cmd}}</strong>
                    </h2>
                    <h3>
                        <strong>Le {{moment(order.date_cmd).format('DD-MM-YYYY')}} à {{moment(order.date_cmd).format('HH:mm')}}</strong>
                    </h3>
                </div>
                <div class="modal-body">
                    <hr>
                    <div class="text-center">
                        <h3>
                            <strong>Client</strong>
                        </h3>
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="col">nom</th>
                                    <td align="left">{{client.nom_client}}</td>
                                </tr>
                                <tr>
                                    <th scope="col">prenom</th>
                                    <td align="left">{{client.prenom_client}}</td>
                                </tr>
                                <tr>
                                    <th>nom</th>
                                    <td align="left">{{client.telephone_client}}</td>
                                </tr>
                                <tr>
                                    <th>e-mail</th>
                                    <td align="left">{{client.email_client}}</td>
                                </tr>
                                <tr>
                                    <th>adresse</th>
                                    <td align="left">{{client.adresse_client}},<br> {{client.country_client}} </td>
                                </tr>
                                <tr></tr>
                            </tbody>
                        </table>
                    </div>

                    <hr>
                    <div class="text-center">
                        <h3>
                            <strong>Produits</strong>
                        </h3>
                        <table>
                            <thead>
                                <th>libelle</th>
                                <th>URL</th>
                                <th>prix unitaire</th>
                                <th>quantité</th>
                                <th>prix totale</th>
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
                                <th>Totale :</th>
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