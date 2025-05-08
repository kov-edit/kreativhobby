<template>
    <div class="shop">
      <h2>🧩 Filter by Tags</h2>
      <div class="tag-filters">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="toggleTag(tag)"
          :class="{ active: selectedTags.includes(tag) }"
        >
          {{ tag }}
        </button>
      </div>
  
      <h2>🛍 Products</h2>
      <div class="products">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <img :src="product.image" :alt="product.name" width="150" />
          <h3>{{ product.name }}</h3>
          <p>Color: {{ product.color }}</p>
          <p>Price: ${{ product.price.toFixed(2) }}</p>
          <p class="tags">Tags: {{ product.tags.join(', ') }}</p>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
      </div>
  
      <h2>🛒 Shopping Cart</h2>
      <div class="cart">
        <div v-if="cart.length === 0">Cart is empty.</div>
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <span>{{ item.name }} ({{ item.quantity }}×) — ${{ (item.quantity * item.price).toFixed(2) }}</span>
          <button @click="removeFromCart(item.id)">Remove</button>
        </div>
  
        <div v-if="cart.length > 0" class="cart-summary">
          <p><strong>Total: ${{ total.toFixed(2) }}</strong></p>
          <button @click="checkout">Checkout</button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
import { ref, computed, onMounted } from 'vue'
import productsJson from '@/assets/products.json'

const products = ref([])
const cart = ref([])
const selectedTags = ref([])

onMounted(() => {
  products.value = productsJson

  const savedCart = localStorage.getItem('cart')
  if (savedCart) cart.value = JSON.parse(savedCart)
})

// 👉 Get all unique tags from all products
const allTags = computed(() => {
  const tagSet = new Set()
  products.value.forEach(p => p.tags?.forEach(tag => tagSet.add(tag)))
  return [...tagSet].sort()
})

// 👉 Filtered products based on selected tags
const filteredProducts = computed(() => {
  if (selectedTags.value.length === 0) return products.value
  return products.value.filter(p =>
    selectedTags.value.every(tag => p.tags.includes(tag))
  )
})

function toggleTag(tag) {
  const i = selectedTags.value.indexOf(tag)
  if (i === -1) selectedTags.value.push(tag)
  else selectedTags.value.splice(i, 1)
}

function addToCart(product) {
  const existing = cart.value.find(item => item.id === product.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
  saveCart()
}

function removeFromCart(productId) {
  cart.value = cart.value.filter(item => item.id !== productId)
  saveCart()
}

function checkout() {
  if (confirm('Are you sure you want to checkout?')) {
    cart.value = []
    localStorage.removeItem('cart')
    alert('Thank you for your purchase!')
  }
}

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}
</script>

  
  <style scoped>
  .shop {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  .products {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .product-card {
    border: 1px solid #ccc;
    padding: 10px;
    width: 200px;
    text-align: center;
  }
  .cart-item {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  .cart-summary {
    margin-top: 20px;
  }
  button {
    cursor: pointer;
  }

  .tag-filters {
  margin-bottom: 20px;
}
.tag-filters button {
  margin: 5px;
  padding: 5px 10px;
  border: 1px solid #888;
  background: white;
  cursor: pointer;
  border-radius: 5px;
}
.tag-filters button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}
.tags {
  font-size: 0.9em;
  color: #666;
}

  </style>
  