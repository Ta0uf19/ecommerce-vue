<template>
    <modal name="client-modal" :adaptive="true" height="auto" :scrollable="true"
           @before-open="beforeOpen">
        test
        <b-card>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>Nom</label>
                        <input  class="form-control" placeholder="Nom">
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label>Prénom</label>
                        <input  class="form-control" placeholder="Prénom">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Adresse</label>
                <input class="form-control" placeholder="Adresse">
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>Pays</label>
                        <input  class="form-control" placeholder="Pays">
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label>Zip code</label>
                        <input  class="form-control" placeholder="ZipCode">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Telephone</label>
                <input  class="form-control"  placeholder="Téléphone">
            </div>
            <div class="form-group">
                <label>E-mail</label>
                <input  class="form-control"  placeholder="E-mail">
            </div>
            <button type="submit" class="btn btn-default pull-right">Ajouter</button>
        </b-card>
    </modal>
</template>

<script>
    export default {
        name: "ClientModal",
        methods :{
            beforeOpen(event){
                console.log(event.params);
            },
        }

    }
</script>

<style scoped>

</style>