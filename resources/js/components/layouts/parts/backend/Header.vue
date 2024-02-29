<template>
    <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
        <router-link class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" to="/">Nibir Ahmed</router-link>

        <ul class="navbar-nav flex-row d-md-none">
            <li class="nav-item text-nowrap">
            <button class="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
                <svg class="bi"><use xlink:href="#search"/></svg>
            </button>
            </li>
            <li class="nav-item text-nowrap">
            <button class="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <svg class="bi"><use xlink:href="#list"/></svg>
            </button>
            </li>
        </ul>

        <div id="navbarSearch" class="navbar-search w-100 collapse">
            <input class="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search">
        </div>
        <a @click.prevent="logout" href="" class="btn btn-secondary-outline">Logout</a>
    </header>
</template>

<script setup>
    import { useToast } from "vue-toastification";
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'

    const store = useStore()
    const toast = useToast()
    const router = useRouter()

    const logout = () => {
        if(!confirm('Are you sure you want to logout?')) return

        axios.post('/logout')
            .then((response) => {
                store.dispatch('setLoggedInUser')
            })
            .catch((error) => {
                console.log(error)
            })
    }
</script>

