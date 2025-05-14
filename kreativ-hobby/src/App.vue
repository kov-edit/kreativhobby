<template>

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/public/favicon.ico">
    <link ref="icon" sizes="192x192" type="image/png" href="/public/images/android-chrome-192x192.png">

    <title>Kreativ Hobby</title>
  </head>
  <header class="p-4 bg-gray-100 nav-shadow">
    <nav class="navbar">
        <CartButton/>
        <router-link to="/shop" class="text-blue-600 hover:underline">Shop</router-link>
        <router-link to="/tapestry" class="text-blue-600 hover:underline">Tapestry</router-link>
        <router-link to="/blog" class="text-blue-600 hover:underline">Blog</router-link>
        <router-link to="/" class="text-blue-600 hover:underline">Home</router-link>
    </nav>
  </header>
  <router-view class="main-content page-container"  />
  <div>
    <button 
    v-if="showButton"
    class="button1"
    :class="{ show: showButton }"
    @click="scrollToTop">
     <svg class="svgIcon1" viewBox="0 0 384 512">
       <path
        d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
        ></path>
      </svg>
    </button>
  </div>
  <div class="footer">
    <p>&copy; 2023 Kreativ Hobby. All rights reserved.</p>
  </div>    
</template>

<style scoped>
  .nav-shadow {
  box-shadow: 0 2px 8px -1px rgba(0, 0, 0, 0.1);
  }

  .button1 {
    float: right;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0px 4px rgba(255, 160, 204, 0.253);
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    position:fixed;
    bottom: 20px;
    right: 20px;
  }

  .svgIcon1 {
    width: 12px;
    transition-duration: 0.3s;
  }

  .svgIcon1 path {
    fill: white;
  }

  .button1:hover {
    width: 140px;
    border-radius: 50px;
    transition-duration: 0.3s;
    background-color: rgb(180, 100, 115);
    align-items: center;
  }

  .button1:hover .svgIcon1 {
    /* width: 20px; */
    transition-duration: 0.3s;
    transform: translateY(-200%);
  }

  .button1::before {
    position: absolute;
    bottom: -20px;
    content: "Back to Top";
    color: white;
    /* transition-duration: .3s; */
    font-size: 0px;
  }

  .button1:hover::before {
    font-size: 13px;
    opacity: 1;
    bottom: unset;
    /* transform: translateY(-30px); */
    transition-duration: 0.3s;
  }
</style>
<script setup>
import CartButton from '@/components/CartButton.vue'
import { ref, onMounted, onUnmounted } from 'vue';
import { getCartCount } from '@/components/cartFunctions.vue';
const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 200; // Show button after scrolling 300px
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>