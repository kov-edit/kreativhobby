<template>
  <header class="p-4 bg-gray-100">
    <nav class="flex gap-4">
      <router-link to="/" class="text-blue-600 hover:underline">Home</router-link>
      <router-link to="/blog" class="text-blue-600 hover:underline">Blog</router-link>
      <router-link to="/tapestry" class="text-blue-600 hover:underline">Tapestry</router-link>
      <router-link to="/shop" class="text-blue-600 hover:underline">Shop</router-link>
      <!-- Searchbar -->
      <router-link to="/cart" class="text-blue-600 hover:underline">Cart</router-link>
    </nav>
  </header>
  <router-view />
  <div class="footer">
    <p>&copy; 2023 Kreativ Hobby. All rights reserved.</p>
  </div>
</template>
