    document.getElementById('evaluationForm').addEventListener('submit', function(event) {
        event.preventDefault();
//this is the code of last page
        var restaurantSelect = document.getElementById('restaurantSelect');
        var rating = document.querySelector('input[name="rating"]:checked');

        if (restaurantSelect.value && rating) {
            var restaurantName = restaurantSelect.options[restaurantSelect.selectedIndex].text;
            var userRating = rating.value;
            alert("Thank you for your feedback!\nYour rating for restaurant " + restaurantName + " is " + userRating);
            window.location.href = 'index.html';
        } else {
            alert("Please select a restaurant and provide a rating.");
        }
    });