/**
 State cart
 */
// shape: [{ id, name, price, qty, ship_cost, discount, image }]
const state = {
    items: [],
    checkoutStatus: null
};

const getters = {
   // getItemById: (state) => (id) => {
   //     return state.items.find(item => item.id === id);
   // },
    getTotalPrice: (state) => {
        return Math.round(state.items.reduce((total, item) => {
            return total + item.price * item.qty;
        }, 0) * 100) / 100;
    },
    getItems() {
       return state.items;
    },
    getTotalItems() {
        return state.items.length;
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
        const cartItem = state.items.find(item => item.id === product.num_produit);
        if (!cartItem) {
            commit('pushProductToCart', product)
        } else {
            commit('increment', cartItem)
        }
    },
    removeProduct({ commit }, product) {
        commit('removeItem', product);
    },

    increment({ commit }, product) {
        commit('increment', product)
    },
    decrement({ commit }, product) {
        commit('decrement', product)
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
            image: product.attributes_produit.image[0],
            qty: 1
        })
    },

    increment (state, { id }) {
        const cartItem = state.items.find(item => item.id === id);
        cartItem.qty++
    },
    decrement (state, { id }) {
        const cartItem = state.items.find(item => item.id === id);
        if(cartItem.qty>1) {
            cartItem.qty--;
        }
    },

    setCartItems (state, { items }) {
        state.items = items
    },

    setCheckoutStatus (state, status) {
        state.checkoutStatus = status
    },
    removeItem(state, { id }) {
        const newArray = state.items.filter(item => { return item.id !== id });
        state.items = newArray;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
