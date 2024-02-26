<template>
    <Backend>
        <h2>All Posts</h2>
        <router-link to="/add-new-post" class="btn btn-primary my-3">Add New Post</router-link>
        <div class="table-responsive small">
            <table class="table table-striped table-sm">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts.data" :key="post.id">
                    <td>#{{ post.id }}</td>
                    <td>{{ post.title }}</td>
                    <td>{{ post.content.split(' ').slice(0,8).join(' ') + '...' }}</td>
                    <td v-if="post.category">{{ post.category.name }}</td>
                    <td>
                        <router-link :to="'/edit-post/' + post.id">Edit</router-link> |
                        <a href="" @click.prevent="deletePost(post.id)" class="text-danger">Delete</a>
                    </td>
                </tr>
            </tbody>
            </table>

            <Bootstrap5Pagination
                :data="posts"
                @pagination-change-page="fetchPosts"
            />
        </div>
    </Backend>
</template>


<script setup>
    import Backend from '../layouts/Backend.vue'
    import { ref, onMounted, watch } from 'vue'
    import { Bootstrap5Pagination } from 'laravel-vue-pagination';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()

    let posts = ref([])
    let currentPage = ref([])

    const fetchPosts = async (page = 1) => {
        const response = await axios.get(`/api/posts?page=${page}`)

        if(response.status !== 200){
            console.error('Error fetching posts')
            return
        }

        currentPage.value = page
        posts.value = response.data.posts
    }

    const deletePost = async (id) => {
        if( ! window.confirm('Are you sure you want to delete this post?') ){
            return
        }

        await axios.delete(`/api/post/${id}`)
            .then(response => {
                posts.value.data = posts.value.data.filter(post => post.id !== id)
            })
            .catch(error => {
                console.error('Error deleting post: ', error)
            })
    }

    onMounted(() => {
        fetchPosts()
    })

    watch(() => currentPage.value, (newValue, oldValue) => {
        if( currentPage.value === 1 ){
            return
        }

        router.push({
            query: {
                ...route.query,
                page: newValue
            }
        })
        .catch((error) => {
            console.error('Error navigating to query param: ', error)
        });
    });

</script>

