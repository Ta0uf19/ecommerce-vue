<template>
    <div class="container-fluid" style="width: 80%" @before-open="beforeOpen" >
        <client-modal></client-modal>
        <b-col>
            <div class="row filter top-buffer">
                <input class="search form-control form-control-lg col-9" type="text" placeholder="Chercher par client" >
            </div>
            <div class="row card top-buffer">
                <div class="col-12">
                    <table class="table table-borderless">
                        <thead>
                        <tr>
                            <th scope="col">nom_client</th>
                            <th scope="col">prenom_client</th>
                            <th scope="col">telephone_client</th>
                            <th scope="col">email_client</th>
                            <th scope="col">country_client</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(client,index) in clients" :key="index">
                            <th scope="row">{{client.nom_client}}</th>
                            <th scope="row">{{client.prenom_client}}</th>
                            <td>{{client.telephone_client}}</td>
                            <td>{{client.email_client}}</td>
                            <td>{{client.country_client}}</td>
                            <td></td>
                           <td>
                                <button type="button" class="btn btn-primary"  @click="$modal.show('client-modal') ">R</button>
                                <button type="button" class="btn btn-warning"  @click="$modal.show('client-modal') ">U</button>
                                <button type="button" class="btn btn-danger"  @click="DeleteUser(client.id_client, index)">D</button>
                            </td>
                        </tr>
                       </tbody>
                    </table>
                </div>
            </div>
        </b-col>
    </div>
</template>

<script>
    import ClientModal from "./ClientModal";

    export default {
        name: "Clients",
        components: {
            ClientModal
        },
        data(){
            return{
                clients:{},
            }
        },
        created :function() {
            this.beforeOpen();
        },
        methods:{
            beforeOpen(){
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
                    this.clients = data ;
                    returnPromise = data;
                    this.loading = false;
                });

                return returnPromise;
            },
            reset() {
                this.clients = {};
            },
            DeleteUser:function(id, index) {

                if(confirm("Do you really want to delete?")){

                    this.axios.delete('/client/'+id)
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
.top-buffer{
    margin-top: 20px;

}
</style>