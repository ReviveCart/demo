document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/products")
        .then(response => response.json())
        .then(products => {
            const productList = document.querySelector(".product-list");
            if (productList) {
                productList.innerHTML = "";

                products.forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");

                    productCard.innerHTML = `
                        <img src="/images/${product.name.toLowerCase()}.jpg" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Expiry: ${product.expiryDate}</p>
                        <p>Price: ₹${product.price}</p>
                        <p class="discount">Discount: ${product.discount}%</p>
                        <p>Final Price: <b>₹${product.discountedPrice}</b></p>
                        <button onclick="addToCart('${product.name}', ${product.discountedPrice})">Add to Cart</button>
                    `;

                    productList.appendChild(productCard);
                });
            }
        })
        .catch(error => console.error("Error fetching products:", error));
});

// Cart Functionality
let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("open");
}

function closeCart() {
    document.getElementById("cartSidebar").classList.remove("open");
}

function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    const totalAmount = document.getElementById("totalAmount");
    
    if (!cartItems || !totalAmount) return; // Prevent errors if elements are missing

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    totalAmount.textContent = `Total: ₹${total}`;
}

// Function for Buy Now button
function buyNow() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Proceeding to checkout...");
    cart = []; // Clear cart after purchase
    updateCartUI(); // Update UI
}

// Settings Functionality
const settingsButton = document.getElementById("settingsButton");
const settingsDropdown = document.getElementById("settingsDropdown");

if (settingsButton && settingsDropdown) {
    settingsButton.addEventListener("click", (event) => {
        event.stopPropagation();
        settingsDropdown.classList.toggle("show");
    });

    document.addEventListener("click", (event) => {
        if (!settingsButton.contains(event.target) && !settingsDropdown.contains(event.target)) {
            settingsDropdown.classList.remove("show");
        }
    });
}

// Navigation Functions
function goHome() {
    window.location.href = "index.html";
}

function goToShop() {
    window.location.href = "shop.html";
}

function goToSellerPage() {
    window.location.href = "seller.html";
}

function showContactDetails() {
    alert("Contact: support@revivecart.com\nPhone: +91 98765 43210");
}
