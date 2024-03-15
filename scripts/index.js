const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Функция рендера карточек
function renderCard(item) {
    const cardElement = createCard(item, {deleteCard}).cloneNode(true)
    const deleteCardButton = cardElement.querySelector('.places__item .card__delete-button');
    
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    deleteCardButton.addEventListener('click', () => {deleteCard(cardElement)});

    placesList.append(cardElement);
}

// Вставка каждой карточки на сайт
initialCards.forEach(renderCard);

// Функция создания карточки
function createCard(item, {deleteCard}) {
    cardElement = cardTemplate.querySelector('.places__item');
    return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}
