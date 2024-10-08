import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/home',
        name: 'dashBoard',
        component: import (/* esbpackChunkName: "home"*/ "@/components/DashBoard.vue"),
        children:[
            {
                path: "manager-user",
                name: 'userManager',
                component: import (/* webpackChunkName: "userManager" */ "@/components/ManagerUser.vue"),
            },
            {
                path:"manager-product",
                name:'managerProduct',
                component: import (/* webpackChunkName: "managerProduct" */ "@/components/ManagerProduct.vue"),
            }
        ]
    },
    
]
// Tao co che dinh tuyen cho ung dung
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})
// day ra ben ngoai cho ung dung su dung

export default router;