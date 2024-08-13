import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function ItemCard({ item, onCardClick }) {
  const { userData } = useContext(CurrentUserContext);

  const isOwn = item.owner === userData._id;

  return (
    <li
      className="card"
      onClick={() => {
        onCardClick(item);
      }}
    >
      <div className="card__heading">
        <h2 className="card__title">{item.name}</h2>
        <button
          className="card__like-button"
          //.card__like-button_active
        ></button>
      </div>
      <img src={item.imageUrl} alt={item.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
