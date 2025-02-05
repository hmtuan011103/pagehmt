import {createRouter, createWebHistory} from 'vue-router'
import {loadLayoutMiddleware} from "@/router/middleware/loadLayoutMiddleware";

const Family = () => import("@/views/Family.vue");
const Love = () => import("@/views/Love.vue");
const Friend = () => import("@/views/Friend.vue");
const Another = () => import("@/views/Another.vue");
const LoveShow = () => import("@/views/LovePage/LoveShow.vue");
const LovePost = () => import("@/views/LovePage/LovePost.vue");

const routes = [
    {
        path: '/',
        name: 'family',
        component: Family,
        meta: { layout: 'AppLayoutGuest' }
    },
    {
        path: '/love',
        name: 'love',
        component: Love,
        meta: { layout: 'AppLayoutGuest' }
    },
    {
        path: '/love/:slug',
        name: 'love-post',
        component: LovePost,
        props: true,
        meta: { layout: 'AppLayoutGuest' }
    },
    {
        path: '/love/:slug/:code',
        name: 'love-show',
        component: LoveShow,
        props: true,
        meta: { layout: 'AppLayoutGuest' }
    },
    {
        path: '/friend',
        name: 'friend',
        component: Friend,
        meta: { layout: 'AppLayoutGuest' }
    },
    {
        path: '/another',
        name: 'another',
        component: Another,
        meta: { layout: 'AppLayoutGuest' }
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes: routes
});

router.beforeEach(loadLayoutMiddleware)

export default router