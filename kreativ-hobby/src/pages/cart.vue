<template>
  <div class="cart-page">
    <h2>Your Cart</h2>
    <div v-if="cartItems.length > 0">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="cart-item-image" />
        <div class="cart-item-info">
          <h3>{{ item.name }}</h3>
          <p>Price: ${{ item.price }}</p>
          <p>Quantity: {{ item.quantity }}
          <button @click="decreaseFromCart(item.id)">-</button>
          <button @click="addToCart(item)">+</button>
          </p>
          <p>Total: ${{ (item.price * item.quantity).toFixed(2) }}</p>
          <button @click="removeFromCart(item.id)">Remove</button>
        </div>
      </div>
      <p>Total: ${{ cartTotal }}</p>
      <button @click="checkout">Checkout</button>
      <button @click="emptyCart(false)">Empty Cart</button>
    </div>
    <p v-else>Your cart is currently empty. <br> Browse our shop to find amazing products and add them to your cart. <br> Once you've added items, they'll appear here for checkout!</p>
  </div>
</template>

<script setup>
import router from '@/router';
import { computed } from 'vue';
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

// Navigate to the checkout page
function checkout() {
  router.push('/checkout');
}
</script>

<style scoped>
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
  width: 80%; /* Adjust width for better alignment */
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
</style>
