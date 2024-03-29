import store from "../store";
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
        path: "/auth/login",
        component: Login,
    },
    {
        path: "/auth/register",
        component: Registration,
    },
    {
        path: "/admin",
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: "/add-new-post",
        component: AddNew,
        meta: { requiresAuth: true }
    },
    {
        path: "/edit-post/:id",
        component: EditBlog,
        meta: { requiresAuth: true }
    },
    {
        path: "/all-categories",
        component: Categories,
        meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (store.getters.isLoggedIn) {
            next()
        }
        else{
            next('/auth/login')
        }

    } else {
        next()
    }
})


export default router;
