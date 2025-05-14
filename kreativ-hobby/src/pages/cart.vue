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
          <button @click="decreaseFromCart(item.id)" class="minus">-</button>
          {{ item.quantity }}
          <button @click="addToCart(item,1), console.log(item)" class="plus">+</button>
          </p>
          <p>Total: ${{ (item.price * item.quantity).toFixed(2) }}</p>
          <button @click="removeFromCart(item.id)" class="remove">Remove</button>
        </div>
      </div>
      </div>
      <div class="cart-summary">
      <p class="total-price">Total: ${{ cartTotal }}</p>
      <button @click="checkout" id="checkout">Checkout</button>
      <button @click="emptyCart(false)" id="emptyCart">Empty Cart</button>
      </div>
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
