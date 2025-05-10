<template>
  <router-link to="/cart" class="cart-button">
    🛒
    <span v-if="cartCount > 0">{{ cartCount }}</span>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { state } from '@/components/cartFunctions.vue';

// Compute the cart count dynamically
const cartCount = computed(() => state.cartItems.reduce((acc, item) => acc + item.quantity, 0));
</script>

<style scoped>
.cart-button {
  position: relative;
}
.cart-button span {
  position: absolute;
  top: -10px;
  right: -10px;
  background: red;
  color: white;
  font-size: 12px;
  padding: 1px 4px;
  border-radius: 50%;
}
</style>

