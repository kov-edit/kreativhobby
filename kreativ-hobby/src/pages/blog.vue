<template>
  <div class="blog-container">
    <!-- Blog List View -->
    <div class="header-wrapper">
      <h1 id="title">Our Blog</h1>
      <div class="chat-controls">
        <button class="chat-button" @click="toggleChat">
          {{ showChat ? 'Close Chat' : 'Do you need help?' }}
        </button>
      

    <!-- Chat Container -->
    <div v-if="showChat" class="chat-floating-container">
      <div class="chat-container">
        <div class="nav-bar">
          <a>Chat</a>
          <div class="close" @click="toggleChat">
            <div class="line one"></div>
            <div class="line two"></div>
          </div>
        </div>
        <div class="messages-area">
          <div class="message" v-for="(message, index) in messages" :key="index" 
               :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }">
            {{ message.text }}
          </div>
        </div>
        <div class="sender-area">
          <div class="input-place">
            <input v-model="newMessage" placeholder="Send a message." class="send-input" type="text" 
                   @keyup.enter="sendMessage">
            <div class="send" @click="sendMessage">
              <svg class="send-icon" viewBox="0 0 512 512">
                <path fill="#6B6C7B" d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808 L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193 c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409 C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>

    </div> 


    <div v-if="!selectedPost" class="blog-grid">
      
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
const showChat = ref(false)
const newMessage = ref('');
const messages = ref([
  { text: "Hello! How can I help you today?", isUser: false },
  { text: "Try asking about our blog posts or authors.", isUser: false }
]);


const toggleChat = () => {
  showChat.value = !showChat.value;
};

const sendMessage = () => {
  if (newMessage.value.trim() === '') return;
  
  // Add user message
  messages.value.push({
    text: newMessage.value,
    isUser: true
  });
  
  // Clear input
  newMessage.value = '';
  
  // Simulate bot response after a short delay
  setTimeout(() => {
    messages.value.push({
      text: getBotResponse(),
      isUser: false
    });
    
    // Scroll to bottom of chat
    const messagesArea = document.querySelector('.messages-area');
    if (messagesArea) {
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }
  }, 500);
};

const getBotResponse = () => {
  const responses = [
    "I'm a simple chat bot. How can I assist you further?",
    "Thanks for your message! What else would you like to know?",
    "I can help you navigate our blog. Ask me anything!",
    "Interesting question! Let me think about that...",
    "Our blog has many great articles. Which topics interest you?"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

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
.chat-floating-container {
  position: absolute;
  top: 100px; /* Adjust based on your header height */
  right: 0;
  z-index: 1000;
  width: 300px;
}

.chat-controls {
  /*display: flex;
  flex-direction: column;
  align-items: flex-end; /* Aligns button and chat to the right 
  margin-top: 10px;*/
  position: fixed;
  right: 20;
  top: 80px; /* Position below title */
  float: right;

}

.chat-container {
  width: 300px;
  height: 400px;
  background-color: #343541;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 20px rgba(0,0,0,0.3);
   margin-top: 10px; /*Space between button and chat */
}

#chat {
  background-color: #343541;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#chat:hover {
  background-color: #40414F;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chat-button {
  padding: 10px 15px;
  background-color: #343541;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  /*margin-bottom: 10px;  Space between button and chat */
}

.chat-button:hover {
  background-color: #40414F;
}

/* Chat Container */
.chat-wrapper {
  top: 70px;  /* Positioned below the button */
  right: 20px;
  z-index: 999;
}

.chat-container {
  width: 300px;
  margin-left: auto;
  margin-bottom: 30px;
  background-color: #343541;
  border-radius: 8px;
  padding: 15px;
  color: white;
}

/* Messages Area */
.messages-area {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #343541;
}

.message {
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  max-width: 80%;
  word-wrap: break-word;
}

.user-message {
  background-color: #40414F;
  color: white;
  margin-left: auto;
}

.bot-message {
  background-color: #2E2F3A;
  color: white;
  margin-right: auto;
}

.cont {
  width: 300px;
  height: 320px;
  background-color: #343541;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.nav-bar {
  width: 100%;
  height: 40px;
  background-color: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-bar a {
  color: #6B6C7B;
  white-space: nowrap;
  margin-left: 10px;
  user-select: none;
}

.close {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.line {
  position: absolute;
  width: 20px;
  height: 3px;
  background-color: #6B6C7B;
  border-radius: 30px;
}

.line.one {
  transform: rotate(45deg)
}

.line.two {
  transform: rotate(135deg)
}

.messages-area {
  background-color: green;
  width: 100%;
  height: 210px;
}

.sender-area {
  background-color: #343541;
  width: 100%;
  height: 70px;
  display: flex;
  border-radius: 8px;
}

.message {
  width: 100%;
  height: 40px;
}

.message.one,
.message.three,
.message.five {
  background-color: #2E2F3A;
}

.message.two,
.message.four,
.message.six {
  background-color: #343541;
}

.send-img {
  width: 30px;
}

.send-input {
  outline: none;
  display: flex;
  border: none;
  background: none;
  height: 40px;
  width: 230px;
  border-radius: 7px;
  background: none;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 5px;
}

.send-input::placeholder {
  color: #828E9E;
}

.input-place {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  margin-left: 10px;
  align-items: center;
  background-color: #40414F;
  border-radius: 7px;
  height: 40px;
  width: 280px;
  gap: 5px;
  border: 1px solid #2E2F3A;
}

.send {
  width: 30px;
  height: 30px;
  background-color: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.send-icon {
  width: 17px;
}

.header-wrapper {
  text-align: center;
  margin-bottom: 20px;
  position: relative; /* Needed for absolute positioning of children */
}



#title {
  text-shadow: #e8cfa6 5px 3px 1px;
  font-family: 'Courier New', monospace;
  margin: 0 auto;
}

.blog-container {
  padding: 20px;
  width: 90%;
}

/* Grid View Styles */
.blog-grid {
  max-width: 90%;
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