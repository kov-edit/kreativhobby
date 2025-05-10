<template>
  <div class="cart-page">
    <div v-for="item in cartItems" :key="item.id">
      <img :src="item.image" :alt="item.name" class="cart-item-image" />
      <h3>{{ item.name }}</h3>
      <p>Price: ${{ item.price }}</p>
      <p>Quantity: {{ item.quantity }}</p>
      <p>Total: ${{ (item.price * item.quantity).toFixed(2) }}</p>
      <button @click="removeFromCart(item.id)">Remove</button>
    </div>
    <p>Total: ${{ cartTotal }}</p>
    <button @click="checkout">Checkout</button>
    <button @click="emptyCart">Empty Cart</button>
  </div>
</template>

<script setup>
import router from '@/router';
import { emptyCart } from '@/components/cartFunctions.vue';
function checkout(){
  router.push('/checkout');
}
</script>