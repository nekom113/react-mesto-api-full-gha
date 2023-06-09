import React, { useEffect, useRef } from 'react'
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(null)

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])



  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      link: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title='Обновить аватар'
      name='updateAvatar'
      buttonAcceptName='Создать'>

      <input
        ref={avatarRef}
        className="popup__input"
        id="avatar-link"
        name="link"
        type="url"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__error avatar-link-error"></span>
    </PopupWithForm>
  )
}
