import { deleteCardApi, dislikeCardApi, likeCardApi } from "./api";

// Функция создания карточек
function createCard(item, {deleteCard}, {likeCard}, {handleImageClick}, popupImage, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    const likeCardButton = cardElement.querySelector('.card__like-button');
    const cardLikeAmount = cardElement.querySelector('.card__like_amount');
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    if (item.id !== userId) {
        deleteCardButton.style.display = 'none';
    }

    deleteCardButton.addEventListener('click', () => {
        deleteCardApi(item.cardId)
        .then(() => {
            cardElement.remove()
        })
    })
    likeCardButton.addEventListener('click', () => {
        if (likeCardButton.classList.contains('card__like-button_is-active')) {
        dislikeCardApi(item.cardId)
        .then(() => {
            likeCardButton.classList.toggle('card__like-button_is-active');
            cardLikeAmount.textContent = item.likes;
        })
        } else {
            likeCardApi(item.cardId)
            .then(() => {
                likeCardButton.classList.toggle('card__like-button_is-active');
                cardLikeAmount.textContent = item.likes;
            })
        }
    });
    cardImage.addEventListener('click', () => {handleImageClick(item, popupImage)});
    cardLikeAmount.textContent = item.likes
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