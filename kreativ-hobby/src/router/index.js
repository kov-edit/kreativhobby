// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/pages/index.vue'
import ShopPage from '@/pages/shop.vue'
import CartPage from '@/pages/cart.vue'
import CheckoutPage from '@/pages/checkout.vue'
import BlogPage from '@/pages/blog.vue'
import TapestryPage from '@/pages/tapestry.vue'

const routes = [
  { path: '/', component: IndexPage },
  { path: '/shop', component: ShopPage },
  { path: '/cart', component: CartPage },
  { path: '/checkout', component: CheckoutPage },
  { path: '/blog', component: BlogPage },
  { path: '/tapestry', component: TapestryPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
