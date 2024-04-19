import { initialCards } from '../scripts/cards';
import { addCardForm, allPopups, newCardname, newCardLink } from '../index';
import { renderCard, createCard, deleteCard, likeCard, handleImageClick } from "./card";
import { placesList } from "../index.js";

// Фуекция открытия попапов
function openPopup(modalPopup) {
    modalPopup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEscape)
};

// Функия для закрытия попапов
function closeallPopups() {
    allPopups.forEach(popup => {
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', closePopupEscape)
    });
};

// Функция закрытия попапов по нажатию Escape
function closePopupEscape(evt, element) {
    if (evt.key === 'Escape') {
        closeallPopups(element);
    };
};

function createNewCard(evt) {
    evt.preventDefault();
    const newCard = {name: newCardname.value, link: newCardLink.value};
    const cardElement = createCard(newCard, {deleteCard}, {likeCard}, {handleImageClick})
    initialCards.unshift(cardElement);
    placesList.prepend(cardElement);
    renderCard(newCard);
    closeallPopups();
    addCardForm.reset();
}

export {openPopup, closeallPopups, closePopupEscape, createNewCard}