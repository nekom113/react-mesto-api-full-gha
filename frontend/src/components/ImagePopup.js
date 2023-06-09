import { useClickClosePopup } from "../utils/hooks"

export default function ImagePopup({ card, onClose }) {

  useClickClosePopup(onClose, !!card)
  
  return (

    <div className={`popup ${card && 'popup_opened'}`} id="popup-picture-card">
      <div className="popup__picture-wrapper">
        <button className="popup__close-icon" id="close-picture-popup" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
        <img src={card?.link} alt={card?.name} className="popup__image" />
        <figcaption className="popup__title popup__title_type_picture">{card?.name}</figcaption>
      </div>
    </div>
  )
}
