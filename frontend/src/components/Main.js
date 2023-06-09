import { useContext } from "react"
import Card from "./Card.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext)
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
        <div className="profile__info">
          <div className="profile__title-wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Изменить профиль"
              onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle"> {currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить новую карточку"
          onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map(card => (<Card
          card={card}
          key={card._id}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete} />))}
      </section>
    </main>
  )
}
