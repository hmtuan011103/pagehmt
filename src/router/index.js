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
        group: 'family',
        routes: [
            {
                path: '/',
                name: 'family',
                component: Family,
                meta: {
                    layout: 'AppLayoutGuest',
                    slug: 'gia-dinh',
                }
            }
        ]
    },
    {
        group: 'love',
        routes: [
            {
                path: '/love',
                meta: {
                    layout: 'AppLayoutGuest',
                    slug: 'nguoi-yeu-tmh',
                },
                children: [
                    {
                        path: '',
                        name: 'love',
                        component: Love
                    },
                    {
                        path: 'show-post',
                        name: 'love-post',
                        component: LovePost
                    },
                    {
                        path: 'post-detail',
                        name: 'love-show',
                        component: LoveShow
                    }
                ]
            }
        ]
    },
    {
        group: 'friend',
        routes: [
            {
                path: '/friend',
                name: 'friend',
                component: Friend,
                meta: {
                    layout: 'AppLayoutGuest',
                    slug: 'ban-be',
                }
            }
        ]
    },
    {
        group: 'another',
        routes: [
            {
                path: '/another',
                name: 'another',
                component: Another,
                meta: {
                    layout: 'AppLayoutGuest',
                    slug: 'ki-niem',
                }
            }
        ]
    }
];

const flattenedRoutes = routes.flatMap(group => group.routes);

const router = createRouter({
    history: createWebHistory('/'),
    routes: flattenedRoutes
});

router.beforeEach(loadLayoutMiddleware)

export default router