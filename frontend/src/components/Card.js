import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)


  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes?card.likes.some(id => id === currentUser._id): '';
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked && 'card__like-button_active'}`
  );
const cardLikesCount=()=>{
  let likesCount = 0
  if(Array.isArray(card.likes)){
     likesCount = card.likes.length
  } return likesCount
}
  function handleClick() {
    onCardClick(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card)
  }
  const handleLikeClick = () => {
    onCardLike(card)
  }
  return (
    <div className="card">
      {isOwn && <button className="card__delete-button" type="button" onClick={handleDeleteClick}></button>}
      <img src={card.link} alt={card.name} className="card__img" onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes-box">
          <button className={cardLikeButtonClassName} type="button" aria-label="Добавить в избранное" onClick={handleLikeClick}></button>
          <span className="card__likes-count">{cardLikesCount()}</span>
        </div>
      </div>
    </div>
  )
}
