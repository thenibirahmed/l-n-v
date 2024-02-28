import { createRouter, createWebHistory } from "vue-router";

import NotFound from "../components/NotFound.vue";
const Blogs = () => import("../components/blog-frontend/Blogs.vue");
const Dashboard = () => import("../components/blog-backend/Dashboard.vue");
const AddNew = () => import("@/components/blog-backend/blog/AddNew.vue");
const EditBlog = () => import("@/components/blog-backend/blog/EditBlog.vue");
const Categories = () => import("@/components/blog-backend/categories/Categories.vue");
const Login = () => import("@/components/auth/Login.vue");
const Registration = () => import("@/components/auth/Registration.vue");

const routes = [
    {
        path: "/",
        component: Blogs,
    },
    {
        path: "/log-in",
        component: Login,
    },
    {
        path: "/registration",
        component: Registration,
    },
    {
        path: "/admin",
        component: Dashboard,
    },
    {
        path: "/add-new-post",
        component: AddNew,
    },
    {
        path: "/edit-post/:id",
        component: EditBlog,
    },
    {
        path: "/all-categories",
        component: Categories,
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
