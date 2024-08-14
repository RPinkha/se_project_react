import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function ItemCard({ item, onCardClick, onLikeClick }) {
  const { userData, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === userData._id);

  function onLike(e) {
    e.stopPropagation();
    onLikeClick({
      id: item._id,
      isLiked: isLiked,
    });
  }

  return (
    <li
      className="card"
      onClick={() => {
        onCardClick(item);
      }}
    >
      <div className="card__heading">
        <h2 className="card__title">{item.name}</h2>
        {isLoggedIn && (
          <button
            className={`card__like-button${
              isLiked ? " card__like-button_active" : ""
            }`}
            onClick={onLike}
          ></button>
        )}
      </div>
      <img src={item.imageUrl} alt={item.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
