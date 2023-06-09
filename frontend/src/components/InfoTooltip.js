import { useClickClosePopup } from "../utils/hooks"

function InfoTooltip({ isOpenConfig, onClose }) {


  useClickClosePopup(onClose,isOpenConfig)
  return (
    <section
      className={`popup ${isOpenConfig.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" onClick={onClose} className="popup__close-icon" />
        <div className={isOpenConfig.status ? `popup__tooltip-icon_success` : `popup__tooltip-icon_fail `} />
        <p className="popup__tooltip-text">{isOpenConfig.status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </section>
  )
}

export default InfoTooltip
