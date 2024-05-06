    document.addEventListener("DOMContentLoaded", function() {
     
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("Retrieved cart data:", cart);

        const deliveryPrice = cart.length > 0 ? 10 : 0;

        function updateCartDisplay() {
            let subtotal = 0;
            const cartContent = document.querySelector(".meals-content");
            cartContent.innerHTML = ""; 

            cart.forEach((item, index) => {
                const mealItem = document.createElement("div");
                mealItem.classList.add("meal");
                mealItem.innerHTML = `
                      <img src="${item.imge}" width="120px" height="120px" alt="${item.name}">
                      <div class="name">
                          <h3>${item.name}</h3>
                          <p>${item.description}</p>
                      </div>
                      <div class="count">
                          <div class="meal-controls">
                              <button class="quantity-decrement" data-index="${index}">-</button>
                              <input type="number" value="${item.quantity}" min="1" style="width: 40px;">
                              <button class="quantity-increment" data-index="${index}">+</button>
                              <button class="delete-meal" data-index="${index}">Delete</button>
                              <span class="meal-price">${(parseFloat(item.price) * item.quantity).toFixed(2)} SAR</span>
                          </div>
                      </div>`;
                cartContent.appendChild(mealItem);
                subtotal += parseFloat(item.price) * item.quantity;
            });

            const subtotalElement = document.getElementById("Subtotal");
            const deliveryElement = document.getElementById("Delivery_price");
            const totalElement = document.getElementById("Total");

            subtotalElement.textContent = `${subtotal.toFixed(2)} SAR`;
            deliveryElement.textContent = `${deliveryPrice.toFixed(2)} SAR`;
            totalElement.textContent = `${(subtotal + deliveryPrice).toFixed(2)} SAR`;

            
            updateQuantityButtons();
            updateDeleteButtons();
        }

        function updateQuantityButtons() {
            document.querySelectorAll(".quantity-decrement").forEach(button => {
                button.removeEventListener("click", decrementQuantity);
                button.addEventListener("click", decrementQuantity);
            });

            document.querySelectorAll(".quantity-increment").forEach(button => {
                button.removeEventListener("click", incrementQuantity);
                button.addEventListener("click", incrementQuantity);
            });
        }

        function updateDeleteButtons() {
			
            document.querySelectorAll(".delete-meal").forEach(button => {
                button.removeEventListener("click", deleteMeal);
                button.addEventListener("click", deleteMeal);
            });
        }

        function decrementQuantity(event) {
            const index = event.target.dataset.index;
            const input = document.querySelector(`.meals-content .meal:nth-child(${parseInt(index) + 1}) input[type="number"]`);
            const quantity = parseInt(input.value);
            if (quantity > 1) {
                input.value = quantity - 1;
                updateCart(index, quantity - 1);
            }
        }

        function incrementQuantity(event) {
            const index = event.target.dataset.index;
            const input = document.querySelector(`.meals-content .meal:nth-child(${parseInt(index) + 1}) input[type="number"]`);
            const quantity = parseInt(input.value);
            input.value = quantity + 1;
            updateCart(index, quantity + 1);
        }

        function deleteMeal(event) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        }

        function updateCart(index, newQuantity) {
            cart[index].quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        }

        document.querySelector(".checkout-btn").addEventListener("click", () => {
            const total = parseFloat(document.getElementById("Total").textContent);
            alert(`Thank you for your order! Total cost: ${total.toFixed(2)} SAR`);
            localStorage.removeItem("cart"); // Clear cart data
            window.location.href = "restaurantEvaluation.html";
        });

        updateCartDisplay();
    });
	