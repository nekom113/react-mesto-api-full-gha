export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  submitButtonDisabled: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
export const getJWTByLocalStorage = () =>{
  return localStorage.getItem('jwt')
}

export const BASE_URL = 'http://127.0.0.1:3033'
// export const BASE_URL 'https://api.mesto-piontek.nomoredomains.rocks',
// export const BASE_URL 'https://auth.nomoreparties.co',
// export const BASE_URL 'http://127.0.0.1:3033',