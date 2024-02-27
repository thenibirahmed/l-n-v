<template>
    <Backend>
        <div class="container-fluid">
            <div class="row">
                <h2 class="mt-2 mb-3">All Posts</h2>
                <div class="col-md-4">
                    <form @submit.prevent="addNewCategory">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" v-model="category.name">
                        </div>
                        <span class="text-danger text-sm mb-3" v-if="errors?.name">{{ errors.name[0] }}</span>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div class="col-md-8">
                    <div class="table-responsive small">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="category in categories" :key="category.id">
                                    <td>#{{ category.id }}</td>
                                    <td>{{ category.name }}</td>
                                    <td>
                                        <router-link :to="'/edit-category/' + category.id">Edit</router-link> |
                                        <a href="" @click.prevent="deleteCategory(category.id)" class="text-danger">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </Backend>

</template>

<script setup>
    import Backend from '@/components/layouts/Backend.vue'
    import { ref, onMounted } from 'vue'
    import { useToast } from "vue-toastification";

    const toast = useToast()

    let category = ref({
        name: ''
    })
    let categories = ref([])
    let errors = ref([])

    onMounted(async () => {
        await fetchCategories()
    })

    const fetchCategories = async () => {
        const response = await axios.get('/api/categories')

        if(response.status !== 200){
            console.error('Error fetching categories')
            return
        }

        categories.value = response.data.categories
    }

    const addNewCategory = async () => {
        await axios.post('/api/category', category.value)
            .then(response => {
                category.value.name = ''
                errors.value = []
                categories.value.unshift(response.data.category)
                toast.success('Category added successfully')
            })
            .catch(error => {
                errors.value = error.response.data.errors
            })
    }

    const deleteCategory = async (id) => {
        if(!confirm('Are you sure?')) return

        await axios.delete(`/api/category/${id}`)
            .then(response => {
                if(response.status !== 200){
                    console.error('Error deleting category')
                    return
                }

                categories.value = categories.value.filter(category => category.id !== id)
                toast.success('Category deleted successfully')
            })
            .catch(error => {
                console.error('Error deleting category: ', error)
            })
    }

</script>
