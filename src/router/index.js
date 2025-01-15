import {createRouter, createWebHistory} from 'vue-router'
import {loadLayoutMiddleware} from "@/router/middleware/loadLayoutMiddleware";
import Family from "@/views/Family.vue";
import Love from "@/views/Love.vue";
import Friend from "@/views/Friend.vue";
import Another from "@/views/Another.vue";

const routes = [
    {
        path: '/',
        name: 'family',
        component: Family,
        meta: {
            layout: 'AppLayoutGuest'
        }
    },
    {
        path: '/love',
        name: 'love',
        component: Love,
        meta: {
            layout: 'AppLayoutGuest'
        }
    },
    {
        path: '/friend',
        name: 'friend',
        component: Friend,
        meta: {
            layout: 'AppLayoutGuest'
        }
    },
    {
        path: '/another',
        name: 'another',
        component: Another,
        meta: {
            layout: 'AppLayoutGuest'
        }
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

// Before each route changing the loadLayoutMiddleware middleware is executing.
router.beforeEach(loadLayoutMiddleware)

export default router