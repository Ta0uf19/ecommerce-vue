<template>
    <div class="container-fluid" style="width: 80%" @before-open="beforeOpen">
        <b-col>
            <div v-if="loading">
                <div class="text-center">
                    <b-spinner label="Loading..."></b-spinner>
                </div>
            </div>
            <div v-else>
                <h3 class="mb-4 font-weight-bold">Liste des commandes</h3>
                <div class="row card">
                    <div class="card-body">
                        <div class="col-12">
                            <div class="row filter mt-3 mb-2 text-center">
                                <input class="search form-control form-control-lg" type="text" placeholder="Chercher par client">
                            </div>
                            <b-row class="mb-1 pull-right">
                                <label class="text-muted">{{ total }} commandes passées</label>
                            </b-row>
                            <table class="table ">
                                <thead>
                                <tr>
                                    <th scope="col">Commande</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Prénom</th>
                                    <th scope="col">État d'avancement</th>
                                    <th scope="col">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="order in orders" :key="order.num_cmd">
                                    <th scope="row"><a href="#" style="color: #1f5eff" @click="$modal.show('order-modal',{order,client : order.id_client}) ">#{{order.num_cmd}}</a></th>
                                    <th scope="row">{{moment(order.date_cmd).lang("fr").format('LLL')}}</th>
                                    <td>{{order.id_client.nom_client}}</td>
                                    <td>{{order.id_client.prenom_client}}</td>
                                    <td><span class="badge badge-primary">en cours</span></td>
                                    <td>{{order.montant_cmd}} €</td>
                                </tr>
                                <OrderModal></OrderModal>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </b-col>
    </div>
</template>
<script>

    import OrderModal from "./OrderModal";
    import {mapGetters} from 'vuex';

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
        created: function () {
            this.beforeOpen();
        },
        methods: {
            ...mapGetters(['getUser']),
            show: function () {
                this.$modal.show('hello-world');
                console.log('test');
            },
            hide() {
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
            test() {
                console.log('test called');
            },
            async fetchOrders() {
                this.loading = true;
                let returnPromise;

                console.log(this.getUser().username);
                console.log('email :' + this.$store.state.auth.user.username);
                console.log('user :' + this.$store.state.auth.user);
                console.log('auth :' + this.$store.state.auth);
                console.log('state :' + this.$store.state);

                await this.axios.get('/orders/agent', {
                    params: {
                        "email": this.$store.state.auth.user.username
                    }
                }).then(({data}) => {
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
    .card {

    }
    /*.container {
        padding: 2rem 0rem;
    }*/

   /* td, th {
        vertical-align: middle;
        font-size: medium;
        text-align: center;
    }

    th {
        margin: 2rem 0rem 1rem;
        font-size: large;
    }

    .filter {
        margin-bottom: 30px;
    }*/
</style>
