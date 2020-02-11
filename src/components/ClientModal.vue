<template>
    <modal name="client-modal" :adaptive="true" height="auto" :scrollable="true"
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
                    <strong v-if ="method === 'edit'" >Modifier</strong>
                    <strong v-else-if ="method === 'get'" >Consulter</strong>
                    <strong v-else-if ="method === 'create'" >Créer</strong>
                </h2>
            </div>
            <div class="modal-body">
                <hr>
                <div class="text-center">
                    <h3>
                        <strong>Client</strong>
                    </h3>
                    <hr>
                    <div class="row ">
                        <div class="col">
                            <div class="form-group">
                                <label>Nom</label>
                                <input id="nom_client_edit"  v-if ="method === 'edit'" class="form-control" placeholder="Nom" v-model="client.nom_client">
                                <input v-else-if ="method === 'get'" class="form-control" placeholder="Nom" v-model="client.nom_client"  disabled >
                                <input id="nom_client_create" v-model="client.nom_client" v-else-if ="method === 'create'" class="form-control" placeholder="Nom" >
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Prénom</label>
                                <input  v-if ="method === 'edit'" id="prenom_client_edit" class="form-control" placeholder="Prénom" v-model="client.prenom_client">
                                <input  v-else-if ="method === 'get'" class="form-control" placeholder="Prénom" v-model="client.prenom_client" disabled>
                                <input  v-else-if ="method === 'create'" id="prenom_client_create" v-model="client.prenom_client" class="form-control" placeholder="Prénom" >
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Adresse</label>
                        <input v-if ="method === 'edit'" class="form-control" placeholder="Adresse" v-model="client.adresse_client">
                        <input v-else-if ="method === 'get'" class="form-control" placeholder="Adresse" v-model="client.adresse_client" disabled>
                        <input v-else-if ="method === 'create'" v-model="client.adresse_client" class="form-control" placeholder="Adresse" >
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>Pays</label>
                                <input v-if ="method === 'edit'" class="form-control" placeholder="Pays" v-model="client.country_client">
                                <input v-else-if ="method === 'get'" class="form-control" placeholder="Pays" v-model="client.country_client" disabled>
                                <input v-else-if ="method === 'create'" v-model="client.country_client" class="form-control" placeholder="Pays" >
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Zip code</label>
                                <input v-if ="method === 'edit'" class="form-control" placeholder="ZipCode" v-model="client.zip_code_client">
                                <input v-else-if ="method === 'get'" class="form-control" placeholder="ZipCode" v-model="client.zip_code_client" disabled>
                                <input v-else-if ="method === 'create'" class="form-control" v-model="client.zip_code_client" placeholder="ZipCode" >
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Telephone</label>
                        <input v-if ="method === 'edit'" class="form-control" placeholder="Téléphone" v-model="client.telephone_client">
                        <input v-else-if ="method === 'get'" class="form-control" placeholder="Téléphone" v-model="client.telephone_client" disabled>
                        <input v-else-if ="method === 'create'" v-model="client.telephone_client" class="form-control" placeholder="Téléphone" >
                    </div>
                    <div class="form-group">
                        <label>E-mail</label>
                        <input v-if ="method === 'edit'" class="form-control" placeholder="E-mail" v-model="client.email_client">
                        <input v-else-if ="method === 'get'" class="form-control" placeholder="E-mail" v-model="client.email_client" disabled>
                        <input v-else-if ="method === 'create'" v-model="client.email_client" class="form-control" placeholder="E-mail" >
                    </div>
                </div>
                <button v-if ="method === 'edit'" type="submit" class="btn btn-default pull-right" @click="update()">Enregistrer</button>
                <button v-else-if ="method === 'create'" type="submit" class="btn btn-default pull-right" @click="create()">Ajouter</button>

            </div>
        </div>
    </modal>
</template>

<script>
    export default {
        name: "ClientModal",
        data(){
            return {
                loading :true,
                method : {},
                client :{
                    "nom_client": '',
                    "prenom_client":'',
                    "adresse_client" :'',
                    "zip_code_client": '',
                    "country_client": '',
                    "telephone_client" :'',
                    "email_client":''
                },
            }
        },
        methods: {
            beforeOpen(event) {
                this.method = event.params.method;
                if(this.method === 'edit')
                    this.client = event.params.client;
                },
            async update () {
                this.loading = true;
                let obj = {
                    "nom_client": this.client.nom_client,
                    "prenom_client":this.client.prenom_client,
                    "adresse_client" :this.client.adresse_client,
                    "zip_code_client":this.client.zip_code_client,
                    "country_client":this.client.country_client,
                    "telephone_client" :this.client.telephone_client,
                    "email_client":this.client.email_client
                };
                let id = this.client.id_client;
                console.log(id);
                console.log(obj);

                await this.axios.post('/client/'+id+'/edit', obj).then(({data}) => {
                    console.log('test ' + data);
                    this.$swal(`Le Client est bien enregistré `, ' ', "success");
                    this.loading = false;
                });

                this.client = {
                    "nom_client": '',
                    "prenom_client":'',
                    "adresse_client" :'',
                    "zip_code_client": '',
                    "country_client": '',
                    "telephone_client" :'',
                    "email_client":''
                };

            },
            async create () {
                this.loading = true;
                let obj = {
                        "nom_client": this.client.nom_client.toString(),
                        "prenom_client":this.client.prenom_client,
                        "adresse_client" :this.client.adresse_client,
                        "zip_code_client":this.client.zip_code_client,
                        "country_client":this.client.country_client,
                        "telephone_client" :this.client.telephone_client,
                        "email_client":this.client.email_client
                    };

                console.log(obj);

                 await this.axios.post('/client/new', obj).then(({data}) => {
                    console.log('test ' + data);

                    this.$swal(`Le Client est bien enregistré # ${data.id_client}`, "You are ready to start!", "success");
                    this.loading = false;
                });
                this.client = {
                    "nom_client": '',
                        "prenom_client":'',
                        "adresse_client" :'',
                        "zip_code_client": '',
                        "country_client": '',
                        "telephone_client" :'',
                        "email_client":''
                };
            },


        }

    }
</script>

<style scoped>

</style>