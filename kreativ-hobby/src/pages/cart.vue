<template>
  <div class="cart-page">
    <h2>Your Cart</h2>
    <div v-if="cartItems.length > 0" class="cart-container">
      <div class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="cart-item-image" />
        <div class="cart-item-info">
          <h3>{{ item.name }}</h3>
          <p>Price: ${{ item.price }}</p>
          <p>Quantity: 
            <button
              class="button2"
              id="jobb"
              @click="decreaseFromCart(item.id)"
              :disabled="item.quantity <= 1"
            >-</button>
            <input 
              type="number"
              :min="1"
              :max="item.quantity"
              class="number"
              v-model.number="item.quantity"
              @input="updateQuantity(item.id, $event.target.value)"
            >
            <button
              class="button2"
              id="bal"
              @click="addToCart(item, 1)"
              :disabled="productStock(item.id) <= 1"
            >+</button>
          </p>
          <p>Total: ${{ (item.price * item.quantity).toFixed(2) }}</p>
          <button @click="removeFromCart(item.id)" class="remove">Remove</button>
        </div>
      </div>
      </div>
      <div class="cart-summary">
    <div class="cart-summary">
      <h2>Cart Summary</h2>
      <p class="total-price">Items: {{ cartItems.reduce((total, item) => total + item.quantity, 0) }}</p>
      <p class="total-price">Total: ${{ cartTotal }}</p>

      <!-- Delivery Information Form -->
      <div class="delivery-form">
        <h3>Delivery Information</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="fullName">Full Name:</label>
            <input 
              type="text" 
              id="fullName" 
              v-model="deliveryDetails.fullName" 
              required
            >
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              v-model="deliveryDetails.email" 
              required
            >
          </div>

          <div class="form-group">
            <label for="address">Street Address:</label>
            <input 
              type="text" 
              id="address" 
              v-model="deliveryDetails.address" 
              required
            >
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="city">City:</label>
              <input 
                type="text" 
                id="city" 
                v-model="deliveryDetails.city" 
                required
              >
            </div>

            <div class="form-group">
              <label for="zipCode">ZIP Code:</label>
              <input 
                type="text" 
                id="zipCode" 
                v-model="deliveryDetails.zipCode" 
                required
                pattern="\d{4,5}"
              >
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Phone Number:</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="deliveryDetails.phone" 
              required
              pattern="[0-9]{9,11}"
            >
          </div>
        </form>
      </div>

      <button @click="checkout" id="checkout">Checkout</button>
      <button @click="emptyCart(false)" id="emptyCart">Empty Cart</button>
    </div>
  </div>
    </div>
    <p v-else>Your cart is currently empty. <br> Browse our shop to find amazing products and add them to your cart. <br> Once you've added items, they'll appear here for checkout!</p>
  </div>
</template>

<script setup>
import router from '@/router';
import { computed } from 'vue';
import { ref } from 'vue';
import { state, emptyCart,addToCart, decreaseFromCart } from '@/components/cartFunctions.vue';

// Reactive cart items from the state
const cartItems = computed(() => state.cartItems);

// Calculate the total price of the cart
const cartTotal = computed(() =>
  state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
);



// Remove an item from the cart
function removeFromCart(itemId) {
  const index = state.cartItems.findIndex(item => item.id === itemId);
  const product = state.products.find(item => item.id === itemId);
  if (product) {
    product.quantity+=state.cartItems.find(item => item.id === itemId).quantity; // Increment product quantity in the shop
  }
  if (index !== -1) {
    state.cartItems.splice(index, 1); // Remove the item from the cart
    localStorage.setItem('cart', JSON.stringify(state.cartItems)); // Update localStorage
  }

}

function updateQuantity(itemId, value) {
  const item = state.cartItems.find(i => i.id === itemId);
  const product = state.products.find(p => p.id === itemId);
  if (item) {
    item.quantity = Math.max(1, Math.min(Number(value), product.quantity + item.quantity));
    state.cartItems = [...state.cartItems];
  }
}

function productStock(itemId) {
  const product = state.products.find(p => p.id === itemId);
  return product ? product.quantity : 0;
}
///
const deliveryDetails = ref({
  fullName: '',
  email: '',
  address: '',
  city: '',
  zipCode: '',
  phone: ''
});

function handleSubmit() {
  if (!validateForm()) {
    alert('Please fill out all required fields correctly');
    return;
  }
  // Proceed with checkout
  checkout();
}

function validateForm() {
  return Object.values(deliveryDetails.value).every(field => field.trim() !== '');
}

// Update checkout function
function checkout() {
  if (!validateForm()) return;
  router.push('/checkout');
  // You might want to pass deliveryDetails to a store or backend
}




</script>

<style scoped>

.delivery-form {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.delivery-form h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .cart-container {
    flex-direction: column;
    gap: 30px;
  }
  
  .cart-summary {
    position: static;
  }
}

/* Add/update these styles */
.button2 {
  padding: 5px 12px;
  background-color: #ffffff;
  border: 1px solid #575656;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button2:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f0f0f0;
}

.button2:active:not(:disabled) {
  transform: scale(0.95);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #d0d0d0;
  transition: all 0.1s ease;
}

.number {
  -moz-appearance: textfield;
  -webkit-appearance: none;
  appearance: none;
  width: 60px;
  text-align: center;
  margin: 0 5px;
  padding: 5px;
  border: 1px solid #000000;
  border-radius: 4px;
}

.number::-webkit-inner-spin-button,
.number::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#bal {
  border-radius: 0px 10px 10px 0px;
}

#jobb {
  border-radius: 10px 0px 0px 10px;
  padding: 5px 14px;
  font-weight: 700;
}

/* Update existing button styles to match */
.remove, #checkout, #emptyCart {
  border-radius: 20px;
  transition: all 0.2s ease;
}

.remove:hover, #checkout:hover, #emptyCart:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}


.cart-page {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  justify-content: center; /* Center content vertically */
  text-align: center; /* Center text */
  padding: 20px;
}

.cart-item {
  display: flex;
  align-items: center; /* Center items vertically */
  justify-content: center; /* Center items horizontally */
  margin-bottom: 20px;
  width: 90%; /* Adjust width for better alignment */
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #f6f6f6;
}

.cart-item-image {
  width: 100px;
  margin-right: 20px;
}

.cart-item-info {
  flex: 1;
  text-align: left; /* Align text to the left inside the item */
}

button {
  margin-top: 10px;
}

.cart-page h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.cart-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-page h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-left: 30px;
}

.cart-container {
  display: flex;
  gap: 180px;
}

.cart-items {
  flex: 2;
}

.cart-summary {
  flex: 1;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 20px;
  background-color: #f6f6f6;
  text-align: center;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.cart-item-image {
  width: 100px;
  margin-right: 20px;
}

.cart-item-info {
  flex: 1;
  text-align: left;
}

.plus, .minus {
  cursor: pointer;
  background-color: #656565;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
}

.remove {
  cursor: pointer;
  background-color: #5f3535;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 18px;
}

.total-price {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

#checkout {
  background-color: #439a57;
  margin-right: 10px;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 18px;
}

#checkout:hover {
  background-color: #218838;
}

#emptyCart {
  background-color: #c24653;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 18px;
}

#emptyCart:hover {
  background-color: #c82333;
}
</style>
