<template>
    <Backend>
        <div class="container">
            <h1 class="mt-4">Edit Blog</h1>
            <form @submit.prevent="updatePost">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" v-model="post.title">
                </div>
                <span class="text-danger text-sm mb-3" v-if="errors?.title">{{ errors.title[0] }}</span>


                <div class="mb-3">
                    <label for="content" class="form-label">Content</label>
                    <textarea class="form-control" id="content" rows="3" v-model="post.content"></textarea>
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
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
    </Backend>
</template>

<script setup>
    import Backend from '@/components/layouts/Backend.vue'
    import { ref, onMounted, defineProps } from 'vue'
    import { useRoute } from 'vue-router'
    import { useToast } from "vue-toastification";

    const route = useRoute()
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
    }

    const fetchSinglePost = async () => {
        const response = await axios.get(`/api/post/${route.params.id}`)

        if(response.status !== 200){
            console.error('Error fetching post')
            return
        }

        if(!response.data.post){
            console.error('Post not found')
            return
        }

        post.value = response.data.post
    }

    const updatePost = async () => {
        await axios.patch(`/api/post/${route.params.id}`, post.value)
            .then(response => {
                if(response.status !== 200){
                    console.error('Error updating post')
                    return
                }

                post.value = response.data.post
                toast.success("Post updated successfully");
            })
            .catch(error => {
                errors.value = error.response.data.errors
            })
    }

    onMounted(() => {
        if(!route.params.id){
            throw new Error('Post ID is required')
        }

        fetchSinglePost()

        fetchCategories()
    })
</script>

