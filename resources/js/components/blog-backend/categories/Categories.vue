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

                    <div v-if="updateCategoryID !== null" class="update-form">
                        <h3 class="mt-4">Update Category</h3>
                        <form @submit.prevent="updateCategory">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" v-model="existingCategory.name">
                            </div>
                            <span class="text-danger text-sm mb-3" v-if="updateErrors?.name">{{ updateErrors.name[0] }}</span>
                            <button type="submit" class="btn btn-primary">Update</button>
                        </form>
                        <button type="submit" @click="updateCategoryID = null" class="btn btn-danger mt-3">Cancel</button>
                    </div>
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
                                        <a href="" @click.prevent="editCategory(category.id)" class="text-primary">Edit</a> |
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

    let categories = ref([])
    let errors = ref([])
    let category = ref({
        name: ''
    })

    let updateErrors = ref([])
    let updateCategoryID = ref(null)
    let existingCategory = ref({
        name: ''
    })

    onMounted(async () => {
        await fetchCategories()
    })

    const editCategory = (id) => {
        updateCategoryID.value = id
        existingCategory.value = categories.value.find(category => category.id === id)
    }

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

    const updateCategory = async () => {
        await axios.patch(`/api/category/${updateCategoryID.value}`, existingCategory.value)
            .then(response => {
                updateCategoryID.value = null
                updateErrors.value = []
                toast.success('Category updated successfully')
            })
            .catch(error => {
                updateErrors.value = error.response.data.errors
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
