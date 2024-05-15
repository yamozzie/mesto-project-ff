import { deleteCardApi, dislikeCardApi, likeCardApi } from "./api";

// Функция создания карточек
function createCard(item, {handleImageClick}, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    const likeCardButton = cardElement.querySelector('.card__like-button');
    const cardLikeAmount = cardElement.querySelector('.card__like_amount');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    if (item.owner._id !== userId) {
        deleteCardButton.style.display = 'none';
    }

    deleteCardButton.addEventListener('click', () => {
        deleteCardApi(item._id)
        .then(() => {
            cardElement.remove()
        })
        .catch(err => console.log(err))
    })
    likeCardButton.addEventListener('click', () => {
        if (likeCardButton.classList.contains('card__like-button_is-active')) {
        dislikeCardApi(item._id)
        .then(() => {
            likeCardButton.classList.toggle('card__like-button_is-active');
            cardLikeAmount.textContent = item.likes.length;
        })
        } else {
            likeCardApi(item._id)
            .then(() => {
                likeCardButton.classList.toggle('card__like-button_is-active');
                cardLikeAmount.textContent = item.likes.length + 1;
            })
            .catch(err => console.log(err))
        }
    });
    cardImage.addEventListener('click', () => {handleImageClick(item)});
    cardLikeAmount.textContent = item.likes.length
    return cardElement;

}

export { createCard };