<template>
    <main class="container">
        <div class="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
            <div class="col-lg-6 px-0">
            <p>Latest Post</p>
            <h1 class="display-4 fst-italic">{{ post.title }}</h1>
            <p class="lead my-3">{{ post.content }}</p>
            <p class="lead mb-0"><a href="#" class="text-body-emphasis fw-bold">Continue reading...</a></p>
            </div>
        </div>
    </main>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    let post = ref({})

    onMounted(() => {
        fetchPost()
    })

    const fetchPost = async () => {
        const response = await axios.get('/api/get-latest-post')
        post.value = response.data.post
    }


</script>

