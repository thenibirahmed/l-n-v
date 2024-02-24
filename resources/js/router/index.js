import { createRouter, createWebHistory } from "vue-router";

import NotFound from "../components/NotFound.vue";
import Blogs from "../components/blog-frontend/Blogs.vue";
import Dashboard from "../components/blog-backend/Dashboard.vue";

const routes = [
    {
        path: "/",
        component: () => Blogs,
    },
    {
        path: "/admin",
        component: () => Dashboard,
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
