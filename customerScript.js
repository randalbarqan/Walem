function showRestaurantInfo(restaurant) {
    const restaurantName = restaurant.querySelector('h3').innerText;
    const restaurantRating = restaurant.querySelector('.rating_text').innerText;
    const restaurantCuisine = restaurant.querySelector('p').innerText;
    const imagePath = restaurant.querySelector('img').getAttribute('src');
    const infoHTML = `
        <div class="restaurant-info">
            <img src="${imagePath}" alt="${restaurantName} Icon">
            <p>Rating: ${restaurantRating}</p>
            <p>Cuisine: ${restaurantCuisine}</p>
        </div>
    `;

    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = infoHTML;

    restaurant.appendChild(infoDiv);
		 restaurant.querySelector('p').style.display = 'block';

	 restaurant.querySelector('img').style.display = 'block';
}

function hideRestaurantInfo(restaurant) {
    const infoDiv = restaurant.querySelector('.restaurant-info');
     restaurant.querySelector('img').style.display = 'none';
	      restaurant.querySelector('p').style.display = 'none';

    infoDiv.remove();
}
