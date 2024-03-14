const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCards(name, link) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.places__item .card__delete-button');
    
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;

    deleteCardButton.addEventListener('click', () => {deleteCard(cardElement)})

    placesList.append(cardElement);
}

for (let i = 0; i < initialCards.length; i++) {
    createCards(initialCards[i]['name'], initialCards[i]['link']);
}

function deleteCard(cardElement) {
    cardElement.remove()
}