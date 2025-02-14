  const products = [
            { id: 1, name: "Stake", price: 10.99, img:"assets/p1.jpeg" },
            { id: 2, name: "Meals", price: 15.99, img: "assets/p2.jpeg" },
            { id: 3, name: "Briyani", price: 20.99, img: "assets/p3.jpeg" },
            { id: 4, name: "Dosa", price: 25.99, img: "assets/p4.jpeg" },
            { id: 5, name: "Panner Masala", price: 30.99, img: "assets/p5.jpeg" },
            { id: 6, name: "Idly", price: 35.99, img: "assets/p6.jpeg" },
            { id: 7, name: "Roti", price: 40.99, img: "assets/p7.jpeg" },
            { id: 8, name: "porata", price: 45.99, img: "assets/p8.jpg" },
            { id: 9, name: "Ice Cream", price: 50.99, img: "assets/p9.jpeg" },
            { id: 10, name: "Cow Milk", price: 55.99, img: "assets/p10.jpeg" },
            { id: 11, name: "Beer", price: 60.99, img: "assets/p11.jpeg" },
            { id: 12, name: "Kingfisher Beer", price: 65.99, img: "assets/p12.jpeg" }
        ];
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        function renderProducts() {
            const productContainer = document.getElementById("products");
            productContainer.innerHTML = "";
            products.forEach(product => {
                productContainer.innerHTML += `
                    <div class="product">
                        <img src="${product.img}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>INR ${product.price.toFixed(2)}</p>
                        <button onclick="addToCart(${product.id})" id="b1">Add to Cart</button>
                    </div>
                `;
            });
        }
        
        function addToCart(id) {
            const product = products.find(p => p.id === id);
            const item = cart.find(p => p.id === id);
            if (item) {
                item.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
            toggleCart();
        }
        
        function updateCart() {
            localStorage.setItem("cart", JSON.stringify(cart));
            document.getElementById("cart-items").innerHTML = cart.map(item => `
                <div>
                    <h4>${item.name}</h4>
                    <p>INR ${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `).join(" ");
            document.getElementById("cart-total").textContent = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
            document.getElementById("cart-count").textContent = cart.reduce((count, item) => count + item.quantity, 0);
        }
        function removeFromCart(id) {
            const index = cart.findIndex(item => item.id === id);
            if (index !== -1) {
                cart.splice(index, 1);
                updateCart();
            }
        }
        
        function increaseQuantity(id) {
            const item = cart.find(p => p.id === id);
            if (item) {
                item.quantity += 1;
                updateCart();
            }
        }
        
        function decreaseQuantity(id) {
            const item = cart.find(p => p.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                removeFromCart(id);
            }
            updateCart();
        }
        function toggleCart() {
            const cartElement = document.getElementById("cart");
            cartElement.style.display = cartElement.style.display === "none" || cartElement.style.display === "" ? "block" : "none";
        }
        
        function closeCart() {
            document.getElementById("cart").style.display = "none";
        }
        function clearCart() {
            cart.length = 0;
            updateCart();
        }
        
        renderProducts();
        updateCart();