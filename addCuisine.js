
let meals = [];

const form = document.querySelector('#F');
form.addEventListener('submit', (e) => {
  e.preventDefault(); 
});

function storeCuisineData() {
  const mealName = document.getElementById('meal-name').value;
  const cal = document.getElementById('cal').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;

  
  if (!mealName || !cal || !description || !price) {
    alert('Please fill in all fields');
    return;
  }

  if (/^\d/.test(mealName)) {
    alert('Meal name cannot start with a number');
    return;
  }

  if (isNaN(cal)) {
    alert('Calories should be a number');
    return;
  }

  if (isNaN(price)) {
    alert('Price should be a number');
    return;
  }

  if (typeof description !== 'string') {
    alert('Description should be a string');
    return;
  }

  const mealImageInput = document.getElementById('meal-image');
  const mealImageFile = mealImageInput.files[0];

  // Check if a file is selected
  if (!mealImageFile) {
    alert('Please select a meal image');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const mealImage = event.target.result;

    const cuisineData = {
      mealName: mealName,
      cal: cal,
      description: description,
      price: price,
      mealImage: mealImage,
    };

    meals.push(cuisineData);

    localStorage.setItem('meals', JSON.stringify(meals));

    form.reset();

    window.location.href = 'Owner.html';
  };
  reader.readAsDataURL(mealImageFile);
}

document.addEventListener('DOMContentLoaded', function () {
  meals = JSON.parse(localStorage.getItem('meals')) || [];
});