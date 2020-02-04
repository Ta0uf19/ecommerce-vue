<template>
    <div class="container">
        <b-row class="mb-2">
            <div class="ml-4">
                <label class="text-muted">{{ total }}33 commandes passées</label>
            </div>
        </b-row>
        <div class="row card">
            <div class="col-12">
                <table class="table table-borderless">
                    <thead>
                    <tr>
                        <th scope="col">date</th>
                        <th scope="col">nom</th>
                        <th scope="col">prenom</th>
                        <th scope="col">montant</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">11-15-2020</th>
                        <td>BATAGE</td>
                        <td>Cristina</td>
                        <td>646</td>
                        <td>
                            <button type="button" class="btn btn-primary">Consulter la commande</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">11-15-2020</th>
                        <td>BATAGE</td>
                        <td>Cristina</td>
                        <td>646</td>
                        <td>
                            <button type="button" class="btn btn-primary">Consulter la commande</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">11-15-2020</th>
                        <td>BATAGE</td>
                        <td>Cristina</td>
                        <td>646</td>
                        <td>
                            <button type="button" class="btn btn-primary">Consulter la commande</button>
                        </td>
                    </tr>                    <tr>
                        <th scope="row">11-15-2020</th>
                        <td>BATAGE</td>
                        <td>Cristina</td>
                        <td>646</td>
                        <td>
                            <button type="button" class="btn btn-primary">Consulter la commande</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">11-15-2020</th>
                        <td>BATAGE</td>
                        <td>Cristina</td>
                        <td>646</td>
                        <td>
                            <button type="button" class="btn btn-primary">Consulter la commande</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">11-15-2020</th>
                        <td>BATAGE</td>
                        <td>Cristina</td>
                        <td>646</td>
                        <td>
                            <button type="button" class="btn btn-primary">Consulter la commande</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AgentOrders"
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

</style>