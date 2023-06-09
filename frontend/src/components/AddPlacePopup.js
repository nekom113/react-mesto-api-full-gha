import PopupWithForm from "./PopupWithForm";
import React, { useEffect, useState } from "react";


export default function AddPlacePopup({ isOpen, onClose, onAddNewPlace }) {

  const [inputPlaceName, setInputPlaceName] = useState('')
  const [inputLinkPlace, setInputLinkPlace] = useState('')

  const handleChangePlaceName = (e) => {
    setInputPlaceName(e.target.value)
  }

  const handleChangePlaceLink = (e) => {
    setInputLinkPlace(e.target.value)
  }


  useEffect(() => {
    setInputPlaceName('')
    setInputLinkPlace('')
  }, [isOpen]);

  const handleCardSubmit = (e) => {
    e.preventDefault()
    onAddNewPlace({
      name: inputPlaceName,
      link: inputLinkPlace
    })
  }

  return (
    <PopupWithForm
      onSubmit={handleCardSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title='Новое место'
      name='addCardsForm'
      buttonAcceptName='Сохранить'>
      <input
        value={inputPlaceName}
        onChange={handleChangePlaceName}
        className="popup__input"
        type='text'
        id="place-call"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error place-call-error"></span>
      <input
        value={inputLinkPlace}
        onChange={handleChangePlaceLink}
        className="popup__input"
        id="image-link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required />
      <span className="popup__error image-link-error"></span>
    </PopupWithForm>

  )
}
