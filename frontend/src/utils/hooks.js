import { useEffect } from "react"

const useClickClosePopup = (closePopup, isOpenPopup) => {
  useEffect(() => {
    if (!isOpenPopup) {
      return
    }
    const handleOverlay = (event) => {
      if (event.target.classList.contains("popup_opened")) {
        closePopup();
      }
    };
    const handleClickByEsc = (e) => {
      if (e.key === 'Escape') {
        closePopup()
      }
    }
    document.addEventListener("mousedown", handleOverlay);
    document.addEventListener('keydown', handleClickByEsc)
    return () => {
      document.removeEventListener('keydown', handleClickByEsc)
      document.removeEventListener("mousedown", handleOverlay);
    }
  }, [isOpenPopup])
}



export { useClickClosePopup }
