const handleRes = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
    headers: {
      authorization: 'e882a1bb-dbfc-4522-b533-1d9a93d919ba',
      'Content-Type': 'application/json'
    }
}

const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
    })
    .then(handleRes)
}

const getCardsData = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(handleRes)

}

const patchUserData = (dataName, dataJob) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: `${dataName}`,
            about: `${dataJob}`
        })
    })
    .then(handleRes)
}

const patchNewCard = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: `${cardName}`,
            link: `${cardLink}`
        })
    })
    .then(handleRes)
};

const deleteCardApi = (cardId) => {
    return fetch (`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleRes)
}

const likeCardApi = (cardId) => {
    return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(handleRes)
}

const dislikeCardApi = (cardId) => {
    return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleRes)
}

const patchUserAvatar = (data) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
    })
    .then(handleRes)
}

export { getUserData, getCardsData, patchUserData, patchNewCard, deleteCardApi, likeCardApi, dislikeCardApi, patchUserAvatar }