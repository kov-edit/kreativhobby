// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/pages/index.vue'
import ShopPage from '@/pages/shop.vue'
import CartPage from '@/pages/cart.vue'
import CheckoutPage from '@/pages/checkout.vue'
import BlogPage from '@/pages/blog.vue'

const routes = [
  { path: '/', component: IndexPage },
  { path: '/products', component: ShopPage },
  { path: '/cart', component: CartPage },
  { path: '/checkout', component: CheckoutPage },
  { path: '/blog', component: BlogPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
