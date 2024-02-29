<template>

    <div class="container mt-5 pt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
            <div class="card">
                <h2 class="card-header">Register</h2>
                <div class="card-body">
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" v-model="user.name" required>
                        <!-- error -->
                        <div v-if="errors.name" class="text-danger">{{ errors.name[0] }}</div>
                    </div>
                    <div class="form-group mt-3">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" v-model="user.email" required>
                        <!-- error -->
                        <div v-if="errors.email" class="text-danger">{{ errors.email[0] }}</div>
                    </div>
                    <div class="form-group mt-3">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" v-model="user.password" required>
                        <!-- error -->
                        <div v-if="errors.password" class="text-danger">{{ errors.password[0] }}</div>
                    </div>
                    <div class="form-group mt-3">
                        <label for="password-confirmation">Password Confirmation</label>
                        <input type="password" class="form-control" id="password-confirmation" v-model="user.passwordConfirmation" required>
                    </div>

                    <button type="submit" class="btn btn-primary mt-3">Register</button>
                    <p class="pt-3">Already have an account? <router-link to="/auth/login">Login Here</router-link></p>
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
    const user = ref({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });
    const errors = ref([]);

    onMounted(() => {
        if(store.getters.isLoggedIn) {
            router.push('/admin');
        }
    });

    const register = async () => {
        if(user.value.password !== user.value.passwordConfirmation) {
            errors.value = { password: ['Password and password confirmation do not match'] };
            return;
        }
        await axios.post('/api/register-new-user', {
            name: user.value.name,
            email: user.value.email,
            password: password.value
        })
        .then(response => {
            if(response.status === 200) {
                toast.success('Registration successful');
                router.push('/admin');
            }
        })
        .catch(error => {
            if(error.response.status === 422) {
                errors.value = error.response.data.errors;
            }else{
                toast.error('Something went wrong!');
            }
        });
    }
</script>
