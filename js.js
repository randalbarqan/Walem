document.addEventListener("DOMContentLoaded", function() {
    // Get reference to elements
    const sortBySelect = document.getElementById("sort-by");
    const mealCheckboxes = document.querySelectorAll(".myCheckbox");
    const addToCartButtons = document.querySelectorAll(".delete-meal");
    const cartButton = document.getElementById("cart");

    //this is the code of 

    // Sort meals function
    const sortMeals = () => {
        const categoryContainers = document.querySelectorAll(".category");

        categoryContainers.forEach((container1) => {
            const style = Array.from(container1.querySelectorAll(".style"));
            style.forEach((container) => {
                const meals = Array.from(container.querySelectorAll(".meals"));
                meals.sort((a, b) => {
                    const aName = a.querySelector("h3").textContent;
                    const bName = b.querySelector("h3").textContent;

                    const aPrice = parseFloat(a.querySelector(".price").textContent);
                    const bPrice = parseFloat(b.querySelector(".price").textContent);

                    const selectedSortOption = sortBySelect.value;

                    if (selectedSortOption === "Low to High") {
                        return aPrice - bPrice;
                    } else if (selectedSortOption === "High to Low") {
                        return bPrice - aPrice;
                    } else if (selectedSortOption === "A-Z") {
                        return aName.localeCompare(bName);
                    } else if (selectedSortOption === "Z-A") {
                        return bName.localeCompare(aName);
                    }
                });

                // Clear container before appending sorted meals
                container.innerHTML = "";

                meals.forEach((meal) => container.appendChild(meal));
            });
        });
    };


    // Event listeners
    sortBySelect.addEventListener("change", sortMeals);

    mealCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const isChecked = checkbox.checked;
            const countInput = checkbox.parentElement.querySelector("input[type='number']");
            countInput.disabled = !isChecked;
        });
    });

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const meal = button.closest(".meals");
            const name = meal.querySelector("h3").textContent;
            const price = meal.querySelector(".pricee").textContent;
            const quantity = parseInt(meal.querySelector("input[type='number']").value);
            const imge = meal.querySelector("img").getAttribute("src");
            const description = meal.querySelector(".description").textContent;
            // Retrieve existing cart data from local storage or initialize empty array

            // Check if quantity is valid
            if (isNaN(quantity) || quantity <= 0) {
                console.error("Invalid quantity:", quantity);
                return;
            }
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Add new item to cart
            cart.push({ name, price, quantity, imge, description });

            // Store updated cart data in local storage
            localStorage.setItem("cart", JSON.stringify(cart));



            // Alert message
            alert(`"${name}" added to cart`);
        });
    });


    //_________________________________
    const quantityDecrementButtons = document.querySelectorAll(".quantity-decrement");
    const quantityIncrementButtons = document.querySelectorAll(".quantity-increment");

    // Event listener for quantity decrement buttons
    quantityDecrementButtons.forEach(button => {
        button.addEventListener("click", function() {
            const input = button.parentElement.querySelector("input[type='number']");
            let currentValue = parseInt(input.value);
            if (currentValue > 1) {
                input.value = currentValue - 1;
            }
        });
    });

    // Event listener for quantity increment buttons
    quantityIncrementButtons.forEach(button => {
        button.addEventListener("click", function() {
            const input = button.parentElement.querySelector("input[type='number']");
            let currentValue = parseInt(input.value);
            input.value = currentValue + 1;
        });
    });

    // Initialize meals sorting
    sortMeals();
});