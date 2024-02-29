<template>

    <div class="container mt-5 pt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
            <div class="card">
                <h2 class="card-header">Login</h2>
                <div class="card-body">
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" v-model="email" required>
                        <!-- error -->
                        <div v-if="errors.email" class="text-danger">{{ errors.email[0] }}</div>
                    </div>
                    <div class="form-group mt-3">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" v-model="password" required>
                        <!-- error -->
                        <div v-if="errors.password" class="text-danger">{{ errors.password[0] }}</div>
                    </div>
                    <button type="submit" class="btn btn-primary mt-3">Login</button>
                </form>
                </div>
            </div>
            </div>
        </div>
    </div>

</template>


<script setup>
    import { onMounted, ref } from 'vue';
    import { useToast } from "vue-toastification";
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    const email = ref('');
    const password = ref('');
    const errors = ref([]);

    onMounted(() => {
        if(store.getters.isLoggedIn) {
            router.push('/admin');
        }
    });

    const login = async () => {
        await axios.get('/sanctum/csrf-cookie');
        await axios.post('/login', {
            email: email.value,
            password: password.value
        })
        .then(response => {
            store.dispatch('setLoggedInUser')

            toast.success('Login successful');
            router.push('/admin');
        })
        .catch(error => {

            if(error.response.status === 422) {
                errors.value = error.response.data.errors;
            }

            if(error.response.status === 429) {
                errors.value = {
                    email: ['Too many login attempts. Please try again later.']
                };
            }

            if(error.response.status === 500) {
                errors.value = {
                    email: ['Something went wrong. Please try again.']
                };
            }
        });

    };
</script>


