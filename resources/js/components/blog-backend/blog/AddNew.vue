<template>
    <Backend>
        <div class="container">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2>Add New Post</h2>
            </div>
            <form @submit.prevent="addNewPost">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" v-model="post.title">
                </div>
                <span class="text-danger text-sm mb-3" v-if="errors?.title">{{ errors.title[0] }}</span>

                <div class="mb-3">
                    <label for="content" class="form-label">Content</label>
                    <textarea class="form-control" id="content" v-model="post.content"></textarea>
                </div>
                <span class="text-danger text-sm mb-3" v-if="errors?.content">{{ errors.content[0] }}</span>

                <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <select class="form-select" id="category" v-model="post.category_id">
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                    <span class="text-danger text-sm mb-3" v-if="errors?.category_id">{{ errors.category_id[0] }}</span>

                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </Backend>
</template>

<script setup>
import Backend from '@/components/layouts/Backend.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification";

const router = useRouter()
const toast = useToast()

let post = ref({
    title: '',
    content: '',
    category_id: ''
})
let categories = ref([])
let errors = ref([])

const fetchCategories = async () => {
    const response = await axios.get('/api/categories')

    if(response.status !== 200){
        console.error('Error fetching categories')
        return
    }

    categories.value = response.data.categories
    post.value.category_id = categories.value[0] ? categories.value[0].id : null
}

const addNewPost = async () => {
    await axios.post('/api/posts', post.value)
        .then(response => {
            if(response.status !== 200){
                console.error('Error adding new post')
                return
            }
            toast.success("Post added successfully");
            router.push('/admin')
        })
        .catch(error => {
            errors.value = error.response.data.errors
        })
}

onMounted(() => {
    fetchCategories()
})

</script>
