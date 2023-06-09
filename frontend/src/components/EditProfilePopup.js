import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [valueName, setValueName] = useState(currentUser.name)
  const [valueDescription, setValueDescription] = useState(currentUser.about)

  useEffect(() => {
    setValueName(currentUser.name);
    setValueDescription(currentUser.about);
  }, [currentUser, isOpen]);



  const handleChangeName = (event) => {
    setValueName(event.target.value)
  }

  const handleChangeDescription = (event) => {
    setValueDescription(event.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: valueName,
      about: valueDescription
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}

      title='Редактировать профиль'
      name='editProfileForm'
      buttonAcceptName='Сохранить'>
      <input
        value={valueName || ''}
        onChange={handleChangeName}
        className="popup__input"
        type="text"
        id="name"
        name="name"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error name-error"></span>
      <input
        value={valueDescription || ''}
        onChange={handleChangeDescription}
        className="popup__input"
        type='text'
        id="description"
        name="about"
        placeholder="Расскажите о себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error description-error"></span>
    </PopupWithForm>
  )
}
