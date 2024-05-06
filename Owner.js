
document.addEventListener('DOMContentLoaded', function () {
  const mealsData = JSON.parse(localStorage.getItem('meals'));

  if (mealsData && Array.isArray(mealsData)) {
    const cuisineContainer = document.getElementById('meals-content');

    mealsData.forEach(function (mealData) {
      const { mealName, description, mealImage,cal,price} = mealData;

      const mealElement = document.createElement('div');
      mealElement.classList.add('meal');
      cuisineContainer.appendChild(mealElement);

      const content = document.createElement('div');
      content.classList.add('content');
      mealElement.appendChild(content);

      const mealImageElement = document.createElement('img');
      mealImageElement.src = mealImage;
      mealImageElement.alt = 'Meal Image';
      content.appendChild(mealImageElement);

      const mealNameElement = document.createElement('h3');
      mealNameElement.textContent = mealName;
      content.appendChild(mealNameElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      content.appendChild(descriptionElement);
	  
    });

  }
});