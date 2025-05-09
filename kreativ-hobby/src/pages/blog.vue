<template>
  <div class="blog-container">
    <!-- Blog List View -->
    <div v-if="!selectedPost" class="blog-grid">
      <h2>📰 Our Blog</h2>
      <div class="posts-grid">
        <div 
          class="post-card" 
          v-for="post in posts" 
          :key="post.id"
          @click="showPost(post)"
        >
          <h3>{{ post.title }}</h3>
          <p class="meta">By {{ post.author }} | {{ formatDate(post.date) }}</p>
          <p class="excerpt">{{ post.excerpt }}</p>
          <div class="read-more">Read more →</div>
        </div>
      </div>
    </div>

    <!-- Single Post View with Comments -->
    <div v-else class="single-post">
      <button class="back-button" @click="selectedPost = null">
        ← Back to All Posts
      </button>
      <article class="post-content">
        <h1>{{ selectedPost.title }}</h1>
        <p class="meta">By {{ selectedPost.author }} | {{ formatDate(selectedPost.date) }}</p>
        <div class="content">{{ selectedPost.content }}</div>

        <!-- Comments Section -->
        <div class="comments-section">
          <h3>Comments ({{ selectedPost.comments?.length || 0 }})</h3>
          
          <!-- Comment List -->
          <div class="comment" v-for="(comment, index) in selectedPost.comments" :key="index">
            <div class="comment-header">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-date">{{ formatDate(comment.date) }}</span>
            </div>
            <p class="comment-text">{{ comment.text }}</p>
          </div>
          
          <!-- Add Comment Form (UI only) -->
          <div class="add-comment">
            <h4>Add a comment</h4>
            <textarea placeholder="Write your thoughts..." rows="4"></textarea>
            <div class="popupContent"></div>
            <div class="comment-actions">
              <button class="submit-btn" @click="submitComment">Post Comment</button>
              <button class="cancel-btn" >Cancel</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import blogJson from '@/assets/blog.json'

const posts = ref([])
const selectedPost = ref(null)

onMounted(() => {
  posts.value = blogJson
})

function showPost(post) {
  selectedPost.value = post
  window.scrollTo(0, 0) // Scroll to top when viewing a post
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}

function submitComment() {
    const popup = document.createElement("p");
    popup.innerHTML = ('You have to log in to add comments!');
    popup.style.cssText = "  padding: 20px; background-color: #a6334a;color: white;opacity: 1; transition: opacity 0.6s;margin-bottom: 15px;"
    document.querySelector(".popupContent").appendChild(popup);
}


</script>

<style scoped>
.blog-container {
  min-height: 100vh;
  padding: 20px;
}

/* Grid View Styles */
.blog-grid {
  max-width: 1400px;
  margin: 0 auto;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  row-gap: 100px;
  margin-top: 30px;
}

.post-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f9f9f9;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.meta {
  font-size: 0.85em;
  color: #777;
  margin: 10px 0;
}

.excerpt {
  flex-grow: 1;
  margin-bottom: 15px;
}

.read-more {
  color: #2c3e50;
  font-weight: bold;
  text-align: right;
}

/* Single Post View Styles */
.single-post {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 1em;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: 30px;
  display: inline-block;
}

.back-button:hover {
  text-decoration: underline;
}

.post-content {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.post-content h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.content {
  line-height: 1.8;
  white-space: pre-wrap;
  margin-top: 30px;
}

/* Comments Section Styles */
.comments-section {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.comments-section h3 {
  font-size: 1.5em;
  margin-bottom: 25px;
}

.comment {
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid #f5f5f5;
}

.comment:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9em;
}

.comment-author {
  font-weight: bold;
  color: #2c3e50;
}

.comment-date {
  color: #777;
}

.comment-text {
  line-height: 1.6;
  margin: 0;
}

/* Add Comment Form */
.add-comment {
  margin-top: 40px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.add-comment h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.add-comment textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1em;
  margin-bottom: 15px;
}

.comment-actions {
  display: flex;
  gap: 10px;
}

.submit-btn {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>