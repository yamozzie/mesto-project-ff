const handleRes = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const getUserData = () => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-12/users/me', {
    method: 'GET',
    headers: {
        authorization: '9702ad57-d331-4ea7-bb56-285f4950731d'
        }
    })
    .then(handleRes)
}

const getCardsData = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
        headers: {
            authorization: '9702ad57-d331-4ea7-bb56-285f4950731d'
        }
    })
    .then(handleRes)

}

const patchUserData = (dataName, dataJob) => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-12/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '9702ad57-d331-4ea7-bb56-285f4950731d',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${dataName}`,
            about: `${dataJob}`
        })
    })
    .then(handleRes)
}

const patchNewCard = (cardName, cardLink) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
        method: 'POST',
        headers: {
            authorization: '9702ad57-d331-4ea7-bb56-285f4950731d',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${cardName}`,
            link: `${cardLink}`
        })
    })
    .then(handleRes)
};

const deleteCardApi = (cardId) => {
    return fetch (`https://nomoreparties.co/v1/wff-cohort-12/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '9702ad57-d331-4ea7-bb56-285f4950731d'
        }
    })
    .then(handleRes)
}

const likeCardApi = (cardId) => {
    return fetch (`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: '9702ad57-d331-4ea7-bb56-285f4950731d'
        }
    })
    .then(handleRes)
}

const dislikeCardApi = (cardId) => {
    return fetch (`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '9702ad57-d331-4ea7-bb56-285f4950731d'
        }
    })
    .then(handleRes)
}

const patchUserAvatar = (data) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '9702ad57-d331-4ea7-bb56-285f4950731d',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(handleRes)
}

export { getUserData, getCardsData, patchUserData, patchNewCard, deleteCardApi, likeCardApi, dislikeCardApi, patchUserAvatar }