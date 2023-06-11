import {BASE_URL, getJWTByLocalStorage} from "./utils";

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  getProfileData() {
    const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
  getCardsData() {
    const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
  getDataApi() {
    return Promise.all([this.getProfileData(), this.getCardsData()])
  }
  setProfileInfo({ name, about }) {
    const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._checkResponse)
  }
  setProfileAvatar({ link }) {
    const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResponse)
  }
  addNewCard({ name, link }) {
    const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse)
  }
  deleteCard(cardId) {
    const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
  addLike(id) {
    const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
  deleteLike(id) {
    const token = getJWTByLocalStorage()
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
}
const apiSettings = {
  baseUrl: BASE_URL,
}


const api = new Api(apiSettings)

export { api }
