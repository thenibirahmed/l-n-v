<template>
    <Backend>
        <div class="container">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2>Add New Post</h2>
            </div>
            <form>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" v-model="title">
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">Content</label>
                    <textarea class="form-control" id="content" v-model="content"></textarea>
                </div>
                <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <select class="form-select" id="category" v-model="category">
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="submit">Submit</button>
            </form>
        </div>
    </Backend>
</template>

<script setup>
import Backend from '@/components/layouts/Backend.vue'
import { ref, onMounted } from 'vue'

let title = ref('')
let content = ref('')
let category = ref('')
let categories = ref([])
let errors = ref([])

const fetchCategories = async () => {
    const response = await axios.get('/api/categories')

    if(response.status !== 200){
        console.error('Error fetching categories')
        return
    }

    categories.value = response.data.categories
}

onMounted(() => {
    fetchCategories()
})

</script>
