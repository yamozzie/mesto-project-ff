import './pages/index.css';
import { initialCards } from './scripts/cards';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Функция рендера карточек
function renderCard(item) {
    const cardElement = createCard(item, {deleteCard});
    placesList.append(cardElement);
}

// Вставка каждой карточки на сайт
initialCards.forEach(renderCard);

// Функция создания карточки
function createCard(item, {deleteCard}) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    deleteCardButton.addEventListener('click', () => {deleteCard(cardElement)});

    return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove(); 
}
