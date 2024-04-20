// Функция создания карточек
function createCard(item, {deleteCard}, {likeCard}, {handleImageClick}, popupImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    const likeCardButton = cardElement.querySelector('.card__like-button')
    
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    deleteCardButton.addEventListener('click', () => {deleteCard(cardElement)});
    likeCardButton.addEventListener('click', () => {likeCard(likeCardButton)});
    cardImage.addEventListener('click', () => {handleImageClick(item, popupImage)})
    return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove(); 
}
// Функция лайка карточки
function likeCard(likeCardButton) {
    likeCardButton.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };