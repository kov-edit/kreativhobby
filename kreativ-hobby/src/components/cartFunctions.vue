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
function addToCart(product,SelectedQuantity) {
  const existingItem = state.cartItems.find(item => item.id === product.id);
  const productItem = state.products.find(item => item.id === product.id);
  if (existingItem) {
    if(productItem.quantity - SelectedQuantity >0 && productItem.quantity>0){
      existingItem.quantity+=SelectedQuantity;
      productItem.quantity-= SelectedQuantity;
    }
    else if(productItem.quantity - SelectedQuantity<=0 && productItem.quantity>0){
      existingItem.quantity+=productItem.quantity;
      productItem.quantity-= product.quantity;
    }
  } else {
    state.cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price || 0, // Default to 0 if price is missing
      image: product.image,
      quantity: SelectedQuantity,
    });
    if(productItem.quantity>0){productItem.quantity-= SelectedQuantity;}
    
  };
  
  updateLocalStorage(); // Save updated cart to localStorage
}

function decreaseFromCart(productId) {
  const existingItem = state.cartItems.find(item => item.id === productId);

  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity--; // Decrease quantity if it's greater than 1
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

function updateCartItemQuantity(productId, newQuantity) {
  const existingItem = state.cartItems.find(item => item.id === productId);
  const product = state.products.find(item => item.id === productId);

  if (!existingItem || !product) {
    console.error("Item or product not found.");
    return;
  }

  // Validate new quantity
  if (newQuantity < 1) {
    // Remove the item if quantity is less than 1
    state.cartItems = state.cartItems.filter(item => item.id !== productId);
    product.quantity += existingItem.quantity; // Restore the stock
  } else {
    const quantityDifference = newQuantity - existingItem.quantity;

    if (quantityDifference > 0) {
      // Decrease stock if the new quantity is higher
      if (product.quantity >= quantityDifference) {
        product.quantity -= quantityDifference;
        existingItem.quantity = newQuantity;
      } else {
        console.error("Not enough stock available.");
      }
    } else if (quantityDifference < 0) {
      // Increase stock if the new quantity is lower
      product.quantity += Math.abs(quantityDifference);
      existingItem.quantity = newQuantity;
    }
  }

  updateLocalStorage(); // Save updated cart to localStorage
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
  updateCartItemQuantity,
};
</script>

