<template>
    <modal name="client-modal" :adaptive="true" height="auto" :scrollable="true"
           @before-open="beforeOpen" @cancel="close">
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
                    <strong v-if="method === 'edit'">Modifier</strong>
                    <strong v-else-if="method === 'get'">Consulter</strong>
                    <strong v-else-if="method === 'create'">Créer</strong>
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
                                <input id="nom_client_edit" v-if="method === 'edit'" class="form-control"
                                       placeholder="Nom">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Prénom</label>
                                <input v-if="method === 'edit'" id="prenom_client_edit" class="form-control"
                                       placeholder="Prénom">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Adresse</label>
                        <input v-if="method === 'edit'" class="form-control" placeholder="Adresse">
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>Pays</label>
                                <input v-if="method === 'edit'" class="form-control" placeholder="Pays">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label>Zip code</label>
                                <input v-if="method === 'edit'" class="form-control" placeholder="ZipCode">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Telephone</label>
                        <input v-if="method === 'edit'" class="form-control" placeholder="Téléphone">
                    </div>
                    <div class="form-group">
                        <label>E-mail</label>
                        <input v-if="method === 'edit'" class="form-control" placeholder="E-mail">
                    </div>
                </div>
                <button v-if="method === 'edit'" type="submit" class="btn btn-default pull-right" @click="update()">
                    Enregistrer
                </button>
                <button v-else-if="method === 'create'" type="submit" class="btn btn-default pull-right"
                        @click="create()">Ajouter
                </button>

            </div>
        </div>
    </modal>
</template>

<script>
    export default {
        name: "AdminProductModal",
        data() {
            return {
                method: '',
            }
        },
        methods: {
            close() {
            },
            beforeOpen() {
            }
        },
    }
</script>

<style scoped>

</style>