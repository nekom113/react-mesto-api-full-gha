class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }
  getCardsData() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }
  getDataApi() {
    return Promise.all([this.getProfileData(), this.getCardsData()])
  }
  setProfileInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._checkResponse)
  }
  setProfileAvatar({ link }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResponse)
  }
  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse)
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
}
const apiSettings = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'b9d2bdc1-ae00-4313-af72-93c27d31b82b',
    'Content-Type': 'application/json'
  }
}


const api = new Api(apiSettings)

export { api }
