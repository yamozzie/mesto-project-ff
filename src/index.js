import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { openPopup, closePopup } from './components/modal'

const placesList = document.querySelector('.places__list');

const allPopups = document.querySelectorAll('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const modalImg = popupImage.querySelector('.popup__image');

const editProfileForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardForm = popupNewCard.querySelector('.popup__form');
const newCardname = popupNewCard.querySelector('.popup__input_type_card-name');
const newCardLink = popupNewCard.querySelector('.popup__input_type_url');

// Вставка каждой карточки на сайт
initialCards.forEach(renderCard);

// Функция рендера карточек
function renderCard(item) {
    const cardElement = createCard(item, {deleteCard}, {likeCard}, {handleImageClick});
    placesList.append(cardElement);
};

// Функция клика на изображения
function handleImageClick(item, popupImage) {
    modalImg.src = item.link;
    modalImg.alt = item.name;
    popupImage.querySelector('.popup__caption').textContent = item.name;

    openPopup(popupImage);
};

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEdit)
};

function createNewCard(evt) {
    evt.preventDefault();
    const newCard = {name: newCardname.value, link: newCardLink.value};
    const cardElement = createCard(newCard, {deleteCard}, {likeCard}, {handleImageClick})
    placesList.prepend(cardElement);
    renderCard(newCard);
    addCardForm.reset();
    closePopup(popupNewCard)
};

editProfileButton.addEventListener('click', () => {
    openPopup(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});
profileAddButton.addEventListener('click', () => {openPopup(popupNewCard)});

popupCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        allPopups.forEach(popup => {
            closePopup(popup)
        });
    });
});

// Функция закрытия попаов по клику оверлея
allPopups.forEach(popups => {
    popups.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popups)
        };
    });
});

editProfileForm.addEventListener('submit', handleFormEditSubmit);

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createNewCard(evt);
})
export {addCardForm, allPopups, newCardname, newCardLink, placesList, popupImage, modalImg};