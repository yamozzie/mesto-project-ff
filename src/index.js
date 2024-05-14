import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card';
import { openPopup, closePopup } from './components/modal'
import { enableValidation, clearValidation } from "./components/validation";
import { getUserData, getCardsData, patchUserData, patchNewCard, likeCardApi, dislikeCardApi, patchUserAvatar } from "./components/api";

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

const placesList = document.querySelector('.places__list');

const allPopups = document.querySelectorAll('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditSubmit = popupEdit.querySelector('.popup__button');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_new-avatar');
const popupAvatarSubmit = popupAvatar.querySelector('.popup__button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardSubmit = popupNewCard.querySelector('.popup__button');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const modalImg = popupImage.querySelector('.popup__image');

const editProfileForm = popupEdit.querySelector('.popup__form');
const editAvatarForm = popupAvatar.querySelector('.popup__form')
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const addCardForm = popupNewCard.querySelector('.popup__form');
const newCardname = popupNewCard.querySelector('.popup__input_type_card-name');
const newCardLink = popupNewCard.querySelector('.popup__input_type_url');

Promise.all([getUserData(), getCardsData()])
.then(([dataUser, data]) => {
    const username = dataUser.name;
    const userDescription = dataUser.about;
    const userId = dataUser._id;
    profileTitle.textContent = username;
    profileDescription.textContent = userDescription;
    profileImage.style.backgroundImage = `url(${dataUser.avatar})`;
    data.forEach((item) => {
        placesList.append(createCard(item, {handleImageClick}, userId));
    })
})
.catch((err) => {
    console.log(err)
})

// Функция клика на изображения
function handleImageClick(item) {
    modalImg.src = item.link;
    modalImg.alt = item.name;
    popupImage.querySelector('.popup__caption').textContent = item.name;

    openPopup(popupImage);
};

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value

    popupEditSubmit.textContent = 'Сохранение...';

    patchUserData(nameValue, jobValue)
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about; 
        closePopup(popupEdit) ;
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        popupEditSubmit.textContent = 'Сохранить';
    })
};

function createNewCard(evt) {
    evt.preventDefault();

    const cardName = newCardname.value;
    const cardLink = newCardLink.value;

    popupNewCardSubmit.textContent = 'Сохранение...';

    patchNewCard(cardName, cardLink)
    .then((data) => {
        closePopup(popupNewCard);
        const cardElement = createCard(data, {handleImageClick}, data.owner._id);
        placesList.prepend(cardElement);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        popupNewCardSubmit.textContent = 'Сохранить';
    })

    addCardForm.reset();
};

// Функция обновления аватара

const replaceAvatar = (evt) => {
    evt.preventDefault();
    const avatarUrl = popupAvatar.querySelector('.popup__input_type_url');
    popupAvatarSubmit.textContent = 'Сохранение...';
    patchUserAvatar({ avatar: avatarUrl.value })
    .then((res) => {
        profileImage.style.backgroundImage = `url(${res.avatar})`;
        closePopup(popupAvatar);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        popupAvatarSubmit.textContent = 'Сохранить';
    })
}


editProfileButton.addEventListener('click', () => {
    openPopup(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(editProfileForm, validationConfig)
});
profileAddButton.addEventListener('click', () => {
    openPopup(popupNewCard);
    clearValidation(addCardForm, validationConfig);
});

popupCloseButtons.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup))
});

profileImage.addEventListener('click', () => {
    openPopup(popupAvatar);
    clearValidation(editAvatarForm, validationConfig);
    editAvatarForm.reset()
})

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

editAvatarForm.addEventListener('submit', (evt) => {
    replaceAvatar(evt);
})

enableValidation(validationConfig)

export {addCardForm, allPopups, newCardname, newCardLink, placesList, popupImage, modalImg};