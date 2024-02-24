import { createRouter, createWebHistory } from "vue-router";

import Frontend from "../components/layouts/Frontend.vue";
import NotFound from "../components/NotFound.vue";
import Blogs from "../components/blog-frontend/Blogs.vue";
import Backend from "../components/layouts/Backend.vue";



const routes = [
    {
        path: "/",
        component: () => Blogs,
    },
    {
        path: "/admin",
        component: () => Backend,
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
