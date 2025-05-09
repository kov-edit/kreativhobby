<!--<script setup>
import { useCartStore } from '@/pages/cart.vue'

const cartStore = useCartStore()

// src/composables/useCart.js
import { ref, computed } from 'vue'

export function useCart() {
  const cartItems = ref(JSON.parse(localStorage.getItem('cart')) || [])

  const cartItemCount = computed(() => 
    cartItems.value.reduce((acc, item) => acc + item.quantity, 0)
  )

  const cartTotal = computed(() =>
    cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  )

  function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  function addToCart(product) {
    const existing = cartItems.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
    saveToLocalStorage()
  }

  function removeFromCart(productId) {
    cartItems.value = cartItems.value.filter(item => item.id !== productId)
    saveToLocalStorage()
  }

  return {
    cartItems,
    cartItemCount,
    cartTotal,
    addToCart,
    removeFromCart
  }
}
</script>
-->
<template>

</template>