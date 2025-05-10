<script>
import { reactive } from 'vue';
import productsJson from '@/assets/products.json';

const state = reactive({
  cartItems: [], // Reactive array to store cart items
  products: [],  // Reactive array to store products
});

// Initialize the cart and products
function init() {
  state.products = productsJson; // Load products from JSON
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    state.cartItems = JSON.parse(savedCart); // Load cart items from localStorage
  }
}

// Get cart items
function getCartItems() {
  return state.cartItems;
}

// Cart count computed property
function getCartCount() {
  return state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
}

// Add a product to the cart
function addToCart(product) {
  const existingItem = state.cartItems.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity++; // Increment quantity if product already exists
  } else {
    state.cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  updateLocalStorage(); // Save updated cart to localStorage
}

// Save cart to localStorage
function updateLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(state.cartItems));
}

// Empty the cart
function emptyCart() {
  localStorage.removeItem('cart');
  state.cartItems = [];
}

// Export functions and state for use in other files
export {
  state, // Export the reactive state
  init,
  getCartItems,
  getCartCount,
  addToCart,
  updateLocalStorage,
  emptyCart,
};
</script>

