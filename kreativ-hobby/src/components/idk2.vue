<template>
    <div class="blog">
      <h2>📰 Our Blog</h2>
      <div class="post" v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p class="meta">By {{ post.author }} | {{ formatDate(post.date) }}</p>
        <p>{{ post.excerpt }}</p>
        <button @click="showPost(post)">Read more</button>
      </div>
  
      <div class="modal" v-if="selectedPost">
        <div class="modal-content">
          <h2>{{ selectedPost.title }}</h2>
          <p class="meta">By {{ selectedPost.author }} | {{ formatDate(selectedPost.date) }}</p>
          <p class="content">{{ selectedPost.content }}</p>
          <button @click="selectedPost = null">Close</button>
        </div>
      </div>
    </div>
    
  </template>
  
  <script setup>
  /*
  --------ROUTER/INDEX.JS-BE (asszem)---------
  import { createRouter, createWebHistory } from 'vue-router'
import Shop from '@/components/Shop.vue'
import Blog from '@/components/Blog.vue'

const routes = [
  { path: '/', component: Shop },
  { path: '/blog', component: Blog }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
--------------------------------------
*/
  import { ref, onMounted } from 'vue'
  import blogJson from '@/assets/blog.json'
  
  const posts = ref([])
  const selectedPost = ref(null)
  
  onMounted(() => {
    posts.value = blogJson
  })
  
  function showPost(post) {
    selectedPost.value = post
  }
  
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString()
  }
  </script>
  
  <style scoped>
  .blog {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
  }
  .post {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  .meta {
    font-size: 0.85em;
    color: #777;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    max-width: 600px;
    padding: 20px;
    border-radius: 10px;
  }
  .content {
    white-space: pre-wrap;
  }
  </style>
  