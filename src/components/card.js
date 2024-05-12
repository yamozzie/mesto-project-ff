import { deleteCardApi, dislikeCardApi, likeCardApi } from "./api";

// Функция создания карточек
function createCard(item, {handleImageClick}, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    const likeCardButton = cardElement.querySelector('.card__like-button');
    const cardLikeAmount = cardElement.querySelector('.card__like_amount');
    const cardImage = cardElement.querySelector('.card__image');
    const cardData = {
        name: item.name,
        link: item.link,
        id: item.owner._id,
        likes: item.likes.length,
        cardId: item._id
    }

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    if (item.owner._id !== userId) {
        deleteCardButton.style.display = 'none';
    }

    deleteCardButton.addEventListener('click', () => {
        deleteCardApi(cardData.cardId)
        .then(() => {
            cardElement.remove()
        })
        .catch(err => console.log(err))
    })
    likeCardButton.addEventListener('click', () => {
        if (likeCardButton.classList.contains('card__like-button_is-active')) {
        dislikeCardApi(cardData.cardId)
        .then(() => {
            likeCardButton.classList.toggle('card__like-button_is-active');
            cardLikeAmount.textContent = cardData.likes;
        })
        } else {
            likeCardApi(cardData.cardId)
            .then(() => {
                likeCardButton.classList.toggle('card__like-button_is-active');
                cardLikeAmount.textContent = cardData.likes;
            })
            .catch(err => console.log(err))
        }
    });
    cardImage.addEventListener('click', () => {handleImageClick(cardData)});
    cardLikeAmount.textContent = cardData.likes
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