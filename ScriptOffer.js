
let offers = [];

document.addEventListener('DOMContentLoaded', function() {
    function renderOffers() {
    const offersList = document.getElementById('offers-list');
    offersList.innerHTML = ''; 

    offers.forEach(offer => {
    const listItem = document.createElement('li');
    listItem.classList.add('offer-item'); 
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'offer-' + offer.id;     
    checkbox.name = 'offer';
    checkbox.value = offer.id;
	checkbox.classList.add('item'); 


    const label = document.createElement('label');
    label.htmlFor = 'offer-' + offer.id;

    const img = document.createElement('img');
    img.src = offer.image;
    img.alt = offer.title;
    img.classList.add('offer-image1'); 


const div1 = document.createElement('div');
div1.classList.add('textcontainer');


const title = document.createElement('strong');
title.textContent = offer.title;
title.classList.add('offer-title'); 

const description = document.createElement('p');
description.textContent = offer.description;
description.classList.add('offer-description'); 


div1.appendChild(title);
div1.appendChild(description);





	
 

       listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(img);
	listItem.appendChild(div1);
  
    offersList.appendChild(listItem);
    });
}


    function deleteOffers() {
    const selectedOffers = document.querySelectorAll('#offers-list input[type="checkbox"]:checked');
    if (selectedOffers.length === 0) {
        alert("Please select at least one offer");
        return;
    }
    if (confirm("Are you sure you want to delete the selected offers?")) {
const idsToDelete = Array.from(selectedOffers).map(checkbox => parseInt(checkbox.value));
    offers = offers.filter(offer => !idsToDelete.includes(offer.id));
    renderOffers(); }
}


    function addOffer() {
        const title = document.getElementById('offer-title').value;
        const description = document.getElementById('description').value;
        const imageInput = document.getElementById('offer-image');
        const imageData = imageInput.files.length > 0 ? imageInput.files[0] : null;

        if (!title || !description || !imageData) {
            alert("Please fill all required fields and include an image.");
            return false;
        }

        const reader = new FileReader();
        reader.onload = function() {
            const newOffer = {
                id: offers.length + 1,
                title: title,
                description: description,
                image: reader.result  
            };
            offers.push(newOffer);
            renderOffers();
            document.getElementById('add-offer-form').reset();
        };
        reader.readAsDataURL(imageData);

        return true;
    }

    document.getElementById('add-offer-form').addEventListener('submit', function(event) {
        event.preventDefault();
        if (addOffer()) {
            alert("Offer added successfully!");
            document.getElementById('add-offer-form').reset();
        }
    });

    document.getElementById('delete-offers').addEventListener('click', deleteOffers);

    renderOffers();
});
