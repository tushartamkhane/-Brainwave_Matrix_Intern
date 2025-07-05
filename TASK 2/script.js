const products = [
  { id: 1, name: "Smartphone", category: "electronics", price: 69500, image: "images/phone.jpg" },
    
  { id: 2, name: "T-shirt", category: "clothing", price: 500, image: "images/tshirt.jpg" },
  { id: 3, name: "Book", category: "books", price: 300, image: "images/book.jpg" }

];

const productList = document.getElementById("product-list");
const searchBar = document.getElementById("searchBar");

function displayProducts(items) {
  productList.innerHTML = '';
  items.forEach(p => {
    const item = document.createElement('div');
    item.classList.add('product');
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="viewDetails(${p.id})">View</button>
    `;
    productList.appendChild(item);
  });
}

function filterProducts(category) {
  if (category === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

searchBar.addEventListener("input", () => {
  const value = searchBar.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(value));
  displayProducts(filtered);
});

function viewDetails(id) {
  const product = products.find(p => p.id === id);
  const modal = document.getElementById("product-modal");
  modal.classList.remove("hidden");
  modal.innerHTML = `
    <div style="background: white; padding: 2rem; border: 1px solid #ccc;">
      <h2>${product.name}</h2>
      <img src="${product.image}" style="max-width: 200px;" />
      <p>Price: ₹${product.price}</p>
      <p>Category: ${product.category}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button onclick="closeModal()">Close</button>
    </div>
  `;
}

function closeModal() {
  document.getElementById("product-modal").classList.add("hidden");
}

function addToCart(id) {
  alert("Product " + id + " added to cart!");
}
function showCart() {
  document.getElementById("cartPage").style.display = "block";
  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  let total = 0;

  const cartData = {};

  cart.forEach(id => {
    cartData[id] = (cartData[id] || 0) + 1;
  });

  Object.keys(cartData).forEach(id => {
    const product = products.find(p => p.id == id);
    const qty = cartData[id];
    const subtotal = product.price * qty;
    total += subtotal;

    container.innerHTML += `
      <div class="cart-item">
        <h4>${product.name}</h4>
        <p>₹${product.price} x ${qty} = ₹${subtotal}</p>
        <button onclick="changeQty(${id}, -1)">-</button>
        <button onclick="changeQty(${id}, 1)">+</button>
      </div>
    `;
  });

  document.getElementById("grandTotal").innerText = `Grand Total: ₹${total}`;
}

function changeQty(id, delta) {
  const index = cart.indexOf(id);
  if (delta === -1 && index > -1) {
    cart.splice(index, 1);
  } else if (delta === 1) {
    cart.push(id);
  }
  document.getElementById("cartCount").textContent = `🛒 Cart (${cart.length})`;
  renderCartItems();
}
const users = {};

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (users[user] && users[user] === pass) {
    document.getElementById("authStatus").innerText = `Welcome, ${user}`;
  } else {
    document.getElementById("authStatus").innerText = "Invalid credentials.";
  }
}

function register() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (!users[user]) {
    users[user] = pass;
    document.getElementById("authStatus").innerText = "Registered successfully. Please log in.";
  } else {
    document.getElementById("authStatus").innerText = "User already exists.";
  }
}
function checkout() {
  alert("Thank you for your purchase!");
  cart = [];
  document.getElementById("cartCount").textContent = `🛒 Cart (0)`;
  document.getElementById("cartItems").innerHTML = "";
  document.getElementById("grandTotal").innerText = "";
  document.getElementById("cartPage").style.display = "none";
}
