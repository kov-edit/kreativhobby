<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="layout-container">
    <div class="text-content">
      <h2 style="text-align: center;">About Our Page</h2>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta doloremque reprehenderit delectus accusamus consequatur, enim voluptas voluptates cupiditate ipsum obcaecati animi omnis consectetur voluptatibus voluptatum? Molestiae illum sed repudiandae aspernatur? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam, nostrum eaque! Unde modi, ullam illo cupiditate recusandae amet commodi nisi voluptas repudiandae exercitationem sed quo neque dignissimos odit quasi et.</p>
    </div>
  <swiper
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    @autoplayTimeLeft="onAutoplayTimeLeft"
    :grabCursor="true"
    :effect="'creative'"
    :creativeEffect="{
      prev: {
        shadow: true,
        translate: ['-120%', 0, -500],
      },
      next: {
        shadow: true,
        translate: ['120%', 0, -500],
      },
    }"
    :modules="modules"
    class="mySwiper2"
  >
    <swiper-slide v-for="product in selectedProducts" :key="product.id" class="product-slide">
      <div class="slide-content">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image">
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">${{ product.price.toFixed(2) }}</p>  
        </div>
      </div>
  </swiper-slide>
    <template #container-end>
      <div class="autoplay-progress">
        <svg viewBox="0 0 48 48" ref="progressCircle">
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref="progressContent"></span>
      </div>
    </template>
  </swiper>
  </div>

  <section class="container-boxes">
    <div class="box">

      <div class="text">
        <router-link to="/tapestry">
          <h3>Tapestry</h3>
          <p>You can make your own patter and set it to your liking.</p>
        </router-link>
      </div>

    </div>

    <div class="box">

      <div class="text">
        <router-link to="/shop">
          <h3>The Yarn</h3>
          <p>We sell the best yarns available, you won't be disappointed.</p>
        </router-link>
      </div>

    </div>

    <div class="box">

      <div class="text">
        <router-link to="/blog">
          <h3>The Blog</h3>
          <p>Become a member of our blog and get the latest news and updates.</p>
        </router-link>
      </div>

    </div>
  </section>

  <!-- Contact Section -->
<section id="contact">
  <div class="wrapper">
    <div class="form-wrapper">    
      <h4>Add More Yarn To Your Email</h4>
      <form id="form" action="https://www.freecodecamp.com/email-submit">
        <input type="email" id="email" name="email" placeholder="Your email" required>
        <input type="submit" id="submit" value="OK" class="submit">
      </form>
    </div>
    <div class="contact-wrapper">
      <h4>Stay In Touch With Kreativ Hobby</h4>
      <ul class="social-menu">
        <li><a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a></li>
        <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
        <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
        <li><a href="#"><i class="fa fa-youtube-play" aria-hidden="true"></i></a></li>
      </ul>
      <div class="contact-links">
        <a class="contact-footer contact-tel" href="#"><i class="fa fa-phone" aria-hidden="true"></i>001-283-4892</a>
        <a class="contact-footer contact-email" href="#"><i class="fa fa-envelope-o" aria-hidden="true"></i>Send an email</a>
      </div>
    </div>
    
  </div>
</section>
</template>
<script>
  import { ref, onMounted } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import products from '@/assets/products.json'; // Adjust path to your JSON file

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/effect-creative';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  import { Autoplay, Pagination, Navigation, EffectCreative } from 'swiper/modules';
import router from '@/router';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const selectedProducts = ref([]);

    onMounted(() => {
      // Shuffle products and select first 5
      const shuffled = shuffleArray([...products]);
      selectedProducts.value = shuffled.slice(0, 5);
    });

    
      const progressCircle = ref(null);
      const progressContent = ref(null);
      const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.value.style.setProperty('--progress', 1 - progress);
        progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
      };
      return {
        onAutoplayTimeLeft,
        progressCircle,
        progressContent,
        modules: [Autoplay, Pagination, Navigation, EffectCreative],
      selectedProducts,
      };
    },
  };

  // Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

import { gsap } from 'gsap';

onMounted(() => {
  gsap.from('.layout-container', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
  });
  
  gsap.from('.box', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    delay: 0.5,
    ease: 'power3.out'
  });
});

</script>

<style scoped>
/* Add at the top of your style section */
:root {
  --primary-color: #8e6c88;  /* Elegant muted purple */
  --secondary-color: #d4b8c7; /* Light lavender */
  --accent-color: #e74c3c;   /* Keep your red accent */
  --text-color: #333;
  --light-bg: #f9f7fa;
  --white: #ffffff8f;
}

body {
  font-family: 'Raleway', sans-serif;
  color: var(--text-color);
  background-color: var(--light-bg);
  line-height: 1.6;
}



.container-boxes{
  margin: 0 auto;
  padding: 0;
  display:flex;
  justify-content: space-around;
  align-items: flex-end;
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 40px;
}

.box{
  background: rgb(214, 192, 192);
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 350px;
  max-height: 180px;
  min-height: 180px;
}

.box:hover{
  background: rgba(204, 194, 194, 0.7);
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.box a{
  text-decoration: none;
  color: black;
}

.text h3{
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: 0;
  text-align: center;
  color: var(--primary-color);
  font-weight: 500;
}

.text p{
  margin-top: 1rem;
  line-height: 1.3rem;
  text-align: justify;
}

.text{
  padding-left: 20px;
  padding-right: 20px;
}

/* Contact Section */
section#contact {
  background: var(--primary-color);
  color: white;
  padding: 60px 0;
  padding: 3em 2em;
  margin-top: 50px;
  border-top: 1px solid #eee;
}

