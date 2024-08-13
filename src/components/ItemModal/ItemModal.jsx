import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function ItemModal({
  card,
  handleCloseClick,
  isOpen,
  onDeleteClick,
}) {
  const { userData } = useContext(CurrentUserContext);

  const isOwn = card.owner === userData._id;

  return (
    <div className={`modal${isOpen ? " modal_opened" : ""} modal_item`}>
      <div className="modal__container modal__container_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        />
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__information">
          <p className="modal__information-title">{card.name}</p>
          <p className="modal__information-weather">Weather: {card.weather}</p>
        </div>
        {isOwn && (
          <button
            type="button"
            className="modal__delete-card"
            onClick={onDeleteClick}
          >
            Delete item
          </button>
        )}
      </div>
    </div>
  );
}
