<template>

  <div class="shop">
  <div class="h2s">
    <h2>Filter by Tags</h2>
    <h2 style="text-align: center;">Products</h2>
  </div>


  <div class="shop">
    
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
        id="clear-all"
      >
        Clear All
      </button>
    </div>

    
    <div class="products">
      
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
        @click="selectProduct(product)"
      >
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image" />
        </div>
        <div class="product-details">
          <h3>{{ product.name }}</h3>
          <p>Color: {{ product.color }}</p>
          <p id="price">Price: ${{ product.price.toFixed(2) }}</p>
          <p id="tags">Tags: {{ product.tags.join(', ') }}</p>
          <button @click="addToCart(product)" class="add-cart">Add to Cart</button>
        </div>
      </div>
    </div>

    <div v-if="selectedProduct" class="product-modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <div class="modal-image-container">
          <img :src="selectedProduct.image" :alt="selectedProduct.name" />
        </div>
        <div class="modal-details">
          <h2>{{ selectedProduct.name }}</h2>
          <p class="product-description">{{ selectedProduct.description }}</p>
          <div class="detail-row">
            <span class="detail-label">Color:</span>
            <span class="detail-value">{{ selectedProduct.color }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Price:</span>
            <span class="detail-value">${{ selectedProduct.price.toFixed(2) }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Available:</span>
            <span class="detail-value">{{ selectedProduct.quantity }} in stock</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Tags:</span>
            <span class="detail-value">{{ selectedProduct.tags.join(', ') }}</span>
          </div>
          <button 
            @click.stop="addToCart(selectedProduct)" 
            class="add-cart"
            :disabled="selectedProduct.quantity <= 0"
          >
            {{ selectedProduct.quantity > 0 ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import productsJson from '@/assets/products.json'

import { init, addToCart } from '@/components/cartFunctions.vue';

init();

const products = ref([])
const selectedTags = ref([])

// Add selectedProduct state
const selectedProduct = ref(null)

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

onMounted(init)

// Add these new functions
function selectProduct(product) {
  selectedProduct.value = product
}

function closeModal() {
  selectedProduct.value = null
}

</script>

<style scoped>
.shop {
  width: 90%;
  margin: auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 11fr;
  grid-gap: 50px;
}

.h2s {
  width: 85%;
  margin: auto;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 11fr;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.product-card {
  border: 1px solid #e0e0e0;
  background-color: #f9f9f9;
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
  /*display: flex;
  flex-wrap: wrap;*/
  padding: 10px;
  align-items: center;
  border: 0.5px solid #553939be;
  border-radius: 8px;
  background-color: rgb(242, 228, 195);
  
}

.tag-filters button {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 20px;
  font-size: 0.9em;
  transition: all 0.2s ease;
  margin-bottom: 20px;
}

.tag-filters button:hover {
  background: #f0f0f0;
}

.tag-filters button.active {
  background: #2c3e50;
  color: white;
  border-color: #2c3e50;
}

#clear-all {
  background-color: #e3747e;
  color: #56070f;
  border: 1px solid #f5c6cb;
  /*margin-left: 10px;*/
}

#clear-all:hover {
  background: #f1b0b7;
}

#tags {
  font-size: 11pt;
  color: #666;
  margin-top: auto;
}

#price {
  font-size: 16pt;
}

.add-cart {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 20px;
  font-size: 0.9em;
  transition: all 0.2s ease;
  margin-top: 10px;
}

.add-cart:hover {
  background: #99642b;
  color: white;
  border-color: #8a4508;
}

/* Add these new styles for the modal */
.product-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 28px;
  cursor: pointer;
  color: #333;
}

.close-button:hover {
  color: #000;
}

.modal-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.modal-image-container img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.modal-details {
  display: flex;
  flex-direction: column;
}

.modal-details h2 {
  margin-top: 0;
  color: #2c3e50;
}

.modal-details p {
  margin: 8px 0;
  font-size: 1.1em;
}

/* Make product cards clickable */
.product-card {
  cursor: pointer;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .modal-content {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  
  .modal-image-container {
    height: auto;
    margin-bottom: 20px;
  }
}

.product-description {
  font-size: 1em;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #555;
}

.detail-row {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.detail-label {
  font-weight: bold;
  min-width: 100px;
  color: #333;
}

.detail-value {
  color: #666;
}

/* Style for disabled button */
.add-cart:disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
  border-color: #cccccc;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .modal-details {
    padding: 0 10px;
  }
  
  .detail-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .detail-label {
    margin-bottom: 2px;
  }
}
</style>