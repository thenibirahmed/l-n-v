import { createRouter, createWebHistory } from "vue-router";

import NotFound from "../components/NotFound.vue";
import Blogs from "../components/blog-frontend/Blogs.vue";
import Dashboard from "../components/blog-backend/Dashboard.vue";
import AddNew from "@/components/blog-backend/blog/AddNew.vue"
import EditBlog from "@/components/blog-backend/blog/EditBlog.vue"

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
        path: "/add-new-post",
        component: () => AddNew,
    },
    {
        path: "/edit-post/:id",
        component: () => EditBlog,
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
