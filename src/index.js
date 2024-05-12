import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card';
import { openPopup, closePopup } from './components/modal'
import { validationConfig, setEventListeners } from "./components/validation";
import { getUserData, getCardsData, patchUserData, patchNewCard, likeCardApi, dislikeCardApi, patchUserAvatar } from "./components/api";

const placesList = document.querySelector('.places__list');

const allPopups = document.querySelectorAll('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditSubmit = popupEdit.querySelector('.popup__button')
const popupImage = document.querySelector('.popup_type_image');
const popupImageSubmit = popupImage.querySelector('.popup__button')
const popupAvatar = document.querySelector('.popup_type_new-avatar');
const popupAvatarSubmit = popupAvatar.querySelector('.popup__button')
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardSubmit = popupNewCard.querySelector('.popup__button')
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
    Array.from(data).forEach((item) => {
        const cardData = {
            name: item.name,
            link: item.link,
            id: item.owner._id,
            likes: item.likes.length,
            cardId: item._id
        }
        placesList.append(createCard(cardData, {deleteCard}, {likeCard}, {handleImageClick}, popupImage, userId));
    })
})
.catch((err) => {
    console.log(err)
})

// Функция клика на изображения
function handleImageClick(item, popupImage) {
    modalImg.src = item.link;
    modalImg.alt = item.name;
    popupImage.querySelector('.popup__caption').textContent = item.name;

    openPopup(popupImage);
};

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    popupEditSubmit.textContent = 'Сохранение...';

    patchUserData(nameValue, jobValue)
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;  
        popupEditSubmit.textContent = 'Сохранить';
    })
    .catch((err) => {
        console.log(err)
        popupEditSubmit.textContent = 'Сохранить';
    })
    closePopup(popupEdit)
};

function createNewCard(evt) {
    evt.preventDefault();

    const cardName = newCardname.value;
    const cardLink = newCardLink.value;

    const newCard = {
        name: cardName, 
        link: cardLink
    };

    popupNewCard.textContent = 'Сохранение...';

    patchNewCard(cardName, cardLink)
    .then((data) => {
        popupNewCard.textContent = 'Сохранить';

        newCard.name = data.name;
        newCard.link = data.link;
        newCard.profileId = data.owner._id;
    })
    .catch((err) => {
        console.log(err)
    })

    const cardElement = createCard(newCard, {deleteCard}, {likeCard}, {handleImageClick});
    placesList.prepend(cardElement);
    addCardForm.reset();
    closePopup(popupNewCard);
};

// Функция обновления аватара

const replaceAvatar = (evt) => {
    evt.preventDefault();
    const avatarUrl = popupAvatar.querySelector('.popup__input_type_url');
    popupAvatarSubmit.textContent = 'Сохранение...';
    patchUserAvatar({ avatar: avatarUrl.value })
    .then((res) => {
        profileImage.style.backgroundImage = `url(${res.avatar})`;
        popupAvatarSubmit.textContent = 'Сохранить';
    })
    .catch((err) => {
        console.log(err)
        popupAvatarSubmit.textContent = 'Сохранить'
    })
}

// Функция включения валидации

const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
    formList.forEach((formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    setEventListeners(formElement, validationConfig)
    }))
}

const clearValidation = (formElement, validationConfig) => {
	const popupButton = formElement.querySelector(validationConfig.submitButtonSelector)
	popupButton.classList.add(validationConfig.inactiveButtonClass)
	const spanError = Array.from(formElement.querySelectorAll('.popup__input_type_error'))
	spanError.forEach((item) => {
		item.classList.remove(validationConfig.errorClass)
		item.textContent = "";
	})
	const inputError = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
	inputError.forEach((item) => {
		item.classList.remove(validationConfig.inputErrorClass)
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
});

popupCloseButtons.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup))
});

profileImage.addEventListener('click', () => {
    openPopup(popupAvatar);
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
    closePopup(popupNewCard)
})

editAvatarForm.addEventListener('submit', (evt) => {
    replaceAvatar(evt);
    closePopup(popupAvatar);
})

enableValidation(validationConfig)

export {addCardForm, allPopups, newCardname, newCardLink, placesList, popupImage, modalImg};