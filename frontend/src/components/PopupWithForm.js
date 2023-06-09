import { useClickClosePopup } from "../utils/hooks"

export default function PopupWithForm({ title, name, children, isOpen, onClose, buttonAcceptName, onSubmit }) {
useClickClosePopup(onClose,isOpen)
  return (

    <div className={`popup ${isOpen && 'popup_opened'}`} id={`popup-${name}`}>
      <div className="popup__container">
        <button className="popup__close-icon" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" type="submit">{buttonAcceptName}</button>
        </form>
      </div>
    </div>
  )
}
