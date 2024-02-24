import { createRouter, createWebHistory } from "vue-router";

import Frontend from "../components/layouts/Frontend.vue";
import NotFound from "../components/NotFound.vue";
import Blogs from "../components/blog-frontend/Blogs.vue";



const routes = [
    {
        path: "/",
        component: () => Blogs,
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
