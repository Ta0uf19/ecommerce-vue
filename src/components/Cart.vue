<template>
    <div>
        <div v-for="product in products" :key="product.id">
            <b-dropdown-text>
                <b-row>
                    <b-col cols="5">
                        <img :src="product.image" alt="item1" width="100px"/>
                    </b-col>
                    <b-col>
                        <span class="item-name">{{product.name}}</span><br/>
                        <div class="small pull-right mt-2">
                            <minus-circle-icon size="1.5x" @click="decrement(product)"></minus-circle-icon>
                            <span style="padding-left:10px;padding-right: 10px;font-weight: 600;">{{ product.qty }}</span>
                            <plus-circle-icon size="1.5x" @click="increment(product)"></plus-circle-icon>
                        </div>
                        <div class="pull-left mt-2">
                            <span class="item-price">{{product.price}} €</span>
                        </div>
                    </b-col>
                </b-row>
                <hr/>
                <b-row>
                    <b-col>
                        <span style="font-size:12px;">Supprimer</span>
                        <archive-icon size="1x" class="pull-right" @click="removeProduct(product)"></archive-icon>
                    </b-col>
                </b-row>
            </b-dropdown-text>
            <b-dropdown-divider></b-dropdown-divider>
        </div>
        <b-dropdown-text>
            <div class="small pull-left">
                Sous total
            </div>
            <div class="pull-right font-weight-bolder">
                {{ this.getTotalPrice() }} €
            </div>
        </b-dropdown-text>
    </div>
</template>

<script>
    import {mapGetters, mapState, mapActions} from 'vuex'
    import {ArchiveIcon, PlusCircleIcon, MinusCircleIcon} from 'vue-feather-icons'
    export default {
        name: "Cart",
        components: {
            ArchiveIcon, PlusCircleIcon, MinusCircleIcon
        },
        computed: {
            ...mapState({
                products: state => state.cart.items
            })
        },
        methods: {
            ...mapGetters('cart', ['getTotalPrice']),
            ...mapActions('cart', ['removeProduct', 'increment', 'decrement']),
        }
    }
</script>

<style scoped>
    li { display: inline !important;}
    ul { list-style-type: none !important; }
</style>
