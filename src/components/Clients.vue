<template>
    <div class="container-fluid" style="width: 70%" @before-open="beforeOpen">
        <div v-if="loading">
            <div class="text-center">
                <b-spinner label="Loading..."></b-spinner>
            </div>
        </div>
        <div v-else>
            <div class="col">
                <div class="row">
                    <button type="button" class="btn btn-outline-success col-2 float-right"
                @click="$modal.show('client-modal',{client: client , method : 'create'}) "><i
                    class="fa fa-plus-square"></i> create
                </button>
            </div>
                <div class="row filter top-buffer">
                    <input class="search form-control form-control-lg col-9" type="text"
                           placeholder="Rechercher un client">
                </div>
            </div>
            <client-modal></client-modal>
            <b-col>
                <div class="row card top-buffer">
                    <table class="table ">
                        <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Pays</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(client,index) in clients" :key="index">
                            <td scope="row">{{client.nom_client}}</td>
                            <td scope="row">{{client.prenom_client}}</td>
                            <td>{{client.email_client}}</td>
                            <td>{{client.country_client}}</td>
                            <td>
                                <button type="button" class="btn btn-primary"
                                        @click="$modal.show('client-modal',{client: client , method : 'get'}) "><i
                                        class="fa fa-eye"></i></button>
                                <button type="button" class="btn btn-warning"
                                        @click="$modal.show('client-modal',{client: client , method : 'edit'}) "><i
                                        class="fa fa-edit"></i></button>
                                <button type="button" class="btn btn-danger"
                                        @click="DeleteUser(client.id_client, index)"><i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </b-col>
        </div>
    </div>


</template>

<script>
    import ClientModal from "./ClientModal";

    export default {
        name: "Clients",
        components: {
            ClientModal
        },
        data() {
            return {
                clients: {},
                client: '',
                loading: true,
                marqueFilter: {name: "CHANEL", path: "641.png"},

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
                    this.fetchClients(),
                ]).then(() => {
                });
            },
            async fetchClients() {
                this.loading = true;
                let returnPromise;

                await this.axios.get('/client').then(({data}) => {
                    this.clients = data;
                    returnPromise = data;
                    this.loading = false;
                });

                return returnPromise;
            },
            reset() {
                this.clients = {};
            },
            DeleteUser: function (id, index) {

                if (confirm("Do you really want to delete?")) {

                    this.axios.delete('/client/' + id)
                        .then(({resp}) => {
                            this.clients.splice(index, 1);
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