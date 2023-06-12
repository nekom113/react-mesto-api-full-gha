import {BASE_URL} from "./utils";

class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  getRegistrationUser({ password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then(this._checkResponse)
  }

  getAuthorizationUser({ password, email }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then(this._checkResponse)
  }

  checkDataUser(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }
    })
      .then(this._checkResponse)
  }
}
const authSetting = {
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}

const auth = new Auth(authSetting);

export default auth
