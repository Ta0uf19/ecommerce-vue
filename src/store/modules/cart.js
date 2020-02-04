/**
 State cart
 */
// shape: [{ id, name, price, qty, ship_cost, discount }]
const state = {
    items: [],
    checkoutStatus: null
};

const getters = {
   getItemById: (state) => (id) => {
       return state.items.find(item => item.id === id);
   },
    getTotalPrice: (state) => {
        return state.items.reduce((total, item) => {
            return total + item.price * item.qty
        }, 0);
    },
    getItems() {
       return state.items;
    }
};

const actions = {
    /*checkout ({ commit, state }, products) {
        const savedCartItems = [...state.items];
        commit('setCheckoutStatus', null);
        // empty cart
        commit('setCartItems', { items: [] });

        /*shop.buyProducts(
            products,
            () => commit('setCheckoutStatus', 'successful'),
            () => {
                commit('setCheckoutStatus', 'failed');
                // rollback to the cart saved before sending the request
                commit('setCartItems', { items: savedCartItems });
            }
        )
    },*/
    addProductToCart ({ state, commit }, product) {
        commit('setCheckoutStatus', null);
        const cartItem = state.items.find(item => item.id === product.id);
        if (!cartItem) {
            commit('pushProductToCart', { id: product.id })
        } else {
            commit('incrementItemQuantity', cartItem)
        }
    }
};

const mutations = {

    pushProductToCart (state, product) {
        state.items.push({
            id: product.num_produit,
            name: product.libelle_produit,
            price: product.prixu_produit,
            ship_cost: product.shippingcost_produit,
            discount: product.discount_produit,
            quantity: 1
        })
    },

    incrementItemQuantity (state, { id }) {
        const cartItem = state.items.find(item => item.id === id);
        cartItem.quantity++
    },

    setCartItems (state, { items }) {
        state.items = items
    },

    setCheckoutStatus (state, status) {
        state.checkoutStatus = status
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
