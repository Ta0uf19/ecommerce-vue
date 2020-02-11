/**
 * File routes
 */
import VueRouter from "vue-router";
import ProductSearch from "../components/ProductSearch";
import AgentOrders from "../components/AgentOrders";
import Login from "../components/Login";
import { store } from '../store/store'
//import Cart from "../components/Cart";
import ProductCart from "../components/ProductCart";
import Clients from "../components/Clients";

const routes = [
    { path: '/', redirect: '/dashboard' },
    {
        path: '/dashboard',
        name: 'home',
        component: ProductSearch,
        meta: {
            title: 'Dashboard | PriceQuery',
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Login | PriceQuery',
        }
    },
    {
        path: '/cart',
        name: 'cart',
        component: ProductCart,
        meta: {
            title: 'Panier | PriceQuery',
        }
    },
    {
        path: '/orders',
        name: 'orders',
        component: AgentOrders,
        meta: {
            title: 'orders | PriceQuery',
        }
    },
    {
        path: '/admin/client',
        name: 'adminClient',
        component: Clients,
        meta: {
            title: 'Clients | PriceQuery',
        }
    }


];


const router = new VueRouter({
    mode: 'history',
    routes,
    base: process.env.BASE_URL,
});

// Handling route auth access
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return
        }
        next('/login')
    } else {
        next()
    }
});

// Handling route title change
router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    // eslint-disable-next-line no-unused-vars
    from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create, so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '');

        return tag;
    })
    // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));

    next();
});

export default router;
