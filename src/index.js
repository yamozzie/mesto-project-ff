import './pages/index.css';
import { initialCards } from './scripts/cards';
import { renderCard, createCard, deleteCard, likeCard, handleImageClick } from './components/card';
import { openPopup, closeallPopups, closePopupEscape, createNewCard } from './components/modal'

const placesList = document.querySelector('.places__list')

// Вставка каждой карточки на сайт
initialCards.forEach(renderCard);


const allPopups = document.querySelectorAll('.popup');

const editProfileButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');

const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const modalImg = popupImage.querySelector('.popup__image');

export {placesList, popupImage, modalImg}

editProfileButton.addEventListener('click', () => {openPopup(popupEdit)});
profileAddButton.addEventListener('click', () => {openPopup(popupNewCard)});

popupCloseButtons.forEach(button => {
    button.addEventListener('click', closeallPopups);
});

// Функция закрытия попаов по клику оверлея
allPopups.forEach(popups => {
    popups.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            popups.classList.remove('popup_is-opened');
        };
    });
});

const editProfileForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description')

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeallPopups()
}
editProfileForm.addEventListener('submit', handleFormEditSubmit);

const addCardForm = popupNewCard.querySelector('.popup__form');
const newCardname = popupNewCard.querySelector('.popup__input_type_card-name');
const newCardLink = popupNewCard.querySelector('.popup__input_type_url');


addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createNewCard(evt);
})
export {addCardForm, allPopups, newCardname, newCardLink}