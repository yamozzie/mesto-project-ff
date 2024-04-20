// Фуекция открытия попапов
function openPopup(modalPopup) {
    modalPopup.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => closePopupEscape(evt))
};

// Функия для закрытия попапов
function closePopup(modalPopup) {
    modalPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEscape(modalPopup));
};

// Функция закрытия попапов по нажатию Escape
function closePopupEscape(evt) {
    const popupOpened = document.querySelector('.popup_is-opened')
    if (popupOpened && evt.key === 'Escape') {
        closePopup(popupOpened);
    };
};

export {openPopup, closePopup, closePopupEscape}