.form-wrapper h4, .contact-wrapper h4 {
  font-weight: 300;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.wrapper {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background-color: rgb(236, 212, 212);
  border-radius: 8px;
  color: #000;
  text-align: center;
}

.form-wrapper, .contact-wrapper {
  padding: 20px;
}

.form-wrapper:after, .contact-wrapper:after {
  display: none; /* Remove the border lines */
}

.social-menu {
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;
  margin-bottom: 20px;
}

.social-menu li {
  margin: 0 15px;
}

.social-menu a {
  color: rgb(101, 89, 89);
  font-size: 24px;
  transition: all 0.3s ease;
}

.social-menu a:hover {
  color: var(--secondary-color);
  transform: scale(1.1);
}

.contact-footer {
  display: block;
  text-align: center;
  padding: 10px;
  margin: 5px 0;
  color: #333;
  text-decoration: none;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
}

/* Form styles */
form {
  display: flex;
  margin-top: 15px;
}

input[type="email"] {
  flex: 1;
  padding: 12px;
  background: rgba(59, 0, 0, 0.1);
  color: black;
  border: 1px solid rgba(255,255,255,0.3);
}

input[type="submit"] {
  padding: 12px 20px;
  background: rgb(124, 79, 79);
  color: rgb(0, 0, 0);
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

input[type="submit"]:hover {
  background: #ff5252;
}

/* Add hover effects to buttons */
.submit {
  transition: all 0.3s ease;
}

.submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .wrapper {
    grid-template-columns: 1fr;
  }
  
  .form-wrapper, .contact-wrapper {
    padding: 15px 0;
  }
}



.product-image-container {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  background: var(--secondary-color);
  padding: 20px;
  
}

.product-slide {
  background: var(--white) !important; /* Override the nth-child colors */
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 25px;
  box-sizing: border-box;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.product-slide:hover {
  transform: translateY(-5px);
}

.slide-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
   
}

.product-info {
  text-align: center;
  margin-top: auto;
  width: 100%;

}

.product-name {
  color: #333;
  font-size: 18px;
  margin-bottom: 8px;
}

.product-price {
  color: var(--accent-color);
  font-weight: 700;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

/* Remove all the nth-child background colors */
.swiper-slide:nth-child(1n),
.swiper-slide:nth-child(2n),
.swiper-slide:nth-child(3n),
.swiper-slide:nth-child(4n),
.swiper-slide:nth-child(5n),
.swiper-slide:nth-child(6n),
.swiper-slide:nth-child(7n),
.swiper-slide:nth-child(8n),
.swiper-slide:nth-child(9n),
.swiper-slide:nth-child(10n) {
  background-color: white !important;
}

.layout-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1300px;
  margin: 50px auto;
  padding: 40px;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(images/hatter4.webp) no-repeat;
  background-size: cover;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.text-content {
  padding: 30px;
  background: #f8f8f8cb;
  border-radius: 12px;
}

.text-content, .box {
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0);
  background-size: 20px 20px;
}

.mySwiper2 {
  width: 100%;
  height: 400px;
  margin: 0;
}

/* Navigation arrows color */
.swiper-button-next:after,
.swiper-button-prev:after {
  color: #ff0000; /* Your desired color */
  font-size: 24px !important;
}

/* Optional: Custom arrow positioning */
.swiper-button-next {
  right: 10px !important;
}
.swiper-button-prev {
  left: 10px !important;
}

/* For mobile responsiveness */
@media (max-width: 768px) {
  .layout-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .mySwiper2 {
    height: 300px;
    order: -1; /* Put swiper first on mobile */
  }
}

/* Custom navigation arrows */
.mySwiper2 .swiper-button-next,
.mySwiper2 .swiper-button-prev {
  color: #ff0000; /* Change to your desired color */
  padding: 20px;
}

/* Optional: Change progress circle color */
.mySwiper2 {
  --swiper-theme-color: #ff0000; /* Affects both arrows and progress */
}


.mySwiper2 .swiper-button-next { color: red; }
.mySwiper2 .swiper-button-prev { color: red; }
.mySwiper2 .autoplay-progress svg { stroke: blue; }

#app { height: 100% }
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

body {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

h2, h3, h4 {
  font-weight: 500;
  letter-spacing: 0.5px;
}

h2 {
  color: var(--primary-color);
  margin-bottom: 20px;
}

p {
  color: #666;
  font-weight: 300;
}

.swiper {
  margin: 100px auto;
  max-width: 500px;
  max-height: 5000px;
}

@media (max-width: 768px) {
  .product-image {
    height: 150px;
  }
  .product-name {
    font-size: 16px;
  }
  .product-price {
    font-size: 18px;
  }
}

/* Add smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Better spacing */
section {
  padding: 80px 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .layout-container {
    grid-template-columns: 1fr;
    padding: 30px;
  }
  
  .container-boxes {
    flex-direction: column;
    align-items: center;
  }
  
  .box {
    margin: 20px 0;
    max-width: 100%;
  }
}

/*.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}*/

</style>