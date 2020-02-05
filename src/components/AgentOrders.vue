<template>
    <div class="container" @before-open="beforeOpen" >
        <b-col>
            <div class="row filter">
                <input class="search form-control form-control-lg col-9" type="text" placeholder="Chercher par client" >
                <div class="form-check offset-1">
                    <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" >
                        Tous les mois
                        <span class="form-check-sign"><span class="check"></span>
                </span>
                    </label>
                </div>
            </div>


        <b-row class="mb-2">
            <div class="ml-4">
                <label class="text-muted">{{ total }} commandes passées</label>
            </div>
        </b-row>
        <div class="row card">
            <div class="col-12">
                <table class="table table-borderless">
                    <thead>
                    <tr>
                        <th scope="col">N°</th>
                        <th scope="col">date</th>
                        <th scope="col">nom</th>
                        <th scope="col">prenom</th>
                        <th scope="col">montant</th>
                        <th scope="col">status</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="order in orders" :key="order.num_cmd">
                        <th scope="row">{{order.num_cmd}}</th>
                        <th scope="row">{{moment(order.date_cmd).format('YYYY-MM-DD')}}</th>
                        <td>{{order.id_client.nom_client}}</td>
                        <td>{{order.id_client.prenom_client}}</td>
                        <td>{{order.montant_cmd}}</td>
                        <td><span class="badge badge-primary">en cours</span></td>
                        <td>
                            <button type="button" class="btn btn-primary"  @click="$modal.show('order-modal',{order,client : order.id_client}) ">Consulter la commande</button>
                        </td>
                    </tr>
                    <OrderModal></OrderModal>
                    </tbody>
                </table>
            </div>
        </div>
        </b-col>
    </div>
</template>
<script>

    import OrderModal from "./OrderModal";

    export default {


        name: "AgentOrders",
        components: {
            OrderModal
        },
        data() {
            return {
                loading: true,
                currentId: null,
                orders: {},
                total: {},
            }
        },
        created : function() {
            this.beforeOpen();
        },
        methods: {
            show:function () {
                this.$modal.show('hello-world');
                console.log('test');
            },
            hide () {
                this.$modal.hide('hello-world');
            },
            beforeOpen() {
                console.log('before Open called');
                this.reset();
                Promise.all([
                    this.fetchOrders(),
                ]).then(() => {
                });
            },
            test(){
                console.log('test called');
            },
            async fetchOrders() {
                this.loading = true;
                let returnPromise;
                await this.axios.get('/agent/41/orders').then(({data}) => {
                    this.total = data.total;
                    this.orders = data.order;
                    console.log(data);
                    returnPromise = data;
                    this.loading = false;
                });
                return returnPromise
            },
            reset() {
                this.orders = {};
            }
        }
    }
</script>

<style scoped>
    .container {
        padding: 2rem 0rem;
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
    .filter{
        margin-bottom: 30px;
    }
</style>