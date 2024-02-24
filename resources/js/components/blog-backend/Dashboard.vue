<template>
    <Backend>
        <h2>Section title</h2>
        <div class="table-responsive small">
            <table class="table table-striped table-sm">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Category</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <td>#{{ post.id }}</td>
                    <td>{{ post.title }}</td>
                    <td>{{ post.title }}</td>
                    <td v-if="post.category">{{ post.category.name }}</td>
                </tr>
            </tbody>
            </table>
        </div>
    </Backend>
</template>


<script setup>
    import Backend from '../layouts/Backend.vue'
    import { ref, onMounted } from 'vue'

    let posts = ref([])

    const fetchPosts = async () => {
        const response = await axios.get('/api/posts')
        console.log(response)
        if(response.status !== 200){
            console.error('Error fetching posts')
            return
        }

        posts.value = response.data.posts
    }

    onMounted(() => {
        fetchPosts()
    })

</script>

