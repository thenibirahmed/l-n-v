<template>

<Frontend>
    <Hero/>

    <div class="container">
        <div class="row mb-2">
            <div v-for="post in posts" :key="post.id" class="col-md-6">
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="col-8 p-4 d-flex flex-column position-static">
                        <strong v-if="post.category" class="d-inline-block mb-2 text-primary-emphasis">{{ post.category.name }}</strong>
                        <h3>{{ post.title }}</h3>
                        <div class="mb-1 text-body-secondary">{{ post.created_at }}</div>
                        <p class="card-text mb-auto">{{ post.content.split(' ').slice(0,15).join(' ') }}</p>
                        <a href="#" class="mt-3 icon-link gap-1 icon-link-hover stretched-link">
                            Continue reading
                            <svg class="bi"><use xlink:href="#chevron-right"/></svg>
                        </a>
                    </div>
                    <div class="col-4 d-none d-lg-block">
                        <img v-if="post.thumbnail" :src="'/storage/' + post.thumbnail" class="img-fluid">
                        <img v-else src="https://placehold.co/400x600" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
    </div>
</Frontend>


</template>


<script setup>
    import Hero from './Hero.vue'
    import Frontend from '../layouts/Frontend.vue'
    import { ref, onMounted } from 'vue'

    let posts = ref([])

    const fetchPosts = async () => {
        const response = await axios.get('/api/posts')

        if(response.status !== 200){
            console.error('Error fetching posts')
            return
        }

        posts.value = response.data.posts.data
    }

    onMounted(() => {
        fetchPosts()
    })


</script>
