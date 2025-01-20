import {createRouter, createWebHistory} from 'vue-router'
import {loadLayoutMiddleware} from "@/router/middleware/loadLayoutMiddleware";

const Family = () => import("@/views/Family.vue");
const Love = () => import("@/views/Love.vue");
const Friend = () => import("@/views/Friend.vue");
const Another = () => import("@/views/Another.vue");
const LoveShow = () => import("@/views/LovePage/LoveShow.vue");

const routes = [
    {
        group: 'family',
        routes: [
            {
                path: '/',
                name: 'family',
                component: Family,
                meta: {
                    layout: 'AppLayoutGuest'
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
                    layout: 'AppLayoutGuest'
                },
                children: [
                    {
                        path: '',
                        name: 'love',
                        component: Love
                    },
                    {
                        path: 'show',
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
                    layout: 'AppLayoutGuest'
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
                    layout: 'AppLayoutGuest'
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