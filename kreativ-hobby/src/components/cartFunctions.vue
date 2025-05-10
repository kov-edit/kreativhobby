<script>
import { reactive, computed } from 'vue';
import productsJson from '@/assets/products.json';


const state = reactive({
  cartItems: [], // Reactive array to store cart items
  products: [],  // Reactive array to store products
});

const total = computed(() => cartTotal());

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
      price: product.price || 0, // Default to 0 if price is missing
      image: product.image,
      quantity: 1,
    });
  }
  product.quantity--;
  updateLocalStorage(); // Save updated cart to localStorage
}

function decreaseFromCart(productId) {
  const existingItem = state.cartItems.find(item => item.id === productId);

  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity--; // Decrease quantity if it's greater than 1
      console.log('Decreased quantity:', existingItem.quantity);
    } else {
      // Remove the item if quantity reaches 0
      const index = state.cartItems.findIndex(item => item.id === productId);
      if (index !== -1) {
        state.cartItems = state.cartItems.filter(item => item.id !== productId);
      }
    }
  }
  const product = state.products.find(item => item.id === productId);
  if (product) {
    product.quantity++; // Increment product quantity in the shop
  }
  updateLocalStorage(); // Save updated cart to localStorage
}

// Save cart to localStorage
function updateLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(state.cartItems));
}

// Empty the cart
function emptyCart(bought) {
  if(!bought){
  state.cartItems.forEach(item => {
    const product = state.products.find(p => p.id === item.id);
    if (product) {
      console.log(`Restoring ${item.quantity} of ${product.name}`);
      product.quantity += item.quantity; // Add the cart item's quantity back to the product
    }
  })};

  console.log('Cart before clearing:', state.cartItems);
  state.cartItems = []; // Clear the cart
  console.log('Cart after clearing:', state.cartItems);

  localStorage.removeItem('cart'); // Remove cart from localStorage
}

function cartTotal() {
  return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}
// Export functions and state for use in other files
export {
  state, // Export the reactive state
  init,
  getCartItems,
  getCartCount,
  addToCart,
  decreaseFromCart,
  updateLocalStorage,
  emptyCart,
  cartTotal,
};
</script>

