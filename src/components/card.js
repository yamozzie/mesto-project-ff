import { placesList, popupImage, modalImg } from "../index.js";
import { openPopup } from "./modal.js";

// Функция рендера карточек
function renderCard(item) {
    const cardElement = createCard(item, {deleteCard}, {likeCard}, {handleImageClick});
    placesList.append(cardElement);
}

// Функция создания карточек
function createCard(item, {deleteCard}, {likeCard}, {handleImageClick}) {
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

// Функция клика на изображения
function handleImageClick(item, popupImage) {
    modalImg.src = item.link;
    modalImg.alt = item.name;
    popupImage.querySelector('.popup__caption').textContent = item.name;

    openPopup(popupImage);
}
export { renderCard, createCard, deleteCard, likeCard, handleImageClick};