<template>
    <div class="container">
        <b-row>
            <b-col>
                <b-card>
                    <h5 class="mb-5 mt-2 font-weight-bold">Expéditeur</h5>
                </b-card>
            </b-col>
            <b-col cols="4">
                <b-card>
                    <h5 class="mb-5 mt-2 font-weight-bold">Résumé de la commande</h5>

                    <b-card-text>
                        <b-row>
                            <b-col cols="4">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item2.jpg" alt="item1"/>
                            </b-col>
                            <b-col>
                                <span class="item-name">Angel</span><br/>
                                <div class="small pull-right mt-4">
                                    Quantité : <input class="form-control form-control-sm" type="text" value="1"
                                                      style="width: 40px; display: inline-block;">
                                    |
                                    <span class="item-price">355 €</span>
                                </div>
                            </b-col>
                        </b-row>
                        <hr>
                        <b-row>
                            <b-col cols="4">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item2.jpg" alt="item1"/>
                            </b-col>
                            <b-col>
                                <span class="item-name">Angel</span><br/>
                                <div class="small pull-right mt-4">
                                    Quantité : <input class="form-control form-control-sm" type="text" value="1"
                                                      style="width: 40px; display: inline-block;">
                                    |
                                    <span class="item-price">355 €</span>
                                </div>
                            </b-col>
                        </b-row>
                        <hr/>
                        <b-row>
                            <b-col>
                                <div class="small pull-left">
                                    Sous total
                                </div>
                            </b-col>
                            <b-col>
                                <div class="pull-right font-weight-bolder">
                                    45 €
                                </div>
                            </b-col>
                        </b-row>
                        <hr/>
                        <div>
                            <b-btn href="#" class="btn btn-primary mb-3" style="width: 100%;" to="/cart">
                                Passer la commande
                            </b-btn>
                        </div>
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "ProductCart"
    }
</script>

<style scoped>

</style>
