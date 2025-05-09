<template>
  <div class="cart-counter" @click="viewCart">
    🛒 {{ cartCount }}
  </div>

  <div class="shop">
    <h2>Filter by Tags</h2>
    <div class="tag-filters">
      <button
        v-for="tag in allTags"
        :key="tag"
        @click="toggleTag(tag)"
        :class="{ active: selectedTags.includes(tag) }"
      >
        {{ tag }}
      </button>
      <button 
        v-if="selectedTags.length > 0" 
        @click="clearAllTags"
        class="clear-all"
      >
        Clear All
      </button>
    </div>

    <h2>Products</h2>
    <div class="products">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
      >
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image" />
        </div>
        <div class="product-details">
          <h3>{{ product.name }}</h3>
          <p>Color: {{ product.color }}</p>
          <p>Price: ${{ product.price.toFixed(2) }}</p>
          <p class="tags">Tags: {{ product.tags.join(', ') }}</p>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import productsJson from '@/assets/products.json'
import router from '@/router'

const products = ref([])
const selectedTags = ref([])

onMounted(() => {
  products.value = productsJson
})

const allTags = computed(() => {
  const tagSet = new Set()
  products.value.forEach((p) => {
    p.tags.forEach((tag) => tagSet.add(tag))
  })
  return [...tagSet].sort()
})

const filteredProducts = computed(() => {
  if (selectedTags.value.length === 0) return products.value
  
  // Show products that include ALL selected tags
  return products.value.filter(product => 
    selectedTags.value.every(tag => 
      product.tags.includes(tag))
  )
})

function toggleTag(tag) {
  const i = selectedTags.value.indexOf(tag)
  if (i === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(i, 1)
  }
}

function clearAllTags() {
  selectedTags.value = []
}

const cartItems = ref([])

// Load cart from localStorage on component mount
onMounted(() => {
  products.value = productsJson
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart)
  }
})

// Cart count computed property
const cartCount = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.quantity, 0)
})

// Modified addToCart function
function addToCart(product) {
  const existingItem = cartItems.value.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity++
  } else {
    cartItems.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  }
  
  updateLocalStorage()
}

// Save to localStorage
function updateLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

// View cart placeholder
function viewCart() {
  router.push('/cart')
}

</script>

<style scoped>
.shop {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.product-image-container {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  padding: 10px;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-details {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-details h3 {
  margin: 0 0 10px 0;
  font-size: 1.1em;
}

.product-details p {
  margin: 5px 0;
  font-size: 0.9em;
}

.tag-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
  align-items: center;
}

.tag-filters button {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 20px;
  font-size: 0.9em;
  transition: all 0.2s ease;
}

.tag-filters button:hover {
  background: #f0f0f0;
}

.tag-filters button.active {
  background: #2c3e50;
  color: white;
  border-color: #2c3e50;
}

.clear-all {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  margin-left: 10px;
}

.clear-all:hover {
  background: #f1b0b7;
}

.tags {
  font-size: 0.85em;
  color: #666;
  margin-top: auto;
}
</style>